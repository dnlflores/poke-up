from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', email='demo@pokeup.com', password='password', description='I am the demo account. Simple.', profile_pic_url="https://pokeup.s3.us-west-1.amazonaws.com/aa+logo.png")
    pikachu = User(
        username='Pikachu', email='pikachu@pokeup.com', password='password', description="I know I'm a Pokémon, but I'm not selling other Pokémon! I only buy berries and sell my old clothes!", profile_pic_url="https://pokeup.s3.us-west-1.amazonaws.com/pikachu-magnify-glass.jpg")
    java = User(
        username='Java', email='java@pokeup.com', password='password', description="I'm trying to buy some cool partners... they all kind of got the life I do, and some of the clothes on here looks like I'd rock the style...", profile_pic_url="https://pokeup.s3.us-west-1.amazonaws.com/IMG_1413.JPG")
    ash = User(
        username='Ash', email='ash@pokeup.com', password='password', description="The one and only! Pikachu is on here which is interesting... I think he's selling my stuff.", profile_pic_url="https://pokeup.s3.us-west-1.amazonaws.com/users/users/1630428974688-ash-ketchum-smiling-1165117-1280x0.webp")
    link = User(
        username='Link', email='link@pokeup.com', password='password', description="I know I'm a Pokémon, but I'm not selling other Pokémon! I only buy berries and sell my old clothes!", profile_pic_url="https://pokeup.s3.us-west-1.amazonaws.com/pikachu-magnify-glass.jpg")
    arceus = User(
        username='Arceus', email='arceus@pokeup.com', password='password', description="I'm trying to buy some cool partners... they all kind of got the life I do, and some of the clothes on here looks like I'd rock the style...", profile_pic_url="https://pokeup.s3.us-west-1.amazonaws.com/IMG_1413.JPG")
    

    db.session.add(demo)
    db.session.add(pikachu)
    db.session.add(java)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
