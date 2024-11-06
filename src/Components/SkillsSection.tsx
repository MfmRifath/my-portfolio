import React from "react";

const skills = [
  { name: "JavaScript", level: 90 },
  { name: "React", level: 85 },
  { name: "TypeScript", level: 80 },
  { name: "Node.js", level: 75 },
  { name: "Flutter", level: 70 },
  { name: "Python", level: 65 },
  { name: "Machine Learning", level: 60 },
  { name: "Database Management", level: 85 },
];

const SkillsSection: React.FC = () => {
  return (
    <section
      className="bg-gradient-to-b from-gray-50 to-white p-12"
      id="skills"
    >
      <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-8">
        My Skills
      </h2>
      <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12 leading-relaxed">
        Over the years, I have honed a diverse set of skills in software
        development, from front-end and back-end technologies to mobile app
        development and machine learning.
      </p>

      <div className="max-w-4xl mx-auto space-y-8">
        {skills.map((skill, index) => (
          <div key={index} className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-800 font-semibold">{skill.name}</span>
              <span className="text-gray-600">{skill.level}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div
                className={`bg-gradient-to-r from-blue-500 to-blue-600 h-4 rounded-full transition-width duration-500`}
                style={{ width: `${skill.level}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      {/* Call to Action */}
      <div className="text-center mt-12">
        <a
          href="#projects"
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-8 rounded-lg shadow-md transition-transform transform hover:scale-105"
        >
          View My Projects
        </a>
      </div>
    </section>
  );
};

export default SkillsSection;
