# backend API Documentation

## Register a user
## /users/register

### - Endpoint: `POST /users/register`
- Purpose: Register a new user in the RidePro system. Validates input, hashes the password, saves the user to the database, and returns an authentication token and the created user object.

**Required data** (JSON body)

- fullname: object
  - firstname (string) - required, minimum 3 characters
  - lastname (string) - optional, minimum 3 characters when present
- email (string) - required, must be a valid email address
- password (string) - required, minimum 6 characters

**Validation rules**

- `email` must be a valid email (checked by express-validator in `src/routes/user.routes.js`).
- `fullname.firstname` must be at least 3 characters long.
- `password` must be at least 6 characters long.

Example request

**POST** `/users/register`

**Request body (JSON):**
```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "secret123"
}
```

### Success responses

- **201 Created**
  - **Description:** User successfully registered.
  - **Body (JSON):**
    - `token` (string): JWT token for authentication
    - `user` (object): newly created user object (password is excluded by model select:false)

### Example response

**201 Created**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "64f1c2e5b5d6c2a1b8e4d123",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "soketId": null
  }
}
```

### Error responses


- 400 Bad Request

  - Description: Input validation failed.
  - Body: `{ "errors": [ ... ] }` (array of validation error objects from express-validator)

- 500 Internal Server Error
  - Description: Something went wrong on the server while creating the user.

### Example error responses

**400 Bad Request**
```json
{
  "errors": [
    {
      "msg": "Invalid email",
      "param": "email",
      "location": "body"
    },
    {
      "msg": "First name must be at least 3 characters long",
      "param": "fullname.firstname",
      "location": "body"
    }
  ]
}
```

**500 Internal Server Error**
```json
{
  "error": "Error creating user"
}
```

## Login a user
## /users/login

### - Endpoint: `POST /users/login`
- Purpose: Authenticate an existing user in the RidePro system. Validates input, checks credentials, and returns an authentication token and user object.

**Required data** (JSON body):

- `email` (string) - required, must be a valid email address
- `password` (string) - required, minimum 6 characters

**Validation rules**

- `email` must be a valid email
- `password` must be at least 6 characters long.

### Example request

**POST** `/users/login`

**Request body (JSON):**
```json
{
  "email": "john.doe@example.com",
  "password": "secret123"
}
```

### Success responses

- **200 OK**
  - **Description:** User successfully authenticated.
  - **Body (JSON):**
    - `token` (string): JWT token for authentication
    - `user` (object): authenticated user object

**Example response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "64f1c2e5b5d6c2a1b8e4d123",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com"
  }
}
```

### Error responses

- **400 Bad Request**
  - **Description:** Input validation failed.
  - **Body:** `{ "errors": [ ... ] }` (array of validation error objects from express-validator)

**Example response:**
```json
{
  "errors": [
    {
      "msg": "Invalid email",
      "param": "email",
      "location": "body"
    },
    {
      "msg": "Password must be at least 6 characters long",
      "param": "password",
      "location": "body"
    }
  ]
}
```

- **401 Unauthorized**
  - **Description:** Invalid email or password.
  - **Body:** `{ "message": "Invalid email or password" }`

**Example response:**
```json
{
  "message": "Invalid email or password"
}
```

- **500 Internal Server Error**
  - **Description:** Something went wrong on the server while authenticating the user.

**Example response:**
```json
{
  "message": "Server error"
}
```

### Notes
