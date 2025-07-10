/**
 * Card component for displaying a single project in the portfolio.
 * Accepts project data as props and renders details.
 */
type Project = {
  title: string;
  description: string;
  // Add more fields as needed
};

const ProjectCard = ({ project }: { project: Project }) => {
  return (
    <div className="project-card">
      <h3 className="font-bold text-lg mb-2">{project.title}</h3>
      <p className="text-gray-600 dark:text-gray-400">{project.description}</p>
      {/* Add more project details here as needed */}
    </div>
  );
};

export default ProjectCard;