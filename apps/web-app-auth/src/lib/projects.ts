import {
  SiCplusplus,
  SiDocker,
  SiExpress,
  SiFedora,
  SiGnubash,
  SiMongodb,
  SiNodedotjs,
  SiPostgresql,
  SiR,
  SiReact,
  SiTailwindcss,
} from '@icons-pack/react-simple-icons';

// TODO: Move to database with proper table.
// FIX: Why does it complain with Project being any if it recognizes types.d.ts

type Project = {
  name: string;
  date: string;
  status: string;
  description: string;
  bullets: string[];
  techStack: TechStack[];
};

type TechStack = {
  icon: any;
  title: string;
};

export const ehyf: Project = {
  name: "Entre Hielo y Fuego catering's service web app",
  date: 'Marzo-Abril 2023',
  status: 'CI - CD',
  description:
    'A quoting tool, interactive menu, reservation system for a catering service. Automated before manual calculations and labor-intensive customer service.',
  bullets: [
    'Layed out in Figma. Tailor-made for company’s target audience using TailwindCSS and some MaterialUI components.',
    'Currently designed for mobile navigation in mind. Built with responsiveness first focus.',
    'Custom hooks for efficient and effective data validation and communication between frontend and backend.',
    'Designed and implemented MongoDB database from scratch with scalability and flexibility as core philosophy.',
    'Complete set of administrative tools with CRUD operations for managing inventory and products.',
    'Administrative tools secured and isolated from users in its own Docker container.',
    'RESTful API with modern techniques, best-practices and data validation using Express.',
    'Secure and reliable: encryption at rest and CSFLE implementation for sensitive data.',
  ],
  techStack: [
    { icon: SiMongodb, title: 'MongoDB' },
    { icon: SiExpress, title: 'Express' },
    { icon: SiReact, title: 'React' },
    { icon: SiNodedotjs, title: 'Node.js' },
    { icon: SiDocker, title: 'Docker' },
  ],
};

export const ayh: Project = {
  name: 'Acolito y Hereje',
  date: 'May 2023',
  description:
    'My portfolio and blog made with love from scratch as a exploratory project to learn React, Typescript and PostgreSQL.',
  status: 'In development',
  bullets: [
    'Compiled with Vite',
    'Designed for desktop first.',
    'Basics of relational database architecture and design.',
    'Deployed on Heroku.',
    'Applied users for comment sections and OAuth.',
  ],
  techStack: [
    { icon: SiPostgresql, title: 'PostgreSQL' },
    { icon: SiExpress, title: 'Express' },
    { icon: SiReact, title: 'React' },
    { icon: SiNodedotjs, title: 'Node.js' },
    { icon: SiTailwindcss, title: 'TailwindCSS' },
  ],
};

export const absolutePixel: Project = {
  name: 'absolutepixel',
  date: 'Jul-Aug 2022',
  status: 'Archived',
  description: 'A 2D Game Engine written in modern C++ powered by SDL2 API.',
  bullets: [
    'Designed for a work in progress card game.',
    'Exploratory project for hands-on practice in OOP, design patterns, image display and user events.',
    'Currently there is a Pong! clone made with the engine in its correspondent branch.',
  ],
  techStack: [{ icon: SiCplusplus, title: 'C++' }],
};

export const freqTab: Project = {
  name: 'freqTab',
  date: 'May-July - 2022',
  status: 'Archived',
  description: 'Exploratory project for R, RStudio, and package making.',
  bullets: [
    'A simple yet effective R Package that automates the creation of complete frequency tables for grouped data in cleansed data-set columns.',
    'It is also capable of calculate measures of central tendency for grouped data.',
    'Proven in LAPOP survey data in the years 2006 to 2020 for Chile and Costa Rica data-sets.',
  ],
  techStack: [{ icon: SiR, title: 'R' }],
};

export const fedoraHapless: Project = {
  name: 'fedoraHapless',
  date: 'Aug-Oct - 2022',
  status: 'Archived',
  description: '.',
  bullets: [
    'A bash script that converts a fresh install of Fedora Server version to a Full Desktop Environment.',
    'For a fast and lightweight installation uses LightDM and bspwm.',
    'Automatically install development packages, applications and imports my personal configurations.',
    'Functions both as a backup and installer of my Linux daily-driver.',
    'Exploratory project for hands-on practice in bash scripting.',
  ],
  techStack: [
    { icon: SiFedora, title: 'Fedora Linux' },
    { icon: SiGnubash, title: 'Bash' },
  ],
};

const projects: Project[] = [ehyf, fedoraHapless, absolutePixel, ayh, freqTab];

export default projects;
