<p align="center"><img src="https://www.edureka.co/blog/content/ver.1556540029/uploads/2019/05/nodeMongo-1.png" width="400" alt="Logo"></p>

## Project Overview

BelajarLinkedin Case Assessment, create Simple REST API for User Enroll a Class

Technology :

-  [Express.js](https://expressjs.com/).
-  [MongoDB](https://www.mongodb.com/).

## Prerequisite

-  Already install [nodejs](https://nodejs.org/en/download).

## Step by step installation

#### 1. Clone this repository

```
git clone https://github.com/badzlan/belajarlinkedin-case-assessment
```

or

#### Download the zip file

<a href="https://github.com/badzlan/belajarlinkedin-case-assessment">![download zip](https://raw.githubusercontent.com/0x1m4o/Industry-Project/refs/heads/main/public/img/image.png)</a>

#### 2. Go to directory

```
cd belajarlinkedin-case-assessment
```

#### 3. Install dependency with npm

```
npm install
```

#### 4. Copy the content of `.env.example` file then create `.env` file and paste to `.env` file

#### 5. Fill all the content in the `.env` file

#### 6. Start the development server

```
npm run dev
```

---

## API Documentation

### User Register

Endpoint : `POST /api/register`

Request Body :

```json
{
   "name": "admin",
   "email": "admin@gmail.com",
   "password": "12345"
}
```

Response Success (201) :

```json
{
   "message": "Register successful!"
}
```

Response Error (400) :

```json
{
   "error": "All fields are required!"
}
```

```json
{
   "error": "Email already exists!"
}
```

Response Error (500) :

```json
{
   "error": "Internal server error"
}
```

### User Login

Endpoint : `POST /api/login`

Request Body :

```json
{
   "email": "admin@gmail.com",
   "password": "12345"
}
```

Response Success (200) :

```json
{
   "email": "admin@gmail.com",
   "name": "admin",
   "message": "Login successful!",
   "token": "<jwt_token>"
}
```

Response Error (404) :

```json
{
   "error": "User not found!"
}
```

Response Error (400) :

```json
{
   "error": "Invalid password!"
}
```

Response Error (500) :

```json
{
   "error": "Internal server error"
}
```

### User Profile

Endpoint : `GET /api/profile`

Headers (Authorization required) :

-  Authorization: Bearer <jwt_token>

Response Success (200) :

```json
{
   "user": {
      "_id": "68a4345cfe938312e882810b",
      "name": "admin",
      "email": "admin@gmail.com"
   },
   "enrolledCourses": [
      {
         "_id": "68a4347efe938312e882810e",
         "name": "Class SQL",
         "description": "Arcu morbi torquent suscipit rhoncus lorem.",
         "category": "database"
      }
   ]
}
```

Response Error (401 – no/invalid token) :

```json
{
   "error": "Invalid or expired token"
}
```

Response Error (404) :

```json
{
   "error": "User not found!"
}
```

Response Error (500) :

```json
{
   "error": "Internal server error"
}
```

### Create Class

Endpoint : `POST /api/classes`

Headers (Authorization required) :

-  Authorization: Bearer <jwt_token>

Request Body :

```json
{
   "name": "Class MySQL",
   "description": "Arcu morbi torquent suscipit rhoncus lorem.",
   "category": "database"
}
```

Response Success (201) :

```json
{
   "message": "Class created successfully!"
}
```

Response Error (400) :

```json
{
   "error": "All fields are required!"
}
```

Response Error (500) :

```json
{
   "error": "Internal server error"
}
```

### Get All Classes

Endpoint : `GET /api/classes`

Headers (Authorization required) :

-  Authorization: Bearer <jwt_token>

Query Params (optional) :

-  category → filter class berdasarkan kategori.

Response Success (200) :

```json
{
   "classes": [
      {
         "_id": "68a38891d26dfe49c84b5f8a",
         "name": "Class Flutter",
         "description": "Arcu morbi torquent suscipit rhoncus lorem.",
         "category": "mobile"
      },
      {
         "_id": "68a38898d26dfe49c84b5f8c",
         "name": "Class Laravel",
         "description": "Arcu morbi torquent suscipit rhoncus lorem.",
         "category": "web"
      }
   ]
}
```

Response Error (404) :

```json
{
   "error": "Class not found"
}
```

```json
{
   "message": "No class found"
}
```

Response Error (500) :

```json
{
   "error": "Internal server error"
}
```

### Get One Class

Endpoint : `GET /api/classes/<:id>`

Headers (Authorization required) :

-  Authorization: Bearer <jwt_token>

Response Success (200) :

```json
{
   "class": {
      "_id": "68a3889ed26dfe49c84b5f8e",
      "name": "Class AWS",
      "description": "Arcu morbi torquent suscipit rhoncus lorem.",
      "category": "cloud"
   },
   "enrolledUsers": [
      {
         "_id": "68a4345cfe938312e882810b",
         "name": "admin",
         "email": "admin@gmail.com"
      }
   ]
}
```

Response Error (404) :

```json
{
   "error": "Class not found!"
}
```

Response Error (500) :

```json
{
   "error": "Internal server error"
}
```

### Update Class

Endpoint : `PUT /api/classes/<:id>`

Headers (Authorization required) :

-  Authorization: Bearer <jwt_token>

Request Body :

```json
{
   "name": "Class SQL",
   "description": "Arcu morbi torquent suscipit rhoncus lorem.",
   "category": "database"
}
```

Response Success (200) :

```json
{
   "message": "Class updated successfully!",
   "class": {
      "_id": "68a4347efe938312e882810e",
      "name": "Class SQL",
      "description": "Arcu morbi torquent suscipit rhoncus lorem. ",
      "category": "database"
   }
}
```

Response Error (400) :

```json
{
   "error": "All fields are required!"
}
```

Response Error (404) :

```json
{
   "error": "Class not found!"
}
```

Response Error (500) :

```json
{
   "error": "Internal server error"
}
```

### Delete Class

Endpoint : `DELETE /api/classes/<:id>`

Headers (Authorization required) :

-  Authorization: Bearer <jwt_token>

Response Success (200) :

```json
{
   "message": "Class deleted successfully!"
}
```

Response Error (404) :

```json
{
   "error": "Class not found!"
}
```

Response Error (500) :

```json
{
   "error": "Internal server error"
}
```

### Enroll to Class

Endpoint : `POST /api/enroll`

Headers (Authorization required) :

-  Authorization: Bearer <jwt_token>

Request Body :

```json
{
   "class_id": "68a3889ed26dfe49c84b5f8e"
}
```

Response Success (201) :

```json
{
   "message": "Enrollment successful!"
}
```

Response Error (400) :

```json
{
   "error": "You are already enrolled in this class!"
}
```

Response Error (500) :

```json
{
   "error": "Internal server error"
}
```

---

## Authors

-  [@badzlan](https://github.com/badzlan)
