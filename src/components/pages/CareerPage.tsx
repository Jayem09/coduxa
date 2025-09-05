import React from 'react';
import Career from '../Career';
import { CodeCredHeader } from '../CoduxaHeader';
import { CodeCredFooter } from '../CoduxaFooter';

const CareerPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <CodeCredHeader />
      <Career />
      <CodeCredFooter />
    </div>
  );
};

export default CareerPage;
