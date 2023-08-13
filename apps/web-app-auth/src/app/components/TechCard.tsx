import React from 'react';

// TODO: Reusable, responsive, iterable

type Params = {
  params: {
    techStack: TechStack;
  };
};

export default function TechCard({ params }: Params) {
  const { techStack } = params;

  const { icon, title } = techStack;

  return (
    <article className="flex-col justify-items-center rounded-md border text-center">
      <div>{icon}</div>
      <div>
        <h1>{title}</h1>
      </div>
    </article>
  );
}
