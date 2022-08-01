# About Street-Up

Street-Up is an application inspired by Meetup, providing a place for users to create and join groups and events centered around more urban inspired interests and activities.

Grab your interest? why not [check it out](https://street-up.herokuapp.com/)?

Below you will find links that will assis with understanding and navigating this application, as well as detailing the backend, and frontend structure of the application:

- [Backend API endpoints](https://github.com/ZRonzan/aA-Meetup-clone/wiki/Backend-API-endpoints)
- [Backend Database Schema](https://github.com/ZRonzan/aA-Meetup-clone/wiki/Backend-Database-Schema)
- [Front end application features](https://github.com/ZRonzan/aA-Meetup-clone/wiki/Features-list)
- [Front end application redux state shape](https://github.com/ZRonzan/aA-Meetup-clone/wiki/Redux-Frontend-state-shape)

This project was built using the following technologies:
- JavaScript
- Postgres
- SQLite3
- Sequelize
- Express
- React
- Redux
- CSS
- Heroku for hosting

The following external resources were used in the creation of this app:

- [Graffiti SVG from Vecteezy](https://www.vecteezy.com/vector-art/149623-graffiti-abstract-background)
- [Cities data API from getpostman](https://documenter.getpostman.com/view/1134062/T1LJjU52#4829d16f-0f4e-43ec-886e-68ebad1221d8)
- [SVG creation and editing tool](https://editor.method.ac/)
- [Font Awesome for icons](https://fontawesome.com/icons?d=gallery&m=free)
- [Unsplash for free images](https://unsplash.com/)

## Features and directions

Upon launching the app, you will be met with the following splash page:

![main splash page](https://user-images.githubusercontent.com/100141010/182064294-8373521c-03d9-4cf8-a10c-c511eb4c327d.png)

From here, you will be able to view all groups and events, without requiring a user to be logged in. Clicking either the __find a group__ or __find an event__ links. A user has the ability to log in or create a user login, which will then allow you to begin creating and editing groups and events. Or, you can click the demo user link, which will log you in as an existing demo user which already owns and has access to event and group editing and deleting features.

### Home page

From the home page, you can log in with an existing user email and password, or sign up with their details, email and a password of your choosing:

![log in](https://user-images.githubusercontent.com/100141010/182065253-368a0dc8-9e17-416c-8e20-f297ed8e171b.png)

![signup](https://user-images.githubusercontent.com/100141010/182065262-2810309d-b210-4db2-8bad-1cd18a86ce0f.png)

### Displaying all groups and events pages

All groups:

![all groups](https://user-images.githubusercontent.com/100141010/182065666-dddbb7aa-83bd-43ea-ae71-6d532bab1556.png)

All events:

![all events](https://user-images.githubusercontent.com/100141010/182065674-9794be5b-bba2-44b7-a2d6-b54eb71aacbf.png)

### Group details page

You are able to view the details of a group regardless if you are logged in as a user. However, you __MUST__ be logged in in order to view the buttons, enabling you to edit or delete a group if you have the proper authorization.

Without being the owner of a group:

![group details page](https://user-images.githubusercontent.com/100141010/182066090-b07a83b1-95b2-4a6f-b6c4-cad2a7ffdc86.png)

If you are the owner of the group:

![owned group details](https://user-images.githubusercontent.com/100141010/182068402-b9461226-949f-4128-8bae-a132943847f6.png)

clicking either of the buttons will bring up a new form for editing the group details or confirming your decision to delete the group.

![edit group form](https://user-images.githubusercontent.com/100141010/182066747-ce00f4f4-f007-421f-a0f3-8995a3b3c46b.png)
![delete group confirmation](https://user-images.githubusercontent.com/100141010/182066760-6f3dcc0c-6fb0-4147-b18b-b4966972b0a2.png)

### Creating a group form

If you are logged in, you are able to start creating groups right away. either using the button in the top right of the app screen, or using the link in thefooter of the application.

the form will be shown as below, and you will be guided through the process of creating your group:

![create a group form](https://user-images.githubusercontent.com/100141010/182068450-302040cb-098d-4fd8-8deb-67f60a0b19c6.png)

### Event details page

Clicking on an event card will bring  you to the details page for that event, from here you have the ability to edit or delete the event, as long as you are the owner of the egroup the event belongs to.

![event details](https://user-images.githubusercontent.com/100141010/182068130-8796ab9d-1cfd-4b59-a793-0be6f2d67fae.png)

![edit event form](https://user-images.githubusercontent.com/100141010/182068149-4dd65633-83c5-4fbe-9ca9-32ae2312ea72.png)

### Creating an event

being the owner of the group will allow you to create an event through the "create an event" button on the events tab when viewing the group details:

![creat an event button](https://user-images.githubusercontent.com/100141010/182067438-29d10115-8d9e-4360-9fe1-7d8d894ee79e.png)

![create an event form](https://user-images.githubusercontent.com/100141010/182067449-ca814a35-9fe5-4a03-a3df-898fa808620d.png)

### Planned features

Currently planned features:
- The addition of users to be able to join groups and events and to see their status on the events and groups details pages.
- The ability to add venues to groups. these can then be used in the creation of events.
- The ability to add photos


