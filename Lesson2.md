# Lesson 2 - Rendering components, Props & Hooks in React

---

# Import and Export Components in React

React applications are built using reusable components. To maintain a clean and scalable codebase, components must be organized efficiently. This is where import and export functionalities play a crucial role. By separating components into different files, you ensure clarity, readability, and maintainability in your project.

## Why Import and Export Components?

When developing a React application, it is impractical to write all components in a single file. Doing so makes debugging difficult and reduces reusability. Instead, React encourages modularization, where each component resides in its own file. This approach enhances:

- Readability: Easier to navigate through files.
- Reusability: Components can be used across different parts of the application.
- Maintainability: Simplifies debugging and updating.

## Types of Exports in React

React allows two types of exports:

### 1. Default Exports

A default export is used when you want to export a single module (usually a component). This allows for flexibility in naming the import.

Example:

```jsx
// Button.js
export default function Button() {
  return <button>Click Me</button>;
}
```

Importing the Default Export:

```jsx
// App.js
import ButtonComponent from "./Button";

function App() {
  return <ButtonComponent />;
}
```

### 2. Named Exports

Named exports are useful when you need to export multiple functions or components from a single file.

Example:

```jsx
// utils.js
export function add(a, b) {
  return a + b;
}

export function subtract(a, b) {
  return a - b;
}
```

Importing Named Exports:

```jsx
import { add, subtract } from "./utils";
```

Renaming Named Imports:

```jsx
import { add as sum } from "./utils";
```

## Project Structure

```
src/
├── components/   # Reusable UI components
│   ├── Button.jsx
│   ├── Card.jsx
│   ├── Navbar.jsx
├── pages/        # Page-level components
│   ├── Home.jsx
│   ├── About.jsx
│   ├── Contact.jsx
├── utils/        # Helper functions
│   ├── formatDate.jsx
│   ├── api.jsx
├── hooks/        # Custom hooks
│   ├── useFetch.jsx
│   ├── useAuth.jsx
├── styles/       # Global styles
│   ├── index.css
│   ├── theme.css
├── App.jsx
├── index.jsx
```

# Efficient Rendering Techniques in React

React uses different approaches for rendering UI elements efficiently. Choosing the right rendering method is essential for ensuring performance, maintainability, and scalability.

Before exploring React's efficient rendering techniques, let's first understand why **hardcoding** every UI element is problematic.

## The Problem with Hardcoding Elements

Hardcoding every UI value directly in the JSX is inefficient because:

- **No Reusability** – You repeat code instead of creating reusable components.
- **Difficult Updates** – Every change requires manually modifying multiple lines.
- **Poor Maintainability** – The codebase becomes cluttered and harder to manage.

**Example of Hardcoding UI Elements**

```jsx
function UserList() {
  return (
    <div>
      <p>User 1: Alice</p>
      <p>User 2: Bob</p>
      <p>User 3: Charlie</p>
    </div>
  );
}
```

If you have hundreds of users, this method quickly becomes **unmanageable**.

## Using JavaScript Array Methods for Efficient Rendering

Instead of hardcoding values, React enables dynamic rendering using JavaScript array methods. Some commonly used ones include:

- `.map()`
- `.filter()`

