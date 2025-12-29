// Terminal configuration and commands for Kamand Prompt

export const ASCII_ART = {
  logo: `
 _  __                                 _   ____                            _   
| |/ /__ _ _ __ ___   __ _ _ __   __| | |  _ \\ _ __ ___  _ __ ___  _ __ | |_ 
| ' // _\` | '_ \` _ \\ / _\` | '_ \\ / _\` | | |_) | '__/ _ \\| '_ \` _ \\| '_ \\| __|
| . \\ (_| | | | | | | (_| | | | | (_| | |  __/| | | (_) | | | | | | |_) | |_ 
|_|\\_\\__,_|_| |_| |_|\\__,_|_| |_|\\__,_| |_|   |_|  \\___/|_| |_| |_| .__/ \\__|
                                                                  |_|        
`,
  cow: (text) => `
  ${'_'.repeat(text.length + 2)}
 < ${text} >
  ${'-'.repeat(text.length + 2)}
        \\   ^__^
         \\  (oo)\\_______
            (__)\\       )\\/\\
                ||----w |
                ||     ||
`,
  fastfetch: `
       .---.        pc@students.iitmandi.ac.in
      /     \\       ----------------------
      \\.@-@./       OS: KamandPrompt
      /\`\\_/\`\\       Host: Programming Club IIT Mandi
     //  _  \\\\      Kernel: Kamand kernel
    | \\     )|_     Uptime: Since 2014
   /\`\\_\`>  <_/ \\    Shell: Kamand shell
   \\__/'---'\\__/    Terminal: Kamand Prompt
`,
};

const fetchFile = async (path) => {
  try {
    const res = await fetch(path);
    if (!res.ok) throw new Error('File not found');
    const data = await res.json();
    return JSON.stringify(data, null, 2);
  } catch (e) {
    return null;
  }
};

