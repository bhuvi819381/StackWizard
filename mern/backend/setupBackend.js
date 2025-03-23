import fs from "fs";
import inquirer from "inquirer";
import chalk from "chalk";
import shell from "shelljs";

async function setupBackend() {
  console.log(chalk.yellow("\nSetting up backend...\n"));
  shell.mkdir("server");
  shell.cd("server");

  // Initialize package.json
  console.log(chalk.blue("Initializing package.json..."));
  shell.exec("npm init -y");

  // Modify package.json
  const packageJson = JSON.parse(fs.readFileSync("package.json"));
  packageJson.main = "server.js";
  packageJson.type = "module";
  packageJson.scripts = {
    dev: "nodemon server.js",
  };
  fs.writeFileSync("package.json", JSON.stringify(packageJson, null, 2));

  // Mandatory dependencies
  const mandatoryDeps = ["express", "mongoose", "dotenv", "cors"];
  console.log(
    chalk.blue(
      `\nInstalling mandatory dependencies: ${mandatoryDeps.join(", ")}...`
    )
  );
  shell.exec(`npm install ${mandatoryDeps.join(" ")}`);

  // Ask for optional dependencies
  const optionalDeps = [
    { name: "jsonwebtoken", message: "Install JSON Web Token (JWT)?" },
    { name: "bcryptjs", message: "Install bcrypt for password hashing?" },
    { name: "multer", message: "Install Multer for file uploads?" },
    { name: "cookie-parser", message: "Install Cookie Parser?" },
    { name: "compression", message: "Install Compression middleware?" },
  ];

  const selectedDeps = [];
  for (const dep of optionalDeps) {
    const { install } = await inquirer.prompt([
      {
        type: "confirm",
        name: "install",
        message: dep.message,
        default: false,
      },
    ]);
    if (install) {
      selectedDeps.push(dep.name);
    }
  }

  // Install selected optional dependencies
  if (selectedDeps.length > 0) {
    console.log(
      chalk.blue(
        `\nInstalling optional dependencies: ${selectedDeps.join(", ")}...`
      )
    );
    shell.exec(`npm install ${selectedDeps.join(" ")}`);
  }

  // Install dev dependencies
  console.log(chalk.blue("\nInstalling dev dependencies: nodemon..."));
  shell.exec("npm install --save-dev nodemon");

  // Create necessary folders
  const folders = ["config", "routes", "controllers", "models", "middleware"];
  folders.forEach((folder) => {
    console.log(chalk.green(`Creating folder: ${folder}/`));
    shell.mkdir(folder);
  });

  // Create config/db.js
  console.log(chalk.green("Creating config/db.js..."));
  fs.writeFileSync(
    "config/db.js",
    `import mongoose from "mongoose";
  
  const connectDB = async () => {
    try {
      const conn = await mongoose.connect(process.env.MONGO_URI);
      console.log(\`MongoDB Connected: \${conn.connection.host}\`);
    } catch (error) {
      console.error(\`Error: \${error.message}\`);
      process.exit(1);
    }
  };
  
  export default connectDB;`
  );

  // Create models/userModel.js
  console.log(chalk.green("Creating models/userModel.js..."));
  fs.writeFileSync(
    "models/userModel.js",
    `import mongoose from "mongoose";
  
  const userSchema = new mongoose.Schema(
    {
      name: { type: String, required: true },
      email: { type: String, required: true, unique: true },
      password: { type: String, required: true },
    },
    { timestamps: true }
  );
  
  const User = mongoose.model("User", userSchema);
  export default User;`
  );

  // Create controllers/userController.js
  console.log(chalk.green("Creating controllers/userController.js..."));
  fs.writeFileSync(
    "controllers/userController.js",
    `export const getUsers = (req, res) => {
    res.send("Get all users");
  };`
  );

  // Create routes/userRoutes.js
  console.log(chalk.green("Creating routes/userRoutes.js..."));
  fs.writeFileSync(
    "routes/userRoutes.js",
    `import express from "express";
  import { getUsers } from "../controllers/userController.js";
  
  const router = express.Router();
  router.get("/", getUsers);
  
  export default router;`
  );

  // Create middleware/authMiddleware.js only if JWT is installed
  if (selectedDeps.includes("jsonwebtoken")) {
    console.log(chalk.green("Creating middleware/authMiddleware.js..."));
    fs.writeFileSync(
      "middleware/authMiddleware.js",
      `import jwt from "jsonwebtoken";
  
  export const protect = (req, res, next) => {
    const token = req.header("Authorization");
    if (!token) return res.status(401).json({ message: "No token, authorization denied" });
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      next();
    } catch (error) {
      res.status(401).json({ message: "Token is not valid" });
    }
  };`
    );
  }

  // Create server.js
  console.log(chalk.green("Creating server.js..."));
  fs.writeFileSync(
    "server.js",
    `import express from "express";
  import dotenv from "dotenv";
  import cors from "cors";
 
  import connectDB from "./config/db.js";
  import userRoutes from "./routes/userRoutes.js";
  
  dotenv.config();
  connectDB();
  
  const app = express();
  app.use(cors());
  
  app.use(express.json());
  
  // Routes
  app.use("/api/users", userRoutes);
  
  app.get("/", (req, res) => {
    res.send("API is running...");
  });
  
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(\`Server running on port \${PORT}\`);
  });`
  );

  // Create .env file
  console.log(chalk.green("Creating .env file..."));
  fs.writeFileSync(
    ".env",
    `PORT=5000
  MONGO_URI=mongodb://localhost:27017
  JWT_SECRET=your_jwt_secret`
  );

  console.log(chalk.green("\nBackend setup completed! 🚀"));
  shell.cd("..");
}

export default setupBackend;
