
import { COMMANDS, ASCII_ART } from './data';

// File System Data
const FILES = {
    'about.txt': COMMANDS.about.execute().output,
    'team.txt': COMMANDS.team.execute().output,
    'contact.txt': COMMANDS.contact.execute().output,
    'socials.txt': COMMANDS.socials.execute().output,
    'gsoc.json': COMMANDS.gsoc.execute().output,
    'projects.json': COMMANDS.projects.execute().output,
    'skills.md': COMMANDS.skills.execute().output,
    'join.md': COMMANDS.join.execute().output,
    'help.md': COMMANDS.help.execute().output,
};

export const handleSpecialCommands = (input, history) => {
    const parts = input.trim().split(' ');
    const cmd = parts[0].toLowerCase();
    const args = parts.slice(1).join(' ');

    // Echo command
    if (cmd === 'echo') {
        return {
            output: args || '',
            type: 'info'
        };
    }

    // Cowsay command
    if (cmd === 'cowsay') {
        const text = args || 'Moo! Join Kamand Prompt!';
        return {
            output: ASCII_ART.cow(text),
            type: 'info'
        };
    }

    // Sudo command
    if (cmd === 'sudo') {
        return {
            output: `Password: ********
Sorry, user is not in the sudoers file. This incident will be reported.

`,
            type: 'error'
        };
    }

    // rm -rf command
    if (input.includes('rm') && input.includes('-rf')) {
        return {
            output: `System protected !
Permission denied: Cannot delete the KPverse.

Maybe try 'help' instead?`,
            type: 'error'
        };
    }

    // CD navigation
    if (cmd === 'cd') {
        const routes = {
            'home': '/home',
            '~': '/home',
            '/': '/home',
            'gsoc': '/gsoc',
            'team': '/teams',
            'teams': '/teams',
            'contact': '/contact',
        };

        if (routes[args]) {
            return {
                output: `Navigating to ${args}...`,
                type: 'navigate',
                route: routes[args]
            };
        }
        return {
            output: `cd: no such directory: ${args}`,
            type: 'error'
        };
    }

    // LS command (Dynamic)
    if (cmd === 'ls') {
        const fileList = Object.keys(FILES).join('   ');
        return {
            output: fileList,
            type: 'info'
        };
    }

    // CAT command
    if (cmd === 'cat') {
        if (!args) {
            return {
                output: 'usage: cat [file]',
                type: 'error'
            };
        }

        if (FILES[args]) {
            return {
                output: FILES[args],
                type: 'info'
            };
        }

        return {
            output: `cat: ${args}: No such file or directory`,
            type: 'error'
        };
    }

    // History command
    if (cmd === 'history') {
        return COMMANDS.history.execute(null, history);
    }

    // Check if it's a registered command
    if (COMMANDS[cmd]) {
        return COMMANDS[cmd].execute(args, history);
    }

    // Unknown command
    return {
        output: `command not found: ${cmd}
Type 'help' for available commands.`,
        type: 'error'
    };
};
