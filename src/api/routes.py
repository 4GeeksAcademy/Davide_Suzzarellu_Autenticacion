"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200


# Create a route to authenticate your users and return JWTs. The create_access_token() function is used to actually generate the JWT.
@api.route("/login", methods=["POST"])
def login():
    response_body = {}
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    # Reemplazar con la logica consultando la base de datos
    # Consulta en el model User si hay un user con email y password iguales a los que recibimos en el request, y nos devuleve el primero encontrado
    user = db.session.query(User).filter_by(email=email, password=password, is_active=True).first()
    if not user:
        response_body["msg"] = "Bad username or password"
        return response_body, 401
    access_token = create_access_token(identity={"user id": user.id, "email" : user.email})
    response_body["access"] = access_token
    response_body["msg"] = "Usuario logeado con exito"
    response_body["result"] = user.serialize()
    return response_body, 200


# Protect a route with jwt_required, which will kick out requests without a valid JWT present.
@api.route("/protected", methods=["GET"])
@jwt_required()
def protected():
    response_body = {}
    # Access the identity of the current user with get_jwt_identity
    current_user = get_jwt_identity()
    response_body["user"] = current_user
    return response_body, 200


@api.route("/signup", methods=["POST"])
def sign_up():
    response_body = {}
    data = request.json
    user = db.session.query(User).filter_by(
        email=data["email"],
        password=data["password"], 
        is_active=True).first()
    if user:
        response_body["msg"] = "Users already exist"
        return response_body, 401
    else:
        new_user = User(first_name=data["first_name"], last_name=data["last_name"], username=data["username"], email = data["email"], password = data["password"], is_active=True)
        db.session.add(new_user)
        db.session.commit()
        response_body["msg"] = "User create"
        response_body["user"] = new_user.serialize()
        return response_body, 200



