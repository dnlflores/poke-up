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
        username='Link', email='link@pokeup.com', password='password', description="Where I come from, Pokémon are not a think... interested to see what they are capable of.", profile_pic_url="https://pokeup.s3.us-west-1.amazonaws.com/users/users/link.jpeg")
    arceus = User(
        username='Arceus', email='arceus@pokeup.com', password='password', description="I created all of the Pokémon, now I want them back.", profile_pic_url="https://pokeup.s3.us-west-1.amazonaws.com/users/users/Pokemon_Legends_Arceus_screenshot_17.jpeg")
    darkrai = User(
        username='Darkrai', email='darkrai@pokeup.com', password='password', description="Usually up at night, so I find a lot of neat items. Maybe some will find them useful", profile_pic_url="https://pokeup.s3.us-west-1.amazonaws.com/users/users/pokemon-go-darkrai.jpeg")
    sonic = User(
        username='Sonic', email='sonic@pokeup.com', password='password', description="Wow! Look at all the neat stuff on here! Can't wait to meet them all and go on some fun!", profile_pic_url="https://pokeup.s3.us-west-1.amazonaws.com/users/users/sonic_30th.jpeg")
    

    db.session.add(demo)
    db.session.add(pikachu)
    db.session.add(java)
    db.session.add(ash)
    db.session.add(link)
    db.session.add(arceus)
    db.session.add(darkrai)
    db.session.add(sonic)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
