# Nearby-School-Finder-Backend-App

A simple **Nearby School Finder Application** built with **Node.js**, **Express.js**, and **MySQL**. It allows users to add new schools and find nearby schools based on proximity (latitude and longitude).

## Features
- **Add Schools**: Add school details (name, address, latitude, longitude).
- **Find Nearby Schools**: Find schools near a given location based on latitude and longitude.
 
 Base URL: [https://nearby-school-finder-backend-app.onrender.com/](https://nearby-school-finder-backend-app.onrender.com/)

## Project Structure
```
project/
├── public/
│   ├── index.html    # Main HTML
│   ├── style.css     # Custom Styles
│   ├── script.js     # JavaScript
├── server.js         # Express server and API routes
├── database.sql      # SQL file to create the database and table
```

## Prerequisites
- **Node.js**: [Download here](https://nodejs.org/)
- **MySQL**: [Download here](https://www.mysql.com/)

## Setup

1. Clone the repository:
   ```bash
   https://github.com/SheikhAltamash/Nearby-School-Finder-Backend-App.git
   cd Nearby-School-Finder-Backend-App
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up MySQL:
   - Create a database and run the SQL script in `database.sql` to create the `schools` table.

4. Update database credentials in `/models/db.js` if needed.

5. Run the server:
   ```bash
   node server.js
   ```

6. Open the app at `https://nearby-school-finder-backend-app.onrender.com/`.

## API Endpoints

### 1. Add School
- **Endpoint**: `https://nearby-school-finder-backend-app.onrender.com/api/addSchool`
- **Method**: `POST`
- **Request Body**:
  ```json
  {
    "name": "School Name",
    "address": "Address",
    "latitude": 40.7128,
    "longitude": -74.0060
  }
  ```
- **Response**: 
  ```json
  { "message": "School added successfully" }
  ```

### 2. Find Nearby Schools
- **Endpoint**: `https://nearby-school-finder-backend-app.onrender.com/api/listSchools`
- **Method**: `GET`
- **Query Parameters**:
  - `latitude` (Float): User's latitude.
  - `longitude` (Float): User's longitude.
- **Response**:
  ```json
  [
    {
      "name": "Springfield High",
      "distance": 2.45
    }
  ]
  ```

