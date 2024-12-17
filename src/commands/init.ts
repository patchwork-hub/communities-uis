import { existsSync } from "fs"
import path from "path"
import chalk from "chalk"
import { Command } from "commander"
import ora from "ora"
import { addFeatureFiles } from "../lib/addFeatureFiles"
import { updateMenu } from "../lib/updateMenu"
import { updateAsyncComponent } from "../lib/updateAsyncComponent"
import { updateRoutesRB } from "../lib/updateRoutesRB"
import { updateWrappedRoute } from "../lib/updateWrappedRoute"

export const init = new Command()
    .name("init")
    .description("add community feature")
    .action(async () => {
        try {

            const cwd = path.resolve(process.cwd())

            if (!existsSync(cwd)) {
                console.log(chalk.red(`The path ${cwd} does not exist. Please try again.`));
                process.exit(1)
            }

            const spinner = ora(`Adding community feature...\n`).start();
            addFeatureFiles();
            updateMenu();
            updateAsyncComponent();
            updateRoutesRB();
            updateWrappedRoute();
            spinner.succeed(`Done.`)
        } catch (error) {
            console.error(chalk.red(error));
            process.exit(1);
        }
    })
