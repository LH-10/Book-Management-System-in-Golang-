

#  Book Management System – Full Stack (Go + React)

This is a **full-stack Book Management System** built with **Golang** for the backend and **React (Vite)** for the frontend. The application offers a responsive user interface and robust backend functionalities, including secure user authentication, book management, and seamless API integration.

---

##  Features

###  User Authentication

* Secure signup and login using **Argon2id** password hashing and **JWT** for session management.
* Environment variables managed via `.env` files for enhanced security.

###  Book Management

* **CRUD Operations**: Add, view, update, and delete books.
* Retrieve books by ID or list all available books.

###  Frontend

* Built with **React** and **Vite** for fast performance.
* Fully **responsive design** compatible with desktops, tablets, and mobile devices.

---

##  Technologies Used

* **Backend**: Golang, GORM (ORM), Gorilla Mux (Router), MySQL
* **Frontend**: React, Vite, Axios
* **Authentication**: Argon2id (password hashing), JWT (token-based authentication)
* **Testing**: Postman

---

##  Setup and Installation

### 1️ Clone the Repository

```bash
git clone https://github.com/yourusername/book-management-system.git
cd book-management-system
```

### 2️ Backend Setup

* Navigate to the backend directory:


```bash
cd backend
```

####  Create a `.env` file and add your configuration:

```env
# Path where book images are stored on the server
BOOK_IMAGES_PATH=./images

# URL used by the frontend to access book images
BOOK_IMAGE_URL_FOR_CLIENT=http://localhost:8000/images

# JWT secret key for authentication
JWT_SECRET=your_jwt_secret_key

# Database configuration
DATABASE_NAME=book_management
SQL_USER=root
SQL_PASSWORD=your_password
Host_Name="localhost"

```
####  Install Go dependencies

```bash
go mod tidy
```

####  Run the backend

```bash
go run CMD/main/main.go
```


### 3️ Frontend Setup

* Navigate to the frontend directory:

  ```bash
  cd ../Frontend
  ```

* Install dependencies:

  ```bash
  npm install
  ```


  ...
* Run the application:

  ```bash
  npm run dev
  ```

---

##  API Endpoints

###  Authentication

* **Signup**: `POST /signup`
* **Login**: `POST /login`

###  Book Management

* **Create Book**: `POST /book/`
* **Get All Books**: `GET /book/`
* **Get Book by ID**: `GET /book/{id}`
* **Update Book**: `PUT /book/{id}`
* **Delete Book**: `DELETE /book/{id}`

---

##  Project Structure

```
book-management-system/
├── backend/
│   ├── CMD/
│   │   └── main/
│   │       └── main.go          # Entry point for the Go backend server
│   ├── config/                  # Handles configuration like DB and env loading
│   ├── controllers/             # Business logic for API endpoints
│   ├── models/                  # Database models and structs
│   ├── routes/                  # API route definitions
│   └── .env                     # Environment variables for backend
│
├── frontend/
│   ├── public/                  # Static assets like index.html
│   ├── src/                     # React source code (components, pages, etc.)
│
└── README.md                    # Project documentation
```

---





##  License

This project is licensed under the **MIT License**.

---

