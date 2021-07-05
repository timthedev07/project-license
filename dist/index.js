#!/usr/bin/env node
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const GPLv3_1 = require("./GPLv3");
const MIT_1 = require("./MIT");
const Apache2_1 = require("./Apache2");
const inquirer_1 = __importDefault(require("inquirer"));
const BSD3_1 = require("./BSD3");
const ref = {
    GPLv3: GPLv3_1.GPLv3,
    MIT: MIT_1.MIT,
    "Apache 2.0": Apache2_1.Apache2,
    "BSD 3-Clause": BSD3_1.BSD3,
};
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    const { license } = yield inquirer_1.default.prompt([
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
    fs_1.default.writeFile("./LICENSE", yield ref[license](), (err) => {
        if (err) {
            console.log("error: ", err);
        }
    });
});
main();
