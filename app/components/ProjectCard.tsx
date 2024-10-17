import React from 'react';

interface ProjectCardProps {
  title: string;
  description: string;
  technologies: string[];
  link: string;
}

export default function ProjectCard({ title, description, technologies, link }: ProjectCardProps) {
  return (
    <article className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md mb-6 max-w-full">
      <h3 className="text-xl font-medium mb-2">{title}</h3>
      <p className="text-gray-600 dark:text-gray-400 mb-4">{description}</p>
      <div className="mb-4">
        <h4 className="sr-only">Technologies used:</h4>
        <ul className="flex flex-wrap" aria-label="Technologies used in this project">
          {technologies.map((tech, index) => (
            <li key={index} className="inline-block bg-gray-200 dark:bg-gray-700 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 dark:text-gray-300 mr-2 mb-2">
              {tech}
            </li>
          ))}
        </ul>
      </div>
      <a 
        href={link} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="text-blue-600 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-label={`View ${title} project (opens in a new tab)`}
      >
        View Project
      </a>
    </article>
  );
}
