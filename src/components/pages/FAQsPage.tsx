import React from 'react';
import FAQs from '../FAQs';
import { CodeCredHeader } from '../CoduxaHeader';
import { CodeCredFooter } from '../CoduxaFooter';

const FAQsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <CodeCredHeader />
      <FAQs />
      <CodeCredFooter />
    </div>
  );
};

export default FAQsPage;
