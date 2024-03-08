#!/usr/bin/env python3
""" Routes for chats """

from flask import Blueprint, request, jsonify, make_response
from flask_jwt_extended import jwt_required, get_jwt_identity, get_jwt
from functools import wraps
from models.chat_message import ChatMessage
from models.chat_room import ChatRoom
from models.user import User
from models.revoked_token import RevokedToken


chats_bp = Blueprint('chats_routes', __name__, url_prefix='/chats')

# user must be logged in to access chats
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

@chats_bp.route('/ChatRoom', methods=['POST'])
@logged_in
def create_room(current_user):
    """ Creates a new chat room """
    data = request.get_json()

    room_name = data.get('room_name')
    if not room_name:
        return make_response(
            jsonify({"message": "Missing room name"}),
            400)

    if ChatRoom.get_room_by_name(room_name):
        return make_response(
            jsonify({"message": "Room already exists"}),
            400)

    new_room = ChatRoom.create_room(room_name, current_user)
    return make_response(
        jsonify({"message": f"Room {room_name} created successfully"}),
        201)

@chats_bp.route('/ChatRoom/<chatroom_id>/message', methods=['POST'])
@logged_in
def send_message(current_user):
    """ Sends a message to a chat room """
    data = request.get_json()

    message = data.get('message')
    room_name = data.get('room_name')
    receiver_name = data.get('receiver_name')

    if not message or not room_name or not receiver_name:
        return make_response(
            jsonify(
                {"message": "Missing message, room name or receiver name"}),
            400)

    room = ChatRoom.get_room_by_name(room_name)
    if not room:
        return make_response(
            jsonify({"message": "Room not found"}),
            404)

    receiver = ChatRoom.get_user_by_name(receiver_name)
    if not receiver:
        return make_response(
            jsonify({"message": "Receiver not found"}),
            404)

    new_message = ChatMessage.create_message(message,
                                             current_user,
                                             receiver, room)
    return make_response(
        jsonify({"message": "Message sent successfuly"}),
        201)


@chats_bp.route('/ChatRoom/<chatroom_id>/getMessages', methods=['GET'])
@logged_in
def get_messages(current_user, chat_room_name):
    """ Gets all messages from a chat room """
    # check if chatroom exists and the user is part of it
    room = ChatRoom.get_room_by_name(chat_room_name)
    if room is None:
        return make_response(
            jsonify({"message": "Room not found "}),
            404)


    if User.get_user_by_email(current_user) not in room.users:
        return make_response(
            jsonify({"message": "user not in room"}),
            404)

    # get all messages from the chat room
    messages = ChatMessage.get_messages_by_room(chat_room_name)

    # send the messages back
    return jsonify(
        {"messages": [message.to_dict() for message in messages]}), 200
