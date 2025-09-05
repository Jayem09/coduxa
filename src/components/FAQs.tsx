import React, { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Search, HelpCircle, BookOpen, CreditCard, Users, Shield, Zap } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './ui/accordion';

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: 'general' | 'exams' | 'credits' | 'account' | 'technical' | 'billing';
  tags: string[];
}

const faqData: FAQ[] = [
  // General Questions
  {
    id: '1',
    question: 'What is Coduxa?',
    answer: 'Coduxa is a comprehensive coding assessment platform that helps developers test their skills through interactive coding exams, earn certificates, and track their progress across various programming languages and technologies.',
    category: 'general',
    tags: ['platform', 'overview', 'coding']
  },
  {
    id: '2',
    question: 'How do I get started with Coduxa?',
    answer: 'Getting started is easy! Simply create an account, choose your preferred programming language or technology, and start taking practice exams. You can also purchase credits to access premium exams and earn certificates.',
    category: 'general',
    tags: ['getting-started', 'account', 'exams']
  },
  {
    id: '3',
    question: 'Is Coduxa free to use?',
    answer: 'Coduxa offers both free and premium features. You can take basic practice exams for free, but premium exams, certificates, and advanced features require credits that can be purchased through our credit system.',
    category: 'general',
    tags: ['pricing', 'free', 'premium']
  },

  // Exam Questions
  {
    id: '4',
    question: 'What types of exams are available?',
    answer: 'We offer exams in multiple categories including JavaScript, Python, React, Node.js, TypeScript, SQL, Git, Docker, AWS, System Design, Algorithms, Machine Learning, Blockchain, and Cybersecurity. Each exam includes multiple-choice, coding, and practical questions.',
    category: 'exams',
    tags: ['exam-types', 'programming-languages', 'categories']
  },
  {
    id: '5',
    question: 'How long do exams take?',
    answer: 'Exam duration varies by complexity and type. Basic exams typically take 30-60 minutes, while comprehensive exams can take 2-4 hours. Each exam shows the estimated time before you start.',
    category: 'exams',
    tags: ['duration', 'time', 'exam-length']
  },
  {
    id: '6',
    question: 'Can I pause and resume an exam?',
    answer: 'Yes! Your progress is automatically saved every 30 seconds and when you navigate between questions. You can close the exam and resume within 24 hours. All your answers and progress will be preserved.',
    category: 'exams',
    tags: ['pause', 'resume', 'auto-save', 'progress']
  },
  {
    id: '7',
    question: 'What happens if I close the exam accidentally?',
    answer: 'Don\'t worry! Your exam results are automatically saved even if you close the exam. You can view your results in the exam history, and if you want to retake the exam, you can purchase it again with credits.',
    category: 'exams',
    tags: ['close-exam', 'auto-save', 'results', 'history']
  },
  {
    id: '8',
    question: 'How are exams scored?',
    answer: 'Exams are scored based on correct answers, with different point values for different question types. You need to achieve at least 70% to pass and earn a certificate. Detailed scoring breakdowns are provided in your results.',
    category: 'exams',
    tags: ['scoring', 'passing-grade', 'certificates', 'results']
  },

  // Credits Questions
  {
    id: '9',
    question: 'What are credits and how do I get them?',
    answer: 'Credits are our platform currency used to access premium exams and features. You can purchase credits through our secure payment system. Each exam costs a specific number of credits, and you can buy credits in various packages.',
    category: 'credits',
    tags: ['credits', 'currency', 'purchase', 'payment']
  },
  {
    id: '10',
    question: 'How much do credits cost?',
    answer: 'Credit packages start from $5 for 10 credits, with larger packages offering better value. Premium exams typically cost 2-5 credits each, while basic practice exams are free. Check our pricing page for current rates.',
    category: 'credits',
    tags: ['pricing', 'cost', 'packages', 'value']
  },
  {
    id: '11',
    question: 'Do credits expire?',
    answer: 'Credits do not expire and remain in your account indefinitely. You can use them whenever you want to take premium exams or access advanced features.',
    category: 'credits',
    tags: ['expiration', 'validity', 'account']
  },

  // Account Questions
  {
    id: '12',
    question: 'How do I create an account?',
    answer: 'Click the "Sign Up" button on our homepage, enter your email and create a password, then verify your email address. You can also sign up using your Google or GitHub account for faster registration.',
    category: 'account',
    tags: ['registration', 'signup', 'email', 'verification']
  },
  {
    id: '13',
    question: 'Can I change my email address?',
    answer: 'Yes, you can update your email address in your account settings. You\'ll need to verify the new email address before it becomes active.',
    category: 'account',
    tags: ['email', 'settings', 'update', 'verification']
  },
  {
    id: '14',
    question: 'How do I reset my password?',
    answer: 'Click "Forgot Password" on the login page, enter your email address, and we\'ll send you a secure link to reset your password. The link expires after 24 hours for security.',
    category: 'account',
    tags: ['password', 'reset', 'security', 'forgot-password']
  },

  // Technical Questions
  {
    id: '15',
    question: 'What browsers are supported?',
    answer: 'Coduxa works on all modern browsers including Chrome, Firefox, Safari, and Edge. We recommend using the latest version of your browser for the best experience.',
    category: 'technical',
    tags: ['browser', 'compatibility', 'support']
  },
  {
    id: '16',
    question: 'Do I need to install any software?',
    answer: 'No software installation required! Coduxa runs entirely in your web browser. Our code editor supports syntax highlighting and auto-completion for a smooth coding experience.',
    category: 'technical',
    tags: ['installation', 'software', 'browser', 'code-editor']
  },
  {
    id: '17',
    question: 'Is my data secure?',
    answer: 'Yes, we take security seriously. All data is encrypted in transit and at rest. We use industry-standard security practices and never share your personal information with third parties.',
    category: 'technical',
    tags: ['security', 'privacy', 'encryption', 'data-protection']
  },

  // Billing Questions
  {
    id: '18',
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and various local payment methods depending on your region. All payments are processed securely through our payment partners.',
    category: 'billing',
    tags: ['payment', 'credit-cards', 'paypal', 'security']
  },
  {
    id: '19',
    question: 'Can I get a refund?',
    answer: 'We offer refunds within 7 days of purchase if you haven\'t used the credits. Contact our support team with your order details to process a refund.',
    category: 'billing',
    tags: ['refund', 'policy', 'support', 'unused-credits']
  },
  {
    id: '20',
    question: 'Do you offer student discounts?',
    answer: 'Yes! We offer special pricing for students and educational institutions. Contact our support team with your student ID or educational email to learn about available discounts.',
    category: 'billing',
    tags: ['student', 'discount', 'education', 'pricing']
  }
];

