from app.models import db, List

def seed_lists():
    
    java_list1 = List(
        name="First Adventure", user_id=3 ,image_url="https://upload.wikimedia.org/wikipedia/commons/1/1c/U.S._30_in_Center_Township.jpg"
    )

    java_list2 = List(
        name="Catch Em All", user_id=3, image_url="https://i.ebayimg.com/images/g/doMAAOSwqTlg~5-v/s-l400.jpg"
    )

    pikachu_list1 = List(
        name="Fits for the Summer", user_id=2, image_url="https://oyster.ignimgs.com/mediawiki/apis.ign.com/pokemon-omega-ruby-and-alpha-sapphire/c/c5/Pikachu_dress_up2.JPG"
    )

    pikachu_list2 = List(
        name="BOMB Berries", user_id=2, image_url="https://bgr.com/wp-content/uploads/2017/02/pokemon-go-berries.jpg"
    )

    db.session.add(java_list1)
    db.session.add(java_list2)
    db.session.add(pikachu_list1)
    db.session.add(pikachu_list2)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the lists table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_lists():
    db.session.execute('TRUNCATE lists RESTART IDENTITY CASCADE;')
    db.session.commit()