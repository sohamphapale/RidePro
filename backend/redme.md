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
  - vehicleType (string) - required, must be one of ["moto", "car", "auto"]

**Validation rules**

- `email` must be a valid email.
- `fullname.firstname` First name must be at least 3 characters long.
- `password` Password must be at least 6 characters long.
- `vehicles.color` Color must be at least 3 characters long.
- `vehicles.plate` Plate must be at least 3 characters long.
- `vehicles.capacity` Capacity must be at least 1.
- `vehicles.vehicleType` Type must be one of the following: moto, car, auto.

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

## Captain Login
## /captains/login

### - Endpoint: `POST /captains/login`
- Purpose: Authenticate an existing captain in the RidePro system. Validates input, checks credentials, and returns an authentication token and captain object.

**Required data** (JSON body):

- `email` (string) - required, must be a valid email address
- `password` (string) - required, minimum 6 characters

**Validation rules**

- `email` must be a valid email (checked by express-validator in `src/routes/captain.routes.js`).
- `password` must be at least 6 characters long.

### Example request

**POST** `/captains/login`

**Request body (JSON):**
```json
{
  "email": "jane.doe@example.com",
  "password": "securepassword"
}
```

### Success responses

- **200 OK**
  - **Description:** Captain successfully authenticated.
  - **Body (JSON):**
    - `token` (string): JWT token for authentication
    - `captain` (object): authenticated captain object

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
  - **Description:** Something went wrong on the server while authenticating the captain.

**Example response:**
```json
{
  "message": "Server error"
}
```

---

## Captain Profile
## /captains/profile

### - Endpoint: `GET /captains/profile`
- Purpose: Retrieve the profile of the currently authenticated captain. Requires a valid JWT token for authentication.

**Headers**

- `Authorization` (string) - required, must be in the format `Bearer <token>`

### Example request

**GET** `/captains/profile`

**Headers:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Success responses

- **200 OK**
  - **Description:** Captain profile successfully retrieved.
  - **Body (JSON):**
    - `captain` (object): authenticated captain object

**Example response:**
```json
{
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

- **401 Unauthorized**
  - **Description:** Missing or invalid token.
  - **Body:** `{ "message": "Unauthorized" }`

**Example response:**
```json
{
  "message": "Unauthorized"
}
```

---

## Captain Logout
## /captains/logout

### - Endpoint: `GET /captains/logout`
- Purpose: Log out the currently authenticated captain by clearing the authentication token and blacklisting it to prevent reuse.

**Headers**

- `Authorization` (string) - optional, must be in the format `Bearer <token>` if not using cookies.

### Example request

**GET** `/captains/logout`

**Headers:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Success responses

- **200 OK**
  - **Description:** Captain successfully logged out.
  - **Body (JSON):**
    - `message` (string): Confirmation message

**Example response:**
```json
{
  "message": "Logged out successfully"
}
```

---

## Create a Ride
## /rides/create

### - Endpoint: `POST /rides/create`
- **Purpose**: Create a new ride request in the RidePro system. Validates input, calculates fare, generates OTP, and saves the ride to the database.

**Required data** (JSON body):
- `pickup` (string) - required, the pickup location.
- `destination` (string) - required, the destination location.
- `vehicleType` (string) - required, type of vehicle (e.g., `auto`, `car`, `moto`)

**Validation rules**:
- `pickup` and `destination` must be non-empty strings.
- `vehicleType` must be one of the allowed types (`auto`, `car`, `moto`)

**Example request**:
```json
{
  "pickup": "123 Main St",
  "destination": "456 Elm St",
  "vehicleType": "car"
}
```

**Success responses**:
- **201 Created**
  - **Description**: Ride successfully created.
  - **Body (JSON)**:
    - `user` (object): User who created the ride.
    - `pickup` (string): Pickup location.
    - `destination` (string): Destination location.
    - `fare` (number): Calculated fare.
    - `otp` (string): Generated OTP for the ride.

**Example response**:
```json
{
  "user": "64f1c2e5b5d6c2a1b8e4d123",
  "pickup": "123 Main St",
  "destination": "456 Elm St",
  "fare": 150,
  "otp": "123456"
}
```

**Error responses**:
- **400 Bad Request**: Missing or invalid input fields.
- **500 Internal Server Error**: Server error while creating the ride.

---

## Get Suggestions
## /maps/get-suggestions

---

## Get Fare
## /rides/get-fare

### - Endpoint: `GET /rides/get-fare`
- **Purpose**: Calculate estimated fares for supported vehicle types between two locations.

**Authentication**
- Requires an authenticated user. Include `Authorization: Bearer <token>` header or use the session cookie `token`.

**Required data** (JSON body)
- `pickup` (string) - required, the pickup location/address.
- `destination` (string) - required, the destination location/address.

**Validation rules**:
- `pickup` and `destination` must be non-empty strings (minimum 3 characters).

**Notes**:
- The route in the code is defined as `GET /rides/get-fare` and the server currently validates `pickup` and `destination` from the request body. Some clients and proxies do not include a body on GET requests — if you run into issues, use a POST client or change the server to accept query parameters instead. The server will reject requests that fail validation.

**Example request**:
```
GET /rides/get-fare
Headers:
  Authorization: Bearer <your_jwt_token>
