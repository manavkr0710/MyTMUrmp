from flask import Flask, send_from_directory
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import os

app = Flask(__name__, static_folder='../frontend/dist', static_url_path='')
# Configure CORS to allow requests from all origins and methods, particularly POST
CORS(app, resources={r"/*": {"origins": "*", "methods": ["GET", "POST", "OPTIONS"]}})

# Use PostgreSQL in production, SQLite in development
if 'DATABASE_URL' in os.environ:
    app.config['SQLALCHEMY_DATABASE_URI'] = os.environ['DATABASE_URL'].replace("postgres://", "postgresql://")
else:
    app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///reviews.db"

app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db = SQLAlchemy(app) #creating db

@app.route('/')
def index():
    return send_from_directory(app.static_folder, 'index.html')

@app.route('/<path:path>')
def serve_static(path):
    return send_from_directory(app.static_folder, path)

# Create tables first
with app.app_context():
    db.create_all()

# Import routes AFTER db is initialized to avoid circular imports
# This order is critical for Flask route registration
import routes

if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0')