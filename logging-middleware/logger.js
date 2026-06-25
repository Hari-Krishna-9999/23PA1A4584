const axios = require("axios");
require("dotenv").config();
const validStacks = ["backend", "frontend"];
const validLevels = ["debug","info","warn","error","fatal"];
const validPackages = [
  "cache",
  "controller",
  "cron_job",
  "db",
  "domain",
  "handler",
  "repository",
  "route",
  "service",
  "api",
  "component",
  "hook",
  "page",
  "state",
  "style",
  "auth",
  "config",
  "middleware",
  "utils"
];

async function Log(appStack, level, pkg, message) {
  try {
    if (!validStacks.includes(appStack)) {
      throw new Error("Invalid stack");
    }

    if (!validLevels.includes(level)) {
      throw new Error("Invalid level");
    }

    if (!validPackages.includes(pkg)) {
      throw new Error("Invalid package");
    }

    const response = await axios.post(
      "http://4.224.186.213/evaluation-service/logs",
      {
        stack: appStack,
        level: level,
        package: pkg,
        message: message
      },
      {
        headers: {
            Authorization:"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiIyM3BhMWE0NTg0QHZpc2hudS5lZHUuaW4iLCJleHAiOjE3ODIzODAxMTEsImlhdCI6MTc4MjM3OTIxMSwiaXNzIjoiQWZmb3JkIE1lZGljYWwgVGVjaG5vbG9naWVzIFByaXZhdGUgTGltaXRlZCIsImp0aSI6ImU3ZmVhN2Y1LWQwNTctNDc4Yy1hYTI3LTdjNmFkZmMyNTM4ZiIsImxvY2FsZSI6ImVuLUlOIiwibmFtZSI6Im1hbmFtIGhhcmkga3Jpc2huYSIsInN1YiI6Ijk4M2IxZTU4LWRjZWEtNDUxMS04NzdjLTZkMmIwNzEwOGI3MCJ9LCJlbWFpbCI6IjIzcGExYTQ1ODRAdmlzaG51LmVkdS5pbiIsIm5hbWUiOiJtYW5hbSBoYXJpIGtyaXNobmEiLCJyb2xsTm8iOiIyM3BhMWE0NTg0IiwiYWNjZXNzQ29kZSI6ImFoWGp2cCIsImNsaWVudElEIjoiOTgzYjFlNTgtZGNlYS00NTExLTg3N2MtNmQyYjA3MTA4YjcwIiwiY2xpZW50U2VjcmV0IjoieldGWHJLY3drTVlyRmROTSJ9.SOEMk494SM9leY7R4lbyEG5Y3zkb7pNRc3-lfjTwgnU",
            "Content-Type": "application/json"
        }
      }
    );
    console.log("Log success:", response.data);
    return response.data;
  } catch (error) {
    console.error("Logging failed:", error.message);
  }
}
module.exports = Log;