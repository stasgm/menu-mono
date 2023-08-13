type Post = {
  uuid: string;
  title: string;
  content: string;
  abstract?: string;
  coverImg?: string;
  createdAt: string;
  updatedAt: string;
};

type Project = {
  uuid: string;
  name: string;
  description: string;
  devPeriod: string;
  status: string;
  bullets: string[];
  techStack?: TechStack[];
  createdAt?: string;
  updatedAt?: string;
};

type TechStack = {
  icon: any;
  title: string;
};
