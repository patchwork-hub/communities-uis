import { readFileSync, writeFileSync } from "fs";

export function replaceContent(target: string, content: string, targetFilePath: string) {
    const finalContent = readFileSync(targetFilePath, 'utf8');

    if (!finalContent.includes(target)) {
        throw new Error(`${target} for insertion not found in the file.`);
    }

    if (!finalContent.includes(content)) {
        const finalUpdatedContent = finalContent.replace(
            target,
            content
        );

        writeFileSync(targetFilePath, finalUpdatedContent, 'utf8');
    }
}