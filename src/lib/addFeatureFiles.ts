import chalk from "chalk";
import path from "path";
import { copyFileSync, mkdirSync, existsSync } from "fs";
import { fileURLToPath } from "url";

// Use the directory of this script as the base for the templates
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const addFeatureFiles = () => {
    const projectRoot = process.cwd(); // Target project root
    const mastodonJsDir = path.join(projectRoot, "app/javascript/mastodon");
    const materialDir = path.join(projectRoot, "app/javascript/material-icons");

    // Template directory inside this script's folder
    const templateBaseDir = path.join(__dirname, "../public/templates");

    if (!existsSync(mastodonJsDir)) {
        console.error(
            chalk.red("Error: Not a Mastodon project. Ensure you're in the right directory.")
        );
        process.exit(1);
    }

    const directories = ["features/communities"];

    // Create necessary directories under mastodonJsDir
    directories.forEach((dir) => {
        const fullPath = path.join(mastodonJsDir, dir);
        try {
            mkdirSync(fullPath, { recursive: true });
            console.log(chalk.green(`Created directory: ${fullPath}`));
        } catch (err) {
            console.error(
                chalk.red(
                    `Error creating directory: ${fullPath} - ${(err as { message: string }).message}`
                )
            );
        }
    });

    // List of files to copy from templateBaseDir to respective destinations
    const templateFiles = [
        {
            src: "features/communities/index.tsx",
            dest: path.join(mastodonJsDir, "features/communities/index.tsx"),
        },
        {
            src: "material-icons/400-24px/community-fill.svg",
            dest: path.join(materialDir, "400-24px/community-fill.svg"),
        },
        {
            src: "material-icons/400-24px/community.svg",
            dest: path.join(materialDir, "400-24px/community.svg"),
        },
    ];

    // Copy files from templates directory to the target project's structure
    templateFiles.forEach((file) => {
        const sourcePath = path.join(templateBaseDir, file.src);

        try {
            if (!existsSync(sourcePath)) {
                console.error(chalk.yellow(`Warning: Template file not found - ${sourcePath}`));
                return;
            }

            // Ensure destination directory exists
            const destDir = path.dirname(file.dest);
            if (!existsSync(destDir)) {
                mkdirSync(destDir, { recursive: true });
            }

            // Copy the file to the destination
            copyFileSync(sourcePath, file.dest);
            console.log(chalk.blue(`Copied file: ${sourcePath} to ${file.dest}`));
        } catch (err) {
            console.error(chalk.red(`Error copying file - ${(err as { message: string }).message}`));
        }
    });
};
