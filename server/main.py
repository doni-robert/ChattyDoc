#!/usr/bin/env python3
""" Main app module """

from app import app
from conn import socket


if __name__ == "__main__":
    socket.run(app, host='0.0.0.0', port=5000, debug=True)
