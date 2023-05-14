from dotenv import load_dotenv, dotenv_values
import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
import bcrypt
import datetime

import calculations


# get mongodb url from the env file
dotenv_path = os.path.join(os.path.dirname(__file__), 'bob.env')
load_dotenv(dotenv_path)

mongodb_uri = os.getenv("MONGODB_URI")
mongodb_name = os.getenv("DB_NAME")  # Retrieve the database name from the environment variables

# Test the server
client = MongoClient(mongodb_uri)

# Access the specific database
db = client[mongodb_name]

# Send a ping to confirm a successful connection
try:
    db.command('ping')
    print("Pinged your deployment. You successfully connected to MongoDB!")
except Exception as e:
    print(e)

# create flask app
app = Flask(__name__)
CORS(app)

app.secret_key = "testing"
client = MongoClient(mongodb_uri)
db = client.get_database(mongodb_name)
records = db.register

# login function 
@app.route('/users/login', methods = ['GET', 'POST'])
def login():
    users = db.users
    username = request.json["username"]
    password = request.json["password"].encode("utf-8")
    dateTime = datetime.date.today()
    dateTime = dateTime.strftime('%m/%d/%Y')

    user = users.find_one({"username": username})
    if user:
        hashed_password = user["password"]
        if bcrypt.checkpw(password, hashed_password):
            response = {"success": True, "message": "Login successful!"}
            filter = {"username" : user["username"]}
            #print(user["username"])
            update = {"$set" : {"datetime" : dateTime}}
            result = users.update_one(filter, update)
            if result.modified_count > 0: 
                print('Update success!!')
            else: 
                print("Update failure")
            
        else:
            response = {"success": False, "message": "Invalid username or password."}
    else:
        response = {"success": False, "message": "Invalid username or password."}

    return jsonify(response)


# signup function
@app.route('/users/signup', methods = ['GET', 'POST'])
def signup(): 
    users = db.users
    username = request.form["username"]
    password = request.form["password"].encode("utf-8")
    dateTime = datetime.date.today()
    dateTime = dateTime.strftime('%m/%d/%Y')

    existing_user = users.find_one({"username": username})
    if existing_user:
        response = {"success": False, "message": "That username already exists."}
    else:
        hashed_password = bcrypt.hashpw(password, bcrypt.gensalt())
        users.insert_one({"username": username, "password": hashed_password, "datetime": dateTime, 'gasexact': None,  'dieselexact': None, 'calories': None, 'meat': None, 'dairy': None, 'fruit_veggies': None, 'grain': None})
        response = {"success": True, "message": "User created successfully."}

    return jsonify(response)

# function for the exact gas value option
@app.route('/users/gasexact', methods = ['GET', 'POST'])
def gasExact():
    users = db.users
    username = request.form["username"]
    gasexact = request.form["gas"]
    print(gasexact)
    print(username)

    filter = {"username" : username}
    update = {"$set" : {"gasexact" : gasexact}}
    result = users.update_one(filter, update)

    response = {"success": True, "message": "success"}
    return jsonify(response)


# function for the disel value option
@app.route('/users/dieselexact', methods = ['GET', 'POST'])
def dieselExact(): 
    users = db.users
    username = request.form["username"]
    dieselexact = request.form["diesel"]
    print(dieselexact)
    print(username)

    filter = {"username" : username}
    update = {"$set" : {"dieselexact" : dieselexact}}
    result = users.update_one(filter, update)

    response = {"success": True, "message": "success"}
    return jsonify(response)


@app.route('/users/foodcalc', methods = ['GET', 'POST'])
def foodcalc():
    users = db.users
    username = request.form["username"]
    calories = request.form["calories"]
    meat = request.form["meat"]
    dairy = request.form["dairy"]
    fruits_veggies = request.form["fruits_veggies"]
    grain = request.form["grain"]

    filter = {"username" : username}

    update = {"$set" : {"calories" : calories}}
    result = users.update_one(filter, update)

    update = {"$set" : {"meat" : meat}}
    result = users.update_one(filter, update)

    update = {"$set" : {"dairy" : dairy}}
    result = users.update_one(filter, update)

    update = {"$set" : {"fruits_veggies" : fruits_veggies}}
    result = users.update_one(filter, update)

    update = {"$set" : {"grain" : grain}}
    result = users.update_one(filter, update)


    response = {"success": True, "message": "success."}
    return jsonify(response)


