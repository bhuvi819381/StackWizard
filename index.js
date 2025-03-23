#!/usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
import shell from "shelljs";
import figlet from "figlet";
import { spawnSync } from "child_process";

import setupBackend from "./mern/backend/setupBackend.js";
import setupFrontend from "./mern/frontend/setupFrontend.js";

console.log(chalk.green(figlet.textSync("Project Setup CLI")));

async function main() {
  const answers = await inquirer.prompt([
    {
      type: "list",
      name: "stack",
      message: "Choose your stack:",
      choices: ["MERN", "Next.js", "Other"],
    },
  ]);

  console.log(chalk.blue(`You selected: ${answers.stack}`));

  if (answers.stack === "MERN") {
    setupMERN();
  } else if (answers.stack === "Next.js") {
    setupNEXTJS();
  } else {
    setupCustom();
  }
}

async function setupMERN() {
  const { projectName } = await inquirer.prompt([
    {
      type: "input",
      name: "projectName",
      message: "Enter your project name:",
      default: "mern-project",
    },
  ]);

  console.log(chalk.green(`\nCreating project: ${projectName}\n`));

  // Step 1: Create project and subfolders
  shell.mkdir(projectName);
  shell.cd(projectName);

  // Step 2: Setup Backend
  await setupBackend();

  // Step 3: Setup Frontend
  await setupFrontend();

  console.log(chalk.green(`\n${projectName} setup completed! 🚀`));
}

async function setupNEXTJS() {
  const { projectName } = await inquirer.prompt([
    {
      type: "input",
      name: "projectName",
      message: "Enter your Next.js project name:",
      default: "nextjs-app",
    },
  ]);

  console.log(chalk.green(`\nCreating Next.js project: ${projectName}...`));

  // Use spawnSync to allow interactive input
  const result = spawnSync("npx", ["create-next-app@latest", projectName], {
    stdio: "inherit",
    shell: true,
  });

  if (result.error) {
    console.error(chalk.red("\nError creating Next.js project:"), result.error);
  } else {
    console.log(chalk.green("\nNext.js project setup completed! 🚀"));
  }
}

async function setupCustom() {
  const { projectType } = await inquirer.prompt([
    {
      type: "list",
      name: "projectType",
      message: "What type of project do you want to set up?",
      choices: ["Frontend", "Backend", "Full Stack"],
    },
  ]);

  if (projectType === "Frontend") {
    const { framework } = await inquirer.prompt([
      {
        type: "list",
        name: "framework",
        message: "Choose a frontend framework:",
        choices: ["Vue.js", "Svelte", "Astro", "Angular"],
      },
    ]);
    console.log(`Setting up a ${framework} frontend project...`);
    // Call functions to set up Vue, Svelte, or Astro
    if (framework === "Vue.js") {
      shell.exec("npm create vite@latest my-vue-app -- --template vue");
    } else if (framework === "Svelte") {
      shell.exec("npm create vite@latest my-svelte-app -- --template svelte");
    } else if (framework === "Astro") {
      shell.exec("npm create astro@latest");
    } else {
      shell.exec("npm install @angular/cli");
    }
  } else if (projectType === "Backend") {
    const { backendFramework } = await inquirer.prompt([
      {
        type: "list",
        name: "backendFramework",
        message: "Choose a backend framework:",
        choices: ["Express.js"],
      },
    ]);
    console.log(`Setting up a ${backendFramework} backend project...`);
    await setupBackend();
    // Call functions to set up Express, Fastify, or NestJS
  } else {
    console.log("Custom full-stack setup is not implemented yet.");
  }
}

main();
