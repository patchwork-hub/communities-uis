import chalk from "chalk";
import { existsSync, readFileSync } from "fs";
import path from "path";
import { replaceContent } from "./utils";

export const updateComponentsScss = () => {
  const projectRoot = process.cwd();
  const targetFilePath = path.join(
    projectRoot,
    "app/javascript/styles/mastodon/components.scss"
  );

  if (!existsSync(targetFilePath)) {
    console.error(
      chalk.red(
        "Error: Not a Mastodon project. Ensure you're in the right directory."
      )
    );
    process.exit(1);
  }
  // new scss
  const fileContent = readFileSync(targetFilePath, "utf8");

  const addNewScss = `
    .community__section-headline {
            button,
            a {
              &.active {
                &::before {
                  width: 100%;
                }
              }
            }
          }
          .communitiesCardContainer {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 13px;
            padding: 13px;
          
            .card {
              cursor: pointer;
              overflow: hidden;
              border-radius: 5px;
              background: #000;
              position: relative;
          
              &.full {
                grid-column: span 2;
                height: 160px;
              }
          
              &.half {
                grid-column: span 1;
                height: 140px;
              }
            }
            .card img {
              height: 100%;
              width: 100%;
              opacity: 0.8;
              object-fit: cover;
            }
            .shadow {
              position: absolute;
              bottom: 0;
              left: 0;
              width: 100%;
              height: 50%;
              background: linear-gradient(
                to bottom,
                rgba(0, 0, 0, 0) 0%,
                rgba(0, 0, 0, 0.5) 100%
              );
              pointer-events: none;
            }
            .cardContent {
              position: absolute;
              bottom: 10px;
              left: 10px;
              right: 10px;
              font-weight: 500;
              display: flex;
              align-items: center;
              justify-content: space-between;
            }
            .rightArrow {
              width: 20px !important;
              height: 20px !important;
            }
          }
    `.trim();
  replaceContent(fileContent, `${fileContent}\n${addNewScss}`, targetFilePath);

  //   add in existing scss
  const enclosedTag = `.notification__filter-bar,`;
  const routeTag = `.community__section-headline,`;
  replaceContent(enclosedTag, `${routeTag}\n${enclosedTag}`, targetFilePath);

  console.log(chalk.green("Added async component."));
};
