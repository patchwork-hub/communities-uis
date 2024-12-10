#!/usr/bin/env node
import { init } from "./commands/init"
import { Command } from "commander"

process.on("SIGINT", () => process.exit(0))
process.on("SIGTERM", () => process.exit(0))

async function main() {

    const program = new Command()
        .name("mastodon community feature cli")
        .description("add community feature to your mastodon project")

    program.addCommand(init)

    program.parse()
}

main()
