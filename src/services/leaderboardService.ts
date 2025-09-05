import { supabase } from '../components/lib/supabaseClient';

export interface LeaderboardEntry {
  id: string;
  rank: number;
  username: string;
  email: string;
  totalScore: number;
  examsCompleted: number;
  certificationsEarned: number;
  averageScore: number;
  streak: number;
  lastActive: string;
  joinDate: string;
  badges: string[];
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
}

export interface LeaderboardStats {
  totalUsers: number;
  totalExams: number;
  totalCertifications: number;
  averageScore: number;
  topPerformer: string;
  mostActiveUser: string;
}

// Helper function to determine user level based on performance
const getUserLevel = (totalScore: number, examsCompleted: number, averageScore: number): 'beginner' | 'intermediate' | 'advanced' | 'expert' => {
  if (totalScore >= 2000 && examsCompleted >= 20 && averageScore >= 90) return 'expert';
  if (totalScore >= 1500 && examsCompleted >= 15 && averageScore >= 80) return 'advanced';
  if (totalScore >= 1000 && examsCompleted >= 10 && averageScore >= 70) return 'intermediate';
  return 'beginner';
};

// Helper function to calculate streak (simplified - you might want to implement this based on your actual streak logic)
const calculateStreak = (lastActive: string): number => {
  const now = new Date();
  const lastActiveDate = new Date(lastActive);
  const diffInDays = Math.floor((now.getTime() - lastActiveDate.getTime()) / (1000 * 60 * 60 * 24));
  
  // Simple streak calculation - you might want to implement actual streak logic
  if (diffInDays <= 1) return Math.floor(Math.random() * 15) + 1; // Random streak for demo
  return 0;
};

export class LeaderboardService {
  static async fetchLeaderboardData(): Promise<LeaderboardEntry[]> {
    try {
      // Use the secure database function to get leaderboard data
      const { data, error } = await supabase.rpc('get_leaderboard_data');

      if (error) {
        console.error('Error fetching leaderboard data:', error);
        // Fallback to direct query if function doesn't exist
        return await this.fetchLeaderboardDataFallback();
      }

      if (!data || data.length === 0) {
        return [];
      }

      // Convert the function result to leaderboard entries
      const entries: LeaderboardEntry[] = data.map((user: any, index: number) => {
        const level = getUserLevel(
          parseInt(user.total_score) || 0, 
          parseInt(user.exams_completed) || 0, 
          parseFloat(user.average_score) || 0
        );
        const streak = calculateStreak(user.last_active);

        return {
          id: user.user_id,
          rank: index + 1,
          username: user.username || 'Anonymous',
          email: user.email,
          totalScore: parseInt(user.total_score) || 0,
          examsCompleted: parseInt(user.exams_completed) || 0,
          certificationsEarned: parseInt(user.certifications_earned) || 0,
          averageScore: Math.round((parseFloat(user.average_score) || 0) * 10) / 10,
          streak: streak,
          lastActive: user.last_active,
          joinDate: user.join_date,
          badges: [], // You can implement badge logic based on achievements
          level: level
        };
      });

      return entries;

    } catch (error) {
      console.error('Error processing leaderboard data:', error);
      throw error;
    }
  }

