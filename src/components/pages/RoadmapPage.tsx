import React from 'react';
import Roadmap from '../Roadmap';
import { CodeCredHeader } from '../CoduxaHeader';
import { CodeCredFooter } from '../CoduxaFooter';

const RoadmapPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <CodeCredHeader />
      <Roadmap />
      <CodeCredFooter />
    </div>
  );
};

export default RoadmapPage;
