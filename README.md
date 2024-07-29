# blog-list-application
Blog List Application! Backend + Frontend

Website has been deployed on Render!

Test it here: https://blog-list-application.onrender.com


## Summary of Tech Stack

"MERN" stack: MongoDB, Express, React, Node.js

## Frontend
- **React**: For building the user interface.
- **React-Bootstrap**: For styling the application.
- **Redux**: For state management.
- **React Router**: For handling routing and navigation.

## Backend
- **Node.js**: Server-side JavaScript runtime.
- **Express**: Web application framework for Node.js.
- **MongoDB**: NoSQL database for storing data.
- **Mongoose**: ODM (Object Data Modeling) library for MongoDB and Node.js.
- **Bcrypt**: For hashing passwords.

## Authentication
- **JWT (JSON Web Tokens)**: For managing user authentication and authorization.

## Deployment
- **Render**: Platform for deploying web applications.
  - Notes: when setting up, configure mongoURL and hash as variables in Render env 

The frontend has been built and placed into /backend/dist. The application is deployed from there, aka backend/dist, which references the endpoints from /.