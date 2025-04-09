

# 📚 Book Management System in Golang

This is a backend-only **Book Management System** built using **Golang**. It provides a REST API to manage books, including functionalities for adding, updating, retrieving, and deleting book records. The project uses **GORM** for database operations and **Gorilla Mux** for routing.

---

## 🚀 Features

- Add a new book 📖
- Retrieve all books 📚
- Retrieve a book by its ID 🔍
- Update book details ✏️
- Delete a book 🗑️

---

## 🛠️ Technologies Used

- **Golang** (Backend)
- **GORM** (ORM for MySQL)
- **Gorilla Mux** (Router)
- **MySQL** (Database)
- **Postman** (For API testing)

---

## 🔧 Setup and Installation

### 1️⃣ Install Go
Make sure you have **Golang** installed on your system. If not, download it from [here](https://go.dev/dl/).

### 2️⃣ Install Dependencies
Run the following command to install necessary Go packages:

```sh
go get -u gorm.io/gorm
go get -u gorm.io/driver/mysql
go get -u github.com/gorilla/mux
```

### 3️⃣ Set Up MySQL Database
Ensure that **MySQL** is installed and running on your system. Create a database:

```sql
CREATE DATABASE book_management;
```

### 4️⃣ Run the Application
Run the **executable file**:

```sh
./main.exe
```

It will prompt for **MySQL username** and **password**.

---

## 📡 API Endpoints

###  **➕ Create a New Book (POST)**
- **URL:** `POST http://localhost:8000/book/`
- **Headers:**
  ```
  Content-Type: application/json
  ```
- **Body (JSON):**
  ```json
  {
      "name": "The Great Gatsby",
      "Author": "F. Scott Fitzgerald",
      "Publication": "1925"
  }
  ```
- **Expected Response:**
  ```json
  {
      "id": 1,
      "name": "The Great Gatsby",
      "Author": "F. Scott Fitzgerald",
      "Publication": "1925"
  }
  ```

---

### **📚 Get All Books (GET)**
- **URL:** `GET http://localhost:8000/book/`
- **Expected Response (Example):**
  ```json
  [
      {
          "id": 1,
          "name": "The Great Gatsby",
          "Author": "F. Scott Fitzgerald",
          "Publication": "1925"
      },
      {
          "id": 2,
          "name": "To Kill a Mockingbird",
          "Author": "Harper Lee",
          "Publication": "1960"
      }
  ]
  ```

---

### **🔍 Get a Book by ID (GET)**
- **URL:** `GET http://localhost:8000/book/1`
- **Expected Response:**
  ```json
  {
      "id": 1,
      "name": "The Great Gatsby",
      "Author": "F. Scott Fitzgerald",
      "Publication": "1925"
  }
  ```

---

### **✏️ Update a Book (PUT)**
- **URL:** `PUT http://localhost:8000/book/1`
- **Headers:**
  ```
  Content-Type: application/json
  ```
- **Body (JSON):**
  ```json
  {
      "name": "The Great Gatsby (Updated)",
      "Author": "F. Scott Fitzgerald",
      "Publication": "1926"
  }
  ```
- **Expected Response:**
  ```json
  {
      "id": 1,
      "name": "The Great Gatsby (Updated)",
      "Author": "F. Scott Fitzgerald",
      "Publication": "1926"
  }
  ```

---

### **🗑️ Delete a Book (DELETE)**
- **URL:** `DELETE http://localhost:8000/book/1`
- **Expected Response:**
  ```json
  {
      "message": "Book deleted successfully"
  }
  ```


---

## 🏗️ Project Structure

```
Book-Management-System-in-Golang/
│── main.go              # Entry point of the application
│── models/              # Database models
│── routes/              # API route handlers
│── controllers/         # Logic for handling requests
│── config/              # Database connection setup
│── README.md            # Documentation (this file)
```

---

## 🤝 Contribution

Feel free to fork this repository, make changes, and create a pull request! 🚀

---

## 📜 License

This project is **MIT Licensed**. You can use and modify it as per your needs.
