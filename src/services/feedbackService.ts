import { supabase } from '../components/lib/supabaseClient';

export interface Feedback {
  id: string;
  userId: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  category: 'bug' | 'feature' | 'general' | 'improvement' | 'complaint';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'pending' | 'in_progress' | 'resolved' | 'closed';
  rating?: number;
  userAgent?: string;
  pageUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface FeedbackResponse {
  id: string;
  feedbackId: string;
  adminId: string;
  response: string;
  createdAt: string;
}

export interface CreateFeedbackData {
  name: string;
  email: string;
  subject: string;
  message: string;
  category: 'bug' | 'feature' | 'general' | 'improvement' | 'complaint';
  priority?: 'low' | 'medium' | 'high' | 'urgent';
  rating?: number;
  userAgent?: string;
  pageUrl?: string;
}


export interface FeedbackStats {
  total: number;
  pending: number;
  inProgress: number;
  resolved: number;
  closed: number;
  byCategory: Record<string, number>;
  averageRating: number;
}

export class FeedbackService {
  static async createFeedback(data: CreateFeedbackData): Promise<Feedback> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      const feedbackData = {
        user_id: user?.id || null,
        name: data.name,
        email: data.email,
        subject: data.subject,
        message: data.message,
        category: data.category,
        priority: data.priority || 'medium',
        rating: data.rating,
        user_agent: data.userAgent || navigator.userAgent,
        page_url: data.pageUrl || window.location.href
      };

      const { data: feedback, error } = await supabase
        .from('feedback')
        .insert(feedbackData)
        .select()
        .single();

      if (error) {
        console.error('Error creating feedback:', error);
        throw new Error('Failed to create feedback');
      }

      return this.mapFeedbackFromDB(feedback);
    } catch (error) {
      console.error('Error in createFeedback:', error);
      throw error;
    }
  }

  static async getFeedbackList(limit: number = 50, offset: number = 0): Promise<Feedback[]> {
    try {
      const { data: feedback, error } = await supabase
        .from('feedback')
        .select('*')
        .order('created_at', { ascending: false })
        .range(offset, offset + limit - 1);

      if (error) {
        console.error('Error fetching feedback:', error);
        throw new Error('Failed to fetch feedback');
      }

      return feedback.map(this.mapFeedbackFromDB);
    } catch (error) {
      console.error('Error in getFeedbackList:', error);
      throw error;
    }
  }

  static async getUserFeedback(userId: string): Promise<Feedback[]> {
    try {
      const { data: feedback, error } = await supabase
        .from('feedback')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching user feedback:', error);
        throw new Error('Failed to fetch user feedback');
      }

      return feedback.map(this.mapFeedbackFromDB);
    } catch (error) {
      console.error('Error in getUserFeedback:', error);
      throw error;
    }
  }

  static async getFeedbackById(id: string): Promise<Feedback | null> {
    try {
      const { data: feedback, error } = await supabase
        .from('feedback')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error('Error fetching feedback by ID:', error);
        return null;
      }

      return this.mapFeedbackFromDB(feedback);
    } catch (error) {
      console.error('Error in getFeedbackById:', error);
      return null;
    }
  }

  static async updateFeedbackStatus(id: string, status: Feedback['status']): Promise<Feedback> {
    try {
      const { data: feedback, error } = await supabase
        .from('feedback')
        .update({ status })
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error('Error updating feedback status:', error);
        throw new Error('Failed to update feedback status');
      }

      return this.mapFeedbackFromDB(feedback);
    } catch (error) {
      console.error('Error in updateFeedbackStatus:', error);
      throw error;
    }
  }

  static async getFeedbackStats(): Promise<FeedbackStats> {
    try {
      const { data: feedback, error } = await supabase
        .from('feedback')
        .select('status, category, rating');

      if (error) {
        console.error('Error fetching feedback stats:', error);
        throw new Error('Failed to fetch feedback stats');
      }

      const stats: FeedbackStats = {
        total: feedback.length,
        pending: 0,
        inProgress: 0,
        resolved: 0,
        closed: 0,
        byCategory: {},
        averageRating: 0
      };

      let totalRating = 0;
      let ratingCount = 0;

      feedback.forEach(item => {
        // Count by status
        switch (item.status) {
          case 'pending':
            stats.pending++;
            break;
          case 'in_progress':
            stats.inProgress++;
            break;
          case 'resolved':
            stats.resolved++;
            break;
          case 'closed':
            stats.closed++;
            break;
        }

        // Count by category
        stats.byCategory[item.category] = (stats.byCategory[item.category] || 0) + 1;

        // Calculate average rating
        if (item.rating) {
          totalRating += item.rating;
          ratingCount++;
        }
      });

      stats.averageRating = ratingCount > 0 ? Math.round((totalRating / ratingCount) * 10) / 10 : 0;

      return stats;
    } catch (error) {
      console.error('Error in getFeedbackStats:', error);
      throw error;
    }
  }

  static async addFeedbackResponse(feedbackId: string, response: string): Promise<FeedbackResponse> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error('User not authenticated');
      }

      const { data: feedbackResponse, error } = await supabase
        .from('feedback_responses')
        .insert({
          feedback_id: feedbackId,
          admin_id: user.id,
          response
        })
        .select()
        .single();

      if (error) {
        console.error('Error adding feedback response:', error);
        throw new Error('Failed to add feedback response');
      }

      return {
        id: feedbackResponse.id,
        feedbackId: feedbackResponse.feedback_id,
        adminId: feedbackResponse.admin_id,
        response: feedbackResponse.response,
        createdAt: feedbackResponse.created_at
      };
    } catch (error) {
      console.error('Error in addFeedbackResponse:', error);
      throw error;
    }
  }

  static async getFeedbackResponses(feedbackId: string): Promise<FeedbackResponse[]> {
    try {
      const { data: responses, error } = await supabase
        .from('feedback_responses')
        .select('*')
        .eq('feedback_id', feedbackId)
        .order('created_at', { ascending: true });

      if (error) {
        console.error('Error fetching feedback responses:', error);
        throw new Error('Failed to fetch feedback responses');
      }

      return responses.map(response => ({
        id: response.id,
        feedbackId: response.feedback_id,
        adminId: response.admin_id,
        response: response.response,
        createdAt: response.created_at
      }));
    } catch (error) {
      console.error('Error in getFeedbackResponses:', error);
      throw error;
    }
  }

  private static mapFeedbackFromDB(dbFeedback: any): Feedback {
    return {
      id: dbFeedback.id,
      userId: dbFeedback.user_id,
      name: dbFeedback.name,
      email: dbFeedback.email,
      subject: dbFeedback.subject,
      message: dbFeedback.message,
      category: dbFeedback.category,
      priority: dbFeedback.priority,
      status: dbFeedback.status,
      rating: dbFeedback.rating,
      userAgent: dbFeedback.user_agent,
      pageUrl: dbFeedback.page_url,
      createdAt: dbFeedback.created_at,
      updatedAt: dbFeedback.updated_at
    };
  }
}
