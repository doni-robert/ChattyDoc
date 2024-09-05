#!/usr/bin/env python3
""" socket connection """

from app import app
from flask import request
from flask_cors import CORS
from flask_socketio import SocketIO, emit
from models.message import Message
from models.user import User

socketio = SocketIO(app, cors_allowed_origins="http://localhost:3000")
CORS(app)

global onlineUsers
online_users = {}


def get_key(d, value):
    """ returns the key of a value in a dictionary """
    for k, v in d.items():
        if v == value:
            return k


@socketio.on('connect')
def connect():
    """ handles a user connecting to the socket """
    user_id = request.args.get('user_id')  # Extract user ID from query parameters or auth token
    print(user_id)
    print('connected', request.sid)
    online_users[user_id] = request.sid  # Store the socket ID associated with the user


@socketio.on('disconnect')
def disconnect():
    """ handles a user disconnecting from the socket """
    user_id = request.args.get('user_id')
    if user_id in online_users:
        del online_users[user_id]
    print('Client disconnected:', request.sid)


# @socketio.on('sendMessage')
# def sendMessage(data):
#     """ handles a user sending a message """
#     sender_id = data['sender_id']
#     receiver_id = data['receiver_id']
#     message = data['message']

#     send_user_socket = onlineUsers.get(receiver_id)
#     if send_user_socket:
#         socketio.emit('receiveMessage', {
#             'sender_id': sender_id,
#             'receiver_id': receiver_id,
#             'message': message
#         }, room=send_user_socket)
        
@socketio.on('send_message')
def send_message(data):
    print('sending message')

    sender = data.get('sender')
    if sender:
        sender_firstname = sender.get('firstname')
        sender_lastname = sender.get('lastname') 
    sender_obj = User.get_user_by_kwargs(firstname=sender_firstname, lastname=sender_lastname)
    recipient = data.get('recipient', {})
    recipient_firstname = recipient.get('firstname')
    recipient_lastname = recipient.get('lastname')

    if not recipient_firstname or not recipient_lastname:
        emit('message_error', {'error': 'Recipient and message text are required'})
        return
    recipient_obj = User.get_user_by_kwargs(firstname=recipient_firstname, lastname=recipient_lastname)
    message_text = data.get('text')

    if not recipient or not message_text:
        emit('message_error', {'error': 'Recipient and message text are required'})
        return
    
    new_message = Message.create_message(sender=sender_obj, recipient=recipient_obj, text=message_text)

    print('It has saved')
    if recipient_obj.email in online_users:
        print(online_users)
        recipient_sid = online_users[recipient_obj.email]
        # Emit the message to the recipient's socket ID
        print(recipient_obj.email, recipient_sid)
        print(new_message.to_dict())
        emit('message_received', new_message.to_dict(), room=recipient_sid)

    # Emit the new message to the recipient and sender
    # emit('message_received', new_message.to_dict())
    # emit('message_received', new_message.to_dict())


# @socketio.on('joinRoom')
# def joinRoom(data):
#     """ handles a user joining a room """
#     user_id = data['user_id']
#     room_id = data['room_id']
#     onlineUsers[user_id] = request.sid
#     socketio.emit('userJoinedRoom', {
#         'user_id': user_id,
#         'room_id': room_id
#     }, room=request.sid)


# @socketio.on('leaveRoom')
# def leaveRoom(data):
#     """ handles a user leaving a room """
#     user_id = data['user_id']
#     room_id = data['room_id']
#     socketio.emit('userLeftRoom', {
#         'user_id': user_id,
#         'room_id': room_id
#     }, room=request.sid)


# @socketio.on('addUser')
# def addUser(user_id):
#     """ handles a user joining a room """
#     onlineUsers[user_id] = request.sid
#     emit('userAdded', user_id, broadcast=True)


# @socketio.on('removeUser')
# def removeUser(user_id):
#     """ handles a user leaving a room """
#     del onlineUsers[user_id]
#     emit('userRemoved', user_id, broadcast=True)


if __name__ == '__main__':
    socketio.run(app, host='0.0.0.0', port=8080, debug=True)
