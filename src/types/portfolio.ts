export interface PortfolioData {
  meta: {
    status: number;
    headers: Record<string, string>;
  };
  data: {
    name: string;
    role: string;
    company: string;
    about: {
      title: string;
      summary: string;
      details: string;
      hobbies: {
        title: string;
        items: string[];
      };
      strengths: {
        title: string;
        items: string[];
      };
    };
    work: {
      title: string;
      items: WorkItem[];
    };
    contact: {
      email: string;
      github: string;
      linkedin: string;
    };
  };
}

export interface WorkItem {
  company: string;
  role: string;
  period: string;
  description: string;
  tags: string[];
  url: string;
}
