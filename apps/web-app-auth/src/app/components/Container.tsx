/* eslint-disable @typescript-eslint/no-unsafe-return */
import projects from '@/lib/projects';

import Project from './Project';

export default function Container() {
  return projects.map((project: Project, i) => {
    return <Project key={i} params={{ project: project }} />;
  });
}
