# DocConnect

## Description

DocConnect is a platform for connecting doctors and patients. Authenticated users can add patients and doctors, input their details, and map them within the system to facilitate easy communication and appointment scheduling. The project uses a Next.js frontend for a responsive user interface and a Node.js/Express backend with PostgreSQL for data management and user authentication.

## Getting Started

These instructions will help you get DocConnect up and running on your local machine.

### Prerequisites

*   [Node.js](https://nodejs.org/) (version >= 18)
*   [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
*   [Git](https://git-scm.com/)
*   A configured PostgreSQL database

### Installation

1.  **Clone the repository:**

    ```bash
    git clone <repository-url>
    cd DocConnect
    ```

2.  **Backend Setup:**

    *   Navigate to the `backend` directory:

        ```bash
        cd backend
        ```

    *   Install backend dependencies:

        ```bash
        npm install  # or yarn install
        ```

        (Refer to the `backend/package.json` file for a list of dependencies, including `express`, `sequelize`, `pg`, `bcrypt`, `jsonwebtoken`, and `dotenv`.)

    *   Configure environment variables:

        *   Create a `.env` file in the `backend` directory.
        *   Add the following environment variables, adjusting the values as needed:

            ```
            PORT=5000
            DATABASE_URL=postgres://user:password@host:port/database
            JWT_SECRET=your-secret-key
            JWT_EXPIRES_IN=7d
            BCRYPT_ROUNDS=10
            ```

            *   **Note:** Replace `<repository-url>`, `postgres://user:password@host:port/database`, and `your-secret-key` with your actual values. The `DATABASE_URL` should point to your PostgreSQL database.

    *   Set up the database schema using Sequelize:

        *   The project uses Sequelize as an ORM to interact with the PostgreSQL database. The models are defined in the `backend/models` directory (e.g., `user.js`, `patient.js`, `doctor.js`).
        *   Apply the database schema:
            *   The `app.js` file includes the line `await sequelize.sync({ alter: true });`. This line will automatically create or update your database schema based on the Sequelize models.
            *   **Important:** In a production environment, it's highly recommended to use Sequelize migrations instead of `sequelize.sync({ alter: true })`.

    *   Start the backend server:

        ```bash
        npm run dev  # or yarn dev (check backend/package.json for the correct command)
        ```

        (Examine the `backend/package.json` file for the correct command to start the backend. It's likely using `nodemon` for development.)

3.  **Frontend Setup:**

    *   Open a new terminal window.
    *   Navigate to the `frontend` directory:

        ```bash
        cd frontend
        ```

    *   Install frontend dependencies:

        ```bash
        npm install  # or yarn install
        ```

        (Refer to the `frontend/package.json` file for a list of dependencies, including `next`, `react`, `tailwindcss`, etc.)

    *   Configure the API base URL:

        *   In `frontend/src/lib/api.js`, ensure that `API_BASE` is set correctly to point to your backend:

            ```javascript
            const API_BASE = 'http://localhost:5000'; // Adjust if your backend runs on a different port
            ```

    *   Start the frontend development server:

        ```bash
        npm run dev  # or yarn dev (check frontend/package.json for the correct command)
        ```

        This will usually start the frontend at `http://localhost:3000`.

### Understanding the Architecture

*   **Frontend (Next.js):**
    *   Located in the `frontend` directory.
    *   Uses React components for building the user interface (found in `frontend/src/pages` and `frontend/src/components`).
    *   Utilizes `frontend/src/lib/api.js` to make API calls to the backend.
    *   Styled with Tailwind CSS (configured in `frontend/tailwind.config.js` and `frontend/src/styles/globals.css`).
*   **Backend (Node.js/Express):**
    *   Located in the `backend` directory.
    *   Uses Express.js to handle routing and HTTP requests.
    *   Connects to a PostgreSQL database using Sequelize.
    *   **Models:** Define the database schema and data structures (located in `backend/models`).  Examples: `user.js`, `patient.js`, `doctor.js`.
    *   **Controllers:** Handle the business logic for each route. They interact with the models to perform database operations (located in `backend/controllers` - *note: you didn't explicitly provide these, but they are conventional*).
    *   **Routes:** Define the API endpoints (located in `backend/routes`).  Examples: `auth.js`, `patients.js`, `doctors.js`, `mappings.js`.
    *   **Middleware:** Functions that intercept requests and responses to perform tasks like authentication, authorization, and error handling (located in `backend/middleware`).  Example: `authMiddleware.js`.

### Usage

1.  **Access the application:**

    *   Open your web browser and go to `http://localhost:3000` (or the appropriate address if you've configured a different port).

2.  **Register and Login:**

    *   Use the registration and login pages to create an account and authenticate. The links are on the home page.

3.  **Using the Application:**

    *   Once logged in, users can:
        *   **Add Patients:** Navigate to the "Patients" section and add new patient records, including their personal and medical details.
        *   **Add Doctors:** Navigate to the "Doctors" section to register new doctors, including their specialization and contact information.
        *   **Map Patients and Doctors:** Use the "Mappings" feature to link patients to specific doctors, establishing the connection for appointments and communication.

### Contributing

[Explain how others can contribute to your project. Include guidelines for submitting pull requests, coding standards, etc.]

### License

[Specify the license under which your project is distributed. e.g., MIT License, Apache 2.0, etc.]