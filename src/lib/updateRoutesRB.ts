import chalk from "chalk";
import { existsSync } from "fs";
import path from "path";
import { replaceContent } from "./utils";

export const updateRoutesRB = () => {
    const projectRoot = process.cwd();
    const targetFilePath = path.join(projectRoot, "config/routes/web_app.rb");

    if (!existsSync(targetFilePath)) {
        console.error(chalk.red("Error: Not a Mastodon project. Ensure you're in the right directory."));
        process.exit(1);
    }

    const route = `).each { |path| get path, to: 'home#index' }`.trim();
    const content = `/communities/(*any)`;
    replaceContent(route, `${content}\n${route}`, targetFilePath);

    console.log(chalk.green('Updated web_app.rb .'));
};