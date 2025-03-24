# 🚀 StackWizard: Project Setup CLI

A simple, efficient CLI tool to automate the initial setup for **MERN** and other popular stacks. It scaffolds backend and frontend projects with industry-standard practices, saving you time and effort!

---

## ✨ Features

- ✅ Choose your tech stack: **MERN**, **Next.js**, or **Other Frontend Frameworks**
- ✅ Automated backend setup (Express, MongoDB, dotenv, cors)
- ✅ Frontend setup with **React.js**, **Vue.js**, **Svelte**, or **Astro** using **Vite**
- ✅ Optionally install **Tailwind CSS**, **Bootstrap**, or **Sass**
- ✅ Prompts for optional dependencies like **JWT** & **bcrypt** (for authentication)
- ✅ Clean, organized folder structure (industry standard)
- ✅ Clears default `App.jsx`/`App.tsx` and replaces with: `"Welcome to the project."`

---

## 🛠 Installation

### Run via NPX

With confirmation prompts:

```bash
npx stackwizard
```

Without prompts (auto-confirm):

```bash
npx --yes stackwizard
```

---

### Clone & Run Locally

```bash
git clone https://github.com/bhuvi819381/StackWizard.git
cd StackWizard
npm install
```

### Usage

Run the CLI:

```bash
node index.js
```

_Or_

```bash
npm run dev
```

Follow the interactive prompts to configure your stack preferences.

---

## 🏗 Stack Options

### 1️⃣ MERN Stack (MongoDB, Express, React, Node.js)

- Sets up `/backend` folder with:
  - Express.js
  - MongoDB connection (Mongoose)
  - dotenv & cors
- Optionally install:
  - **JWT & bcrypt** for authentication
- Clean folder structure:
  ```
  backend/
  ├── config/db.js
  ├── models/
  ├── routes/
  ├── controllers/
  ├── middleware/
  └── server.js
  ```

---

### 2️⃣ Next.js (Default Option)

- Uses `npx create-next-app@latest` to scaffold a new Next.js project.

---

### 3️⃣ Other Frontend Frameworks

- Supports:
  - **React.js**
  - **Vue.js**
  - **Svelte**
  - **Astro**
- Uses **Vite** for lightning-fast setup.
- Optionally install UI libraries:
  - Tailwind CSS
  - Bootstrap
  - Sass

---

## 📂 Project Structure

Example output after running:

```
/your-project
 ├── /server
 │    ├── config/db.js
 │    ├── models/
 │    ├── routes/
 │    ├── controllers/
 │    ├── middleware/
 │    └── server.js
 ├── /client
 │    ├── src/
 │    ├── package.json
 │    └── vite.config.js
 ├── package.json
 └── README.md
```

---

## 📝 License

This project is licensed under the [MIT License](LICENSE).

---

## 🚀 Contributions & Issues

Contributions are welcome!  
Feel free to open a **Pull Request** or report issues via the [GitHub Issues](https://github.com/bhuvi819381/StackWizard/issues) section.

---

## 👌 Connect

Star ⭐ the repo if you find it helpful, and share feedback to help improve!
