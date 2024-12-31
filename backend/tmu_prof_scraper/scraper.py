from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.options import Options
import json  # handling json data
import time  # sleep and timing operations
import os    # file operations  
import gc    # garbage collector for memory management
import logging   # logging messages for debugging purposes

# logging configuration
log_file_path = os.path.join(os.path.dirname(__file__), "scraper.log")
logging.basicConfig(level=logging.INFO, filename=log_file_path, filemode="w",
                    format="%(asctime)s - %(levelname)s - %(message)s")

# chrome options for optimization
chrome_options = Options()
chrome_options.add_argument("--headless")
chrome_options.add_argument("--disable-gpu")
chrome_options.add_argument("--no-sandbox")
chrome_options.add_argument("--disable-dev-shm-usage")
chrome_options.add_argument("--blink-settings=imagesEnabled=false")

# file paths for saving progress and output data
PROGRESS_FILE = os.path.join(os.path.dirname(__file__), "scrape_progress.json")
OUTPUT_FILE = os.path.join(os.path.dirname(__file__), "professors_data.json")

# initialize WebDriver
def init_driver():
    return webdriver.Chrome(options=chrome_options)

# save progress to json file
def save_progress(show_more_clicks, professors):
    progress = {
        "show_more_clicks": show_more_clicks,
        "professors": professors
    }
    with open(PROGRESS_FILE, "w", encoding="utf-8") as file:
        json.dump(progress, file, indent=4, ensure_ascii=False)

# load progress from file
def load_progress():
    if not os.path.exists(PROGRESS_FILE) or os.path.getsize(PROGRESS_FILE) == 0:
        return {"show_more_clicks": 0, "professors": []}
    
    try:
        with open(PROGRESS_FILE, "r", encoding="utf-8") as file:
            return json.load(file)
    except json.JSONDecodeError:
        logging.warning("Progress file is corrupted. Starting fresh...")
        return {"show_more_clicks": 0, "professors": []}

# clear unused elements from DOM, run garbage collection
def clear_unused_memory(driver):
    driver.execute_script("""
        let elements = document.querySelectorAll("div.CardName__StyledCardName-sc-1gyrgim-0.cJdVEK");
        elements.forEach(el => el.parentNode.removeChild(el));
    """)
    gc.collect()
    logging.info("Memory cleared and unused DOM elements removed.")

# hash function for professor based on name and subjects
def generate_hash(name, subjects):
    return hash(f"{name.lower()}|{','.join(subjects).lower()}")

def show_more_button_number_times_recorded(show_more_clicks, driver):
    for _ in range(show_more_clicks): #'_' is used as loop var, and is not going to be used within loop body
            try:
                WebDriverWait(driver, 10).until(
                    EC.element_to_be_clickable((By.XPATH, "//button[contains(text(), 'Show More')]"))
                ).click()
                time.sleep(2)
            except Exception as e:
                logging.warning(f"Failed to skip clicks: {e}")
                break

# main scraping function
def scrape_professors():
    driver = init_driver()  # init webDriver
    progress = load_progress()  # load progress from json file
    professors = progress["professors"]  # get list of profs
    seen_hashes = {generate_hash(prof["name"], prof["subjects"]) for prof in professors}  # set of seen hashes to avoid duplicates
    total_count = len(professors)  # total count of profs
    show_more_clicks = progress["show_more_clicks"]  # number of show more button clicks
    iteration_count = 0  # init iteration counter

    try:
        driver.get("https://www.ratemyprofessors.com/search/professors/1471?q=*")

        # click "Show More" button for the number of times recorded in progress
        show_more_button_number_times_recorded(show_more_clicks, driver)

        while True:
            start_time = time.time()  # start time of iteration

            try:
                # close modal overlays if present
                try:
                    modal_overlay = WebDriverWait(driver, 5).until(
                        EC.presence_of_element_located((By.CLASS_NAME, "ReactModal__Overlay"))
                    )
                    close_button = modal_overlay.find_element(By.XPATH, "//button[contains(text(), 'Close')]")
                    close_button.click()
                except Exception:
                    pass

                # click show more button
                show_more_button = WebDriverWait(driver, 10).until(
                    EC.element_to_be_clickable((By.XPATH, "//button[contains(text(), 'Show More')]"))
                )
                # scroll down until show more button is seen
                driver.execute_script("arguments[0].scrollIntoView({ behavior: 'smooth', block: 'center' });", show_more_button)

                # clicking show more button with javascript
                driver.execute_script("arguments[0].click();", show_more_button)
                show_more_clicks += 1  # increment count of show more button clicks

                time.sleep(5)  # wait 5 seconds to make sure new data is loaded

                # waiting until all elements are present
                WebDriverWait(driver, 10).until(
                    EC.presence_of_all_elements_located((By.CSS_SELECTOR, "div.CardName__StyledCardName-sc-1gyrgim-0.cJdVEK"))
                )

                # find all elements for prof name and subjects name
                professor_elements = driver.find_elements(By.CSS_SELECTOR, "div.CardName__StyledCardName-sc-1gyrgim-0.cJdVEK")
                subject_elements = driver.find_elements(By.CLASS_NAME, "CardSchool__Department-sc-19lmz2k-0")

            # handling exceptions and log info
            except Exception as e:
                logging.info(f"No more 'Show More' buttons or error occurred: {e}")
                break

            # processing each prof and adding to list if not already seen
            for name, subject in zip(professor_elements, subject_elements):
                professor_name = name.text.strip()
                professor_subject = subject.text.strip()
                professor_hash = generate_hash(professor_name, [professor_subject])

                if professor_hash not in seen_hashes:
                    seen_hashes.add(professor_hash)
                    professors.append({
                        "name": professor_name,
                        "subjects": [professor_subject]
                    })
                    total_count += 1
                else:
                    # Update the subjects list for the existing professor
                    for prof in professors:
                        if prof["name"] == professor_name:
                            if professor_subject not in prof["subjects"]:
                                prof["subjects"].append(professor_subject)
                            break

            logging.info(f"Professors scraped: {total_count}")
            print(f"Professors scraped: {total_count}")

            # saving progress periodically
            save_progress(show_more_clicks, professors)

            # clearing memory periodically for every 3 clicks
            if show_more_clicks % 3 == 0:
                clear_unused_memory(driver)

            iteration_count += 1
            
            # for every 5 clicks, restart browser
            if iteration_count % 5 == 0: 
                driver.quit()  # restarting browser periodically to clear memory
                driver = init_driver()
                driver.get("https://www.ratemyprofessors.com/search/professors/1471?q=*")

                # click "Show More" button for the number of times recorded in progress
                show_more_button_number_times_recorded(show_more_clicks, driver)

            end_time = time.time()  # recording end time of iteration
            duration = end_time - start_time  # calc length of iteration

            logging.info(f"Time taken for this iteration: {duration:.2f} seconds")
            print(f"Time taken for this iteration: {duration:.2f} seconds")

    # handling exceptions that happen during scraping
    except Exception as e:
        logging.error(f"An error occurred during scraping: {e}")
    
    # make sure browser is closed, save final data
    finally:
        driver.quit()

        # saving final data
        with open(OUTPUT_FILE, "w", encoding="utf-8") as json_file:
            json.dump(professors, json_file, indent=4, ensure_ascii=False)

        logging.info(f"Data saved to {OUTPUT_FILE}.")

# main scraping function if script is executed directly
if __name__ == "__main__":
    scrape_professors()