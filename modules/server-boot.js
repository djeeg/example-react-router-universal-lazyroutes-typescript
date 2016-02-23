console.log("Enabling Typescript interpretation...");
require('ts-node').register({
    project: "./tsconfig.json"
})
console.log(" - done");
console.log("Booting server...");
require('./server.tsx');
