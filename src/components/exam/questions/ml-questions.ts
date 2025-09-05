// Machine Learning Questions - Organized by difficulty
import type { Question } from '../ExamInterface';
import { questionTemplates, generateQuestionId } from './QuestionManager';

// BEGINNER QUESTIONS
export const mlBeginnerQuestions: Question[] = [
  questionTemplates.multipleChoice(
    generateQuestionId('ml-fundamentals', 1),
    'What is machine learning?',
    ['A subset of AI that enables computers to learn without being explicitly programmed', 'A programming language', 'A database system', 'A web framework'],
    'A subset of AI that enables computers to learn without being explicitly programmed',
    4
  ),
  
  questionTemplates.trueFalse(
    generateQuestionId('ml-fundamentals', 2),
    'Machine learning requires large amounts of data to work effectively',
    true,
    2
  ),
  
  questionTemplates.multipleChoice(
    generateQuestionId('ml-fundamentals', 3),
    'Which of the following is NOT a type of machine learning?',
    ['Supervised Learning', 'Unsupervised Learning', 'Reinforcement Learning', 'Manual Learning'],
    'Manual Learning',
    4
  ),
  
  questionTemplates.fillBlank(
    generateQuestionId('ml-fundamentals', 4),
    'In supervised learning, the algorithm learns from ___ data that includes both input features and target labels.',
    'labeled',
    3
  ),
  
  questionTemplates.multipleChoice(
    generateQuestionId('ml-fundamentals', 5),
    'What is the purpose of training data in machine learning?',
    ['To test the model', 'To teach the model patterns', 'To deploy the model', 'To validate the model'],
    'To teach the model patterns',
    4
  ),
  
  questionTemplates.trueFalse(
    generateQuestionId('ml-fundamentals', 6),
    'Overfitting occurs when a model performs well on training data but poorly on new, unseen data',
    true,
    3
  ),
  
  questionTemplates.multipleChoice(
    generateQuestionId('ml-fundamentals', 7),
    'Which algorithm is commonly used for classification problems?',
    ['Linear Regression', 'K-Means', 'Decision Tree', 'Principal Component Analysis'],
    'Decision Tree',
    4
  ),
  
  questionTemplates.multipleChoice(
    generateQuestionId('ml-fundamentals', 8),
    'What does "feature" mean in machine learning?',
    ['The target variable', 'An input variable used to make predictions', 'The model itself', 'The training algorithm'],
    'An input variable used to make predictions',
    3
  ),
  
  questionTemplates.trueFalse(
    generateQuestionId('ml-fundamentals', 9),
    'Data preprocessing is an important step before training a machine learning model',
    true,
    2
  ),
  
  questionTemplates.multipleChoice(
    generateQuestionId('ml-fundamentals', 10),
    'What is the main goal of unsupervised learning?',
    ['To predict target values', 'To find hidden patterns in data', 'To classify data points', 'To optimize performance'],
    'To find hidden patterns in data',
    4
  )
];

