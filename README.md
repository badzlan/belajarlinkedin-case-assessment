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
Authorization: Bearer <jwt_token>

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

