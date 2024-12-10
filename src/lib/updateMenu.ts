import chalk from "chalk";
import { existsSync, readFileSync } from "fs";
import path from "path";
import { replaceContent } from "./utils";

export const updateMenu = () => {
    const projectRoot = process.cwd();
    const targetFilePath = path.join(projectRoot, "app/javascript/mastodon/features/ui/components/navigation_panel.jsx");

    if (!existsSync(targetFilePath)) {
        console.error(chalk.red("Error: Not a Mastodon project. Ensure you're in the right directory."));
        process.exit(1);
    }

    const fileContent = readFileSync(targetFilePath, 'utf8');

    // Add imports at the top of the file
    const importStatements = `
import CommunityActiveIcon from '@/material-icons/400-24px/community-fill.svg?react';
import CommunityIcon from '@/material-icons/400-24px/community.svg?react';
import GroupsIcon from '@/material-icons/400-24px/groups.svg?react';
    `.trim();
    replaceContent(fileContent, `${importStatements}\n\n${fileContent}`, targetFilePath);

    // Add defineMessages additions
    const defineMessagesLine = `defineMessages({`;
    const newMessages = `
  community: { id: 'community.title', defaultMessage: 'Communities' },
  communities: { id: 'navigation_bar.communities', defaultMessage: 'Communities' },
`.trim();
    replaceContent(defineMessagesLine, `${defineMessagesLine}\n${newMessages}`, targetFilePath);

    // Add the tab menu link
    const exploreLink = `<ColumnLink transparent to='/explore' icon='explore' iconComponent={ExploreIcon} activeIconComponent={ExploreActiveIcon} text={intl.formatMessage(messages.explore)} />`;
    const exploreAndCommunity = `<>
<ColumnLink transparent to='/explore' icon='explore' iconComponent={ExploreIcon} activeIconComponent={ExploreActiveIcon} text={intl.formatMessage(messages.explore)} />
<ColumnLink transparent to='/communities' icon='community' iconComponent={CommunityIcon} activeIconComponent={CommunityActiveIcon} text={intl.formatMessage(messages.community)} />
</>`;
    replaceContent(exploreLink, exploreAndCommunity, targetFilePath);

    // Add communit menu link
    const conversationLink = `<ColumnLink transparent to='/conversations' icon='at' iconComponent={AlternateEmailIcon} text={intl.formatMessage(messages.direct)} />`;
    const communityLink = `<ColumnLink transparent to='/communities' icon='groups' iconComponent={GroupsIcon} text={intl.formatMessage(messages.communitites)} />`
    replaceContent(conversationLink, `${conversationLink}\n${communityLink}`, targetFilePath);

    console.log(chalk.green('Added community menu item and updated file successfully.'));
};