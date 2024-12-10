import chalk from "chalk";
import { existsSync, readFileSync } from "fs";
import path from "path";
import { replaceContent } from "./utils";

export const updateAsyncComponent = () => {
    const projectRoot = process.cwd();
    const targetFilePath = path.join(projectRoot, "app/javascript/mastodon/features/ui/util/async-components.js");

    if (!existsSync(targetFilePath)) {
        console.error(chalk.red("Error: Not a Mastodon project. Ensure you're in the right directory."));
        process.exit(1);
    }

    const fileContent = readFileSync(targetFilePath, 'utf8');

    const exportStatement = `
export function CommunitiesTimeline () {
  return import(/*webpackChunkName: "features/link_timeline" */'../../communities');
}
    `.trim();
    replaceContent(fileContent, `${fileContent}\n${exportStatement}`, targetFilePath);

    console.log(chalk.green('Added async component.'));
};