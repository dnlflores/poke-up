from app.models import db, Post, List

def seed_posts():
    demo_post1 = Post (
        title="Potion", user_id=1, category_id=1, image_url="https://i.etsystatic.com/7911747/r/il/65cf1f/1444728766/il_570xN.1444728766_h5ba.jpg", description="Just made some potions! Great for healing your Pokémon on the go!", price=20, quantity=10
    )

    demo_post2 = Post (
        title="Bulbasaur", user_id=1, category_id=2, image_url="https://www.hollywoodreporter.com/wp-content/uploads/2019/05/detective_pikachu-bulbasaur-publicity-h_2019.jpg", description="Great for helping around the garden, and an amazing friend.", price=10000, quantity=1
    )

    pikachu_post1 = Post (
        title="Team Rocket Shirt", user_id=2, category_id=3, image_url="https://www.serebii.net/letsgopikachueevee/pikachucustom.jpg", description="This is an old shirt I found lying around. I wore it once practically brand new. Don't wear anymore due to difference between me and the Team.", price=50, quantity=1
    )

    pikachu_post2 = Post (
        title="Thunderbolt", user_id=2, category_id=4, image_url="https://www.imore.com/sites/imore.com/files/styles/large/public/field/image/2017/06/pokemon-go-technical-machines.jpg?itok=Vu6zBF7x", description="TM that was given to me by a friend but I already know the move. Willing to negotiate price!", price=500, quantity=2
    )

    java_post1 = Post (
        title="Ultra Ball", user_id=3, category_id=5, image_url="https://images-na.ssl-images-amazon.com/images/I/31nGXOyv7NL.jpg", description="Found lying around the house. I think my owner brother left it here but he never asked for it.", price=350, quantity=1
    )

    java_post2 = Post (
        title="Silver Pinap Berry", user_id=3, category_id=6, image_url="https://i1.wp.com/unrealitymag.com/wp-content/uploads/2019/12/Silver-Pinap-Berry.jpg", description="Bought these but didn't like them myself. I heard they help with feeling better!", price=150, quantity=5
    )

    db.session.add(demo_post1)
    db.session.add(demo_post2)
    db.session.add(pikachu_post1)
    db.session.add(pikachu_post2)
    db.session.add(java_post1)
    db.session.add(java_post2)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the posts table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_posts():
    db.session.execute('TRUNCATE posts RESTART IDENTITY CASCADE;')
    db.session.commit()