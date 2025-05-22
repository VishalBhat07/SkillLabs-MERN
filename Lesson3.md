# Lesson 3 - React Router Dom and Basics of Axios

## Setting up react-router-dom

1. Installing the npm package `react-router-dom`

```bash
npm install react-router-dom
# OR
yarn add react-router-dom
```

2. Wrap your App: In src/main.jsx (or your application's entry point), import BrowserRouter and wrap your <App /> component.

```jsx
// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom"; // Import BrowserRouter

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      {" "}
      {/* Wrap App with BrowserRouter */}
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
```

3. Defining the routes

```jsx
// src/App.jsx
import { Routes, Route, Link } from "react-router-dom";
import Home from "./components/Home"; // Create these components
import About from "./components/About";
import Contact from "./components/Contact";
import NotFound from "./components/NotFound"; // For 404 page

function App() {
  return (
    <div>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
```

## useLocation & useNavigate

### useLocation

```jsx
import { useLocation } from "react-router-dom";

const CurrentLocation = () => {
  const location = useLocation(); // Call the hook

  return (
    <div>
      <h3>Current Path: {location.pathname}</h3>
    </div>
  );
};

export default CurrentLocation;
```

### useNavigate

```jsx
import { useNavigate } from "react-router-dom";

const DashboardButton = () => {
  const navigate = useNavigate(); // Get the navigate function

  const handleGoToDashboard = () => {
    navigate("/dashboard");
  };

  return <button onClick={handleGoToDashboard}>Go to Dashboard</button>;
};

export default DashboardButton;
```

## Axios

### Basics of Asynchronous JavaScript

In programming, operations can be synchronous or asynchronous.

Synchronous (Blocking): Code executes line by line, and each line must finish before the next one starts. If a line takes a long time (e.g., fetching data from a server), the entire program freezes until that operation is complete.

Asynchronous (Non-Blocking): Code execution doesn't wait for a long-running operation to finish. Instead, the operation runs in the background, and when it's done, it notifies the main program (e.g., via a callback or a Promise) that it has completed. This allows the rest of your code to continue executing, keeping your application responsive.

### Common HTTP requests

1. GET

   Purpose: Retrieve data from the server.
   Characteristic: Should be idempotent (repeated requests have no additional side effects).
   Example: Fetching a user's profile, loading a webpage.

2. POST:

   Purpose: Send data to the server to create a new resource.
   Characteristic: Not idempotent (repeated requests might create multiple resources).
   Example: Submitting a new user registration form, posting a comment.

3. PUT:

   Purpose: Update an existing resource or create it if it doesn't exist. It typically replaces the entire resource with the provided data.
   Characteristic: Idempotent (repeated requests result in the same state of the resource).
   Example: Fully updating a user's entire contact information.

4. PATCH:

   Purpose: Apply partial modifications to an existing resource.
   Characteristic: Not necessarily idempotent (depends on implementation).
   Example: Updating only a user's email address without affecting other fields.

5. DELETE:

   Purpose: Remove a specified resource from the server.
   Characteristic: Idempotent (repeated requests result in the resource being gone, which is the same state).
   Example: Deleting a user account, removing a product from a cart.

### What are HTTP Status Codes?

HTTP Status Codes are three-digit numbers sent by a web server in response to a client's request (e.g., your browser asking for a webpage, or your app fetching data). They act like a server's "report card" for your request, indicating whether it was successful, redirected, or if an error occurred.

- 200 OK
- 201 Created
- 404 Not Found
- 500 Internal Server Error

## Axios

Axios is a popular, promise-based HTTP client for the browser and Node.js. It's widely used in React applications for making API calls because it offers a more consistent and feature-rich experience.

- Automatic JSON Transformation: Axios automatically transforms JSON data for requests and responses, so you don't need to manually call .json() on responses.
- Better Error Handling: Axios provides clearer error handling, often catching non-2xx status codes directly in the .catch() block.

[JSON Placeholder API]()

### Setting up Axios

```bash
npm install axios
# OR
yarn add axios
```

### GET Request

```jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        setUsers(response.data); // Set the fetched users in state
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, []);

  return (
    <div>
      <h2>Users</h2>
      {users.map((user) => (
        <p key={user.id}>{user.name}</p>
      ))}
    </div>
  );
}

export default UserList;
```

### POST Request

```jsx
import React, { useState } from "react";
import axios from "axios";

function CreatePost() {
  const [title, setTitle] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("https://jsonplaceholder.typicode.com/posts", {
        title: title,
        body: "Sample body",
        userId: 1,
      })
      .then((response) => {
        console.log("Post created:", response.data);
        alert("Post submitted!");
      })
      .catch((error) => {
        console.error("Error creating post:", error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter post title"
      />
      <button type="submit">Submit</button>
    </form>
  );
}

export default CreatePost;
```

---

Thank you for taking the time to go through these notes! I hope this `README.md` serves as a helpful guide to understanding the foundational concepts of `React development`, including `project setup`, `component creation`, routing with `react-router-dom`, making `HTTP requests with Axios`, and the important role of asynchronous JavaScript and HTTP status codes.

You can then explore the code examples, modify them, and experiment to solidify your understanding. Don't hesitate to play around with the different concepts discussed. Happy coding!
