import React from 'react';
import { CodeCredHeader } from '../CoduxaHeader';
import { CodeCredFooter } from '../CoduxaFooter';
import Feedback from '../Feedback';

const FeedbackPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <CodeCredHeader />
      <main>
        <Feedback />
      </main>
      <CodeCredFooter />
    </div>
  );
};

export default FeedbackPage;
