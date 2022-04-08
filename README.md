# PokéUp

This is a clone of the popular application OfferUp. On PokéUp you can find everything you need for your Pokémon from potions to clothing to berries. You can find it all here and even add them to lists that you have curated! Ever wanted to get rid of some old stuff from your last Poké adventure? Make some money by selling to the next person who may need it on their next adventure! It's free for anyone to join.

**CURRENTLY BEING DEVELOPED FOR *MOBILE*!!!!**

## Getting started

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

*ALSO IMPORTANT!*
   psycopg2-binary MUST remain a dev dependency because you can't install it on apline-linux.
   There is a layer in the Dockerfile that will install psycopg2 (not binary) for us.
***

## Deploy to Heroku

1. Before you deploy, don't forget to run the following command in order to
ensure that your production environment has all of your up-to-date
dependencies. You only have to run this command when you have installed new
Python packages since your last deployment, but if you aren't sure, it won't
hurt to run it again.

   ```bash
   pipenv lock -r > requirements.txt
   ```

2. Create a new project on Heroku
3. Under Resources click "Find more add-ons" and add the add on called "Heroku Postgres"
4. Install the [Heroku CLI](https://devcenter.heroku.com/articles/heroku-command-line)
5. Run

   ```bash
   heroku login
   ```

6. Login to the heroku container registry

   ```bash
   heroku container:login
   ```

7. Update the `REACT_APP_BASE_URL` variable in the Dockerfile.
   This should be the full URL of your Heroku app: i.e. "https://flask-react-aa.herokuapp.com"
8. Push your docker container to heroku from the root directory of your project.
   (If you are using an M1 mac, follow [these steps below](#for-m1-mac-users) instead, then continue on to step 9.)
   This will build the Dockerfile and push the image to your heroku container registry.

   ```bash
   heroku container:push web -a {NAME_OF_HEROKU_APP}
   ```

9. Release your docker container to heroku

      ```bash
      heroku container:release web -a {NAME_OF_HEROKU_APP}
      ```

10. set up your database

      ```bash
      heroku run -a {NAME_OF_HEROKU_APP} flask db upgrade
      heroku run -a {NAME_OF_HEROKU_APP} flask seed all
      ```

11. Under Settings find "Config Vars" and add any additional/secret .env
variables.

12. profit

### For M1 Mac users

(Replaces **Step 8**)

1. Build image with linux platform for heroku servers. Replace
{NAME_OF_HEROKU_APP} with your own tag:

   ```bash=
   docker buildx build --platform linux/amd64 -t {NAME_OF_HEROKU_APP} .
   ```

2. Tag your app with the url for your apps registry. Make sure to use the name
of your Heroku app in the url and tag name:

   ```bash=2
   docker tag {NAME_OF_HEROKU_APP} registry.heroku.com/{NAME_OF_HEROKU_APP}/web
   ```

3. Use docker to push the image to the Heroku container registry:

   ```bash=3
   docker push registry.heroku.com/{NAME_OF_HEROKU_APP}/web
   ```

### Features

1. **Posts**  
      You can view all posts on PokéUp. All posts are apart of 6 categories. Potions, Pokémon, Clothing, Technical Machines, Pokéballs, and Berries. From any of the pages if you are the owner of the post, you can edit and delete the post.

2. **Lists**  
      If you have an account on PokéUp you can add posts that you are interested in to your own list. You can create lists from the lists page. If you want to delete a list or change the name or even add a picture that can all be done from the lists page. 

3. **Adding Posts to Lists**  
      If you want to add posts to lists you have created, you can. When you go to a post's page, if you are logged in, you have the option to add the post to a list you have created. From the lists page you can click on the arrow of the list to see the posts that are apart of that list. If you want to get rid of a post from a list, you can click on the Remove button. 

4. **Categories**  
      Categories are used to narrow down what you are looking for on PokéUp.

5. **Profile**  
      Can view and edit your own profile! See what items you are currently selling.

6. **Messaging**  
      Can message people about their product to offer them a price you both can agree on. In your inbox you can see the different items you are conversating about. The tabs at the top switch between the conversations about what you are selling and what you are trying to buy. Each conversation is updated in realtime and can be viewed by both parties at the same time  
(*Websockets currently being developed so instant messaging is currently unavailable*)

### *Technologies Used*
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

### *Wiki Links*
DB Schema: https://github.com/dnlflores/poke-up/wiki/DB-Schema  
Feature List: https://github.com/dnlflores/poke-up/wiki/Feature-List  
User Stories: https://github.com/dnlflores/poke-up/wiki/User-Stories  
Wireframes: https://github.com/dnlflores/poke-up/wiki/Wireframes  