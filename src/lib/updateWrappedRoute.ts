import chalk from "chalk";
import { existsSync } from "fs";
import path from "path";
import { replaceContent } from "./utils";

export const updateWrappedRoute = () => {
  const projectRoot = process.cwd();
  const targetFilePath = path.join(
    projectRoot,
    "app/javascript/mastodon/features/ui/index.jsx"
  );

  if (!existsSync(targetFilePath)) {
    console.error(
      chalk.red(
        "Error: Not a Mastodon project. Ensure you're in the right directory."
      )
    );
    process.exit(1);
  }

  // Add imports at the top of the file
  const importStatements = `} from './util/async-components';`;
  replaceContent(
    importStatements,
    `CommunitiesTimeline,\n${importStatements}`,
    targetFilePath
  );

  // Add Route
  const enclosedTag = `<Route component={BundleColumnError} />`;
  
  const routeTag = `
    <WrappedRoute path='/communities/local' exact component={CommunitiesTimeline} content={children} />
    <WrappedRoute path='/communities/all' exact component={CommunitiesTimeline} content={children} />`;
  replaceContent(enclosedTag, `${routeTag}\n${enclosedTag}`, targetFilePath);

  console.log(chalk.green("Added in WrappedRoute.ts"));
};