// INTERMEDIATE QUESTIONS
export const mlIntermediateQuestions: Question[] = [
  questionTemplates.multipleChoice(
    generateQuestionId('ml-algorithms', 1),
    'Which evaluation metric is best for imbalanced classification datasets?',
    ['Accuracy', 'Precision', 'F1-Score', 'Mean Squared Error'],
    'F1-Score',
    5
  ),
  
  questionTemplates.multipleChoice(
    generateQuestionId('ml-algorithms', 2),
    'What is the purpose of cross-validation?',
    ['To increase training speed', 'To reduce overfitting', 'To get a more robust estimate of model performance', 'To reduce memory usage'],
    'To get a more robust estimate of model performance',
    5
  ),
  
  questionTemplates.trueFalse(
    generateQuestionId('ml-algorithms', 3),
    'Random Forest is an ensemble method that combines multiple decision trees',
    true,
    4
  ),
  
  questionTemplates.multipleChoice(
    generateQuestionId('ml-algorithms', 4),
    'Which algorithm is most suitable for clustering unlabeled data?',
    ['Linear Regression', 'K-Means', 'Support Vector Machine', 'Logistic Regression'],
    'K-Means',
    4
  ),
  
  questionTemplates.fillBlank(
    generateQuestionId('ml-algorithms', 5),
    'The ___ function measures how well a model fits the training data by calculating the average squared difference between predicted and actual values.',
    'loss',
    4
  ),
  
  questionTemplates.multipleChoice(
    generateQuestionId('ml-algorithms', 6),
    'What is the main advantage of using regularization in machine learning?',
    ['Faster training', 'Better generalization', 'Lower memory usage', 'Simpler implementation'],
    'Better generalization',
    5
  ),
  
  questionTemplates.multipleChoice(
    generateQuestionId('ml-algorithms', 7),
    'Which technique is used to handle missing values in a dataset?',
    ['Feature scaling', 'One-hot encoding', 'Imputation', 'Normalization'],
    'Imputation',
    4
  ),
  
  questionTemplates.trueFalse(
    generateQuestionId('ml-algorithms', 8),
    'Gradient descent is an optimization algorithm used to minimize the loss function',
    true,
    4
  ),
  
  questionTemplates.multipleChoice(
    generateQuestionId('ml-algorithms', 9),
    'What does the bias-variance tradeoff describe?',
    ['The relationship between model complexity and performance', 'The speed of training', 'Memory requirements', 'Data preprocessing needs'],
    'The relationship between model complexity and performance',
    5
  ),
  
  questionTemplates.multipleChoice(
    generateQuestionId('ml-algorithms', 10),
    'Which algorithm is most effective for text classification?',
    ['K-Nearest Neighbors', 'Naive Bayes', 'Linear Regression', 'K-Means'],
    'Naive Bayes',
    4
  ),
  
  questionTemplates.multipleChoice(
    generateQuestionId('ml-algorithms', 11),
    'What is the purpose of feature scaling?',
    ['To remove outliers', 'To ensure all features contribute equally to the model', 'To reduce dimensionality', 'To handle missing values'],
    'To ensure all features contribute equally to the model',
    4
  ),
  
  questionTemplates.trueFalse(
    generateQuestionId('ml-algorithms', 12),
    'Support Vector Machines work by finding the optimal hyperplane that separates different classes',
    true,
    4
  ),
  
  questionTemplates.multipleChoice(
    generateQuestionId('ml-algorithms', 13),
    'Which method is commonly used for dimensionality reduction?',
    ['K-Means', 'Principal Component Analysis (PCA)', 'Decision Trees', 'Linear Regression'],
    'Principal Component Analysis (PCA)',
    4
  ),
  
  questionTemplates.multipleChoice(
    generateQuestionId('ml-algorithms', 14),
    'What is the main difference between bagging and boosting?',
    ['Bagging reduces bias, boosting reduces variance', 'Bagging reduces variance, boosting reduces bias', 'No difference', 'Bagging is faster'],
    'Bagging reduces variance, boosting reduces bias',
    5
  ),
  
  questionTemplates.fillBlank(
    generateQuestionId('ml-algorithms', 15),
    'The ___ learning rate can cause the model to converge too slowly, while a ___ learning rate can cause the model to overshoot the optimal solution.',
    'low, high',
    4
  )
];

