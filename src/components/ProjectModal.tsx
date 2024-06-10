import React from 'react';

interface ProjectModalProps {
  title: string;
  description: string;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ title, description }) => {
  return (
    <div className="project-modal">
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
};

export default ProjectModal;
