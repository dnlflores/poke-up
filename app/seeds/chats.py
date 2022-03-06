from app.models import db, Chat, Post

def seed_chats():
    demo_chat1 = Chat(buyer_id=2, post_id=1)
    demo_chat2 = Chat(buyer_id=3, post_id=1)
    demo_chat3 = Chat(buyer_id=4, post_id=2)
    demo_chat4 = Chat(buyer_id=5, post_id=2)

    pikachu_chat1 = Chat(buyer_id=4, post_id=10)
    pikachu_chat2 = Chat(buyer_id=6, post_id=12)

    java_chat1 = Chat(buyer_id=1, post_id=21)
    java_chat2 = Chat(buyer_id=5, post_id=24)

    demo_potion = Post.query.get(1)
    demo_bulb = Post.query.get(2)

    pikachu_shirt = Post.query.get(10)
    pikachu_hat = Post.query.get(12)

    java_ribbon = Post.query.get(21)
    java_celebi = Post.query.get(24)

    demo_potion.chats.append(demo_chat1)
    demo_potion.chats.append(demo_chat2)
    demo_bulb.chats.append(demo_chat4)
    demo_bulb.chats.append(demo_chat3)

    pikachu_shirt.chats.append(pikachu_chat1)
    pikachu_hat.chats.append(pikachu_chat2)

    java_ribbon.chats.append(java_chat1)
    java_celebi.chats.append(java_chat2)

    db.session.add(demo_chat1)
    db.session.add(demo_chat2)
    db.session.add(demo_chat3)
    db.session.add(demo_chat4)
    db.session.add(pikachu_chat1)
    db.session.add(pikachu_chat2)
    db.session.add(java_chat1)
    db.session.add(java_chat2)

    db.session.commit()

# Uses a raw SQL query to TRUNCATE the posts table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_chats():
    db.session.execute('TRUNCATE chats RESTART IDENTITY CASCADE;')
    db.session.commit()