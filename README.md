# [PokéUp](https://pokeup.herokuapp.com)

This is a clone of the popular application OfferUp. On [PokéUp](https://pokeup.herokuapp.com) you can find everything you need for your Pokémon from potions to clothing to berries. You can find it all here and even add them to lists that you have curated! Ever wanted to get rid of some old stuff from your last Poké adventure? Make some money by selling to the next person who may need it on their next adventure! It's free for anyone to join.

**NOW MOSTLY STYLED FOR *MOBILE*!!!!**

## Features

### 1. Posts  

You can view all posts on PokéUp. All posts are apart of 6 categories. Potions, Pokémon, Clothing, Technical Machines, Pokéballs, and Berries. From any of the pages if you are the owner of the post, you can edit and delete the post.

### 2. Lists  

If you have an account on PokéUp you can add posts that you are interested in to your own list. You can create lists from the lists page. If you want to delete a list or change the name or even add a picture that can all be done from the lists page. 

### 3. Adding Posts to Lists  

If you want to add posts to lists you have created, you can. When you go to a post's page, if you are logged in, you have the option to add the post to a list you have created. From the lists page you can click on the arrow of the list to see the posts that are apart of that list. If you want to get rid of a post from a list, you can click on the Remove button. 

### 4. Categories

Categories are used to narrow down what you are looking for on PokéUp.

### 5. Profile  

Can view and edit your own profile! See what items you are currently selling.

### 6. Messaging 

Can message people about their product to offer them a price you both can agree on. In your inbox you can see the different items you are conversating about. The tabs at the top switch between the conversations about what you are selling and what you are trying to buy. Each conversation is updated in realtime and can be viewed by both parties at the same time  

## *Technologies Used*
1. React
2. Flask
3. AWS
4. Javascript
5. Node.js
6. Redux
7. Python
8. PostgreSQL
9. HTML
10. CSS
11. WebSockets

## Demo
### Login Page

![](https://github.com/dnlflores/poke-up/blob/main/res/Login-Page.png)

Here you can login into PokéUp if you have an account already. You can choose to use your e-mail or username. Note that the username/e-mail and password are case-sensitive.

### SignUp Page

![](https://github.com/dnlflores/poke-up/blob/main/res/SignUp-Page.png)

Here you can create an account on PokéUp if you do not have one already. You must use a unique username and e-mail in order to sign up. By default you will be given a generic profile picture and bio. You can change this picture and bio from the profile page.

### Home Page

![](https://github.com/dnlflores/poke-up/blob/main/res/HomePage.gif)

Whether you are logged in or not, you can view the posts on PokéUp.

### Creating a Post

![](https://github.com/dnlflores/poke-up/blob/main/res/CreateAPost.gif)

Once you are logged in, you can upload an item to PokéUp with a picture of your choosing. 

### Create and Add to a List

![](https://github.com/dnlflores/poke-up/blob/main/res/CreateAndAddToList.gif)

You can create lists to store your favorite items on PokéUp, or ones that you plan to purchase later. Give it a name and you can choose an image to represent what this list will be about.

### Navigating Between Posts

![](https://github.com/dnlflores/poke-up/blob/main/res/NavigatingBetweenPosts.gif)

When looking at a post on PokéUp you will be given suggestions of other posts made by the user who posted the item as well as items in the same category as the one you are looking at.

### Profile Page

![](https://github.com/dnlflores/poke-up/blob/main/res/ProfilePage.gif)

Anyone can view a user's profile to see who they are buying/selling to. The profile page shows all the items that are currently offered by the user. If you are logged in and viewing your own page, you can edit your bio and picture from here as well. On computers, hover over with your mouse to reveal the edit button. On mobile, buttons should be visible immediately.

### Sending an Offer to a User

![](https://github.com/dnlflores/poke-up/blob/main/res/SendingAnOffer.gif)

When on the post page, you can choose to send an offer to that user for purchase. The asking price is filled in by default but you can make a different offer if you wish to do so. Once the offer button is clicked a message is sent to the owner of the item asking to buy the item for the price you input.

### Instant Messaging between Users

![](https://github.com/dnlflores/poke-up/blob/main/res/SendingMessage.gif)

Users recieve messages about their products and can view them from the inbox page. From the inbox page, you can switch between the conversations that you are selling and which you are buying. You can respond to and message any user you interested in purchasing an item from or selling an item to. You can have multiple conversations with the same user as long as they are about different products. These messages are sent and recieved in real time so as soon as they respond you will see.

## Getting started locally

1. Clone this repository (only this branch)

   ```bash
   git clone https://github.com/appacademy-starters/python-project-starter.git
   ```

2. Install dependencies

   ```bash
   pipenv install --dev -r dev-requirements.txt && pipenv install -r requirements.txt
   ```

3. Create a **.env** file based on the example with proper settings for your development environment

4. Setup your PostgreSQL user, password and database and make sure it matches your **.env** file

5. Get into your pipenv, migrate your database, seed your database, and run your flask app

   ```bash
   pipenv shell
   ```

   ```bash
   flask db upgrade
   ```

   ```bash
   flask seed all
   ```

   ```bash
   flask run
   ```

*IMPORTANT!*
If you add any python dependencies to your pipfiles, you'll need to regenerate your requirements.txt before deployment.
You can do this by running:

```bash
pipenv lock -r > requirements.txt
```

## *Wiki Links*
DB Schema: https://github.com/dnlflores/poke-up/wiki/DB-Schema  
Feature List: https://github.com/dnlflores/poke-up/wiki/Feature-List  
User Stories: https://github.com/dnlflores/poke-up/wiki/User-Stories  
Wireframes: https://github.com/dnlflores/poke-up/wiki/Wireframes  