// ADVANCED QUESTIONS
export const mlAdvancedQuestions: Question[] = [
  questionTemplates.multipleChoice(
    generateQuestionId('ml-advanced', 1),
    'What is the main advantage of using dropout in neural networks?',
    ['Faster training', 'Reduced overfitting', 'Lower memory usage', 'Better interpretability'],
    'Reduced overfitting',
    6
  ),
  
  questionTemplates.multipleChoice(
    generateQuestionId('ml-advanced', 2),
    'Which activation function helps solve the vanishing gradient problem?',
    ['Sigmoid', 'Tanh', 'ReLU', 'Linear'],
    'ReLU',
    5
  ),
  
  questionTemplates.trueFalse(
    generateQuestionId('ml-advanced', 3),
    'Convolutional Neural Networks (CNNs) are particularly effective for image recognition tasks',
    true,
    5
  ),
  
  questionTemplates.multipleChoice(
    generateQuestionId('ml-advanced', 4),
    'What is the purpose of batch normalization in deep learning?',
    ['To increase model capacity', 'To stabilize training and improve convergence', 'To reduce model size', 'To speed up inference'],
    'To stabilize training and improve convergence',
    6
  ),
  
  questionTemplates.multipleChoice(
    generateQuestionId('ml-advanced', 5),
    'Which technique is used to prevent overfitting in deep neural networks?',
    ['Increasing learning rate', 'Adding more layers', 'Early stopping', 'Removing regularization'],
    'Early stopping',
    5
  ),
  
  questionTemplates.fillBlank(
    generateQuestionId('ml-advanced', 6),
    '___ is a technique where the model is trained on multiple tasks simultaneously to improve generalization.',
    'Multi-task learning',
    5
  ),
  
  questionTemplates.multipleChoice(
    generateQuestionId('ml-advanced', 7),
    'What is the main advantage of using transfer learning?',
    ['Faster training', 'Better performance with limited data', 'Lower computational requirements', 'Simpler architecture'],
    'Better performance with limited data',
    6
  ),
  
  questionTemplates.multipleChoice(
    generateQuestionId('ml-advanced', 8),
    'Which algorithm is most suitable for sequential data like time series?',
    ['Random Forest', 'Support Vector Machine', 'Recurrent Neural Network (RNN)', 'K-Means'],
    'Recurrent Neural Network (RNN)',
    5
  ),
  
  questionTemplates.trueFalse(
    generateQuestionId('ml-advanced', 9),
    'Generative Adversarial Networks (GANs) consist of two neural networks competing against each other',
    true,
    6
  ),
  
  questionTemplates.multipleChoice(
    generateQuestionId('ml-advanced', 10),
    'What is the purpose of attention mechanisms in neural networks?',
    ['To reduce model size', 'To allow the model to focus on relevant parts of the input', 'To speed up training', 'To prevent overfitting'],
    'To allow the model to focus on relevant parts of the input',
    6
  ),
  
  questionTemplates.multipleChoice(
    generateQuestionId('ml-advanced', 11),
    'Which technique is used to handle the exploding gradient problem?',
    ['Batch normalization', 'Gradient clipping', 'Dropout', 'Data augmentation'],
    'Gradient clipping',
    5
  ),
  
  questionTemplates.multipleChoice(
    generateQuestionId('ml-advanced', 12),
    'What is the main advantage of using ensemble methods?',
    ['Faster training', 'Better generalization through combining multiple models', 'Lower memory usage', 'Simpler implementation'],
    'Better generalization through combining multiple models',
    5
  ),
  
  questionTemplates.trueFalse(
    generateQuestionId('ml-advanced', 13),
    'Hyperparameter tuning is the process of finding the best configuration for model parameters',
    true,
    4
  ),
  
  questionTemplates.multipleChoice(
    generateQuestionId('ml-advanced', 14),
    'Which evaluation metric is most appropriate for multi-class classification?',
    ['Mean Absolute Error', 'R-squared', 'Macro-averaged F1-score', 'Root Mean Square Error'],
    'Macro-averaged F1-score',
    5
  ),
  
  questionTemplates.fillBlank(
    generateQuestionId('ml-advanced', 15),
    '___ is a technique that creates new training examples by applying transformations to existing data.',
    'Data augmentation',
    4
  )
];

