import React from 'react';

import TechCard from './TechCard';

// TODO: Do properly and make it reusable
// FIX: TechStack possibly undefined

type Params = {
  params: {
    project: Project;
  };
};

export default function Project({ params }: Params) {
  const { project } = params;
  const { name } = project;

  return (
    <article>
      <header
        className="justify-between
        font-bold
        sm:flex md:flex-row"
      >
        <div
          className="text-xl
          font-bold
          md:text-3xl"
        >
          <div className="flex items-center">
            <h4 className="rounded-md drop-shadow-sm">{name}</h4>
            <div className="ml-4 rounded-md px-2 py-1 text-xs text-gray-500">
              <p>{project.status}</p>
            </div>
          </div>
          <hr className="border-celestucho my-1 border-4"></hr>
          <div className="flex items-end justify-end">
            <h4 className="text-gris my-2 text-right text-xs font-normal italic">{project.date}</h4>
            <h4 className="text-gris my-2 text-right text-xs font-normal italic">
              {project.description}
            </h4>
          </div>
        </div>
      </header>
      <section>
        {project.bullets.map((bullet, i) => {
          return <p key={i}>{bullet}</p>;
        })}
      </section>
      <footer>
        {project.techStack.map((tech, i) => {
          return <TechCard key={i} params={{ techStack: tech }} />;
        })}
      </footer>
    </article>
  );
}
