#!/usr/bin/env python3
""" socket connection """

from app import app
from flask import request
from flask_cors import CORS
from flask_socketio import SocketIO, emit
from models.user import User

CORS(app, resources={r"/*": {"origins": "*"}})
socketio = SocketIO(app, cors_allowed_origins="*")

socketio.on("connect")
def handle_connect():
    """ handle user connection """
    user_id = request.sid
    if user_id is not None and user_id:
        try:
            user = User.objects.get(id=user_id).first()
            if user:
                user.status = "online"
                user.save()
        except Exception as e:
            print(e)

socketio.on("disconnect")
def handle_disconnect():
    """ handle user disconnection """
    user_id = request.sid
    if user_id is not None and user_id:
        try:
            user = User.objects.get(id=user_id).first()
            if user:
                user.status = "offline"
                user.save()
        except Exception as e:
            print(e)



if __name__ == '__main__':
    socketio.run(app, host='0.0.0.0', debug=True)