const categoryIcons = {
  general: HelpCircle,
  exams: BookOpen,
  credits: CreditCard,
  account: Users,
  technical: Shield,
  billing: Zap
};

const categoryColors = {
  general: 'bg-blue-100 text-blue-800',
  exams: 'bg-green-100 text-green-800',
  credits: 'bg-yellow-100 text-yellow-800',
  account: 'bg-purple-100 text-purple-800',
  technical: 'bg-gray-100 text-gray-800',
  billing: 'bg-red-100 text-red-800'
};

const FAQs: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredFAQs = faqData.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const categories = [
    { id: 'all', label: 'All', count: faqData.length },
    { id: 'general', label: 'General', count: faqData.filter(f => f.category === 'general').length },
    { id: 'exams', label: 'Exams', count: faqData.filter(f => f.category === 'exams').length },
    { id: 'credits', label: 'Credits', count: faqData.filter(f => f.category === 'credits').length },
    { id: 'account', label: 'Account', count: faqData.filter(f => f.category === 'account').length },
    { id: 'technical', label: 'Technical', count: faqData.filter(f => f.category === 'technical').length },
    { id: 'billing', label: 'Billing', count: faqData.filter(f => f.category === 'billing').length }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-6 sm:py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-sm sm:text-base lg:text-lg text-gray-600 max-w-2xl mx-auto">
            Find answers to common questions about Coduxa. Can't find what you're looking for? 
            <a href="/contact" className="text-blue-600 hover:text-blue-800 ml-1">Contact our support team</a>.
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-6 sm:mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 sm:h-5 sm:w-5" />
            <Input
              type="text"
              placeholder="Search FAQs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 sm:pl-10 h-10 sm:h-12 text-sm sm:text-lg"
            />
          </div>
        </div>

        {/* Category Filter */}
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            {categories.map((category) => {
              const IconComponent = category.id !== 'all' ? categoryIcons[category.id as keyof typeof categoryIcons] : null;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-1.5 sm:py-2 rounded-lg border transition-all duration-200 text-xs sm:text-sm ${
                    selectedCategory === category.id
                      ? 'bg-gray-900 text-white border-gray-900'
                      : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  {IconComponent && <IconComponent className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />}
                  <span className="font-medium truncate">{category.label}</span>
                  <Badge variant="secondary" className="text-xs ml-1">
                    {category.count}
                  </Badge>
                </button>
              );
            })}
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-4 sm:mb-6">
          <p className="text-xs sm:text-sm text-gray-600">
            Showing {filteredFAQs.length} of {faqData.length} questions
            {searchTerm && ` for "${searchTerm}"`}
            {selectedCategory !== 'all' && ` in ${categories.find(c => c.id === selectedCategory)?.label}`}
          </p>
        </div>

        {/* FAQ Accordion */}
        <Card>
          <CardContent className="p-0">
            {filteredFAQs.length > 0 ? (
              <Accordion type="single" collapsible className="w-full">
                {filteredFAQs.map((faq) => {
                  const IconComponent = categoryIcons[faq.category];
                  return (
                    <AccordionItem key={faq.id} value={faq.id} className="border-b border-gray-200 last:border-b-0">
                      <AccordionTrigger className="px-3 sm:px-6 py-3 sm:py-4 hover:bg-gray-50">
                        <div className="flex items-start gap-2 sm:gap-3 text-left">
                          <IconComponent className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500 mt-0.5 flex-shrink-0" />
                          <div className="flex-1 min-w-0">
                            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mb-1">
                              <span className="font-medium text-gray-900 text-sm sm:text-base leading-tight">{faq.question}</span>
                              <Badge 
                                variant="secondary" 
                                className={`text-xs ${categoryColors[faq.category]} flex-shrink-0`}
                              >
                                {faq.category}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="px-3 sm:px-6 pb-3 sm:pb-4">
                        <div className="ml-6 sm:ml-8">
                          <p className="text-gray-700 leading-relaxed mb-3 text-sm sm:text-base">{faq.answer}</p>
                          <div className="flex flex-wrap gap-1">
                            {faq.tags.map((tag) => (
                              <Badge key={tag} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  );
                })}
              </Accordion>
            ) : (
              <div className="text-center py-12">
                <HelpCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No questions found</h3>
                <p className="text-gray-600 mb-4">
                  Try adjusting your search terms or category filter.
                </p>
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('all');
                  }}
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  Clear filters
                </button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Contact Support */}
        <div className="mt-12 text-center">
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="py-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Still have questions?
              </h3>
              <p className="text-gray-600 mb-4">
                Our support team is here to help you get the most out of Coduxa.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href="/contact"
                  className="inline-flex items-center justify-center px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
                >
                  Contact Support
                </a>
                <a
                  href="/docs"
                  className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  View Documentation
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default FAQs;