export const COMMANDS = {
  ls: {
    description: 'List directory content',
    execute: async () => {
      const dirs = ['home/', 'gsoc/', 'teams/', 'contact/', 'compete/', 'events/', 'resources/'];
      const files = ['gsoc.json', 'compete.json', 'events.json', 'resources.json', 'team.json', 'projects.json'];
      const all = [...dirs, ...files].sort().join('   ');
      return {
        output: all,
        type: 'info'
      };
    }
  },
  cat: {
    description: 'Read file content',
    execute: async (args) => {
      if (!args) {
        return {
          output: 'usage: cat [file]',
          type: 'error'
        };
      }
      const filename = args.trim().toLowerCase();

      // Map filenames to their public paths
      const fileMap = {
        'gsoc.json': '/gsoc/gsoc.json',
        'compete.json': '/compete/compete.json',
        'events.json': '/events/events.json',
        'resources.json': '/resources/resources.json',
        'team.json': '/team/json/all_members.json',
        'projects.json': '/projectsData.json'
      };

      const path = fileMap[filename];
      if (path) {
        const content = await fetchFile(path);
        if (content) {
          return {
            output: content,
            type: 'info'
          };
        }
      }

      return {
        output: `cat: ${args}: No such file or directory`,
        type: 'error'
      };
    }
  },
  events: {
    description: 'List upcoming events',
    execute: async () => {
      try {
        const res = await fetch('/events/events.json');
        const data = await res.json();
        const events = data.events?.slice(0, 5) || [];
        let output = `\nEVENTS & WORKSHOPS\n━━━━━━━━━━━━━━━━━━━━━━\n\n`;
        events.forEach((e, i) => {
          output += `${i + 1}. ${e.title}\n   └─ ${e.date} | ${e.category}\n\n`;
        });
        output += `Type 'cd events' to see the full list!`;
        return { output, type: 'info' };
      } catch {
        return { output: 'Visit /events page for event details.', type: 'info' };
      }
    }
  },
  compete: {
    description: 'List upcoming competitions',
    execute: async () => {
      try {
        const res = await fetch('/compete/compete.json');
        const data = await res.json();
        const comps = data.competitions?.slice(0, 5) || [];
        let output = `\nCOMPETITIONS\n━━━━━━━━━━━━━━━━\n\n`;
        comps.forEach((c, i) => {
          output += `${i + 1}. ${c.name}\n   └─ ${c.typicalMonth} | ${c.category}\n\n`;
        });
        output += `Type 'cd compete' to see the full list!`;
        return { output, type: 'info' };
      } catch {
        return { output: 'Visit /compete page for competition details.', type: 'info' };
      }
    }
  },
  resources: {
    description: 'List learning resources',
    execute: async () => {
      try {
        const res = await fetch('/resources/resources.json');
        const data = await res.json();
        const categories = data.categories || [];
        let output = `\nLEARNING RESOURCES\n━━━━━━━━━━━━━━━━━━━━━━\n\n`;
        categories.forEach((c, i) => {
          output += `${i + 1}. ${c.name}\n   └─ ${c.resources?.length || 0} resources\n\n`;
        });
        output += `Type 'cd resources' to see all resources!`;
        return { output, type: 'info' };
      } catch {
        return { output: 'Visit /resources page for learning materials.', type: 'info' };
      }
    }
  },
  help: {
    description: 'Display all available commands',
    execute: () => ({
      output: `
Available Commands:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

INFO COMMANDS
  help        Show this help message
  compete     List competitions
  events      List events
  resources   List learning resources
  about       About Kamand Prompt
  team        Meet our team
  contact     Contact information
  socials     Social media links
  gsoc        GSoC selections info
  projects    Our projects
  skills      Tech stack we use
  join        How to join us
  ls          List files & directories
  cat [file]  Read file content

NAVIGATION
  cd [dir]    Navigate to directory (page)
              Ex: cd gsoc, cd teams, cd resources

FUN COMMANDS
  whoami      Who are you?
  date        Current date & time
  echo [msg]  Echo a message
  cowsay [msg] Cow says something
  fastfetch   System information
  sudo [cmd]  Try running as root 
  rm -rf /    Delete everything... or not
  matrix      Enter the matrix
  clear       Clear terminal
  exit        Close terminal
  history     Command history

Type any command and press Enter!
`,
      type: 'success'
    })
  },
  // ... (rest of the file content unchanged, just ensuring correct context for replacement if needed, 
  // but since we are replacing a large block, I'll stick to replacing logical sections or use multi_replace if needed. 
  // Actually, I'll use multi_replace to be safer and disjointed edits).


  about: {
    description: 'About Kamand Prompt',
    execute: () => ({
      output: `
┌─────────────────────────────────────────────┐
│           KAMAND PROMPT                     │
│     The Programming Club @ IIT Mandi        │
├─────────────────────────────────────────────┤
│                                             │
│  We are a community of passionate coders,   │
│  innovators, and tech enthusiasts.          │
│                                             │
│  Mission: Foster coding culture             │
│  Est: 2014                                  │
│  Home: IIT Mandi, Kamand Campus             │
│  Members: 50+                               │
│                                             │
│  We organize workshops, hackathons,         │
│  coding competitions, and contribute        │
│  to open source projects.                   │
│                                             │
└─────────────────────────────────────────────┘
`,
      type: 'info'
    })
  },

  team: {
    description: 'Meet our team',
    execute: async () => {
      try {
        const res = await fetch('/team/json/all_members.json');
        const data = await res.json();
        let output = `\nTEAM KAMAND PROMPT\n━━━━━━━━━━━━━━━━━━━━━\n\n`;
        const roles = ['Coordinator', 'Co-coordinator', 'Mentor', 'Domain Lead'];
        roles.forEach(role => {
          const members = data.filter(m => m.position?.toLowerCase().includes(role.toLowerCase()));
          if (members.length > 0) {
            output += `>  ${role.toUpperCase()}S\n`;
            members.forEach(m => output += `    └─ ${m.name}\n`);
            output += `\n`;
          }
        });
        output += `Type 'cd teams' to see full team page!`;
        return { output, type: 'info' };
      } catch {
        return { output: 'Visit /teams page for team details.', type: 'info' };
      }
    }
  },

  contact: {
    description: 'Contact information',
    execute: () => ({
      output: `
CONTACT US
━━━━━━━━━━━━━

Email: pc@students.iitmandi.ac.in
Phone: +91 94185 39191
Location: IIT Mandi, Kamand, HP

Online:
   └─ Website: https://pc.iitmandi.co.in/

Type 'socials' to see our social links!
`,
      type: 'info'
    })
  },

  socials: {
    description: 'Social media links',
    execute: () => ({
      output: `
FOLLOW US
━━━━━━━━━━━━

Instagram: @kamandprompt
   └─ instagram.com/kamandprompt

LinkedIn: Programming Club IIT Mandi
   └─ www.linkedin.com/company/programming-club-iit-mandi/

GitHub: KamandPrompt
   └─ github.com/KamandPrompt

Join our community! Type 'join' to learn how.
`,
      type: 'info'
    })
  },

  gsoc: {
    description: 'GSoC info',
    execute: async () => {
      try {
        const res = await fetch('/gsoc/gsoc.json');
        const data = await res.json();
        const years = data.years || [];
        const totalSelections = years.reduce((acc, y) => acc + (y.selections?.length || 0), 0);
        let output = `\nGOOGLE SUMMER OF CODE\n━━━━━━━━━━━━━━━━━━━━━━━━━\n\n`;
        output += `Total Selections: ${totalSelections}\n\n`;
        output += `By Year:\n`;
        years.slice(0, 4).forEach(y => {
          output += `  > ${y.year} - ${y.selections?.length || 0} selections\n`;
          y.selections?.slice(0, 2).forEach(s => {
            output += `     └─ ${s.name}\n`;
          });
          if (y.selections?.length > 2) output += `     ... and ${y.selections.length - 2} more\n`;
          output += `\n`;
        });
        output += `Type 'cd gsoc' to see all selections!`;
        return { output, type: 'success' };
      } catch {
        return { output: 'Visit /gsoc page for GSoC details.', type: 'info' };
      }
    }
  },

  projects: {
    description: 'Our projects',
    execute: async () => {
      try {
        const res = await fetch('/projectsData.json');
        const projects = await res.json();
        let output = `\nOUR PROJECTS\n━━━━━━━━━━━━━━━\n\n`;
        projects.forEach((p, i) => {
          output += `${i + 1}. ${p.title}\n   └─ ${p.description.substring(0, 80)}...\n\n`;
        });
        output += `Visit: github.com/KamandPrompt`;
        return { output, type: 'info' };
      } catch {
        return { output: 'Visit github.com/KamandPrompt for our projects.', type: 'info' };
      }
    }
  },

  skills: {
    description: 'Tech stack',
    execute: () => ({
      output: `
TECH STACK WE USE
━━━━━━━━━━━━━━━━━━━━

Frontend:
  > React, Next.js, Vue
  > Tailwind CSS, Framer Motion

Backend:
  > Node.js, Express
  > Python, FastAPI, Django
  > Java, Spring Boot

Mobile:
  > React Native, Flutter

AI/ML:
  > PyTorch, TensorFlow
  > Hugging Face, LangChain

DevOps:
  > Docker, Kubernetes
  > AWS, GCP, Azure
`,
      type: 'info'
    })
  },

  join: {
    description: 'How to join',
    execute: () => ({
      output: `
JOIN KAMAND PROMPT!
━━━━━━━━━━━━━━━━━━━━━━

Eligibility:
  ✓ IIT Mandi student
  ✓ Passion for coding
  ✓ Willingness to learn
  ✓ Sophomore

How to join:
  1. Follow us on Instagram @kamandprompt
  2. Attend our sessions and events
  3. Contribute to our projects
  4. Participate in recruitment

We recruit at the start of each year.

Follow: instagram.com/kamandprompt
Query: pc@students.iitmandi.ac.in
`,
      type: 'success'
    })
  },

  whoami: {
    description: 'Who are you?',
    execute: () => ({
      output: 'A curious visitor exploring Kamand Prompt',
      type: 'info'
    })
  },

  date: {
    description: 'Current date',
    execute: () => ({
      output: new Date().toString(),
      type: 'info'
    })
  },

  fastfetch: {
    description: 'System info',
    execute: () => ({
      output: ASCII_ART.fastfetch,
      type: 'info'
    })
  },

  clear: {
    description: 'Clear terminal',
    execute: () => ({
      output: '__CLEAR__',
      type: 'clear'
    })
  },

  exit: {
    description: 'Close terminal',
    execute: () => ({
      output: '__EXIT__',
      type: 'exit'
    })
  },

  matrix: {
    description: 'Enter the matrix',
    execute: () => ({
      output: `
⠀⠀⠀⠀⠀⠀⢀⣤⣶⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣶⣤⡀⠀⠀⠀⠀⠀⠀
Wake up, Neo...
The Matrix has you...
Follow the white rabbit.

01001011 01100001 01101101 01100001 01101110 01100100
01010000 01110010 01101111 01101101 01110000 01110100

Knock, knock, Neo.
`,
      type: 'success'
    })
  },

  history: {
    description: 'Command history',
    execute: (_, history) => ({
      output: history.length > 0
        ? history.map((cmd, i) => `  ${i + 1}  ${cmd}`).join('\n')
        : 'No commands in history yet.',
      type: 'info'
    })
  },
};

// Virtual File System


// Special command handlers
export const handleSpecialCommands = (input, history) => {
  const parts = input.trim().toLowerCase().split(' ');
  const cmd = parts[0];
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
Sorry, user is not in the sudoers file. This incident will be reported.`,
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
    // Strip trailing slash if present (e.g., 'teams/' -> 'teams')
    const target = args.replace(/\/$/, '');

    const routes = {
      'home': '/home',
      '~': '/home',
      '/': '/home',
      'gsoc': '/gsoc',
      'team': '/teams',
      'teams': '/teams',
      'contact': '/contact',
      'compete': '/compete',
      'hackathons': '/compete',
      'events': '/events',
      'resources': '/resources',
    };

    if (routes[target]) {
      return {
        output: `Navigating to ${target}...`,
        type: 'navigate',
        route: routes[target]
      };
    }
    return {
      output: `cd: no such directory: ${args}`,
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

export const WELCOME_MESSAGE = `
Welcome to Kamand Prompt Terminal
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Type 'help'
`;