Content-Type: application/json

Body:
{
  "pickup": "123 Main St, Springfield",
  "destination": "456 Elm St, Springfield"
}
```

**Success responses**:
- **200 OK**
  - **Description**: Fare estimates successfully calculated.
  - **Body (JSON)**: An object containing fare estimates per vehicle type. Example keys: `auto`, `car`, `moto` (numeric values).

**Example response**:
```json
{
  "auto": 120.5,
  "car": 180.75,
  "moto": 90.3
}
```

**Error responses**:
- **400 Bad Request**: Missing or invalid `pickup` or `destination` in the request body. Body will contain `{ "message": "..." }` with the validation error.
- **401 Unauthorized**: Missing or invalid authentication token.
- **500 Internal Server Error**: Server error while calculating fare.

---

### - Endpoint: `GET /maps/get-suggestions`
- **Purpose**: Fetch location suggestions based on user input.

**Required query parameters**:
- `input` (string) - required, the search query.

**Validation rules**:
- `input` must be a non-empty string.

**Example request**:
```
GET /maps/get-suggestions?input=Main
```

**Success responses**:
- **200 OK**
  - **Description**: Suggestions successfully fetched.
  - **Body (JSON)**:
    - `predictions` (array): List of location suggestions.

**Example response**:
```json
{
  "predictions": [
    {
      "description": "Main Street, Springfield",
      "place_id": "ChIJd8BlQ2BZwokRAFUEcm_qrcA"
    },
    {
      "description": "Main Avenue, Metropolis",
      "place_id": "ChIJd8BlQ2BZwokRAFUEcm_qrcB"
    }
  ]
}
```

**Error responses**:
- **400 Bad Request**: Missing or invalid `input` parameter.
- **500 Internal Server Error**: Server error while fetching suggestions.

---

## Get Distance and Time
## /maps/get-distance-time

### - Endpoint: `GET /maps/get-distance-time`
- **Purpose**: Calculate distance and estimated travel time between two locations.

**Required query parameters**:
- `origin` (string) - required, the starting location.
- `destination` (string) - required, the ending location.

**Validation rules**:
- `origin` and `destination` must be non-empty strings.

**Example request**:
```
GET /maps/get-distance-time?origin=123+Main+St&destination=456+Elm+St
```

**Success responses**:
- **200 OK**
  - **Description**: Distance and time successfully calculated.
  - **Body (JSON)**:
    - `distance` (object): Distance details (e.g., value in meters, text description).
    - `duration` (object): Duration details (e.g., value in seconds, text description).

**Example response**:
```json
{
  "distance": {
    "value": 5000,
    "text": "5 km"
  },
  "duration": {
    "value": 600,
    "text": "10 mins"
  }
}
```

**Error responses**:
- **400 Bad Request**: Missing or invalid `origin` or `destination` parameter.
- **500 Internal Server Error**: Server error while calculating distance and time.

---

## Get Coordinates
## /maps/get-cordinates

### - Endpoint: `GET /maps/get-cordinates`
- **Purpose**: Fetch geographical coordinates for a given address.

**Required query parameters**:
- `address` (string) - required, the address to geocode.

**Validation rules**:
- `address` must be a non-empty string.

**Example request**:
```
GET /maps/get-cordinates?address=123+Main+St
```

**Success responses**:
- **200 OK**
  - **Description**: Coordinates successfully fetched.
  - **Body (JSON)**:
    - `lat` (number): Latitude of the address.
    - `lng` (number): Longitude of the address.

**Example response**:
```json
{
  "lat": 40.7128,
  "lng": -74.0060
}
```

**Error responses**:
- **400 Bad Request**: Missing or invalid `address` parameter.
- **500 Internal Server Error**: Server error while fetching coordinates.

