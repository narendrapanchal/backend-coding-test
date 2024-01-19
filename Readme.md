# Backend Coding Test

## Folder Structure

### Helpers

#### Logs

- The `Logs` folder contains all logs related to API requests.

#### Logger.js

- The `Logger.js` file implements a Winston logger to handle and write all logs.

#### commonHelpers.js

- The `commonHelpers.js` file includes the `querySync` imperative function, used for handling queries for both select and update operations.

#### Validators.js

- The `Validators.js` file is responsible for validating data sent from the user.

### Src

#### App.js

- The `App.js` file contains the request handling logic for all the specified routes.

#### schema.js

- The `schema.js` file defines the schema model with data types.

### Tests

#### Api.test.js

- The `Api.test.js` file, located in the `Tests` folder, is used for testing various test cases for the following routes:
  - `/health`
  - `/rides`
  - `/rides/:id`

## Pull Requests

### 1. Documentation ([Pull Request #1](https://github.com/narendrapanchal/backend-coding-test/pull/6))

### 2. Tooling ([Pull Request #2](https://github.com/narendrapanchal/backend-coding-test/pull/1))

- The first pull request introduces essential tooling and configurations to the project.

### 3. Pagination ([Pull Request #3](https://github.com/narendrapanchal/backend-coding-test/pull/3))

- The second pull request focuses on implementing pagination for the `/rides` route.

### 4. Refactoring ([Pull Request #4](https://github.com/narendrapanchal/backend-coding-test/pull/4))

- The third pull request involves refactoring the codebase for improved readability and maintainability.

### 5. Prevent SQL Injections ([Pull Request #5](https://github.com/narendrapanchal/backend-coding-test/pull/5))

- The fourth pull request addresses the critical concern of preventing SQL injections in the application.