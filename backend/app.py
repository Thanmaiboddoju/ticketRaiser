from flask import Flask,jsonify,request
import json
from flask_pymongo import PyMongo
from flask_cors import CORS
from bson.objectid import ObjectId

app= Flask(__name__)
CORS(app)
app.config["MONGO_URI"] = "mongodb://localhost:27017/ticket_raiser"
mongo=PyMongo(app)

users_list = [{"name":"abc","password":"wrr"},{"name":"bvf","password":"adf"}]

@app.route("/saveuser",methods=['POST'])
def sign():
    data = json.loads(request.data)
    print("Req",data)
    # print("details",request.method)
    if(request.method=="POST"):
        print(request.data)
        if(mongo.db.ticket_raiser.users.find_one({"gmail":data["gmail"]})):
            return {"message":"error","errormsg":"gmail already exists"}
        else:
            mongo.db.ticket_raiser.users.insert_one({"username":data['userName'],"password":data['password'],"gmail":data['gmail']})
            return {"message":"successful"}
    else:
        return {"message":"error"}
    
@app.route("/authuser",methods=['POST'])
def auth():
    data = json.loads(request.data)
    if(request.method == "POST"):
        print("inside method")
        if(mongo.db.ticket_raiser.users.find_one({"gmail":data["gmail"],"password":data["password"]})):
            return {"message":"successful"}
        else:
            return {"message":"error","errormsg":"wrong credentials"}
    else:
        return {"message":"error","errormsg":"wrong request method"}
    pass

@app.route("/addTicket",methods=['POST'])
def addTicket():
    data = json.loads(request.data)
    if(request.method=="POST"):
        print(request.data)
        mongo.db.ticket_raiser.tickets.insert_one({"category":data["category"],"issue":data["issue"]})
        return {"message":"successful"}
    else:
        return {"message":"error"}
    



@app.route("/getuser",methods=["GET"])
def users():
    if(request.method=="GET"):
        data = []
        cursor =(mongo.db.ticket_raiser.users.find())
        for doc in cursor:
            doc['_id'] = str(doc['_id']) # This does the trick!
            data.append(doc)
        # return jsonify(users_list)
        return jsonify(data)
    else:
        return {"message":"error"}



@app.route("/getTicket",methods=["GET"])
def tickets():
    if(request.method=="GET"):
        data = []
        cursor =(mongo.db.ticket_raiser.tickets.find())
        for doc in cursor:
            doc['_id'] = str(doc['_id']) # This does the trick!
            data.append(doc)
        # return jsonify(users_list)
        return jsonify(data)
    else:
        return {"message":"error"}


@app.route("/deleteTicket/<string:id>",methods=["DELETE"])
def deletetickets(id):
    if(request.method=="DELETE"):
        # id = (request.data)
        print(id,"______________________",request)
        cursor =(mongo.db.ticket_raiser.tickets.find_one({"_id":ObjectId(id)}))
        if(cursor):
            mongo.db.ticket_raiser.tickets.delete_one({"_id":ObjectId(id)})
            return {"message":"successful"}
        else:
            return ({"message":"error","errormsg":"no record found"})
    else:
        return {"message":"error"}

@app.route("/updateTicket",methods=["POST"])
def updatetickets():
    if(request.method=="POST"):
        data = json.loads(request.data)
        cursor =(mongo.db.ticket_raiser.tickets.find_one({"_id":ObjectId(data["id"])}))
        if(cursor):
            mongo.db.ticket_raiser.tickets.update_one({"_id":ObjectId(data["id"])},
            {
                '$set':{
                    'status':'completed'
                }
            })
            return {"message":"successful"}
        else:
            return {"message":"no record found"}
        
    else:
        return {"message":"error"}








app.run(debug=True, host='0.0.0.0',port ='5000')