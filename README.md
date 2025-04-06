# Card Collection Manager

A web application for managing your card collections, built with Angular frontend and Node.js/Express backend.

## Project Structure

```
├── backend/
│   ├── models/         # Database models
│   ├── routes/         # API routes
│   ├── images/         # Image storage
│   ├── server.js       # Main server file
│   ...
│
├── frontend/
│   ├── src/           # Source files
│   ├── angular.json   # Angular configuration
│   └── tsconfig.json  # TypeScript configuration
```

## Prerequisites

- Node.js (v14 or higher)
- npm (Node Package Manager)
- MongoDB

## Setup Instructions

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the server:
   ```bash
   node server.js
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   ng serve
   ```

The application will be available at `http://localhost:4200`

## Features

- User authentication and authorization
- Card collection management
- Image upload and storage
- Search and filter functionality
- Responsive design

## Technologies Used

- Frontend: Angular, TypeScript
- Backend: Node.js, Express
- Database: MongoDB
- Authentication: JWT