// PRACTICAL APPLICATION QUESTIONS
export const mlPracticalQuestions: Question[] = [
  questionTemplates.multipleChoice(
    generateQuestionId('ml-practical', 1),
    'Which approach is best for handling categorical variables with many categories?',
    ['One-hot encoding', 'Label encoding', 'Target encoding', 'Removing the feature'],
    'Target encoding',
    5
  ),
  
  questionTemplates.multipleChoice(
    generateQuestionId('ml-practical', 2),
    'What is the primary purpose of A/B testing in machine learning?',
    ['To train models', 'To compare model performance in production', 'To preprocess data', 'To validate algorithms'],
    'To compare model performance in production',
    5
  ),
  
  questionTemplates.trueFalse(
    generateQuestionId('ml-practical', 3),
    'Feature engineering can significantly improve model performance',
    true,
    4
  ),
  
  questionTemplates.multipleChoice(
    generateQuestionId('ml-practical', 4),
    'Which technique is most effective for handling class imbalance?',
    ['Oversampling', 'Undersampling', 'SMOTE', 'All of the above'],
    'All of the above',
    4
  ),
  
  questionTemplates.multipleChoice(
    generateQuestionId('ml-practical', 5),
    'What is the main challenge in deploying machine learning models to production?',
    ['Model training', 'Data preprocessing', 'Model drift and maintaining performance', 'Feature selection'],
    'Model drift and maintaining performance',
    5
  ),
  
  questionTemplates.fillBlank(
    generateQuestionId('ml-practical', 6),
    '___ is the process of converting raw data into a format suitable for machine learning algorithms.',
    'Feature engineering',
    3
  ),
  
  questionTemplates.multipleChoice(
    generateQuestionId('ml-practical', 7),
    'Which method is best for feature selection when you have many features?',
    ['Manual selection', 'Recursive feature elimination', 'Random selection', 'Using all features'],
    'Recursive feature elimination',
    4
  ),
  
  questionTemplates.trueFalse(
    generateQuestionId('ml-practical', 8),
    'Model interpretability is important for understanding how predictions are made',
    true,
    3
  ),
  
  questionTemplates.multipleChoice(
    generateQuestionId('ml-practical', 9),
    'What is the purpose of model versioning in ML pipelines?',
    ['To reduce storage', 'To track and manage different model iterations', 'To speed up training', 'To reduce costs'],
    'To track and manage different model iterations',
    4
  ),
  
  questionTemplates.multipleChoice(
    generateQuestionId('ml-practical', 10),
    'Which approach is best for handling missing data in time series?',
    ['Forward fill', 'Backward fill', 'Interpolation', 'All of the above'],
    'All of the above',
    4
  ),
  
  questionTemplates.multipleChoice(
    generateQuestionId('ml-practical', 11),
    'What is the main advantage of using containerization for ML model deployment?',
    ['Faster training', 'Consistent environment across different systems', 'Lower memory usage', 'Simpler algorithms'],
    'Consistent environment across different systems',
    4
  ),
  
  questionTemplates.trueFalse(
    generateQuestionId('ml-practical', 12),
    'Data leakage occurs when information from the future is used to predict the past',
    true,
    4
  ),
  
  questionTemplates.multipleChoice(
    generateQuestionId('ml-practical', 13),
    'Which technique is most effective for reducing model complexity?',
    ['Adding more features', 'Regularization', 'Increasing training data', 'Using more complex algorithms'],
    'Regularization',
    4
  ),
  
  questionTemplates.multipleChoice(
    generateQuestionId('ml-practical', 14),
    'What is the primary goal of model monitoring in production?',
    ['To improve training speed', 'To detect performance degradation', 'To reduce model size', 'To simplify deployment'],
    'To detect performance degradation',
    4
  ),
  
  questionTemplates.fillBlank(
    generateQuestionId('ml-practical', 15),
    '___ is the process of automatically selecting the best hyperparameters for a machine learning model.',
    'Hyperparameter optimization',
    4
  )
];

// COMBINED EXPORT
export const mlQuestions: Question[] = [
  ...mlBeginnerQuestions,
  ...mlIntermediateQuestions,
  ...mlAdvancedQuestions,
  ...mlPracticalQuestions
];
