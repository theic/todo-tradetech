# TODO Application Example

This application serves as a showcase of a simple TODO list management system.

### Current Features:

- Authentication implemented with anonymous Firebase users.
- Functionality to create, edit, and delete lists.
- Ability to assign tasks to specific lists.
- Feature to mark tasks as completed.

### Technology Stack

- Node.js (version 18 or higher)
- TypeScript (version 4 or higher)
- Inversify (version 6 or higher)
- Cloud Firestore

### Running the Application

To run the application, execute the following commands:

```bash
npm ci
npm run build
npm run start
```

## Configuration

Create a `.env` file at the root directory of the project. Use the provided `.env.example` as a reference for the necessary configurations.

## Tests

Run the tests with the following command:

```bash
npm run test
```

## Demonstration

To test the application's routes, use the `ENDPOINTS.http` file located in the root directory. The testing requires the [Rest Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) extension to function.

###### signIn & signUp
![auth](https://s9.gifyu.com/images/SF17B.gif)

###### List management
![lists](https://s9.gifyu.com/images/SF17O.gif)

###### Task management

![](https://s9.gifyu.com/images/SF17y.gif)
