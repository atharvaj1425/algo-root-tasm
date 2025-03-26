# API Documentation

## Project Setup

This project is built using the MERN (MongoDB, Express.js, React, Node.js) stack. Follow the steps below to set up the project locally:

### Installation Steps
1. Clone the repository:
   ```sh
   git clone <repository-url>
   cd <project-folder>
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Set up environment variables in a `.env` file:
   ```
   MONGO_URI=<your-mongodb-connection-string>
   JWT_SECRET=<your-secret-key>
   PORT=4000
   ```
4. Start the server:
   ```sh
   npm start
   ```

## API Endpoints

### Authentication Routes

#### Register a New User
**URL:** `POST http://localhost:4000/api/auth/register`

**Request Body:**
```json
{
    "email": "4@gmail.com",
    "username": "jammie14",
    "password": "12345678"
}
```

**Response:**
```json
{
    "statusCode": 201,
    "data": {
        "token": "<jwt-token>"
    },
    "message": "User registered successfully",
    "success": true
}
```

#### User Login
**URL:** `POST http://localhost:4000/api/auth/login`

**Request Body:**
```json
{
    "email": "1@gmail.com",
    "password": "12345678"
}
```

**Response:**
```json
{
    "statusCode": 200,
    "data": {
        "token": "<jwt-token>"
    },
    "message": "User logged in successfully",
    "success": true
}
```

### Task Management Routes

#### Get All Tasks
**URL:** `GET http://localhost:4000/api/tasks/get-tasks`

**Response:**
```json
{
    "statusCode": 200,
    "data": [
        {
            "_id": "67e38c876c2f335486f98029",
            "title": "123",
            "description": "qwerty",
            "completeStatus": false,
            "owner": "67e2d380678ceb015e6bea84",
            "createdAt": "2025-03-26T05:11:35.236Z",
            "updatedAt": "2025-03-26T05:11:35.236Z",
            "__v": 0
        }
    ],
    "message": "Tasks retrieved successfully",
    "success": true
}
```

#### Add a New Task
**URL:** `POST http://localhost:4000/api/tasks/add-tasks`

**Request Body:**
```json
{
    "title": "tasm",
    "description": "algo_groot_4"
}
```

**Response:**
```json
{
    "statusCode": 201,
    "data": {
        "title": "tasm",
        "description": "algo_groot_4",
        "completeStatus": false,
        "owner": "67e2d380678ceb015e6bea84",
        "_id": "67e41834ec9ca24e0956fdf9",
        "createdAt": "2025-03-26T15:07:32.931Z",
        "updatedAt": "2025-03-26T15:07:32.931Z",
        "__v": 0
    },
    "message": "Task created successfully",
    "success": true
}
```

#### Update a Task
**URL:** `PUT http://localhost:4000/api/tasks/:id`

**Request Body:**
```json
{
    "title": "updated task title",
    "description": "updated description",
    "completeStatus": true
}
```

**Response:**
```json
{
    "statusCode": 200,
    "message": "Task updated successfully",
    "success": true
}
```

#### Delete a Task
**URL:** `DELETE http://localhost:4000/api/tasks/:id`

**Response:**
```json
{
    "statusCode": 200,
    "message": "Task deleted successfully",
    "success": true
}
```

## Field Descriptions
- **`completeStatus`**: This field represents whether a task is completed (`true`) or still pending (`false`).

## Testing the API

### Using Postman
1. Open Postman.
2. Create a new request.
3. Set the request type (GET, POST, PUT, DELETE).
4. Enter the API endpoint URL.
5. Add the request body (for POST, PUT requests).
6. Click "Send" and review the response.

### Using Curl
```sh
curl -X POST "http://localhost:4000/api/auth/register" \
     -H "Content-Type: application/json" \
     -d '{"email": "4@gmail.com", "username": "jammie14", "password": "12345678"}'
```

## Screenshots

### Register Page
```
![Register Page](Screenshot (1).png)
```

### Login Page
```
![Login Page](Screenshot (42).png)
```

### Add Task
```
![Add Task](Screenshot (48).png)
```

### Update Task
```
![Update Task](Screenshot (168).png)
```

### Delete Task
```
![Delete Task](Screenshot (169).png)
```

### Get Tasks
```
![Get Tasks](Screenshot (167).png)
```