@app.route('/data')
def send_ovr():
    users = db.users
    avgG = 18
    avgD = 14.75875
    avgF = 4.3 * 3112
    baseline = calculations.gallOfDies(avgD) + calculations.gallOfGas(avgG) + avgF  # 323591.67499999993 starts at 33 percent
    ovr = {}
    counter = 0
    numbe = 0 
    perc  = 0 
    perci = 0 
    numbes = 0
    for user in users.find(): 
        numbe = 0
        perc = 33
        filter = {"username": user["username"]}
        dealwithF = True
        dealwithG = True
        dealwithD = True

        if user["calories"] == None or user["meat"] == None or user["dairy"] == None or user["fruits_veggies"] == None or user["grain"] == None:
            dealwithF = False
        if user["dieselexact"] == None: 
            dealwithD = False
        if user["gasexact"] == None:
            dealwithG = False

        if dealwithF:
            numbe += calculations.food(float(user['calories']), float(user['meat']), float(user['dairy']), float(user['fruits_veggies']), float(user['grain']))
        else: 
            numbe += avgF
        
        if dealwithD: 
            numbe += calculations.gallOfDies(float(user['dieselexact']))
        else: 
            numbe += calculations.gallOfDies(float(avgD))
        
        if dealwithG: 
            numbe += calculations.gallOfGas(float(user['gasexact']))
        else: 
            numbe += calculations.gallOfGas(float(avgG))

        
        print(numbe > baseline)
        if numbe > baseline: 
            perc += (.001*(numbe-baseline)) 
        elif numbe < baseline: 
            perc -= (.001 *((numbe-baseline)))
        else: 
            perc = baseline


        if perc < 0: 
            perc = 0 
        if perc > 100: 
            perc = 100
        
        print(user['calories'])
        print(user['dieselexact'])
        print(dealwithF)
        print(numbe)
        print(perc)
        counter += 1
        perci += perc
        numbes += numbe
    print(counter)
    ovr = {'bar': round(perci/counter), 'emiss': numbes/counter}
    print(ovr)
    return jsonify(ovr)



@app.route('/users/data', methods = ['GET', 'POST'])
def send_ind():
    users = db.users
    username = request.form["username"]
    avgG = 18
    avgD = 14.75875
    avgF = 4.3 * 3112
    baseline = calculations.gallOfDies(avgD) + calculations.gallOfGas(avgG) + avgF  # 323591.67499999993 starts at 33 percent
    ovr = {}
    numbe = 0
    perc = 33
    filter = {"username": username}
    #user = users.find(filter)
    for user in users.find(filter):
        dealwithF = True
        dealwithG = True
        dealwithD = True

        if user["calories"] == None or user["meat"] == None or user["dairy"] == None or user["fruits_veggies"] == None or user["grain"] == None:
            dealwithF = False
        if user["dieselexact"] == None: 
            dealwithD = False
        if user["gasexact"] == None:
            dealwithG = False

        if dealwithF:
            numbe += calculations.food(float(user['calories']), float(user['meat']), float(user['dairy']), float(user['fruits_veggies']), float(user['grain']))
        else: 
            numbe += avgF
            
        if dealwithD: 
            numbe += calculations.gallOfDies(float(user['dieselexact']))
        else: 
            numbe += calculations.gallOfDies(float(avgD))
            
        if dealwithG: 
            numbe += calculations.gallOfGas(float(user['gasexact']))
        else: 
            numbe += calculations.gallOfGas(float(avgG))

            
        print(numbe > baseline)
        if numbe > baseline: 
            perc += (.001*(numbe-baseline)) 
        elif numbe < baseline: 
            perc -= (.001 *((numbe-baseline)))
        else: 
            perc = baseline


        if perc < 0: 
            perc = 0 
        if perc > 100: 
            perc = 100
    ovr = {'barme': round(perc), 'emissme': numbe}
    print(perc)
    return jsonify(ovr)
    

        
        


'''
@app.before_request
def dec_calc_ovr_bef():
    pass

@app.before_request
def dec_calc_ind_bef(): 
    pass


@app.after_request
def dec_calc_ovr_bef():
    pass

@app.after_request
def dec_calc_ind_bef(): 
    pass

'''

# get the username of the current user 
'''
@app.route('/users/getuname', methods = ['GET', 'POST']) 
def getUname():
    username = request.data.decode('utf-8')
    print(username)
    return username
'''

if __name__ == '__main__':
    app.run(debug=True)