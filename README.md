# Library Book Management API

## Description
A REST API to manage library books using Node.js, Express.js and MongoDB.

## Technologies Used
- Node.js
- Express.js
- MongoDB
- Mongoose
- dotenv

## Installation
Run the following command:

```bash
npm install
```

## Start Server


node server.js


Server runs on port 3000.

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| POST | /books | Add a book |
| GET | /books | Get all books |
| GET | /books/:id | Get book by ID |
| PUT | /books/:id | Update a book |
| DELETE | /books/:id | Delete a book |

## Book Fields
- title
- author
- price
- category
- isAvailable

## Testing
All CRUD operations were tested using Thunder Client. MongoDB Compass was used to verify stored records.