  // Fallback method if the database function doesn't exist
  static async fetchLeaderboardDataFallback(): Promise<LeaderboardEntry[]> {
    try {
      // Fetch exam results with user data
      const { data: examResults, error: examError } = await supabase
        .from('exam_results')
        .select(`
          *,
          profiles!inner(
            id,
            email,
            full_name,
            created_at
          )
        `)
        .order('score', { ascending: false });

      if (examError) {
        console.error('Error fetching exam results:', examError);
        throw new Error('Failed to fetch exam results');
      }

      // Process the data to create leaderboard entries
      const userStats = new Map<string, {
        totalScore: number;
        examsCompleted: number;
        certificationsEarned: number;
        scores: number[];
        lastActive: string;
        joinDate: string;
        username: string;
        email: string;
        userId: string;
      }>();

      examResults?.forEach((result: any) => {
        const userId = result.profiles.id;
        const existing = userStats.get(userId);

        if (existing) {
          existing.totalScore += result.score;
          existing.examsCompleted += 1;
          existing.scores.push(result.score);
          if (result.passed) {
            existing.certificationsEarned += 1;
          }
          // Update last active if this exam was more recent
          if (new Date(result.created_at) > new Date(existing.lastActive)) {
            existing.lastActive = result.created_at;
          }
        } else {
          userStats.set(userId, {
            totalScore: result.score,
            examsCompleted: 1,
            certificationsEarned: result.passed ? 1 : 0,
            scores: [result.score],
            lastActive: result.created_at,
            joinDate: result.profiles.created_at,
            username: result.profiles.full_name || result.profiles.email?.split('@')[0] || 'Anonymous',
            email: result.profiles.email,
            userId: userId
          });
        }
      });

      // Convert to leaderboard entries and sort
      const entries: LeaderboardEntry[] = Array.from(userStats.values())
        .map((user) => {
          const averageScore = user.scores.reduce((sum, score) => sum + score, 0) / user.scores.length;
          const level = getUserLevel(user.totalScore, user.examsCompleted, averageScore);
          const streak = calculateStreak(user.lastActive);

          return {
            id: user.userId,
            rank: 0, // Will be set after sorting
            username: user.username,
            email: user.email,
            totalScore: user.totalScore,
            examsCompleted: user.examsCompleted,
            certificationsEarned: user.certificationsEarned,
            averageScore: Math.round(averageScore * 10) / 10,
            streak: streak,
            lastActive: user.lastActive,
            joinDate: user.joinDate,
            badges: [], // You can implement badge logic based on achievements
            level: level
          };
        })
        .sort((a, b) => b.totalScore - a.totalScore)
        .slice(0, 50); // Top 50 users

      // Update ranks
      entries.forEach((entry, index) => {
        entry.rank = index + 1;
      });

      return entries;

    } catch (error) {
      console.error('Error processing leaderboard data fallback:', error);
      throw error;
    }
  }

  static async fetchLeaderboardStats(): Promise<LeaderboardStats> {
    try {
      // Try to use the secure view first
      const { data: statsData, error: statsError } = await supabase
        .from('leaderboard_stats')
        .select('*')
        .single();

      if (statsError) {
        console.log('Stats view not available, using fallback method');
        return await this.fetchLeaderboardStatsFallback();
      }

      // Get leaderboard data to find top performers
      const leaderboardData = await this.fetchLeaderboardData();
      
      const topPerformer = leaderboardData[0]?.username || '';
      const mostActiveUser = leaderboardData.reduce((prev, current) => 
        (current.examsCompleted > prev.examsCompleted) ? current : prev
      , leaderboardData[0] || { examsCompleted: 0, username: '' }).username;

      return {
        totalUsers: parseInt(statsData.total_users) || 0,
        totalExams: parseInt(statsData.total_exams) || 0,
        totalCertifications: parseInt(statsData.total_certifications) || 0,
        averageScore: Math.round((parseFloat(statsData.average_score) || 0) * 10) / 10,
        topPerformer,
        mostActiveUser
      };

    } catch (error) {
      console.error('Error fetching stats:', error);
      return await this.fetchLeaderboardStatsFallback();
    }
  }

  // Fallback method for stats if views don't exist
  static async fetchLeaderboardStatsFallback(): Promise<LeaderboardStats> {
    try {
      // Get total users
      const { count: totalUsers } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true });

      // Get total exams
      const { count: totalExams } = await supabase
        .from('exam_results')
        .select('*', { count: 'exact', head: true });

      // Get total certifications (passed exams)
      const { count: totalCertifications } = await supabase
        .from('exam_results')
        .select('*', { count: 'exact', head: true })
        .eq('passed', true);

      // Get average score
      const { data: scores } = await supabase
        .from('exam_results')
        .select('score');

      const averageScore = scores?.length 
        ? scores.reduce((sum, result) => sum + result.score, 0) / scores.length 
        : 0;

      // Get leaderboard data to find top performers
      const leaderboardData = await this.fetchLeaderboardData();
      
      const topPerformer = leaderboardData[0]?.username || '';
      const mostActiveUser = leaderboardData.reduce((prev, current) => 
        (current.examsCompleted > prev.examsCompleted) ? current : prev
      , leaderboardData[0] || { examsCompleted: 0, username: '' }).username;

      return {
        totalUsers: totalUsers || 0,
        totalExams: totalExams || 0,
        totalCertifications: totalCertifications || 0,
        averageScore: Math.round(averageScore * 10) / 10,
        topPerformer,
        mostActiveUser
      };

    } catch (error) {
      console.error('Error fetching stats fallback:', error);
      throw error;
    }
  }

  static async getUserRank(userId: string): Promise<number> {
    try {
      const leaderboardData = await this.fetchLeaderboardData();
      const userEntry = leaderboardData.find(entry => entry.id === userId);
      return userEntry ? userEntry.rank : -1;
    } catch (error) {
      console.error('Error fetching user rank:', error);
      return -1;
    }
  }
}
