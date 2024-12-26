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
  .communities {
    &__section-headline {
      background: #292C36;
      display: flex;
      border: 1px solid #3A3F4E;
      a {
        &.nav-link {
          color: #9FADC6;
          font-weight: 500;
          font-size: 16px;
          text-decoration: none;
          width: 50%;
          padding: 13px 0;
          text-align: center;
          position: relative;
          &.active {
            color: #ffffff;
            &:after {
              content: "";
              position: absolute;
              width: 100%;
              height: 3px;
              background: #8C8DF7;
              left: 0;
              bottom: 0;
              border-radius: 10px;
            }
          }
        }
      }
    }
    &__list-wrapper {
      padding: 12px;
      background-color: #292C36;
    }
    &__list {
      padding: 12px;
      background: #323542;
      border-radius: 3px;
      margin-bottom: 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      &:last-child {
        margin-bottom: 0;
      }
      &__item {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        column-gap: 10px;
        &__img {
          width: 39px;
          height: 39px;
          aspect-ratio: 1 / 1;
          object-fit: cover;
        }
        &__info {
          p {
            color: #ffffff;
            font-weight: 500;
            font-size: 15px;
          }
          span {
            color: #626982;
            font-weight: 400;
            font-size: 15px;
            &:first-child {
              color: #ffffff;
              margin-right: 6px;
            }
          }
        }
        &__icon {
          display: flex;
          justify-content: flex-end;
          align-items: center;
          column-gap: 10px;
          &__all {
            border: 1px solid #ffffff;
            border-radius: 3px;
            padding: 10px;
          }
        }
      }
    }
  }
    `.trim();
  replaceContent(fileContent, `${fileContent}\n${addNewScss}`, targetFilePath);

  //   add in existing scss
  const enclosedTag = `.notification__filter-bar,`;
  const routeTag = `.community__section-headline,`;
  replaceContent(enclosedTag, `${routeTag}\n${enclosedTag}`, targetFilePath);

  console.log(chalk.green("Added scss styles."));
  console.log(chalk.green("/n"));
};
