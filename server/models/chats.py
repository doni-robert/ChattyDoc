#!/usr/bin/env python3
"""Chat Module"""

from datetime import datetime
from mongoengine import Document, StringField, ListField, ReferenceField, EmbeddedDocumentField, DateTimeField
from user import User


class Message(Document):
    """
    Messages Document
    """
    to = ReferenceField(User)
    from_user = ReferenceField(User, db_field="from")
    type = StringField(choices=["Text", "Media", "Document", "Link"])
    created_at = DateTimeField(default=datetime.utcnow)
    text = StringField()
    file = StringField()

class Chat(Document):
    """
    The Chat document
    """
    participants = ListField(ReferenceField(User), required=True)
    messages = ListField(EmbeddedDocumentField(Message), default=[])
