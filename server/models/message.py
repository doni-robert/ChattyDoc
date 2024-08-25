#!/usr/bin/env python3
"""Chat Module"""

from datetime import datetime
from mongoengine import DateTimeField, StringField, ListField, ReferenceField, Document, EmbeddedDocumentField
from .user import User


class Message(Document):
    """
    The Class embedded document
    """
    sender = ReferenceField(User, required=True)
    recipient = ReferenceField(User, required=True)
    text = StringField(required=True)
    timestamp = DateTimeField(default=datetime.now())

    def to_dict(self):
        return {
            "sender": self.sender.username,
            "recipient": self.recipient.username,
            "text": self.text,
            "timestamp": self.timestamp.isoformat()
        }
    
    def create_message(sender, recipient, text):
        new_message = Message(sender=sender, recipient=recipient, text=text,)
        new_message.save()

        return new_message 