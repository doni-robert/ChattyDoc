#!/usr/bin/env python3
"""Database Initialization"""
from mongoengine import connect, disconnect
import os

def init_mongodb(app):
    """
    Initialize the MongoDB connection
    """
    try:
        # Disconnect default connection
        disconnect(alias="default")

        # Get the MongoDB URI from environment variables (set in Render)
        db_uri = os.getenv("MONGO_URI")

        if not db_uri:
            raise ValueError("MONGO_URI is not set. Please add it to your environment variables.")

        # Connect using MongoDB Atlas URI
        connect(host=db_uri, uuidRepresentation='standard')
        print("Successfully connected to MongoDB Atlas")

    except Exception as e:
        print(f"Database connection failed: {e}")
        raise e
