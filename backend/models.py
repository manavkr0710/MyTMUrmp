#database
from app import db

#fields for review object
class Review(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    subject = db.Column(db.String(100), nullable=False)
    code = db.Column(db.String(10), nullable=False)
    description = db.Column(db.Text, nullable=False)
    
   

    #when returning back response, have to return it back to client, return it with json data
    def to_json(self):
        return {
            "id":self.id,
            "name":self.name,
            "subject":self.subject,
            "code":self.code,
            "description":self.description,
        }
