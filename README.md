# Student Profile Manager

Student Profile Manager is a simple full-stack web application that lets users register, log in, view their profile, log out, and delete their account. The project uses a Node.js and Express backend with MongoDB for data storage and JWT-based authentication.

## Features

- User registration with password hashing
- User login with JWT authentication
- Profile viewing after authentication
- Logout from the current session
- Account deletion
- Student details such as name, age, course, college, and skills

## Tech Stack

- Frontend: HTML, CSS, JavaScript
- Backend: Node.js, Express.js
- Database: MongoDB with Mongoose
- Authentication: JWT and bcrypt

## Project Structure

```text
student profile manager/
├── backend/
│   ├── middleware/
│   ├── models/
│   ├── package.json
│   └── server.js
└── frontend/
    ├── login.html
    ├── main.js
    ├── profile.html
    ├── profile.js
    ├── register.html
    └── style.css
```

## Prerequisites

Before running the project, make sure you have:

- Node.js and npm installed
- MongoDB running locally on `mongodb://localhost:27017`
- A terminal or code editor such as VS Code

## Installation

1. Open the project folder.
2. Navigate to the backend folder:

```bash
cd backend
```

3. Install dependencies:

```bash
npm install
```

4. Create a `.env` file inside the backend folder and add a JWT secret:

```env
JWTSecretKey=your_secret_key_here
```

## Running the Application

### Start the backend server

```bash
cd backend
npm run dev
```

The backend will run on:

```text
http://localhost:3000
```

### Start the frontend

Open the HTML files in the frontend folder in your browser. A simple option is to use VS Code Live Server or any static file server.

Suggested pages:

- `frontend/register.html` for creating an account
- `frontend/login.html` for signing in
- `frontend/profile.html` for viewing the profile

## API Endpoints

The backend provides the following routes:

- `POST /register` - Register a new user
- `POST /login` - Authenticate a user and return a JWT token
- `GET /profile` - Get the logged-in user profile
- `DELETE /profile` - Delete the logged-in user account
- `GET /` - Basic health check route

## Usage

1. Open the registration page.
2. Create a new account.
3. Log in with your username and password.
4. View your profile details on the profile page.
5. You can also log out or delete your account.

## Notes

- The app expects a local MongoDB instance to be available.
- The frontend communicates with the backend through `http://localhost:3000`.
- Make sure MongoDB is running before starting the backend.

## License

This project is for educational and demonstration purposes.
