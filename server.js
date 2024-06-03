const config = require("./config");
const app = require("./app.js");
const { spawnSync } = require("child_process");
const port = config.get("port");

(async () => {

  /// Auto Mirgration in Production
  if (config.get("env") === "production") {
    const dbCreation = spawnSync("npx", ["sequelize", "db:create"], {
      stdio: "inherit",
    });
    const migrationProcess = spawnSync("npx", ["sequelize", "db:migrate"], {
      stdio: "inherit",
    });
    if (migrationProcess.error) {
      console.error(
        "Error running Sequelize migrations:",
        migrationProcess.error
      );
      process.exit(1);
    }
  }

  app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
  });
})();
