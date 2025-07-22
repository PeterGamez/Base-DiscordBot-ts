const fs = require("node:fs");

fs.rmSync("./dist/interfaces", { recursive: true });
console.log("dist/interfaces folder is deleted");
