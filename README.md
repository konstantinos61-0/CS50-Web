# CS50-Web 
This repository contains projects I completed as part of HarvardX's CS50 Web Programming with Python and Javascript. 

## Project 0: Search
### Description
A front-end for Google Search, Google Image Search and Google Advanced Search using just HTML and CSS. In each page the user is able to perform the corresponding google search. This was achieved by exploring Google’s URL interface to identify what GET parameters it expects so we can send our form data to Google's server. This project was a great opportunity for me to practice my HTML and CSS skills. 

The distribution code is available at: https://cdn.cs50.net/web/2020/spring/projects/0/search.zip and only includes an incomplete index.html file.
### Demo
A live demo video is available at: https://www.youtube.com/watch?v=Xd5qORL9RQs

## Project 1: Wiki
A Django web application for a Wikipedia-like online encyclopedia. The encyclopedia entries are stored in Markdown and are converted to HTML before being displayed to the user. This makes them more human-friendly to write and edit. 
### Demo
A live demo video is available at: https://www.youtube.com/watch?v=7snXCanVW7k
### Installation
To run the project locally:
1. Make sure that Python is installed on your system.
2. Install the Django framework for Python.
3. Python module dependencies: markdown2 (install via `pip3 install markdown2`)
4. Clone the repository.
5. From within the repository directory execute the following commands:
   - `python manage.py migrate` to synchronize the models with the database schema.
   - `python manage.py runserver` to run the local server.

### Tech Stack
- Back-end: Python (Django) 
- Front-end: HTML, CSS, Bootstrap library
- Database: SQLite
### Features
The website offers the following core features:
- **Entry Page**: Visiting `/wiki/TITLE` where `TITLE` is the title of the encyclopedia entry, renders a page that displayes the contents of that entry or an error if the entry doesn't exist.
- **Index Page**: Visiting `/` displays a list of links to all the encyclopedia pages. Clicking any of the links takes the user directly to that entry page.
- **Search**: Users can type queries into a search box to search for encyclopedia entries.
- **New Page**: The user can click "Create New Page" in the sidebar to get to a page where they can create a new encyclopedia entry by entering its Markdown content in a `textarea`. A successfully saved entry is saved on disk.
- **Edit Page**: On each entry page, the user is able to click a link to be taken to a page where they can edit the Markdown content of that page. 
- **Random Page**: Clicking "Random Page" in the sidebar takes the user to a random encyclopedia entry 

### What I implemented
This application's distribution code is available at: https://cdn.cs50.net/web/2020/spring/projects/1/wiki.zip (accessed 13 March 2026). It includes:
- The index route ("/")
- 3 utility functions to interact with encyclopedia entries
- An HTML template layout along with some basic CSS for it

I studied, understood them and then moved on to complete the rest of the app. Specifically, I implemented the following:
- **Routes**: All of the other routes (5) along with extending the index route.
- **HTML Templates**: I extended the HTML by adding the necessary templates, using the layout.html from the distribution code.
- **CSS styles**: I minimally extended the styles file to handle form styling.
- **Forms**: all of the form classes that handle form generation and validation.

## Project 2: commerce
This project has its own dedicated repository, available at: https://github.com/konstantinos61-0/commerce

## Project 3: mail
A Django web application for an email client that makes API calls to send and receive emails. I designed the front-end as a Single-Page App using JavaScript and the AJAX Fetch API. Email data are transfered as JSON, parsed and utilized to properly update the web page.
### Demo
A live demo video is available at: https://www.youtube.com/watch?v=Xh6ox6zMf_0
### Installation
To run the project locally:
1. Make sure that Python is installed on your system.
2. Install the Django framework for Python.
3. Clone the repository.
4. From within the repository directory execute the following commands:
   - `python manage.py migrate` to synchronize the models with the database schema.
   - `python manage.py runserver` to run the local server.

### Tech Stack
- Back-end: Python (Django) 
- Front-end: HTML, pure CSS, Bootstrap, JavaScript.
- Database: SQLite
### Features
The email client offers the following core features:
- **Send Mail**: When a user submits the email composition form, send the email using JavaScript code. 
- **Mailbox**: When a user visits their Inbox, Sent mailbox, or Archive, the appropriate mailbox is loaded.
- **View Email**:  When a user clicks on an email, they are taken to a view where they see the content of that email.
- **Archive and Unarchive**: Allow users to archive and unarchive emails that they have received.
- **Reply**: : Allow users to reply to an email. 

### What I implemented
This application's distribution code is available at: https://cdn.cs50.net/web/2020/spring/projects/3/mail.zip (accessed 18 March 2026). It includes:
- The entirety of the server-side python code, including the API Routes used to retrieve specific email-data items from the database.
- HTML templates and the corresponding CSS

I studied, understood them and then completed the email client. Specifically, I implemented the following:
- **JavaScript**: The entirety of the JavaScript code. JavaScipt is used to dynamically update the contents of the web page as the user interacts with it. This includes making AJAX API calls (Fetch) and properly handling the returned data to update the web page.
- **HTML Templates**: I minimally extended the HTML templates to add extra views, element IDs, and classes utilized inside JavaScript code. 
- **CSS styles**: I minimally extended the styles file to handle email list display.

## Project 4: network
TODO

