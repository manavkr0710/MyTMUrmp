![Screenshot 2025-01-10 180239]([https://github.com/user-attachments/assets/09170c35-c1a2-4cc3-a739-905593c651cb](https://mytmurmp-0b5da00d391e.herokuapp.com/) "My TMU RMP")

## MyTMU RMP (MyTMU Rate My Prof) -> https://mytmurmp.onrender.com/
### About the Project
- A web app that allows TMU students to create reviews, and read reviews that other TMU students might have left on other professors.
- Deployed on Render for free
- Created with: Flask, ReactJS, Selenium, SQLite, SQLAlchemy, and Chakra UI

  
### Tech Stack
- Flask (Python Framework): for backend, handling HTTP requests and serving APIs
- ReactJS (Javascript library): building the frontend, providing a dynamic and responsive user experience
- Selenium: scraping RMP for TMU professors to display the available professors with their respective subject(s) taught.
- SQLite, SQLAlchemy: storing reviews using SQLite, creating/reading reviews using SQLAlchemy
- Chakra UI: provided a refined user experience with elegant UI components

### How to Use the MyTMU RMP app
1. Clone the repository:

```bash
git clone https://github.com/manavkr0710/MyTMUrmp
```

2. Navigate to the project directory:

```bash
cd MyTMUrmp-main
```

3. Navigate to the backend directory:

```bash
cd backend
```

4. Create a virtual environment:

-   On macOS and Linux:

```bash
python3 -m venv venv
```

-   On Windows:

```bash
python -m venv venv
```

5. Activate the virtual environment:

-   On macOS and Linux:

```bash
source venv/bin/activate
```

-   On Windows:

```bash
venv\Scripts\activate
```

6. Install the dependencies:

-   On macOS and Linux:

```bash
pip3 install -r requirements.txt
```

-   On Windows:

```bash
pip install -r requirements.txt
```

7. Navigate to the frontend directory:

```bash
cd ../frontend
```

8. Install the dependencies:

```bash
npm install
```

9. Build the frontend:

```bash
npm run build
```

10. Navigate to the backend directory:

```bash
cd ../backend
```

11. Run the Flask app:

```bash
flask run
```

12. Open your browser and go to `http://localhost:5000/` to view the app.





