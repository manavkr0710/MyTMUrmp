import json
import os

# Define the relative path to the JSON file
file_path = os.path.join(os.path.dirname(__file__), 'professors_data.json')

# Load the JSON data from the file
with open(file_path, 'r') as file:
    professors = json.load(file)

# Use a dictionary to track professors and their subjects
professor_dict = {}

for professor in professors:
    name = professor['name']
    subject = professor['subject']
    if name in professor_dict:
        if subject not in professor_dict[name]['subjects']:
            professor_dict[name]['subjects'].append(subject)
    else:
        professor_dict[name] = {
            'name': name,
            'subjects': [subject]
        }

# Convert the dictionary back to a list
unique_professors = list(professor_dict.values())

# Write the unique professors back to the JSON file
with open(file_path, 'w') as file:
    json.dump(unique_professors, file, indent=4)

print(f"Combined subjects for professors. Total unique professors: {len(unique_professors)}")