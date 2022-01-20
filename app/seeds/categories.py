from app.models import db, Category


# Adds a demo user, you can add other users here if you want
def seed_categories():
    cat_1 = Category(
        id=1, name="Potions"
    )

    cat_2 = Category(
        id=2, name="Pokémon"
    )

    cat_3 = Category(
        id=3, name="Clothing"
    )

    cat_4 = Category(
        id=4, name="Technical Machines"
    )

    cat_5 = Category(
        id=5, name="Pokéballs"
    )

    cat_6 = Category(
        id=6, name="Berries"
    )

    db.session.add(cat_1)
    db.session.add(cat_2)
    db.session.add(cat_3)
    db.session.add(cat_4)
    db.session.add(cat_5)
    db.session.add(cat_6)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the categories table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_categories():
    db.session.execute('TRUNCATE categories RESTART IDENTITY CASCADE;')
    db.session.commit()