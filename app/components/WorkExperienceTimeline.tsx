interface WorkExperienceItem {
  company: string;
  position: string;
  period: string;
}

const WorkExperienceTimeline: React.FC<{
  workExperienceHistory: WorkExperienceItem[];
}> = ({ workExperienceHistory }) => {
  return (
    <div className="py-4">
      <h3 className="text-xl font-medium mb-1">Work Experience</h3>
      <div className="relative pl-8">
        {workExperienceHistory.map((workExperience, index) => (
          <div key={index} className="mb-3 relative">
            {/* Timeline dot */}
            <div className="absolute -left-8 mt-1.5">
              <div className="w-4 h-4 rounded-full bg-blue-500 border-4 border-blue-100"></div>
            </div>

            {/* Timeline line */}
            {/* {index !== workExperienceHistory.length - 1 && (
            )} */}
            <div className="absolute -left-6 top-4 bottom-0 w-0.5 bg-blue-100"></div>

            {/* Content */}
            <div className="">
              <h4 className="text-base font-normal text-gray-900">
                {workExperience.company}
              </h4>
              <p className="text-gray-600 font-light text-sm">
                {workExperience.position}
              </p>
              <p className="text-gray-500 text-sm">{workExperience.period}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkExperienceTimeline;
