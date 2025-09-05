import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  Trophy, 
  Medal, 
  Award, 
  Star, 
  TrendingUp, 
  Users, 
  Search,
  Filter,
  Calendar,
  Clock,
  Target,
  Zap,
  Crown,
  Flame,
  ChevronDown,
  ChevronUp,
  RefreshCw
} from 'lucide-react';
import { supabase } from './lib/supabaseClient';
import { LeaderboardService, type LeaderboardEntry, type LeaderboardStats } from '../services/leaderboardService';

const levelColors = {
  beginner: 'bg-green-100 text-green-800',
  intermediate: 'bg-blue-100 text-blue-800',
  advanced: 'bg-purple-100 text-purple-800',
  expert: 'bg-yellow-100 text-yellow-800'
};

const levelIcons = {
  beginner: Target,
  intermediate: Zap,
  advanced: Star,
  expert: Crown
};

const Leaderboard: React.FC = () => {
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardEntry[]>([]);
  const [stats, setStats] = useState<LeaderboardStats>({
    totalUsers: 0,
    totalExams: 0,
    totalCertifications: 0,
    averageScore: 0,
    topPerformer: '',
    mostActiveUser: ''
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTimeframe, setSelectedTimeframe] = useState<'all' | 'week' | 'month' | 'year'>('all');
  const [selectedCategory, setSelectedCategory] = useState<'overall' | 'exams' | 'certifications' | 'streak'>('overall');
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch current user
        const { data: { user } } = await supabase.auth.getUser();
        setCurrentUser(user);

        // Fetch leaderboard data
        const leaderboardData = await LeaderboardService.fetchLeaderboardData();
        setLeaderboardData(leaderboardData);
        
        // Fetch stats
        const stats = await LeaderboardService.fetchLeaderboardStats();
        setStats(stats);

      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to load leaderboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const refreshData = async () => {
    try {
      setLoading(true);
      setError(null);

      const [leaderboardData, stats] = await Promise.all([
        LeaderboardService.fetchLeaderboardData(),
        LeaderboardService.fetchLeaderboardStats()
      ]);

      setLeaderboardData(leaderboardData);
      setStats(stats);
    } catch (error) {
      console.error('Error refreshing data:', error);
      setError('Failed to refresh leaderboard data');
    } finally {
      setLoading(false);
    }
  };

  const filteredData = leaderboardData.filter(entry => {
    const matchesSearch = entry.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         entry.email.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="h-6 w-6 text-yellow-500" />;
      case 2:
        return <Medal className="h-6 w-6 text-gray-400" />;
      case 3:
        return <Award className="h-6 w-6 text-amber-600" />;
      default:
        return <span className="text-lg font-bold text-gray-600">#{rank}</span>;
    }
  };

  const getStreakIcon = (streak: number) => {
    if (streak >= 10) return <Flame className="h-4 w-4 text-red-500" />;
    if (streak >= 5) return <TrendingUp className="h-4 w-4 text-orange-500" />;
    return <Clock className="h-4 w-4 text-gray-500" />;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getTimeAgo = (dateString: string) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;
    const diffInWeeks = Math.floor(diffInDays / 7);
    return `${diffInWeeks}w ago`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading leaderboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Error Loading Leaderboard</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (leaderboardData.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-gray-400 text-6xl mb-4">📊</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">No Data Available</h2>
          <p className="text-gray-600 mb-4">No exam results found. Take some exams to see the leaderboard!</p>
          <button 
            onClick={() => window.location.href = '/dashboard/exams'} 
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Take an Exam
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-4 sm:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <div></div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
              🏆 Leaderboard
            </h1>
            <Button 
              onClick={refreshData}
              variant="outline"
              size="sm"
              disabled={loading}
              className="text-xs sm:text-sm"
            >
              <RefreshCw className={`h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2 ${loading ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">Refresh</span>
            </Button>
          </div>
          <p className="text-sm sm:text-base lg:text-lg text-gray-600 max-w-2xl mx-auto">
            Compete with developers worldwide and climb the ranks. Show off your coding skills and achievements!
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-6 sm:mb-8">
          <Card>
            <CardContent className="p-3 sm:p-6">
              <div className="flex items-center justify-between">
                <div className="min-w-0">
                  <p className="text-xs sm:text-sm font-medium text-gray-600">Total Users</p>
                  <p className="text-lg sm:text-2xl font-bold text-gray-900">{stats.totalUsers.toLocaleString()}</p>
                </div>
                <Users className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600 flex-shrink-0" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-3 sm:p-6">
              <div className="flex items-center justify-between">
                <div className="min-w-0">
                  <p className="text-xs sm:text-sm font-medium text-gray-600">Exams Completed</p>
                  <p className="text-lg sm:text-2xl font-bold text-gray-900">{stats.totalExams.toLocaleString()}</p>
                </div>
                <Target className="h-6 w-6 sm:h-8 sm:w-8 text-green-600 flex-shrink-0" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-3 sm:p-6">
              <div className="flex items-center justify-between">
                <div className="min-w-0">
                  <p className="text-xs sm:text-sm font-medium text-gray-600">Certifications</p>
                  <p className="text-lg sm:text-2xl font-bold text-gray-900">{stats.totalCertifications.toLocaleString()}</p>
                </div>
                <Award className="h-6 w-6 sm:h-8 sm:w-8 text-purple-600 flex-shrink-0" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-3 sm:p-6">
              <div className="flex items-center justify-between">
                <div className="min-w-0">
                  <p className="text-xs sm:text-sm font-medium text-gray-600">Average Score</p>
                  <p className="text-lg sm:text-2xl font-bold text-gray-900">{stats.averageScore}%</p>
                </div>
                <TrendingUp className="h-6 w-6 sm:h-8 sm:w-8 text-orange-600 flex-shrink-0" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <div className="mb-6 sm:mb-8 space-y-3 sm:space-y-4">
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 sm:h-5 sm:w-5" />
              <Input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 sm:pl-10 h-9 sm:h-12 text-sm"
              />
            </div>
            
            <Tabs value={selectedCategory} onValueChange={(value) => setSelectedCategory(value as any)}>
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overall" className="text-xs sm:text-sm">Overall</TabsTrigger>
                <TabsTrigger value="exams" className="text-xs sm:text-sm">Exams</TabsTrigger>
                <TabsTrigger value="certifications" className="text-xs sm:text-sm">Certifications</TabsTrigger>
                <TabsTrigger value="streak" className="text-xs sm:text-sm">Streak</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>

        {/* Current User Position */}
        {currentUser && (
          <Card className="mb-6 border-blue-200 bg-blue-50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                    {currentUser.email?.charAt(0).toUpperCase() || 'U'}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Your Position</p>
                    <p className="text-sm text-gray-600">Keep climbing the ranks!</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  View Profile
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Leaderboard Table */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-yellow-500" />
              Top Performers
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Rank
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      User
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Level
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Score
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Exams
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Certifications
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Streak
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Last Active
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredData.map((entry) => {
                    const LevelIcon = levelIcons[entry.level];
                    return (
                      <tr key={entry.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            {getRankIcon(entry.rank)}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold mr-3">
                              {entry.username.charAt(0).toUpperCase()}
                            </div>
                            <div>
                              <div className="text-sm font-medium text-gray-900">{entry.username}</div>
                              <div className="text-sm text-gray-500">{entry.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Badge className={`${levelColors[entry.level]} flex items-center gap-1 w-fit`}>
                            <LevelIcon className="h-3 w-3" />
                            {entry.level}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{entry.totalScore.toLocaleString()}</div>
                          <div className="text-sm text-gray-500">Avg: {entry.averageScore}%</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {entry.examsCompleted}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {entry.certificationsEarned}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-1">
                            {getStreakIcon(entry.streak)}
                            <span className="text-sm font-medium text-gray-900">{entry.streak}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {getTimeAgo(entry.lastActive)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Badges Section */}
        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5 text-purple-500" />
                Recent Achievements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {leaderboardData.slice(0, 6).map((entry) => (
                  <div key={entry.id} className="flex items-center gap-3 p-3 border rounded-lg hover:bg-gray-50">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                      {entry.username.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{entry.username}</p>
                      <p className="text-xs text-gray-500">Earned {entry.badges[0] || 'New Badge'}</p>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {entry.level}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Call to Action */}
        <div className="mt-8 text-center">
          <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
            <CardContent className="py-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Ready to Climb the Leaderboard?
              </h3>
              <p className="text-gray-600 mb-4">
                Take more exams, earn certifications, and show the world your coding skills!
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Target className="h-4 w-4 mr-2" />
                  Take an Exam
                </Button>
                <Button variant="outline">
                  <Award className="h-4 w-4 mr-2" />
                  View Certifications
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
