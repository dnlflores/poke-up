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

## Getting started locally

1. Clone this repository (only this branch)

   ```bash
   git clone https://github.com/appacademy-starters/python-project-starter.git
   ```

2. Install dependencies

      ```bash
      pipenv install --dev -r dev-requirements.txt && pipenv install -r requirements.txt
      ```

3. Create a **.env** file based on the example with proper settings for your
   development environment
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

6. To run the React App in development, checkout the [README](./react-app/README.md) inside the `react-app` directory.

***
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