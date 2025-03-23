import fs from "fs";
import inquirer from "inquirer";
import shell from "shelljs";
import chalk from "chalk";

async function setupFrontend() {
  console.log(chalk.yellow("\nSetting up frontend...\n"));
  shell.mkdir("client");
  shell.cd("client");

 // Ask for React or TypeScript
  // Ask for React or TypeScript
  const { framework } = await inquirer.prompt([
    {
      type: "list",
      name: "framework",
      message: "Choose a frontend setup:",
      choices: ["React.js", "React + TypeScript"],
    },
  ]);

  const template = framework === "React + TypeScript" ? "react-ts" : "react";
  console.log(chalk.blue(`\nInstalling Vite with ${framework}...`));
  shell.exec(`npm create vite@latest . -- --template ${template}`);

  // Install dependencies
  console.log(chalk.blue("\nInstalling dependencies..."));
  shell.exec("npm install");

  // Ask for styling framework
  const { styling } = await inquirer.prompt([
    {
      type: "list",
      name: "styling",
      message: "Choose a styling framework:",
      choices: ["Tailwind CSS", "Bootstrap", "Sass", "None"],
    },
  ]);

  if (styling === "Tailwind CSS") {
    console.log(chalk.blue("\nInstalling Tailwind CSS..."));
    shell.exec("npm install tailwindcss @tailwindcss/vite");
  } else if (styling === "Bootstrap") {
    console.log(chalk.blue("\nInstalling Bootstrap..."));
    shell.exec("npm install bootstrap@5.3.3");
  } else if (styling === "Sass") {
    console.log(chalk.blue("\nInstalling Sass..."));
    shell.exec("npm install sass");
  }

  // Clear App.jsx/tsx
  const appFile = framework === "React + TypeScript" ? "src/App.tsx" : "src/App.jsx";
  console.log(chalk.green(`\nUpdating ${appFile}...`));
  fs.writeFileSync(appFile, "export default function App() { return <h1>Welcome to the project.</h1>; }");

  console.log(chalk.green("\nFrontend setup completed! 🚀"));
  shell.cd("../../");
}

export default setupFrontend;






