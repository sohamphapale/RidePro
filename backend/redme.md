# backend API Documentation

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

Notes

- The endpoint uses `express-validator` middleware for input validation (see `src/routes/user.routes.js`).
- Passwords are hashed using bcrypt via `user.model.js` before saving.
- The returned `user` object should not include the hashed password because `password` is set with `select: false` in the Mongoose schema.
