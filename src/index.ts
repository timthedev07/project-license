#!/usr/bin/env node

import fs from "fs";
import { GPLv3 } from "./GPLv3";
import { MIT } from "./MIT";
import { Apache2 } from "./Apache2";
import inquirer from "inquirer";
import { BSD3 } from "./BSD3";

const ref: Record<string, () => Promise<string>> = {
  GPLv3,
  MIT,
  "Apache 2.0": Apache2,
  "BSD 3-Clause": BSD3,
};

const main = async () => {
  const { license } = await inquirer.prompt([
    {
      type: "list",
      message: "License:",
      name: "license",
      choices: ["MIT", "GPLv3", "Apache 2.0", "BSD 3-Clause"],
    },
  ]);

  if (!license || !license.length) {
    console.log("Invalid License");
    return;
  }

  fs.writeFile("./LICENSE", await ref[license](), (err) => {
    if (err) {
      console.log("error: ", err);
    }
  });
};

main();
