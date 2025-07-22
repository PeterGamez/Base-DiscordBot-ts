const fs = require("node:fs");

fs.existsSync("./dist") && fs.rmSync("./dist", { recursive: true });
console.log("dist folder is deleted");
