# RidePro
This is app for booking ride or cap

## API Documentation

### POST /users/login

This endpoint allows users to log in to the application.

#### Request Body
- `email` (string, required): The email address of the user.
- `password` (string, required): The password of the user.

#### Response
- `200 OK`: Returns a JSON object containing the authentication token and user details.
  ```json
  {
    "token": "<auth_token>",
    "user": {
      "_id": "<user_id>",
      "email": "<user_email>",
      ...
    }
  }
  ```
- `400 Bad Request`: Returns validation errors if the input is invalid.
  ```json
  {
    "errors": [
      { "msg": "Invalid email", "param": "email", "location": "body" },
      ...
    ]
  }
  ```
- `401 Unauthorized`: Returns an error message if the email or password is incorrect.
  ```json
  {
    "message": "Invalid email or password"
  }
  ```
- `500 Internal Server Error`: Returns an error message if there is a server issue.
  ```json
  {
    "message": "Server error"
  }
  ```
