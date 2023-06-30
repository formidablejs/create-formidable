import { Args, Command, Flags } from '@oclif/core'
import { input } from '@inquirer/prompts'
import { run } from '@formidablejs/installer'
import path = require('path')

export default class Create extends Command {
    static description = 'Create a new Formidable application'

    static args = {
        name: Args.string({ description: 'Application name', required: false }),
    }

    static flags = {
        'silent-install': Flags.boolean({ description: 'Install silently', char: 'q' }),
        'sqlite-git-ignore': Flags.boolean({ description: 'Add SQLite Database to gitignore', char: 'G' }),
        'use-pnpm': Flags.boolean({ description: 'Use pnpm instead of npm or yarn', char: 'p' }),
        'use-npm': Flags.boolean({ description: 'Use npm instead of pnpm or yarn', char: 'n' }),
        'use-yarn': Flags.boolean({ description: 'Use yarn instead of pnpm or npm', char: 'y' }),
        database: Flags.string({ description: 'The default database driver to use', char: 'd', options: ['MySQL', 'PostgreSQL', 'SQLite', 'MSSQL', 'Oracle', 'skip'] }),
        dev: Flags.boolean({ description: 'Use dev branch' }),
        git: Flags.boolean({ description: 'Initialize a Git repository', char: 'g' }),
        imba: Flags.boolean({ description: 'Create Imba Full-Stack application' }),
        language: Flags.string({ description: 'The default language to use', char: 'l', options: ['imba', 'typescript'] }),
        manager: Flags.string({ description: 'The default package manager to use', char: 'm', options: ['npm', 'pnpm', 'yarn'] }),
        react: Flags.boolean({ description: 'Create React Full-Stack application' }),
        scaffolding: Flags.string({ description: 'The default scaffolding to use', char: 'S', options: ['mpa', 'spa'] }),
        stack: Flags.string({ description: 'The default stack to use', char: 's', options: ['imba', 'react', 'svelte', 'vue'] }),
        svelte: Flags.boolean({ description: 'Create Svelte Full-Stack application' }),
        type: Flags.string({ description: 'The type of application to create', char: 't', options: ['api', 'full-stack'] }),
        vue: Flags.boolean({ description: 'Create Vue Full-Stack application' }),
        verbose: Flags.boolean({ description: 'Verbose output' }),
    }

    async run(): Promise<void> {
        const { args, flags } = await this.parse(Create)

        if (!args.name) {
            const name = await input({
                message: 'What is the name of your application?',
            });

            args.name = name
        }

        const installerArgs = ['new', args.name]

        for (const [key, value] of Object.entries(flags)) {
            if (value === true) {
                installerArgs.push(`--${key}`)
            } else {
                installerArgs.push(`--${key}`)
                installerArgs.push(value)
            }
        }

        await run(installerArgs)
    }
}