These methods follow the **DRY (Don't Repeat Yourself)** principle, reducing redundant code.

### 1. Using `.map()` for Dynamic Rendering

The `.map()` method transforms an array into JSX elements.

**Example:**

```jsx
const users = ["Vishal", "Bob", "Srni", "Vineeth"];

function UserList() {
  return (
    <div>
      {users.map((user, index) => (
        <p key={index}>
          User {index + 1}: {user}
        </p>
      ))}
    </div>
  );
}
```

Now, adding more users only requires updating the `users` array, keeping the UI **dynamic and scalable**.

### 2. Using `.filter()` to Conditionally Render Elements

The `.filter()` method removes unwanted elements before rendering.

**Example:**

```jsx
const users = [
  { name: "Vishal", active: true },
  { name: "Bob", active: false },
  { name: "Srni", active: true },
  { name: "Vineeth", active: true },
];

function ActiveUsers() {
  return (
    <div>
      {users
        .filter((user) => user.active)
        .map((user) => (
          <p key={user.name}>Active User: {user.name}</p>
        ))}
    </div>
  );
}
```

Only **active** users will be displayed, preventing unnecessary rendering.

# Using Keys in React Lists

In React, when rendering lists using `.map()`, each element requires a unique **key** prop. React uses these keys to efficiently update the UI, minimizing unnecessary re-renders and improving performance.

## Why Are Keys Important?

Keys help React **identify** which elements changed, were added, or removed. Without keys, React might inefficiently re-render elements, leading to unnecessary updates.

**Example Without Keys (Inefficient Rendering)**

```jsx
const users = ["Vishal", "Bob", "Srni", "Vineeth"];

function UserList() {
  return (
    <div>
      {users.map((user) => (
        <p>{user}</p> // No key assigned
      ))}
    </div>
  );
}
```

This code works, but React **struggles** to optimize updates when modifying the list dynamically.

**Example With Keys (Optimized Rendering)**

```jsx
const users = ["Vishal", "Bob", "Srni", "Vineeth"];

function UserList() {
  return (
    <div>
      {users.map((user, index) => (
        <p key={index}>{user}</p> // Key assigned
      ))}
    </div>
  );
}
```

## Why This Works Better

- Each `<p>` element has a **unique key**, helping React identify individual items.
- React efficiently **diffs** the previous and new state, re-rendering only changed items.

## Keys in Dynamic Lists (Using Unique IDs)

Using **array index** as a key can sometimes cause issues, especially when items shift position. Instead, use **unique IDs** when available.

```jsx
const users = [
  { id: 101, name: "Vishal" },
  { id: 102, name: "Bob" },
  { id: 103, name: "Srni" },
  { id: 104, name: "Vineeth" },
];

function UserList() {
  return (
    <div>
      {users.map((user) => (
        <p key={user.id}>{user.name}</p>
      ))}
    </div>
  );
}
```

## Why Unique IDs Are Preferred

- Index-based keys can **break** React's tracking when elements move.
- Unique IDs remain consistent even if the list order changes.

# Using Props in React Components

React components often need to share data dynamically. Instead of hardcoding values—which leads to repetitive, unmanageable code—React uses **props** to efficiently pass data between components.

By leveraging props, we follow the **DRY (Don't Repeat Yourself)** principle, ensuring reusable, scalable components.

## Understanding Props

Props (short for **"properties"**) are **read-only** values passed from a **parent component** to a **child component**. They allow flexibility in UI rendering by providing **dynamic data** to components.

## Why Props Are Important?

- Eliminates hardcoded values
- Improves code readability
- Ensures reusability and scalability
- Makes UI updates simpler

## Example Without Props (Hardcoded and Inefficient)

```jsx
function UserProfile() {
  return (
    <div>
      <h2>Srni</h2>
      <p>Email: vssreenivaas.cs23@rvce.edu.in</p>

      <h2>Bob</h2>
      <p>Email: bob@rvce.edu.in</p>
    </div>
  );
}
```

**Problems:**

- If more users are added, code duplication increases.
- Difficult to maintain or update.
- No component **reuse**, violating DRY principles.

## Using Props for Reusability

Instead of hardcoding values, we pass **props** to make the component reusable.

```jsx
function UserProfile({ name, email }) {
  return (
    <div>
      <h2>{name}</h2>
      <p>Email: {email}</p>
    </div>
  );
}

function App() {
  return (
    <div>
      <UserProfile name="Srni" email="vssreenivaas.cs23@rvce.edu.in" />
      <UserProfile name="Bob" email="bob@rvce.edu.in" />
    </div>
  );
}
```

**Why This Is Better:**

- **Avoids repetition**—just change the props to update the UI.
- **Component reusability**—no need to manually define each user.

## Passing Objects as Props

Instead of passing individual values, we can pass an **entire object**, improving readability.

### Example: Object-Based Props + Destructuring

```jsx
const users = [
  { id: 101, name: "Vishal", email: "vishalkbhat.cs23@rvce.edu.in" },
  { id: 102, name: "Bob", email: "bob@rvce.edu.in" },
  { id: 103, name: "Srni", email: "vssreenivaas.cs23@rvce.edu.in" },
  { id: 104, name: "Vineeth", email: "vineethrao.cs23@rvce.edu.in" },
];

function UserProfile({ name, email }) {
  return (
    <div>
      <h2>{name}</h2>
      <p>Email: {email}</p>
    </div>
  );
}

function App() {
  return (
    <div>
      {users.map((user) => (
        <UserProfile key={user.id} {...user} />
      ))}
    </div>
  );
}
```

**Why This Works:**

- `.map()` **iterates** over the `users` array dynamically.
- `{...user}` **spreads** object properties into props automatically.
- **Keys** (`key={user.id}`) ensure React efficiently tracks UI updates.

## useState, useEffect
