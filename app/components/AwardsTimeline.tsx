interface AwardItem {
  award: string;
  period: string;
  description: string;
}

const AwardsTimeline: React.FC<{ awardsHistory: AwardItem[] }> = ({
  awardsHistory,
}) => {
  return (
    <div className="py-4">
      <h3 className="text-xl font-medium mb-1">Awards</h3>
      <div className="relative pl-8">
        {awardsHistory.map((award, index) => (
          <div key={index} className="mb-3 relative">
            {/* Timeline dot */}
            <div className="absolute -left-8 mt-1.5">
              <div className="w-4 h-4 rounded-full bg-blue-500 border-4 border-blue-100"></div>
            </div>

            {/* Timeline line */}
            {/* {index !== educationHistory.length - 1 && (
            )} */}
            <div className="absolute -left-6 top-4 bottom-0 w-0.5 bg-blue-100"></div>

            {/* Content */}
            <div className="">
              <h4 className="text-base font-normal text-gray-900">
                {award.award}
              </h4>
              <p className="text-gray-600 font-light text-sm">
                {award.description}
              </p>
              <p className="text-gray-500 text-sm">{award.period}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AwardsTimeline;
