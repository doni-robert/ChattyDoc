#!/usr/bin/env python3
""" User Contacts module """

from mongoengine import Document, ReferenceField, ListField
from models.user import User

class Contact(Document):
    """
    Contact model to store user contacts
    """
    user = ReferenceField(User, reverse_delete_rule=2) # cascase delete
    contacts = ListField(ReferenceField(User))

    @staticmethod
    def add_contact(user, contact):
        """ Adds a conatct to a user's conatct list """
        if user and contact:
            user_contacts = Contact.objects(user=user).first()
            if not user_contacts:
                user_contacts = Contact(user=user, contacts=[])

            if contact not in user_contacts.contacts:
                user_contacts.contacts.append(contact)
                user_contacts.save()

    @staticmethod
    def remove_contacts(user,contact):
        """ Removes a contact from a user's contact list """
        if user and contact:
            user_contacts = Contact.objects(user=user).first()
            if user_contacts and contact in user_contacts.contacts:
                user_contacts.contacts.remove(contact)
                user_contacts.save()

    @staticmethod
    def get_contacts(user):
        """ Retrieves a user's contacts """
        if user:
            user_contacts = Contact.objects(user=user).first()
            if user_contacts:
                return user_contacts.contacts

        return []

    @staticmethod
    def clear_contacts(user):
        """ Clears a user's contacts """
        if user:
            user_contacts = Contact.objects(user=user).first()
            if user_contacts:
                user_contacts.contacts = []
                user_contacts.save()
