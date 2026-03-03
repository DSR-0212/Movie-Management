#  Movie Management System (MERN Stack)

##  Project Overview

Movie Management System is a full-stack MERN application that allows
users to manage movies, filter shows, and book tickets through a modern
and responsive interface.

The system includes movie status management (Active / Inactive / ComingSoon), ticket booking functionality, sorting, filtering, and theme
toggle options.

------------------------------------------------------------------------

##  Tech Stack

### Frontend

-   React.js (Vite)
-   React Router 
-   Axios
-   Tailwind CSS
-   React Hot Toast

### Backend

-   Node.js
-   Express.js
-   MongoDB
-   Mongoose
-   dotenv
-   CORS

------------------------------------------------------------------------

##  Core Features

###  Movie Management

-    Add New Movie
-    View Movie Details
-    Edit Movie
-    Delete Movie
-    Sort Movie

###  Ticket Booking System

-   Book tickets for active movies
-   My Tickets page to view booked tickets

###  Filtering & Sorting

-    Search movies by name
-    Filter by screen (All Screens option)
-    Sort movies by show time
-    Show Active movies only

###  Movie Status Tags

-    Active
-    Inactive
-    Coming Soon

###  UI Features

-   Dark / Light mode toggle
-   Responsive card layout
-   Modal for movie details
-   Clean and modern Tailwind design with 'Retro Theme'

------------------------------------------------------------------------

##  Project Structure

    MOVIE MANAGEMENT SYSTEM
    │
    ├── backend
    │   ├── src
    │   │   ├── config
    │   │   │   └── db.js
    │   │   ├── controllers
    │   │   │   └── movieController.js
    │   │   ├── models
    │   │   │   └── movieShow.js
    │   │   ├── routes
    │   │   │   └── movieRoutes.js
    │   │   └── server.js
    │   ├── .env
    │   ├── package.json
    │
    ├── frontend
    │   ├── public
    │   ├── src
    │   │   ├── components
    │   │   │   ├── MovieCard.jsx
    │   │   │   ├── MovieDetailsModal.jsx
    │   │   │   ├── MovieNotFound.jsx
    │   │   │   └── Navbar.jsx
    │   │   ├── lib
    │   │   │   ├── axios.js
    │   │   │   └── utils.js
    │   │   ├── pages
    │   │   │   ├── HomePage.jsx
    │   │   │   ├── CreatePage.jsx
    │   │   │   ├── EditPage.jsx
    │   │   │   ├── MovieDetailPage.jsx
    │   │   │   ├── BookTicketPage.jsx
    │   │   │   ├── MyTicketsPage.jsx
    │   │   │   └── UpcomingPage.jsx
    │   │   ├── App.jsx
    │   │   ├── main.jsx
    │   │   └── index.css
    │   ├── index.html
    │   ├── tailwind.config.js
    │   ├── postcss.config.js
    │   ├── vite.config.js
    │   └── package.json
    │
    └── README.md

------------------------------------------------------------------------

##  Database Schema (Movie Model)

    {
      MovieName: String,
      TheaterName: String,
      MovieTime: String,
      SeatAvailable: String,
      ShowStatus: String,
      screen: String,
      MoviePrice: Number,
      showTime: String,
      status: String,   // Active / Inactive / Coming Soon
      createdAt: Date
    }

------------------------------------------------------------------------

##  Setup Instructions

### Install Backend

    cd backend
    npm install
    npm run dev

Backend runs on: http://localhost:3000

------------------------------------------------------------------------

### Install Frontend

    cd frontend
    npm install
    npm run dev

Frontend runs on: http://localhost:5173

------------------------------------------------------------------------

##  API Endpoints

  Method   Endpoint          Description
  -------- ----------------- ------------------
  GET      /api/movies       Get all movies
  GET      /api/movies/:id   Get single movie
  POST     /api/movies       Create movie
  PUT      /api/movies/:id   Update movie
  DELETE   /api/movies/:id   Delete movie

------------------------------------------------------------------------

##  Implementation Highlights

-   ES6 import syntax used (No require)
-   MVC architecture (Models, Controllers, Routes)
-   RESTful API design
-   Dynamic filtering and sorting on frontend
-   Reusable React components
-   Responsive design using Tailwind CSS

------------------------------------------------------------------------

##  Author

Sadaf Darukar
MERN Stack Academic Project