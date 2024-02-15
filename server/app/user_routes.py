#!/usr/bin/env python3
""" Routes for user related request """

from flask import Blueprint, request, jsonify, make_response
from flask_jwt_extended import jwt_required, get_jwt_identity, get_jwt
from functools import wraps
from datetime import datetime
from models.chat_message import ChatMessage
from models.chat_room import ChatRoom
from models.user import User
from models.revoked_token import RevokedToken

user_bp = Blueprint('user_routes', __name__, url_prefix='/user')

# user must be logged in to access chatrooms
def logged_in(func):
    """
    Decorator function that checks if a user is logged in.
    
    Parameters:
    - func: The function to be decorated.
    
    Returns:
    - wrapper: The decorated function.
    """
    @wraps(func)
    @jwt_required()
    def wrapper(*args, **kwargs):
        current_user = get_jwt_identity()

         # Check if the token JTI is in the revoked tokens
        jti = get_jwt()['jti']
        print(jti)
        if RevokedToken.is_token_blacklisted(jti):
            return jsonify({"error": "Token has been revoked. User is logged out"}), 401
        
        return func(current_user, *args, **kwargs)
    
    return wrapper


@user_bp.route('/get_name', methods=['GET'])
@logged_in
def get_name(current_user):
    """ Gets the name of the current user """
    username = User.objects(email=current_user).first().username
    return make_response(
        jsonify({"username": username}),
        201)
