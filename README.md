A **MERN stack** (MongoDB, Express.js, React, Node.js) project that replicates core features of the Uber platform. Users can book rides, track drivers in real-time, and manage their profiles. This is a learning project inspired by Uber’s UI/UX and functionality.

---

##  Features

✅ User Authentication (Signup / Login)  
✅ Book a ride with pickup & drop location  
✅ Real-time location tracking with Map APIs  
✅ Driver and Passenger roles  
✅ Ride status updates (Requested, Accepted, Arriving, Completed)  
✅ Responsive design (Mobile-first)  
✅ RESTful API backend with Node.js and Express  

## tech stack


| Frontend          | Backend        | Database  | Others               |
|--------------------|----------------|-----------|----------------------|
| React.js (Vite)    | Node.js        | MongoDB   | Google Maps API      |
| Tailwind CSS       | Express.js     | Mongoose  | JWT (Authentication) |
| Axios              | REST API       |           | Socket.io (Live updates) |

## Project Structure

UberClone/
│
├── Backend/ # Node.js + Express API
│ ├── models/ # Mongoose schemas
│ ├── routes/ # API routes
│ ├── controllers/ # Business logic
│ ├── .env # Environment variables
│
├── frontend/ # React.js (Vite) frontend
│ ├── src/
│ ├── public/
│ ├── package.json
│
├── .gitignore
├── README.md


