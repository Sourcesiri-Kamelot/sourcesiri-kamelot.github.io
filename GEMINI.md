# GEMINI.md

## Project Overview

This repository contains the source code for "Helo I'm AI", a Software-as-a-Service (SaaS) platform for AI-powered tools and services. The platform aims to provide a comprehensive suite of AI solutions, including a personal AI assistant, a code generator, and business analytics tools.

The project is built with a modern web stack, including:

*   **Frontend:** HTML, CSS, and JavaScript.
*   **Backend:** Node.js with Express and TypeScript.
*   **Infrastructure:** AWS services, managed with the AWS CDK.

The repository is structured into several directories, including `css`, `js`, `images` for the frontend assets, a `backend` directory for the server-side application, and an `infrastructure` directory for the AWS CDK code.

## Building and Running

The project is divided into a frontend, a backend, and the infrastructure. Each part has its own build and run process.

### Frontend

The frontend consists of static HTML, CSS, and JavaScript files. To run the frontend, you can serve the files with a simple HTTP server.

### Backend

The backend is a Node.js application written in TypeScript. To build and run the backend, follow these steps:

1.  Navigate to the `backend` directory:
    ```bash
    cd backend
    ```
2.  Install the dependencies:
    ```bash
    npm install
    ```
3.  Build the TypeScript code:
    ```bash
    npm run build
    ```
4.  Start the server:
    ```bash
    npm start
    ```

### Infrastructure

The infrastructure is managed with the AWS CDK. To deploy the infrastructure, you need to have the AWS CDK installed and configured with your AWS credentials. Then, you can use the following commands from the `infrastructure` directory:

1.  Navigate to the `infrastructure` directory:
    ```bash
    cd infrastructure
    ```
2.  Install the dependencies:
    ```bash
    npm install
    ```
3.  Synthesize the CloudFormation templates:
    ```bash
    npx cdk synth
    ```
4.  Deploy the stacks:
    ```bash
    npx cdk deploy --all
    ```

## Development Conventions

The project follows standard development conventions for web applications.

*   **Code Style:** The backend code follows the Prettier and ESLint configurations defined in the `backend/package.json` file.
*   **Testing:** The backend includes a test suite using Jest. You can run the tests with the `npm test` command in the `backend` directory.
*   **Contributions:** The `README.md` file provides a high-level overview of the project, but there are no explicit contribution guidelines.
