#!/usr/bin/python3
""" Socket connection """

from app import app
from flask_cors import CORS
from flask_socketio import SocketIO, emit, join_room, leave_room

CORS(app, resources={r"/*": {"origins": "*"}})
socket = SocketIO(app, cors_allowed_origins="http://localhost:3000")


@socket.on('connect')
def on_connect():
    print('user connected')
    retrieve_active_users()


def retrieve_active_users():
    emit('retrieve_active_users', broadcast=True)


@socket.on('activate_user')
def on_active_user(data):
    user = data.get('username')
    emit('user_activated', {'user': user}, broadcast=True)


@socket.on('deactivate_user')
def on_inactive_user(data):
    user = data.get('username')
    emit('user_deactivated', {'user': user}, broadcast=True)


@socket.on('join_room')
def on_join(data):
    room = data['room']
    join_room(room)
    emit('open_room', {'room': room}, broadcast=True)

@socket.on('leave_room')
def on_leave_room(data):
    username = data['username']
    room = data['room']
    leave_room(room)
    emit({'username': username}, {'room': room}, broadcast=True)

@socket.on('send_message')
def on_chat_sent(data):
    room = data['room']
    emit('message_sent', data, room=room)
