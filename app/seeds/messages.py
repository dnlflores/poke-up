from app.models import db, Message, Chat

def seed_messages():
    demo_message1 = Message(chat_id=1, user_id=1, content="Hello!")
    demo_message2 = Message(chat_id=2, user_id=1, content="Hello!")

    pikachu_message1 = Message(chat_id=1, user_id=2, content="Hi!")

    java_message1 = Message(chat_id=2, user_id=3, content="Hi!")

    chat1 = Chat.query.get(1)
    chat2 = Chat.query.get(2)

    chat1.messages.append(demo_message1)
    chat1.messages.append(pikachu_message1)

    chat2.messages.append(demo_message2)
    chat2.messages.append(java_message1)

    db.session.add(demo_message1)
    db.session.add(demo_message2)
    db.session.add(pikachu_message1)
    db.session.add(java_message1)

    db.session.commit()

# Uses a raw SQL query to TRUNCATE the posts table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_messages():
    db.session.execute('TRUNCATE messages RESTART IDENTITY CASCADE;')
    db.session.commit()