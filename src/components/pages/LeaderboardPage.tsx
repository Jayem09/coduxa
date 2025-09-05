import React from 'react';
import Leaderboard from '../Leaderboard';
import { CodeCredHeader } from '../CoduxaHeader';
import { CodeCredFooter } from '../CoduxaFooter';

const LeaderboardPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <CodeCredHeader />
      <Leaderboard />
      <CodeCredFooter />
    </div>
  );
};

export default LeaderboardPage;
