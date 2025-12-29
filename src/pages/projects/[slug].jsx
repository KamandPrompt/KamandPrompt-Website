import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronLeft, Users, Calendar, Tag } from 'lucide-react';

const ProjectDetail = () => {
  const { slug } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjectData = async () => {
      try {
        const response = await fetch('/projectsData.json');
        const projects = await response.json();
        const matchedProject = projects.find(project =>
          project.title.toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[^\w\-]+/g, '')
            .replace(/^-+|-+$/g, '') === slug
        );

        setProject(matchedProject);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching project data:', error);
        setLoading(false);
      }
    };

    fetchProjectData();
  }, [slug]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-2xl font-semibold text-gray-600">Loading...</div>
      </div>
    );
  }

  if (!project) {
    return (
      <div style={{
        backgroundImage: 'radial-gradient(circle, #eeeeee 2px, transparent 2px)',
        backgroundSize: '64px 64px',
        backgroundAttachment: 'fixed',
        opacity: 0.3
      }}>
        <h1 className="text-3xl font-bold text-gray-800">Project Not Found</h1>
        <p className="mt-4 text-gray-600">The project you are looking for does not exist.</p>
        <Link to="/" className="mt-6 inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      <Link
        to="/"
        className="inline-flex items-center text-gray-600 hover:text-gray-800 mb-6"
      >
        <ChevronLeft className="mr-2" />
        Back to Home
      </Link>

      <article className="prose lg:prose-xl max-w-none">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">{project.title}</h1>
        <div className="flex items-center text-gray-600 mb-8 space-x-4">
          <div className="flex items-center">
            <Tag className="mr-2 w-5 h-5" />
            <span>{project.category}</span>
          </div>
          <div className="flex items-center">
            <Calendar className="mr-2 w-5 h-5" />
            <span>{project.year}</span>
          </div>
        </div>

        <img
          src={project.image}
          alt={project.title}
          className="w-full h-96 object-cover rounded-lg mb-8 shadow-lg"
        />

        <div className="leading-relaxed text-gray-800">
          <p className="text-xl mb-6">{project.description}</p>

          <h3 className="text-lg font-semibold text-gray-800 mb-4">Technologies Used:</h3>
          <ul className="list-disc list-inside mb-6">
            {project.tech.map((tech, index) => (
              <li key={index}>{tech}</li>
            ))}
          </ul>

          <h3 className="text-lg font-semibold text-gray-800 mb-4">Team Members:</h3>
          <ul className="list-disc list-inside">
            {project.team.map((member, index) => (
              <li key={index}>{member}</li>
            ))}
          </ul>
        </div>
      </article>
    </div>
  );
};

export default ProjectDetail;
