#routes

from app import app, db
from flask import request, jsonify
from models import Review

#get all reviews
@app.route("/api/reviews", methods=["GET"])
def get_review():
    reviews = Review.query.all() #query.all gets all entries in db
    result = [review.to_json() for review in reviews] #for each review in reviews array
    return jsonify(result) #spit out all reviews in json data back to server


#create review 
@app.route("/api/review", methods=["POST"])

def create_review():
    try:
        data = request.json #req data in json form

        requried_fields= ["name", "subject", "code", "description"]

        for field in requried_fields:
            if field not in data:
                return jsonify({"error":f"Missing required field: {field}"}), 400
            
        name = data.get("name")
        subject = data.get("subject")
        code = data.get("code")
        description = data.get("description")

        

       

        #creating review
        new_review = Review(name=name,
                            subject=subject,
                            code=code,
                            description=description,
        )
        
        db.session.add(new_review) #adding review to db
        db.session.commit() #committing changes

        return jsonify({"msg":"Review created successfully"}), 201
    except Exception as e:

        db.session.rollback() #if error occurs, roll back to prev session of db
        return jsonify({"error":str(e)}),500
    


    #delete a review (if i want to add option to delete a review)

@app.route("/api/reviews/<int:id>", methods={"DELETE"}) #passing in id number of review to delete

def delete_reviews(id):

    try:
        review = Review.query.get(id)  # getting review based off id

        # if review is null, review not in db
        if review is None:
            return jsonify({"error": "Review not found"}), 404

        db.session.delete(review)
        db.session.commit()
        return jsonify({"msg": "Review deleted"}), 200

    except Exception as e:
        db.session.rollback()  # rollback to prev session as something unexpected happened
        return jsonify({"error": str(e)}), 500
