# Vintage Cars API

Welcome to the Vintage Cars API project! This API provides a platform for managing a collection of vintage cars, including operations for creating, retrieving, updating, and deleting car records. It's built using Express.js and MongoDB, offering a robust backend solution for vintage car enthusiasts and collectors.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v12.x or later recommended)
- npm (Node Package Manager)
- yarn (package manager)
- MongoDB (Local or cloud-based)

### Installation

1. Clone the repository to your local machine:

   ```sh
   git clone https://yourrepository.com/vintage-cars-api.git
   cd vintage-cars-api
   ```

2. Install the required npm packages:

   ```sh
   npm install
   yarn install
   ```

3. Set up your environment variables:

   - Copy the `.env.example` file to a new file named `.env`.
   - Fill in the necessary details such as your MongoDB URI.

4. Start the application:

   - For development:
     ```sh
     npm run dev
     ```
   - For production:

     npm run start
     yarn start

     ```

     ```

## Running the Tests

To ensure the reliability and correctness of the API, unit tests and integration tests are provided. Run the tests using the following command:

```sh
npm run test
yarn test
```

## API Endpoints

The API supports the following operations:

- **GET /api/v1/cars**: Retrieve all cars.
- **POST /api/v1/cars**: Create a new car record. Requires an authorization token.
- **GET /api/v1/cars/:id**: Retrieve a single car by its ID.
- **PUT /api/v1/cars/:id**: Update a car record by its ID. Requires an authorization token.
- **DELETE /api/v1/cars/:id**: Delete a car record by its ID. Requires an authorization token.

- **GET /api/v1/users**: Retrieve all users.
- **POST /api/v1/users**: Create a new user record. Requires an authorization token.
- **GET /api/v1/users/:id**: Retrieve a single user by its ID.
- **PUT /api/v1/users/:id**: Update a user record by its ID. Requires an authorization token.
- **DELETE /api/v1/users/:id**: Delete a user record by its ID. Requires an authorization token.

- **GET /api/v1/orders**: Retrieve all orders.
- **POST /api/v1/orders**: Create a new order record. Requires an authorization token.
- **GET /api/v1/orders/:id**: Retrieve a single order by its ID.
- **PUT /api/v1/orders/:id**: Update an order record by its ID. Requires an authorization token.
- **DELETE /api/v1/orders/:id**: Delete an order record by its ID. Requires an authorization token.

## Built With

- **Express.js** - The web framework used
- **MongoDB** - The database used
- **Mongoose** - MongoDB object modeling tool
- **Jest** - The testing framework used

-
