from app.models import db, Post

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
    
    ash_post1 = Post (
        title="Sitrus Berry", user_id=4, category_id=6, image_url="https://pokeup.s3.us-west-1.amazonaws.com/berries/berries/00-featured-sitrus-berry-pokemon-anime.jpeg", description="My Pokémon found this the other day but she doesn't like them so I'm sure someone else can find a use for it!", price=200, quantity=1
    )

    ash_post2 = Post (
        title="Pink Mago Berry", user_id=4, category_id=6, image_url="https://pokeup.s3.us-west-1.amazonaws.com/berries/berries/280-2808205_stocked-by-dj-bluehkitteh-pokemon-mago-berry.png", description="This is a Mago Berry. I don't know what this does.", price=185, quantity=3
    )

    link_post1 = Post (
        title="Chocolate Nanab!!", user_id=5, category_id=6, image_url="https://pokeup.s3.us-west-1.amazonaws.com/berries/berries/choco-nanab.jpeg", description="Custom made!! These are my specialty! Guaranteed to love em.", price=250, quantity=10
    )

    link_post2 = Post (
        title="Orange Mago Berry", user_id=5, category_id=6, image_url="https://pokeup.s3.us-west-1.amazonaws.com/berries/berries/daniela-friedrich-mago-berry.jpeg", description="Home Grown come and get em.", price=225, quantity=5
    )

    arceus_post1 = Post (
        title="Golden Razz Berry", user_id=6, category_id=6, image_url="https://pokeup.s3.us-west-1.amazonaws.com/berries/berries/dde83-16183324134833.jpeg", description="Super rare. These taste phenomonal. Only have a few left!", price=1000, quantity=4
    )

    arceus_post2 = Post (
        title="Pinap Berry!", user_id=6, category_id=6, image_url="https://pokeup.s3.us-west-1.amazonaws.com/berries/berries/how-to-get-pinap-berries.jpeg", description="Picked up a few of these on my last adventure", price=200, quantity=15
    )

    darkrai_post1 = Post (
        title="Oran and Rawst Berries", user_id=7, category_id=6, image_url="https://pokeup.s3.us-west-1.amazonaws.com/berries/berries/Pokemon-Berries-600x600.jpeg", description="When Pokémon fall asleep, I take these from them and sell them now to you.", price=250, quantity=8
    )

    darkrai_post2 = Post (
        title="Razz Berry", user_id=7, category_id=6, image_url="https://pokeup.s3.us-west-1.amazonaws.com/berries/berries/pokemon-go-razz-berry.jpeg", description="Won a lot of battles to get these, and now I sell them", price=200, quantity=5
    )

    sonic_post1 = Post (
        title="Nanab Berry", user_id=8, category_id=6, image_url="https://pokeup.s3.us-west-1.amazonaws.com/berries/berries/reg-nanab.jpeg", description="The classic! I heard Pokémon really love these!", price=300, quantity=5
    )

    sonic_post2 = Post (
        title="Sitrus Berry", user_id=8, category_id=6, image_url="https://pokeup.s3.us-west-1.amazonaws.com/berries/berries/sitrus-berry.png", description="Found these on my run the other day.", price=300, quantity=4
    )

    demo_post3 = Post (
        title="Tamato Berry?", user_id=1, category_id=6, image_url="https://pokeup.s3.us-west-1.amazonaws.com/berries/berries/13985.png", description="Not really sure what this is to be completely honest. It looks like its called a Tamato Berry, which almost sounds like tomtato..?", price=300, quantity=3
    )

    pikachu_post3 = Post (
        title="Trainer Hats", user_id=2, category_id=3, image_url="https://pokeup.s3.us-west-1.amazonaws.com/clothing/clothing/4pikachus-ash-hats.webp", description="Found these hats lying around. Look too big on me unfortunately!", price=500, quantity=4
    )

    java_post3 = Post (
        title="Red Ribbon", user_id=3, category_id=3, image_url="https://pokeup.s3.us-west-1.amazonaws.com/clothing/clothing/st%2Csmall%2C507x507-pad%2C600x600%2Cf8f8f8.u7.jpg", description="I won this in a contest but the color doesn't look good on me. I'm suer someone else will love it!", price=1000, quantity=1
    )

    ash_post3 = Post (
        title="Ace Trainer Outfit", user_id=4, category_id=3, image_url="https://pokeup.s3.us-west-1.amazonaws.com/clothing/clothing/pokemon-go-ace-trainer-clothing_feature.png", description="Use to wear this back in the day, but its just too tight for my preference if I'm being honest...", price=500, quantity=2
    )

    link_post3 = Post (
        title="Purple Ribbon", user_id=5, category_id=3, image_url="https://pokeup.s3.us-west-1.amazonaws.com/clothing/clothing/1449778895-779c14658f4cf3ce1e066b8cb1fac557.png", description="My sister won this in a contest, but she doesn't like ribbons... go figure. She wants to sell it now, I guess..", price=350, quantity=1
    )

    arceus_post3 = Post (
        title="Super Contest Dresses", user_id=6, category_id=3, image_url="https://pokeup.s3.us-west-1.amazonaws.com/clothing/clothing/1449778909-108eab4025141ddbf0c73932ec662136.png", description="I remember when this happened... my friend was so happy to win. They gave her an extra dress to give to someone else.. Guess she thought of me. How sweet", price=800, quantity=2
    )

    darkrai_post3 = Post (
        title="Sunglasses", user_id=7, category_id=3, image_url="https://pokeup.s3.us-west-1.amazonaws.com/clothing/clothing/ECyHHqxWsAA5ivg.jpeg", description="These sunglasses were a gift given to me by my friend Meowth. I only go out at night though, so I have no use for them", price=450, quantity=1
    )

    sonic_post3 = Post (
        title="Dresses Made from Friends!", user_id=8, category_id=3, image_url="https://pokeup.s3.us-west-1.amazonaws.com/clothing/clothing/66f.png", description="My frineds made some dresses! They look awesome, please check them out. We have plenty!", price=450, quantity=15
    )

    demo_post4 = Post (
        title="Red Summer Outfits", user_id=1, category_id=3, image_url="https://pokeup.s3.us-west-1.amazonaws.com/clothing/clothing/ddobw5w-7b982507-536b-44b5-800b-ac965bf0ce6e.jpeg", description="Perfect outfits for the summer!", price=650, quantity=2
    )

    pikachu_post4 = Post (
        title="Award Winning Dress", user_id=2, category_id=3, image_url="https://pokeup.s3.us-west-1.amazonaws.com/clothing/clothing/contest8.jpeg", description="My sister won this in the last contest she was in. Isn't it just amazing!", price=900, quantity=1
    )

    java_post4 = Post (
        title="Winter Fit", user_id=3, category_id=3, image_url="https://pokeup.s3.us-west-1.amazonaws.com/clothing/clothing/EOX7ph8W4AEJIuK.jpeg", description="Perfect for those tough winter days! Come get them while they're warm!", price=1250, quantity=5
    )

    ash_post4 = Post (
        title="Top Hat", user_id=4, category_id=3, image_url="https://pokeup.s3.us-west-1.amazonaws.com/clothing/clothing/Pokemon_Contest_by_bijou457.jpeg", description="A top hat that I use to where when I a visited contests often. I don't really have time for contest anymore now though.", price=500, quantity=1
    )

    arceus_post4 = Post (
        title="Master Ball", user_id=6, category_id=5, image_url="https://pokeup.s3.us-west-1.amazonaws.com/pokeballs/pokeballs/il_fullxfull.2793364320_asy7.jpg", description="A human tried to catch me in one of these. Luckily I teleported away... I heard you can't escape one of these!", price=10000, quantity=3
    )

    darkrai_post4 = Post (
        title="Luxury Ball", user_id=7, category_id=5, image_url="https://pokeup.s3.us-west-1.amazonaws.com/pokeballs/pokeballs/e567bde0d3fa58bf37fcfc5c5be1e6424c39b716_00.jpeg", description="My favorite ball personally because of the color. Plus I heard it's super comfortable inside!", price=800, quantity=10
    )

    link_post4 = Post (
        title="Pokéball", user_id=5, category_id=5, image_url="https://pokeup.s3.us-west-1.amazonaws.com/pokeballs/pokeballs/pokeball-resting-on-table-1kx862px-300x259.jpeg", description="The original and one that strikes home to most. I have tons of these for my adventures and so should you!", price=150, quantity=50
    )

    sonic_post4 = Post (
        title="Quick Ball", user_id=8, category_id=5, image_url="https://pokeup.s3.us-west-1.amazonaws.com/pokeballs/pokeballs/1558692886_bandaipokebalsuper8-500x500.jpeg", description="This is a Quick Ball. It is effective for quick people only. So it's perfect for someone like me!", price=750, quantity=15
    )

    demo_post5 = Post (
        title="Great Ball", user_id=1, category_id=5, image_url="https://pokeup.s3.us-west-1.amazonaws.com/pokeballs/pokeballs/il_fullxfull.2547079879_ej0d-scaled.jpg", description="The Great Ball always has had this charm to it. I just love the colors and it looks so cool!", price=500, quantity=20
    )

    pikachu_post5 = Post (
        title="Cherish Ball", user_id=2, category_id=5, image_url="https://pokeup.s3.us-west-1.amazonaws.com/pokeballs/pokeballs/RW_Hrp-DN-Og2yADztV0OTObvjn2YsiBL5XI8TqetIY.jpeg", description="This ball is super rare! I got it as a mystery gift, but I get those all the time!", price=1250, quantity=5
    )

    java_post5 = Post (
        title="Love Ball", user_id=3, category_id=5, image_url="https://pokeup.s3.us-west-1.amazonaws.com/pokeballs/pokeballs/6da6326b6351e5b8509f18295314f67bf041e2e3_hq.jpeg", description="If you need a ball to show someone you care this Valentine's Day, then boy do I have the ball for you!", price=2000, quantity=10
    )

    ash_post5 = Post (
        title="Premier Ball", user_id=4, category_id=5, image_url="https://pokeup.s3.us-west-1.amazonaws.com/pokeballs/pokeballs/il_fullxfull.2627094721_46dl-scaled.jpg", description="A white Pokéball essentially... Well that's cool!", price=600, quantity=4
    )

    link_post5 = Post (
        title="Dusk Ball", user_id=5, category_id=5, image_url="https://pokeup.s3.us-west-1.amazonaws.com/pokeballs/pokeballs/The-Wand-Company-Pokemon-Die-Cast-Dusk-Ball-Replica.jpeg", description="I'm usually in some woods so this ball is good for those kind of Pokémon. Plus it looks so cool at night!", price=650, quantity=8
    )

    arceus_post5 = Post (
        title="Beast Ball", user_id=6, category_id=5, image_url="https://pokeup.s3.us-west-1.amazonaws.com/pokeballs/pokeballs/BeastInkStamper7-500x500.jpeg", description="Used to catch a beast. I would not consider myself a beast but maybe others would.", price=1250, quantity=9
    )

    darkrai_post5 = Post (
        title="Repeat Ball", user_id=7, category_id=5, image_url="https://pokeup.s3.us-west-1.amazonaws.com/pokeballs/pokeballs/b8c1280e12437263a13c991a6e6489d7_preview_featured.jpeg", description="Looks really nice it goes well with my color scheme.", price=1500, quantity=11
    )

    sonic_post5 = Post (
        title="Eevee", user_id=8, category_id=2, image_url="https://pokeup.s3.us-west-1.amazonaws.com/pokemon/pokemon/800px-Serena_Eevee.0.0.jpeg", description="Eevee can evolve into may different forms, and they're so cute!", price=12000, quantity=3
    )

    demo_post6 = Post (
        title="Mewtwo", user_id=1, category_id=2, image_url="https://pokeup.s3.us-west-1.amazonaws.com/pokemon/pokemon/1200x1200bf-60.jpeg", description="This is Mewtwo and he is pretty powerful. Almost guaranteed W and I heard he's picked up rapping?", price=1000000, quantity=1 
    )

    pikachu_post6 = Post (
        title="Riolu", user_id=2, category_id=2, image_url="https://pokeup.s3.us-west-1.amazonaws.com/pokemon/pokemon/ash-catches-riolu-pokemon-anime.jpeg", description="Such a great helper and he evovles into a heavy hitter!", price=15000, quantity=4
    )

    java_post6 = Post (
        title="Celebi", user_id=3, category_id=2, image_url="https://pokeup.s3.us-west-1.amazonaws.com/pokemon/pokemon/celebi-go.png", description="Great around the garden! Gives you this magical feeling!", price=500000, quantity=1
    )

    ash_post6 = Post (
        title="Chimchar", user_id=4, category_id=2, image_url="https://pokeup.s3.us-west-1.amazonaws.com/pokemon/pokemon/CHIMCHAR.jpeg", description="Look how cute the monkey is! He's got a firey personality!", price=20000, quantity=5
    )

    link_post6 = Post (
        title="Gengar and Sableye", user_id=5, category_id=2, image_url="https://pokeup.s3.us-west-1.amazonaws.com/pokemon/pokemon/halloween2020.jpeg", description="Saw these guys outside my house and I had to let them stay so they won't do anything suspicious. Please get them out of here!", price=30000, quantity=2 
    )

    arceus_post6 = Post (
        title="Moltres", user_id=6, category_id=2, image_url="https://pokeup.s3.us-west-1.amazonaws.com/pokemon/pokemon/Moltres_PJ068.png", description="One of the legendary birds that I created... Excellent addition to the team.", price=750000, quantity=1
    )

    darkrai_post6 = Post (
        title="Shiny and Regular Deoxys", user_id=7, category_id=2, image_url="https://pokeup.s3.us-west-1.amazonaws.com/pokemon/pokemon/pokemon-go-can-deoxys-be-shiny.jpeg", description="I have them both and they can change forms. A great deal and Shiny are extremely rare to find!", price=900000, quantity=2 
    )

    sonic_post6 = Post (
        title="Gigantamax Machamp", user_id=8, category_id=2, image_url="https://pokeup.s3.us-west-1.amazonaws.com/pokemon/pokemon/Pokemon-Sword-and-Shield-Gigantamax-Machamp.jpeg", description="This guy is the real deal. He is huge. Also he's a great way to stay in shape.", price=450000, quantity=1
    )

    demo_post7 = Post (
        title="Bewear", user_id=1, category_id=2, image_url="https://pokeup.s3.us-west-1.amazonaws.com/pokemon/pokemon/pokemonthumb-1579275501782.jpeg", description="This dude was chasing me the other day. But we cool now. Him and his homies are total cuddle buddies.", price=30000, quantity=3
    )

    pikachu_post7 = Post (
        title="Chikorita", user_id=2, category_id=2, image_url="https://pokeup.s3.us-west-1.amazonaws.com/pokemon/pokemon/Tokio_Chikorita.png", description="Be careful with this one. She is cute but she can be dangerous!", price=35000, quantity=1
    )

    java_post7 = Post (
        title="Full Restore", user_id=3, category_id=1, image_url="https://pokeup.s3.us-west-1.amazonaws.com/potions/potions/download.jpeg", description="This bad boy will fully heal any Pokémon!", price=1000, quantity=35
    )

    ash_post7 = Post (
        title="Elixir", user_id=4, category_id=1, image_url="https://pokeup.s3.us-west-1.amazonaws.com/potions/potions/hero-thumb.jpeg", description="This gives your Pokémon the energy they need!", price=225, quantity=4
    )

    link_post7 = Post (
        title="Ether", user_id=5, category_id=1, image_url="https://pokeup.s3.us-west-1.amazonaws.com/potions/potions/Hyper_potion1.png", description="Like pre-workout for your Pokémon!", price=445, quantity=7
    )

    arceus_post7 = Post (
        title="Antidote", user_id=6, category_id=1, image_url="https://pokeup.s3.us-west-1.amazonaws.com/potions/potions/il_570xN.3225402996_jzo4.jpg", description="This cures your Pokémon of poisoning!", price=175, quantity=49
    )

    darkrai_post7 = Post (
        title="Burn Heal", user_id=7, category_id=1, image_url="https://pokeup.s3.us-west-1.amazonaws.com/potions/potions/large+(1).png", description="Just as you would think it heals burns. Simple.", price=275, quantity=14
    )

    sonic_post7 = Post (
        title="Awakening", user_id=8, category_id=1, image_url="https://pokeup.s3.us-west-1.amazonaws.com/potions/potions/large.png", description="Helps your Pokémon wake up if they've fallen asleep!", price=155, quantity=23
    )

    demo_post8 = Post (
        title="Paralyze Heal", user_id=1, category_id=1, image_url="https://pokeup.s3.us-west-1.amazonaws.com/potions/potions/leds_purple-bottle.jpeg", description="Pokémon paralyzed? Fear no more with this at your side! Heals all paralyzed effects.", price=850, quantity=10
    )

    pikachu_post8 = Post (
        title="Ice Heal", user_id=2, category_id=1, image_url="https://pokeup.s3.us-west-1.amazonaws.com/potions/potions/maxresdefault.jpeg", description="Helps with frozen Pokémon!", price=150, quantity=20
    )

    java_post8 = Post (
        title="Full Heal", user_id=3, category_id=1, image_url="https://pokeup.s3.us-west-1.amazonaws.com/potions/potions/Potion.jpeg", description="The best one out! Heals anything wrong with your Pokémon!", price=1500, quantity=10
    )

    ash_post8 = Post (
        title="Full Restore", user_id=4, category_id=1, image_url="https://pokeup.s3.us-west-1.amazonaws.com/potions/potions/tumblr_p58ir2L2vb1rl04amo3_1280.jpeg", description="This right here is what dreams are made of. Fully heals everything about your Pokémon!!", price=3000, quantity=16
    )

    link_post8 = Post (
        title="Revive", user_id=5, category_id=1, image_url="https://pokeup.s3.us-west-1.amazonaws.com/potions/potions/tumblr_p58ir2L2vb1rl04amo5_1280.jpeg", description="Will bring your Pokémon from being fainted! Super helpful for a comeback.", price=5000, quantity=50
    )

    arceus_post8 = Post (
        title="An original protype TM", user_id=6, category_id=4, image_url="https://pokeup.s3.us-west-1.amazonaws.com/tms/tms/images+(2).jpeg", description="An original Technical Machine. I don't know if they ever went through with this design in the end.", price=10500, quantity=1
    )

    darkrai_post8 = Post (
        title="Nightmare", user_id=7, category_id=4, image_url="https://pokeup.s3.us-west-1.amazonaws.com/tms/tms/137.jpeg", description="Teaches the move nightmare, which will cause Pokémon to have nightmares on command. Freddy Krueger vibes.", price=1750, quantity=3
    )

    sonic_post8 = Post (
        title="Quick Attack", user_id=8, category_id=4, image_url="https://pokeup.s3.us-west-1.amazonaws.com/tms/tms/3b3vnzfhawu51.png", description="Speed is the way to go and with this move you'll almost always know how to hit first!", price=1350, quantity=9
    )

    demo_post9 = Post (
        title="Hyper Beam", user_id=1, category_id=4, image_url="https://pokeup.s3.us-west-1.amazonaws.com/tms/tms/cats-800x445.jpeg", description="One of the strongest moves! Pokémon gets real tired afterwards however.", price=4000, quantity=4
    )

    pikachu_post9 = Post (
        title="Thunder", user_id=2, category_id=4, image_url="https://pokeup.s3.us-west-1.amazonaws.com/tms/tms/download+(1).jpeg", description="The ULTIMATE move Thunder!! Used by yours truly!", price=3500, quantity=10
    )

    java_post9 = Post (
        title="Flamethrower", user_id=3, category_id=4, image_url="https://pokeup.s3.us-west-1.amazonaws.com/tms/tms/download.jpeg", description="This is super helpful around getting rid of bests and making your presence known on the battlefield.", price=3750, quantity=37
    )

    ash_post9 = Post (
        title="Aura Sphere", user_id=4, category_id=4, image_url="https://pokeup.s3.us-west-1.amazonaws.com/tms/tms/images+(1).jpeg", description="Creates a ball of energy in your hand... Pretty amazing!", price=5000, quantity=5
    )

    link_post9 = Post (
        title="Earthquake", user_id=5, category_id=4, image_url="https://pokeup.s3.us-west-1.amazonaws.com/tms/tms/images.jpeg", description="Ever wanted to cause massive destruction? Look no further.", price=4500, quantity=30
    )

    arceus_post9 = Post (
        title="Superpower", user_id=6, category_id=4, image_url="https://pokeup.s3.us-west-1.amazonaws.com/tms/tms/LGPE-TM50.png", description="Grants the user enormous power.", price=6500, quantity=3
    )

    darkrai_post9 = Post (
        title="Dark Pulse", user_id=7, category_id=4, image_url="https://pokeup.s3.us-west-1.amazonaws.com/tms/tms/Pokemon-Brilliant-Diamond-and-Shining-Pearl-TM-Shadow-Ball.jpeg", description="Shoots out a dark pulse of energy.", price=3300, quantity=4
    )

    sonic_post9 = Post (
        title="Extremespeed", user_id=8, category_id=4, image_url="https://pokeup.s3.us-west-1.amazonaws.com/tms/tms/Pokemon-TM.jpeg", description="Makes Quick Attack look like child's play. This is ultimate speed!", price=5500, quantity=5
    )

    db.session.add(demo_post1)
    db.session.add(demo_post2)
    db.session.add(demo_post3)
    db.session.add(demo_post4)
    db.session.add(demo_post5)
    db.session.add(demo_post6)
    db.session.add(demo_post7)
    db.session.add(demo_post8)
    db.session.add(demo_post9)

    db.session.add(pikachu_post1)
    db.session.add(pikachu_post2)
    db.session.add(pikachu_post3)
    db.session.add(pikachu_post4)
    db.session.add(pikachu_post5)
    db.session.add(pikachu_post6)
    db.session.add(pikachu_post7)
    db.session.add(pikachu_post8)
    db.session.add(pikachu_post9)

    db.session.add(java_post1)
    db.session.add(java_post2)
    db.session.add(java_post3)
    db.session.add(java_post4)
    db.session.add(java_post5)
    db.session.add(java_post6)
    db.session.add(java_post7)
    db.session.add(java_post8)
    db.session.add(java_post9)

    db.session.add(ash_post1)
    db.session.add(ash_post2)
    db.session.add(ash_post3)
    db.session.add(ash_post4)
    db.session.add(ash_post5)
    db.session.add(ash_post6)
    db.session.add(ash_post7)
    db.session.add(ash_post8)
    db.session.add(ash_post9)

    db.session.add(link_post1)
    db.session.add(link_post2)
    db.session.add(link_post3)
    db.session.add(link_post4)
    db.session.add(link_post5)
    db.session.add(link_post6)
    db.session.add(link_post7)
    db.session.add(link_post8)
    db.session.add(link_post9)

    db.session.add(arceus_post1)
    db.session.add(arceus_post2)
    db.session.add(arceus_post3)
    db.session.add(arceus_post4)
    db.session.add(arceus_post5)
    db.session.add(arceus_post6)
    db.session.add(arceus_post7)
    db.session.add(arceus_post8)
    db.session.add(arceus_post9)

    db.session.add(darkrai_post1)
    db.session.add(darkrai_post2)
    db.session.add(darkrai_post3)
    db.session.add(darkrai_post4)
    db.session.add(darkrai_post5)
    db.session.add(darkrai_post6)
    db.session.add(darkrai_post7)
    db.session.add(darkrai_post8)
    db.session.add(darkrai_post9)

    db.session.add(sonic_post1)
    db.session.add(sonic_post2)
    db.session.add(sonic_post3)
    db.session.add(sonic_post4)
    db.session.add(sonic_post5)
    db.session.add(sonic_post6)
    db.session.add(sonic_post7)
    db.session.add(sonic_post8)
    db.session.add(sonic_post9)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the posts table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_posts():
    db.session.execute('TRUNCATE posts RESTART IDENTITY CASCADE;')
    db.session.commit()