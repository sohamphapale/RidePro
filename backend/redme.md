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

## Get User Profile
## /users/profile

### - Endpoint: `GET /users/profile`
- Purpose: Retrieve the profile of the currently authenticated user. Requires a valid JWT token for authentication.

**Headers**

- `Authorization` (string) - required, must be in the format `Bearer <token>`

### Example request

**GET** `/users/profile`

**Headers:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Success responses

- **200 OK**
  - **Description:** User profile successfully retrieved.
  - **Body (JSON):**
    - `user` (object): authenticated user object

**Example response:**
```json
{
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

- **401 Unauthorized**
  - **Description:** Missing or invalid token.
  - **Body:** `{ "message": "Unauthorized" }`

**Example response:**
```json
{
  "message": "Unauthorized"
}
```

### Notes

- The `Authorization` header must contain a valid JWT token issued during login.

### Cookies

The application uses cookies to store the authentication token for user sessions. Below are the details:

- **Name:** `token`
- **Purpose:** Stores the JWT token for authenticating user requests.
- **Path:** `/`
- **HttpOnly:** `true` (prevents client-side JavaScript from accessing the cookie)
- **Secure:** `true` (ensures the cookie is sent only over HTTPS, applicable in production environments)

### Notes on Cookies

- The `token` cookie is set during the login process (see `/users/login` endpoint).
- The cookie is automatically sent with subsequent requests to the server, enabling session-based authentication.
- Ensure that the `HttpOnly` and `Secure` flags are properly configured in production to enhance security.

## Logout a user
## /users/logout

### - Endpoint: `GET /users/logout`
- Purpose: Log out the currently authenticated user by clearing the authentication token and blacklisting it to prevent reuse.

**Headers**

- `Authorization` (string) - optional, must be in the format `Bearer <token>` if not using cookies.

### Example request

**GET** `/users/logout`

**Headers:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Success responses

- **200 OK**
  - **Description:** User successfully logged out.
  - **Body (JSON):**
    - `message` (string): Confirmation message

**Example response:**
```json
{
  "message": "Logged out successfully"
}
```

## Register a Captain
## /captains/register

### - Endpoint: `POST /captains/register`
- Purpose: Register a new captain in the RidePro system. Validates input, hashes the password, saves the captain to the database, and returns an authentication token and the created captain object.

**Required data** (JSON body):

- fullname: object
  - firstname (string) - required, minimum 3 characters
  - lastname (string) - optional, minimum 3 characters when present
- email (string) - required, must be a valid email address
- password (string) - required, minimum 6 characters
- vehicles: object
  - color (string) - required, minimum 3 characters
  - plate (string) - required, minimum 3 characters
  - capacity (number) - required, minimum 1
  - vehicleType (string) - required, must be one of ["bike", "car", "auto"]

**Validation rules**

- `email` must be a valid email.
- `fullname.firstname` First name must be at least 3 characters long.
- `password` Password must be at least 6 characters long.
- `vehicles.color` Color must be at least 3 characters long.
- `vehicles.plate` Plate must be at least 3 characters long.
- `vehicles.capacity` Capacity must be at least 1.
- `vehicles.vehicleType` Type must be one of the following: bike, car, auto.

### Example request

**POST** `/captains/register`

**Request body (JSON):**
```json
{
  "fullname": {
    "firstname": "Jane",
    "lastname": "Doe"
  },
  "email": "jane.doe@example.com",
  "password": "securepassword",
  "vehicles": {
    "color": "Red",
    "plate": "ABC123",
    "capacity": 4,
    "vehicleType": "car"
  }
}
```

### Success responses

- **201 Created**
  - **Description:** Captain successfully registered.
  - **Body (JSON):**
    - `token` (string): JWT token for authentication
    - `captain` (object): newly created captain object (password is excluded by model select:false)

**Example response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "captain": {
    "_id": "64f1c2e5b5d6c2a1b8e4d123",
    "fullname": {
      "firstname": "Jane",
      "lastname": "Doe"
    },
    "email": "jane.doe@example.com",
    "vehicles": {
      "color": "Red",
      "plate": "ABC123",
      "capacity": 4,
      "vehicleType": "car"
    }
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
      "msg": "First name must be at least 3 characters long",
      "param": "fullname.firstname",
      "location": "body"
    }
  ]
}
```

- **500 Internal Server Error**
  - **Description:** Something went wrong on the server while creating the captain.

**Example response:**
```json
{
  "message": "Server error"
}
```

### Note


