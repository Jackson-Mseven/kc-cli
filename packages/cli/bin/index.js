const { Command } = require('commander');
const package = require("../package.json");

const program = new Command();

program.name('kc-cli').description(package.description).version(package.version);

program
  .command("create")
  .description("create a new project")
  .action(require("../commands/create"));

program.parse(process.argv);
