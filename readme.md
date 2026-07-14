# 🎉 Event Registration System API

A RESTful backend API for managing events and event registrations. Built with **Node.js**, **Express.js**, and **MongoDB**, featuring JWT authentication, event management, and user registration.

---

## 🚀 Features

### 🔐 Authentication
- User Registration
- User Login
- JWT Authentication
- Password Hashing using bcrypt

### 📅 Event Management
- Create Event
- Get All Events
- Get Event By ID

### 📝 Registration Management
- Register for an Event
- Cancel Registration
- View My Registered Events
- Prevent Duplicate Registration
- Re-register After Cancellation

---

## 🛠️ Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT (jsonwebtoken)
- bcrypt
- dotenv
- CORS

---

## 📂 Project Structure

```text
event-registration-system/
│
├── src/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── app.js
│
├── server.js
├── package.json
├── .env
└── README.md
```

---

## ⚙️ Installation

### Clone Repository

```bash
git clone https://github.com/Nawaz543/codealpha_Event-Registration-System.git
cd event-registration-system
```

### Install Dependencies

```bash
npm install
```

### Configure Environment Variables

Create a `.env` file.

```env
PORT=3000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_key
```

### Start Server

```bash
npm run dev
```

Server runs on:

```
http://localhost:3000
```

---

## 📌 API Endpoints

### Authentication

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | /api/auth/register | Register User |
| POST | /api/auth/login | Login User |

---

### Events

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | /api/events/create | Create Event |
| GET | /api/events | Get All Events |
| GET | /api/events/:id | Get Event By ID |

---

### Registrations

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | /api/registrations/:eventId/register | Register for Event |
| DELETE | /api/registrations/:eventId/register | Cancel Registration |
| GET | /api/registrations/my-events | Get My Registered Events |

---

## 📸 Screenshots

 ### Thunder Client Response


<img width="1920" height="1140" alt="Screenshot 2026-07-14 213516" src="https://github.com/user-attachments/assets/c4096fd7-d60d-4e12-a290-8d4b47fdcf41" />


##  & MongoDb Database


<img width="1912" height="1083" alt="Screenshot 2026-07-14 213159" src="https://github.com/user-attachments/assets/94154f22-388a-4005-8433-1e2b6a2ee94a" />

---
## 🔒 Authentication

Protected routes require a JWT token.

Example Header:

```http
Authorization: Bearer <your_jwt_token>
```

---

## 📖 Database Models

### User

- name
- username
- email
- password

### Event

- title
- description
- eventDate
- location
- maxParticipants
- registrationCount
- createdBy

### Registration

- userId
- eventId
- status
- createdAt
- updatedAt

---

## 🔮 Future Improvements

- Update Event
- Delete Event
- Search Events
- Event Filters
- Pagination
- Organizer Dashboard
- Maximum Participants Validation

---

## 👨‍💻 Author

**Md Shahnawaz**

Backend Developer Intern @ CodeAlpha
