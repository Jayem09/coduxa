import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { 
  MessageSquare, 
  Send, 
  Star, 
  Bug, 
  Lightbulb, 
  HelpCircle, 
  ThumbsUp, 
  AlertTriangle,
  Clock,
  CheckCircle,
  RefreshCw,
  Search
} from 'lucide-react';
import { 
  FeedbackService
} from '../services/feedbackService';
import type { 
  Feedback as FeedbackType
} from '../services/feedbackService';

// Define the types locally to avoid import issues
type CreateFeedbackData = {
  name: string;
  email: string;
  subject: string;
  message: string;
  category: 'bug' | 'feature' | 'general' | 'improvement' | 'complaint';
  priority?: 'low' | 'medium' | 'high' | 'urgent';
  rating?: number;
  userAgent?: string;
  pageUrl?: string;
};

type FeedbackStats = {
  total: number;
  pending: number;
  inProgress: number;
  resolved: number;
  closed: number;
  byCategory: Record<string, number>;
  averageRating: number;
};

const Feedback: React.FC = () => {
  const [activeTab, setActiveTab] = useState('send');
  const [feedback, setFeedback] = useState<FeedbackType[]>([]);
  const [stats, setStats] = useState<FeedbackStats | null>(null);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');

  // Form state
  const [formData, setFormData] = useState<CreateFeedbackData>({
    name: '',
    email: '',
    subject: '',
    message: '',
    category: 'general',
    priority: 'medium',
    rating: undefined
  });

  const categoryIcons = {
    bug: Bug,
    feature: Lightbulb,
    general: HelpCircle,
    improvement: ThumbsUp,
    complaint: AlertTriangle
  };

  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800',
    in_progress: 'bg-blue-100 text-blue-800',
    resolved: 'bg-green-100 text-green-800',
    closed: 'bg-gray-100 text-gray-800'
  };

  const priorityColors = {
    low: 'bg-gray-100 text-gray-800',
    medium: 'bg-blue-100 text-blue-800',
    high: 'bg-orange-100 text-orange-800',
    urgent: 'bg-red-100 text-red-800'
  };

  useEffect(() => {
    loadFeedback();
    loadStats();
  }, []);

  const loadFeedback = async () => {
    setLoading(true);
    try {
      const data = await FeedbackService.getFeedbackList(100);
      setFeedback(data);
    } catch (error) {
      console.error('Error loading feedback:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadStats = async () => {
    try {
      const data = await FeedbackService.getFeedbackStats();
      setStats(data);
    } catch (error) {
      console.error('Error loading stats:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      await FeedbackService.createFeedback(formData);
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
        category: 'general',
        priority: 'medium',
        rating: undefined
      });

      // Reload feedback and stats
      await loadFeedback();
      await loadStats();
      
      // Switch to view tab
      setActiveTab('view');
      
      alert('Feedback submitted successfully! Thank you for your input.');
    } catch (error) {
      console.error('Error submitting feedback:', error);
      alert('Failed to submit feedback. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleInputChange = (field: keyof CreateFeedbackData, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const filteredFeedback = feedback.filter(item => {
    const matchesSearch = item.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;
    
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-4 sm:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
            Feedback Center
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto">
            Share your thoughts, report bugs, or suggest improvements. Your feedback helps us make Coduxa better for everyone.
          </p>
        </div>

        {/* Stats Cards */}
        {stats && (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-6 sm:mb-8">
            <Card>
              <CardContent className="p-3 sm:p-6">
                <div className="flex items-center">
                  <MessageSquare className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600 flex-shrink-0" />
                  <div className="ml-2 sm:ml-4 min-w-0">
                    <p className="text-xs sm:text-sm font-medium text-gray-600">Total Feedback</p>
                    <p className="text-lg sm:text-2xl font-bold text-gray-900">{stats.total}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-3 sm:p-6">
                <div className="flex items-center">
                  <Clock className="h-6 w-6 sm:h-8 sm:w-8 text-yellow-600 flex-shrink-0" />
                  <div className="ml-2 sm:ml-4 min-w-0">
                    <p className="text-xs sm:text-sm font-medium text-gray-600">Pending</p>
                    <p className="text-lg sm:text-2xl font-bold text-gray-900">{stats.pending}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-3 sm:p-6">
                <div className="flex items-center">
                  <CheckCircle className="h-6 w-6 sm:h-8 sm:w-8 text-green-600 flex-shrink-0" />
                  <div className="ml-2 sm:ml-4 min-w-0">
                    <p className="text-xs sm:text-sm font-medium text-gray-600">Resolved</p>
                    <p className="text-lg sm:text-2xl font-bold text-gray-900">{stats.resolved}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-3 sm:p-6">
                <div className="flex items-center">
                  <Star className="h-6 w-6 sm:h-8 sm:w-8 text-yellow-500 flex-shrink-0" />
                  <div className="ml-2 sm:ml-4 min-w-0">
                    <p className="text-xs sm:text-sm font-medium text-gray-600">Avg Rating</p>
                    <p className="text-lg sm:text-2xl font-bold text-gray-900">{stats.averageRating.toFixed(1)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6 sm:mb-8">
            <TabsTrigger value="send" className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm">
              <Send className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden sm:inline">Send Feedback</span>
              <span className="sm:hidden">Send</span>
            </TabsTrigger>
            <TabsTrigger value="view" className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm">
              <MessageSquare className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden sm:inline">View Feedback</span>
              <span className="sm:hidden">View</span>
            </TabsTrigger>
          </TabsList>

          {/* Send Feedback Tab */}
          <TabsContent value="send">
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                  <Send className="h-4 w-4 sm:h-5 sm:w-5" />
                  Send Your Feedback
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">
                        Name *
                      </label>
                      <Input
                        type="text"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        placeholder="Your name"
                        required
                        className="h-9 sm:h-10"
                      />
                    </div>

                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">
                        Email *
                      </label>
                      <Input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        placeholder="your.email@example.com"
                        required
                        className="h-9 sm:h-10"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">
                      Subject *
                    </label>
                    <Input
                      type="text"
                      value={formData.subject}
                      onChange={(e) => handleInputChange('subject', e.target.value)}
                      placeholder="Brief description of your feedback"
                      required
                      className="h-9 sm:h-10"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">
                        Category *
                      </label>
                      <Select
                        value={formData.category}
                        onValueChange={(value) => handleInputChange('category', value)}
                      >
                        <SelectTrigger className="h-9 sm:h-10">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="bug">🐛 Bug Report</SelectItem>
                          <SelectItem value="feature">💡 Feature Request</SelectItem>
                          <SelectItem value="improvement">✨ Improvement</SelectItem>
                          <SelectItem value="general">💬 General Feedback</SelectItem>
                          <SelectItem value="complaint">⚠️ Complaint</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">
                        Priority
                      </label>
                      <Select
                        value={formData.priority}
                        onValueChange={(value) => handleInputChange('priority', value)}
                      >
                        <SelectTrigger className="h-9 sm:h-10">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Low</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                          <SelectItem value="urgent">Urgent</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">
                      Message *
                    </label>
                    <Textarea
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      placeholder="Please provide detailed information about your feedback..."
                      rows={4}
                      required
                      className="text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">
                      Rating (Optional)
                    </label>
                    <div className="flex items-center gap-1 sm:gap-2">
                      {[1, 2, 3, 4, 5].map((rating) => (
                        <button
                          key={rating}
                          type="button"
                          onClick={() => handleInputChange('rating', rating)}
                          className="focus:outline-none"
                        >
                          <Star
                            className={`w-5 h-5 sm:w-6 sm:h-6 ${
                              formData.rating && rating <= formData.rating
                                ? 'text-yellow-400 fill-current'
                                : 'text-gray-300'
                            }`}
                          />
                        </button>
                      ))}
                      {formData.rating && (
                        <span className="ml-1 sm:ml-2 text-xs sm:text-sm text-gray-600">
                          {formData.rating} star{formData.rating !== 1 ? 's' : ''}
                        </span>
                      )}
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={submitting}
                    className="w-full h-9 sm:h-10 text-sm"
                  >
                    {submitting ? (
                      <>
                        <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4 mr-2" />
                        Submit Feedback
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* View Feedback Tab */}
          <TabsContent value="view">
            <div className="space-y-6">
              {/* Filters */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          placeholder="Search feedback..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pl-10"
                        />
                      </div>
                    </div>

                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger className="w-full sm:w-48">
                        <SelectValue placeholder="Filter by status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="in_progress">In Progress</SelectItem>
                        <SelectItem value="resolved">Resolved</SelectItem>
                        <SelectItem value="closed">Closed</SelectItem>
                      </SelectContent>
                    </Select>

                    <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                      <SelectTrigger className="w-full sm:w-48">
                        <SelectValue placeholder="Filter by category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                        <SelectItem value="bug">Bug Report</SelectItem>
                        <SelectItem value="feature">Feature Request</SelectItem>
                        <SelectItem value="improvement">Improvement</SelectItem>
                        <SelectItem value="general">General</SelectItem>
                        <SelectItem value="complaint">Complaint</SelectItem>
                      </SelectContent>
                    </Select>

                    <Button
                      variant="outline"
                      onClick={loadFeedback}
                      disabled={loading}
                    >
                      <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                      Refresh
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Feedback List */}
              {loading ? (
                <div className="text-center py-8">
                  <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4 text-gray-400" />
                  <p className="text-gray-600">Loading feedback...</p>
                </div>
              ) : filteredFeedback.length === 0 ? (
                <Card>
                  <CardContent className="p-8 text-center">
                    <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No feedback found</h3>
                    <p className="text-gray-600">
                      {searchTerm || statusFilter !== 'all' || categoryFilter !== 'all'
                        ? 'Try adjusting your filters to see more results.'
                        : 'Be the first to share your feedback!'}
                    </p>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-4">
                  {filteredFeedback.map((item) => {
                    const CategoryIcon = categoryIcons[item.category];
                    return (
                      <Card key={item.id}>
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-3">
                              <CategoryIcon className="h-5 w-5 text-gray-600" />
                              <div>
                                <h3 className="font-semibold text-gray-900">{item.subject}</h3>
                                <p className="text-sm text-gray-600">
                                  by {item.name} • {formatDate(item.createdAt)}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge className={statusColors[item.status]}>
                                {item.status.replace('_', ' ')}
                              </Badge>
                              <Badge className={priorityColors[item.priority]}>
                                {item.priority}
                              </Badge>
                            </div>
                          </div>

                          <p className="text-gray-700 mb-4">{item.message}</p>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              {item.rating && (
                                <div className="flex items-center gap-1">
                                  {renderStars(item.rating)}
                                </div>
                              )}
                              <span className="text-sm text-gray-500">
                                {item.category} • {item.priority} priority
                              </span>
                            </div>
                            <div className="text-sm text-gray-500">
                              ID: {item.id.slice(0, 8)}...
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Feedback;
