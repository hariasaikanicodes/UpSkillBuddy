import { useEffect, useMemo, useState } from 'react'
import './App.css'

const roadmap = [
  { day: 1, phase: 'Foundation', title: 'AI Orientation', learn: 'Understand AI, ML, DL, NLP, CV, GenAI and real-world applications.', practice: 'Write a one-page AI map with examples from healthcare, finance, and marketing.', resource: 'Google AI Essentials, free online intro courses' },
  { day: 2, phase: 'Foundation', title: 'Python Setup', learn: 'Install Python, VS Code, virtual environments, and Jupyter Notebook.', practice: 'Create a clean project folder and run a Python script successfully.', resource: 'Python.org + official VS Code setup guide' },
  { day: 3, phase: 'Foundation', title: 'Python Basics 1', learn: 'Variables, strings, numbers, Booleans, type conversion, input/output.', practice: 'Build a mini calculator and a name formatter script.', resource: 'Python Crash Course' },
  { day: 4, phase: 'Foundation', title: 'Python Basics 2', learn: 'Lists, tuples, dictionaries, sets, indexing, and slicing.', practice: 'Create a student records dictionary and manipulate it.', resource: 'W3Schools Python' },
  { day: 5, phase: 'Foundation', title: 'Control Flow', learn: 'If/else, loops, range, nesting, break/continue.', practice: 'Write a number guessing game and a grading script.', resource: 'Real Python tutorials' },
  { day: 6, phase: 'Foundation', title: 'Functions & Modules', learn: 'Functions, arguments, return values, scope, and importing modules.', practice: 'Build reusable functions for sales totals and averages.', resource: 'Automate the Boring Stuff with Python' },
  { day: 7, phase: 'Foundation', title: 'File Handling', learn: 'Read/write files, JSON, CSV, and path handling.', practice: 'Build a small script that reads a CSV and summarizes it.', resource: 'Python docs + Kaggle notebooks' },
  { day: 8, phase: 'Foundation', title: 'Git & GitHub', learn: 'Repositories, commits, branching, pull requests, and collaboration workflow.', practice: 'Create a GitHub profile repo and push your mini scripts.', resource: 'GitHub Skills, Pro Git' },
  { day: 9, phase: 'Foundation', title: 'SQL Basics', learn: 'Tables, rows, columns, SELECT, WHERE, ORDER BY, GROUP BY.', practice: 'Query a dataset of sales or students and summarize it.', resource: 'SQLBolt' },
  { day: 10, phase: 'Foundation', title: 'Math for AI', learn: 'Arithmetic, ratios, percentages, averages, and basic problem-solving patterns.', practice: 'Solve 10 AI-related word problems using Python.', resource: 'Khan Academy' },
  { day: 11, phase: 'Foundation', title: 'Linear Algebra Basics', learn: 'Vectors, matrices, dot products, transpose, and shape intuition.', practice: 'Use NumPy to do vector and matrix operations.', resource: '3Blue1Brown Essence of Linear Algebra' },
  { day: 12, phase: 'Foundation', title: 'Probability Basics', learn: 'Events, distributions, expectation, variance, and probability rules.', practice: 'Simulate coin flips and dice rolls in Python.', resource: 'StatQuest' },
  { day: 13, phase: 'Foundation', title: 'Statistics Basics', learn: 'Mean, median, mode, variance, standard deviation, and correlation.', practice: 'Analyze a sample dataset and interpret the results.', resource: 'Khan Academy statistics' },
  { day: 14, phase: 'Foundation', title: 'Data Structures', learn: 'Lists, stacks, queues, trees, dictionaries, and complexity intuition.', practice: 'Implement a todo app with a queue and dictionary structure.', resource: 'CS50 + free coding guides' },
  { day: 15, phase: 'Foundation', title: 'NumPy Fundamentals', learn: 'Arrays, broadcasting, reshaping, indexing, and vector operations.', practice: 'Create arrays from sample data and run matrix computations.', resource: 'NumPy official tutorial' },
  { day: 16, phase: 'Foundation', title: 'Pandas Fundamentals', learn: 'Series, DataFrames, filtering, aggregation, and joins.', practice: 'Load a dataset and generate summaries and new columns.', resource: 'Pandas documentation' },
  { day: 17, phase: 'Foundation', title: 'Visualization Basics', learn: 'Matplotlib and Seaborn charts: bar, line, scatter, histograms.', practice: 'Visualize sales trends and feature distributions.', resource: 'Seaborn + Matplotlib docs' },
  { day: 18, phase: 'Foundation', title: 'Data Cleaning', learn: 'Missing values, duplicates, outliers, invalid entries, and type conversions.', practice: 'Clean a raw CSV dataset before analysis.', resource: 'Kaggle cleaning notebooks' },
  { day: 19, phase: 'Foundation', title: 'Exploratory Data Analysis', learn: 'Univariate and bivariate analysis, trends, and feature understanding.', practice: 'Create a mini EDA report with charts and insights.', resource: 'Kaggle EDA courses' },
  { day: 20, phase: 'Foundation', title: 'Mini Project', learn: 'Put together a beginner dataset project from cleaning to analysis.', practice: 'Build a small project and present findings in a notebook.', resource: 'Your own dataset or Kaggle' },
  { day: 21, phase: 'Core AI', title: 'Object-Oriented Programming', learn: 'Classes, objects, inheritance, encapsulation, and methods.', practice: 'Build a banking or student management class system.', resource: 'Core Python OOP tutorials' },
  { day: 22, phase: 'Core AI', title: 'APIs and JSON', learn: 'REST basics, HTTP methods, endpoints, and API payloads.', practice: 'Call a public API and process JSON responses.', resource: 'Postman + public APIs' },
  { day: 23, phase: 'Core AI', title: 'Web Fundamentals', learn: 'HTML, CSS, and how web apps display AI outputs.', practice: 'Create a simple landing page describing an AI project.', resource: 'MDN Web Docs' },
  { day: 24, phase: 'Core AI', title: 'Terminal and Bash', learn: 'Command-line navigation, environment variables, grep, curl, piping.', practice: 'Use terminal commands to inspect file structures and APIs.', resource: 'The Missing Semester' },
  { day: 25, phase: 'Core AI', title: 'Data Wrangling', learn: 'Merging, grouping, pivoting, and transforming datasets.', practice: 'Merge sales and customer datasets by key fields.', resource: 'Pandas official examples' },
  { day: 26, phase: 'Core AI', title: 'Feature Engineering', learn: 'Encoding, scaling, category handling, and domain-driven features.', practice: 'Transform a dataset for a machine learning model.', resource: 'Feature engineering notebooks' },
  { day: 27, phase: 'Core AI', title: 'Train/Test Split', learn: 'Avoiding data leakage and validating models correctly.', practice: 'Split a dataset, compare distributions, and explain results.', resource: 'Scikit-learn docs' },
  { day: 28, phase: 'Core AI', title: 'Model Evaluation', learn: 'Accuracy, precision, recall, F1, ROC-AUC, confusion matrix.', practice: 'Evaluate a classifier on synthetic and real data.', resource: 'Machine Learning Mastery' },
  { day: 29, phase: 'Core AI', title: 'Linear Regression', learn: 'Regression theory, cost function, gradient descent, residuals.', practice: 'Predict house prices or sales using linear regression.', resource: 'Coursera ML + scikit-learn tutorial' },
  { day: 30, phase: 'Core AI', title: 'Logistic Regression', learn: 'Binary classification, sigmoid, decision boundary, probabilities.', practice: 'Classify loan defaults or customer churn.', resource: 'Hands-on ML' },
  { day: 31, phase: 'Core AI', title: 'Decision Trees', learn: 'Splits, entropy, Gini, feature importance, and interpretation.', practice: 'Train a decision tree on a simple dataset.', resource: 'Scikit-learn decision trees' },
  { day: 32, phase: 'Core AI', title: 'Random Forests', learn: 'Bagging, ensembles, overfitting, and feature importance.', practice: 'Compare a tree vs. forest on a classification problem.', resource: 'Towards Data Science articles' },
  { day: 33, phase: 'Core AI', title: 'Boosting Models', learn: 'Gradient boosting, XGBoost, and ensemble fundamentals.', practice: 'Train a boosted model on a tabular dataset.', resource: 'XGBoost docs' },
  { day: 34, phase: 'Core AI', title: 'Clustering', learn: 'K-Means, elbow method, cluster interpretation.', practice: 'Segment customers or product categories.', resource: 'Machine Learning Mastery' },
  { day: 35, phase: 'Core AI', title: 'Dimensionality Reduction', learn: 'PCA purpose, variance, projection, and feature compression.', practice: 'Reduce dimensions and visualize clusters.', resource: 'StatQuest PCA' },
  { day: 36, phase: 'Core AI', title: 'Naive Bayes', learn: 'Bayes theorem, text classification, and probabilistic modeling.', practice: 'Train a spam filter or sentiment classifier.', resource: 'Scikit-learn docs' },
  { day: 37, phase: 'Core AI', title: 'Support Vector Machines', learn: 'Margin, kernel trick, and boundary optimization.', practice: 'Fit an SVM on a nonlinear dataset.', resource: 'SVM tutorial by Andrew Ng' },
  { day: 38, phase: 'Core AI', title: 'Cross-Validation', learn: 'K-fold validation, bias-variance tradeoff, and robust scoring.', practice: 'Compare validation techniques on multiple algorithms.', resource: 'Scikit-learn cross-validation' },
  { day: 39, phase: 'Core AI', title: 'Hyperparameter Tuning', learn: 'Grid search, random search, and metrics-based tuning.', practice: 'Tune a classifier using cross-validation.', resource: 'Scikit-learn model_selection' },
  { day: 40, phase: 'Core AI', title: 'ML Project 1', learn: 'Complete a full supervised learning project pipeline end-to-end.', practice: 'Train, evaluate, and present a model with clear insights.', resource: 'Kaggle beginner competitions' },
  { day: 41, phase: 'AI Stack', title: 'NLP Fundamentals', learn: 'Text preprocessing, tokenization, and language understanding basics.', practice: 'Clean a review dataset and prepare word tokens.', resource: 'Hugging Face course' },
  { day: 42, phase: 'AI Stack', title: 'Text Preprocessing', learn: 'Lowercasing, stopword removal, stemming, lemmatization.', practice: 'Apply preprocessing to a sentiment dataset.', resource: 'NLTK docs' },
  { day: 43, phase: 'AI Stack', title: 'Feature Extraction', learn: 'Bag-of-words, TF-IDF, and sparse vectors.', practice: 'Build a text classifier using TF-IDF features.', resource: 'Scikit-learn text tutorials' },
  { day: 44, phase: 'AI Stack', title: 'Sentiment Analysis', learn: 'Classifying positive, negative, and neutral text.', practice: 'Train a review sentiment model and evaluate it.', resource: 'Kaggle sentiment notebooks' },
  { day: 45, phase: 'AI Stack', title: 'Recommendation Systems', learn: 'User-item interactions, collaborative filtering, and popularity models.', practice: 'Recommend products using a simple matrix approach.', resource: 'Recommender system articles' },
  { day: 46, phase: 'AI Stack', title: 'Time Series Basics', learn: 'Trends, seasonality, lag, and rolling windows.', practice: 'Analyze monthly sales and identify patterns.', resource: 'Forecasting basics tutorials' },
  { day: 47, phase: 'AI Stack', title: 'Forecasting Intro', learn: 'ARIMA, moving average, and baseline forecasting ideas.', practice: 'Forecast a small time series dataset.', resource: 'Statsmodels docs' },
  { day: 48, phase: 'AI Stack', title: 'Computer Vision Intro', learn: 'Pixels, images, channels, and digital representation.', practice: 'Load and inspect images with Python libraries.', resource: 'OpenCV docs' },
  { day: 49, phase: 'AI Stack', title: 'OpenCV Basics', learn: 'Image reading, resizing, grayscale, edge detection.', practice: 'Write a script to process and visualize images.', resource: 'OpenCV Python tutorials' },
  { day: 50, phase: 'AI Stack', title: 'Image Preprocessing', learn: 'Normalization, augmentation, grayscale conversion, and resizing.', practice: 'Apply transformations to a dataset before training.', resource: 'Deep learning image pipelines' },
  { day: 51, phase: 'AI Stack', title: 'CNN Fundamentals', learn: 'Convolutions, pooling, filters, and feature maps.', practice: 'Understand how a CNN sees patterns in images.', resource: 'CNN explainer videos' },
  { day: 52, phase: 'AI Stack', title: 'Model Deployment Basics', learn: 'How models move from notebook to app or API.', practice: 'Document a simple deployment workflow.', resource: 'MLOps beginner materials' },
  { day: 53, phase: 'AI Stack', title: 'Docker Intro', learn: 'Containers, images, Dockerfile, and why they matter.', practice: 'Containerize a small Python app.', resource: 'Docker docs' },
  { day: 54, phase: 'AI Stack', title: 'FastAPI Intro', learn: 'Create endpoints, validate requests, and return JSON.', practice: 'Build a simple REST API for a prediction model.', resource: 'FastAPI official tutorial' },
  { day: 55, phase: 'AI Stack', title: 'REST API Practice', learn: 'HTTP methods, status codes, and request/response structure.', practice: 'Test API calls with Postman or curl.', resource: 'Postman learning center' },
  { day: 56, phase: 'AI Stack', title: 'SQL + Python', learn: 'Connect Python to databases and query structured data.', practice: 'Store and fetch data from SQLite or PostgreSQL.', resource: 'SQLite + SQLAlchemy docs' },
  { day: 57, phase: 'AI Stack', title: 'Cloud Basics', learn: 'Cloud concepts, storage, compute, and deployment environments.', practice: 'Deploy a simple app to a free cloud platform.', resource: 'AWS/Azure/GCP intro courses' },
  { day: 58, phase: 'AI Stack', title: 'CI/CD Basics', learn: 'Automation, GitHub Actions, and testing workflows.', practice: 'Set up a GitHub Action for lint/test automation.', resource: 'GitHub Actions docs' },
  { day: 59, phase: 'AI Stack', title: 'Testing & Validation', learn: 'Unit tests, assertions, edge cases, and bug prevention.', practice: 'Write tests for a data processing function.', resource: 'Pytest docs' },
  { day: 60, phase: 'AI Stack', title: 'AI Stack Project', learn: 'Integrate a dataset pipeline, model, and API into one mini product.', practice: 'Deliver a small AI application with a demo and README.', resource: 'Your own project ideas' },
  { day: 61, phase: 'Deep Learning', title: 'Neural Networks Basics', learn: 'Input layer, hidden layers, output layer, weights, and bias.', practice: 'Train a tiny neural network on a small dataset.', resource: 'Andrew Ng neural net course' },
  { day: 62, phase: 'Deep Learning', title: 'Activation Functions', learn: 'ReLU, sigmoid, tanh, and why non-linearity matters.', practice: 'Compare model behavior with different activations.', resource: 'DeepLearning.AI notes' },
  { day: 63, phase: 'Deep Learning', title: 'Loss Functions', learn: 'MSE, cross-entropy, and optimization objectives.', practice: 'Explain which loss fits classification vs regression.', resource: 'Machine learning theory resources' },
  { day: 64, phase: 'Deep Learning', title: 'PyTorch Fundamentals', learn: 'Tensors, operations, autograd, and computational graphs.', practice: 'Perform basic tensor algebra and differentiation.', resource: 'PyTorch official course' },
  { day: 65, phase: 'Deep Learning', title: 'Training Loop', learn: 'Forward pass, backward pass, loss, optimizer, and epochs.', practice: 'Train a simple classifier in PyTorch.', resource: 'PyTorch tutorial' },
  { day: 66, phase: 'Deep Learning', title: 'Batching and Optimization', learn: 'Mini-batches, learning rate, gradient descent, and update steps.', practice: 'Tune a toy network and compare results.', resource: 'Deep learning optimization materials' },
  { day: 67, phase: 'Deep Learning', title: 'Classification in PyTorch', learn: 'Train a neural net for binary or multi-class classification.', practice: 'Classify a tabular dataset with PyTorch.', resource: 'PyTorch examples' },
  { day: 68, phase: 'Deep Learning', title: 'Transfer Learning', learn: 'Use pretrained networks for faster and better results.', practice: 'Fine-tune a pretrained image model on a custom dataset.', resource: 'Hugging Face + torchvision docs' },
  { day: 69, phase: 'Deep Learning', title: 'CNNs in Practice', learn: 'Convolutional neural networks for images and patterns.', practice: 'Train a CNN on a small image dataset.', resource: 'DeepLearning.AI CNN course' },
  { day: 70, phase: 'Deep Learning', title: 'Regularization', learn: 'Dropout, weight decay, early stopping, and generalization.', practice: 'Compare a regularized vs unregularized model.', resource: 'Practical deep learning guides' },
  { day: 71, phase: 'Deep Learning', title: 'RNN Basics', learn: 'Sequence learning, hidden states, and time dependencies.', practice: 'Model a simple sequence problem.', resource: 'RNN course notes' },
  { day: 72, phase: 'Deep Learning', title: 'LSTM Introduction', learn: 'Long-term memory, gates, and sequence modeling.', practice: 'Train an LSTM on a small sequence dataset.', resource: 'Stanford/DeepLearningAI notes' },
  { day: 73, phase: 'Deep Learning', title: 'Attention Basics', learn: 'Focus mechanisms, contexts, and weight distribution.', practice: 'Visualize attention on a small example.', resource: 'Attention is all you need summary' },
  { day: 74, phase: 'Deep Learning', title: 'Transformers Intro', learn: 'Self-attention, embeddings, token representations, and encoder-decoder flow.', practice: 'Study a transformer diagram and explain it clearly.', resource: 'The Illustrated Transformer' },
  { day: 75, phase: 'Deep Learning', title: 'BERT Introduction', learn: 'Bidirectional contextual embeddings and language understanding.', practice: 'Use a pretrained BERT model for a classification task.', resource: 'Hugging Face docs' },
  { day: 76, phase: 'Deep Learning', title: 'Hugging Face Basics', learn: 'Pipeline API, tokenizers, models, datasets.', practice: 'Run a sentiment classification pipeline in a notebook.', resource: 'Hugging Face course' },
  { day: 77, phase: 'Deep Learning', title: 'Fine-Tuning Basics', learn: 'Unfreeze layers, train on custom data, and validate outputs.', practice: 'Fine-tune a small model on a dataset you own.', resource: 'Hugging Face fine-tuning guides' },
  { day: 78, phase: 'Deep Learning', title: 'Prompt Engineering', learn: 'System prompts, examples, formatting, constraints, and roles.', practice: 'Build 5 prompt variants and compare quality.', resource: 'OpenAI/Anthropic prompt guides' },
  { day: 79, phase: 'Deep Learning', title: 'LLM Evaluation', learn: 'Quality metrics, rubric-based review, and failure analysis.', practice: 'Evaluate model answers against rubric criteria.', resource: 'LLM evaluation frameworks' },
  { day: 80, phase: 'Deep Learning', title: 'Deep Learning Project', learn: 'Package a deep learning project with clear code, model, and evaluation.', practice: 'Create a short demo with dataset, model training, and results.', resource: 'Kaggle and public benchmarks' },
  { day: 81, phase: 'GenAI', title: 'LLM Fundamentals', learn: 'How large language models generate text and why they are useful.', practice: 'Test several prompts against the same task and compare outputs.', resource: 'OpenAI/Anthropic docs + free explainers' },
  { day: 82, phase: 'GenAI', title: 'Prompt Design Patterns', learn: 'Zero-shot, few-shot, chain-of-thought style prompting, and role prompts.', practice: 'Write task prompts for summarization, extraction, and coding.', resource: 'Prompting guides from Anthropic and OpenAI' },
  { day: 83, phase: 'GenAI', title: 'LangChain Basics', learn: 'Chains, prompts, memory, and tool calling approach.', practice: 'Build a tiny app that answers based on a prompt template.', resource: 'LangChain docs' },
  { day: 84, phase: 'GenAI', title: 'Embeddings & Vector Search', learn: 'Semantic similarity, embeddings, and vector databases.', practice: 'Create a small similarity search demo with text samples.', resource: 'FAISS docs + embedding guides' },
  { day: 85, phase: 'GenAI', title: 'RAG Basics', learn: 'Retrieval-augmented generation architecture and relevance.', practice: 'Build a Q&A app using a local text source.', resource: 'RAG tutorials and blog posts' },
  { day: 86, phase: 'GenAI', title: 'Vector Databases', learn: 'Storage, indexing, similarity search, and retrieval pipelines.', practice: 'Compare vector search with simple keyword search.', resource: 'Pinecone/FAISS docs' },
  { day: 87, phase: 'GenAI', title: 'Agents Intro', learn: 'Action selection, tool use, memory, and decision-making loops.', practice: 'Design a simple agent for research or Q&A tasks.', resource: 'Microsoft/DeepLearningAI agent tutorials' },
  { day: 88, phase: 'GenAI', title: 'LLM App Architecture', learn: 'Frontend, backend, model, memory, embeddings, and deployment flow.', practice: 'Sketch a real product architecture for an AI assistant.', resource: 'AI product design guides' },
  { day: 89, phase: 'GenAI', title: 'Build AI Chat App', learn: 'Connect frontend to an LLM API and handle user conversations.', practice: 'Create a basic chat application with message history.', resource: 'OpenAI API + simple web tutorials' },
  { day: 90, phase: 'GenAI', title: 'RAG Chat App', learn: 'Feed documents into retrieval pipeline and answer questions contextually.', practice: 'Build a knowledge-base chatbot using a custom dataset.', resource: 'RAG app examples' },
  { day: 91, phase: 'GenAI', title: 'Deployment for AI Apps', learn: 'Launch a local app, prepare environment variables, and handle config.', practice: 'Deploy a demo app locally and verify it runs end-to-end.', resource: 'Vercel/Render/FastAPI hosting docs' },
  { day: 92, phase: 'GenAI', title: 'Streamlit Dashboard', learn: 'Build simple interactive dashboards for AI apps.', practice: 'Create a UI to upload data and show model outputs.', resource: 'Streamlit official docs' },
  { day: 93, phase: 'GenAI', title: 'JavaScript for AI Apps', learn: 'JS basics, DOM, events, fetch API, and frontend logic.', practice: 'Create a small page that calls your AI backend.', resource: 'JavaScript.info' },
  { day: 94, phase: 'GenAI', title: 'React for AI Interfaces', learn: 'Components, props, state, and handling model responses.', practice: 'Design a simple AI dashboard in React.', resource: 'React docs + free tutorials' },
  { day: 95, phase: 'GenAI', title: 'AI Security & Privacy', learn: 'Prompt injection, data privacy, user trust, and safe deployment.', practice: 'Review and document risks in your AI app.', resource: 'AI safety and security resources' },
  { day: 96, phase: 'GenAI', title: 'MLOps Basics', learn: 'Experiment tracking, versioning, model registry, and monitoring.', practice: 'Document a model lifecycle from training to deploy.', resource: 'MLOps beginner courses' },
  { day: 97, phase: 'GenAI', title: 'Portfolio Project Planning', learn: 'Choose a credible project that shows real-world AI skills.', practice: 'Define problem, dataset, stack, and final demo story.', resource: 'Portfolio project examples' },
  { day: 98, phase: 'GenAI', title: 'Capstone Build', learn: 'Implement your polished AI project with data pipeline and app layer.', practice: 'Work on MVP, fix bugs, and improve UX.', resource: 'Your project plan + online references' },
  { day: 99, phase: 'GenAI', title: 'Presentation & Documentation', learn: 'Show your project architecture, learnings, and challenges clearly.', practice: 'Write README, demo script, and success metrics.', resource: 'GitHub portfolio guidance' },
  { day: 100, phase: 'GenAI', title: 'Reflection & Next Steps', learn: 'Review what you learned, choose specialization, and set a 6-month roadmap.', practice: 'Create your AI specialization path: NLP, CV, LLMs, or MLOps.', resource: 'Career roadmap + LinkedIn learning' }
]

const phaseOrder = ['Foundation', 'Core AI', 'AI Stack', 'Deep Learning', 'GenAI']

const sourceCatalog = [
  ['python.org', 'Python documentation', 'https://docs.python.org/3/'],
  ['python crash course', 'Python Crash Course', 'https://ehmatthes.github.io/pcc_3e/'],
  ['real python', 'Real Python', 'https://realpython.com/'],
  ['automate the boring stuff', 'Automate the Boring Stuff', 'https://automatetheboringstuff.com/'],
  ['w3schools', 'W3Schools Python', 'https://www.w3schools.com/python/'],
  ['kaggle', 'Kaggle Learn', 'https://www.kaggle.com/learn'],
  ['github', 'GitHub Skills', 'https://skills.github.com/'],
  ['pro git', 'Pro Git', 'https://git-scm.com/book/en/v2'],
  ['sqlbolt', 'SQLBolt', 'https://sqlbolt.com/'],
  ['khan academy', 'Khan Academy', 'https://www.khanacademy.org/'],
  ['3blue1brown', '3Blue1Brown', 'https://www.3blue1brown.com/topics/linear-algebra'],
  ['statquest', 'StatQuest', 'https://statquest.org/'],
  ['cs50', 'CS50', 'https://cs50.harvard.edu/x/'],
  ['numpy', 'NumPy documentation', 'https://numpy.org/learn/'],
  ['pandas', 'pandas documentation', 'https://pandas.pydata.org/docs/'],
  ['matplotlib', 'Matplotlib documentation', 'https://matplotlib.org/stable/tutorials/'],
  ['seaborn', 'Seaborn documentation', 'https://seaborn.pydata.org/tutorial.html'],
  ['scikit-learn', 'scikit-learn documentation', 'https://scikit-learn.org/stable/user_guide.html'],
  ['hands-on ml', 'Hands-On Machine Learning', 'https://github.com/ageron/handson-ml3'],
  ['xgboost', 'XGBoost documentation', 'https://xgboost.readthedocs.io/'],
  ['hugging face', 'Hugging Face course', 'https://huggingface.co/learn'],
  ['nltk', 'NLTK documentation', 'https://www.nltk.org/'],
  ['opencv', 'OpenCV tutorials', 'https://docs.opencv.org/4.x/d6/d00/tutorial_py_root.html'],
  ['statsmodels', 'Statsmodels documentation', 'https://www.statsmodels.org/stable/user-guide.html'],
  ['pytorch', 'PyTorch tutorials', 'https://pytorch.org/tutorials/'],
  ['deeplearning.ai', 'DeepLearning.AI', 'https://www.deeplearning.ai/courses/'],
  ['stanford', 'Stanford AI courses', 'https://online.stanford.edu/courses'],
  ['illustrated transformer', 'The Illustrated Transformer', 'https://jalammar.github.io/illustrated-transformer/'],
  ['openai', 'OpenAI documentation', 'https://platform.openai.com/docs'],
  ['anthropic', 'Anthropic documentation', 'https://docs.anthropic.com/'],
  ['langchain', 'LangChain documentation', 'https://python.langchain.com/docs/introduction/'],
  ['faiss', 'FAISS documentation', 'https://faiss.ai/'],
  ['pinecone', 'Pinecone documentation', 'https://docs.pinecone.io/'],
  ['fastapi', 'FastAPI documentation', 'https://fastapi.tiangolo.com/'],
  ['postman', 'Postman learning center', 'https://learning.postman.com/'],
  ['sqlite', 'SQLite documentation', 'https://www.sqlite.org/docs.html'],
  ['sqlalchemy', 'SQLAlchemy documentation', 'https://docs.sqlalchemy.org/'],
  ['docker', 'Docker documentation', 'https://docs.docker.com/get-started/'],
  ['streamlit', 'Streamlit documentation', 'https://docs.streamlit.io/'],
  ['javascript.info', 'JavaScript.info', 'https://javascript.info/'],
  ['react docs', 'React documentation', 'https://react.dev/learn'],
  ['github actions', 'GitHub Actions', 'https://docs.github.com/en/actions'],
  ['pytest', 'pytest documentation', 'https://docs.pytest.org/'],
  ['aws', 'AWS training', 'https://aws.amazon.com/training/'],
  ['azure', 'Microsoft Learn Azure', 'https://learn.microsoft.com/en-us/training/azure/'],
  ['gcp', 'Google Cloud training', 'https://cloud.google.com/learn/training'],
  ['mlops', 'Made With ML', 'https://madewithml.com/'],
  ['linkedin learning', 'LinkedIn Learning', 'https://www.linkedin.com/learning/'],
]

const phaseSourceDefaults = {
  Foundation: ['python.org', 'kaggle', 'khan academy'],
  'Core AI': ['scikit-learn', 'hands-on ml', 'kaggle'],
  'AI Stack': ['hugging face', 'opencv', 'fastapi'],
  'Deep Learning': ['pytorch', 'deeplearning.ai', 'hugging face'],
  GenAI: ['openai', 'langchain', 'pinecone'],
}

const exactTopicSources = [
  ['ai orientation', 'Video · AI, ML, Deep Learning & GenAI explained', 'https://www.youtube.com/watch?v=ad79nYk2keg'],
  ['python setup', 'Guide · Setting up Python and VS Code', 'https://code.visualstudio.com/docs/python/python-tutorial'],
  ['python basics', 'Course · Python for Everybody', 'https://www.py4e.com/lessons'],
  ['control flow', 'Lesson · Python control flow tools', 'https://docs.python.org/3/tutorial/controlflow.html'],
  ['functions & modules', 'Lesson · Defining Functions', 'https://docs.python.org/3/tutorial/controlflow.html#defining-functions'],
  ['file handling', 'Lesson · Reading and writing files', 'https://docs.python.org/3/tutorial/inputoutput.html#reading-and-writing-files'],
  ['git & github', 'Course · Introduction to GitHub', 'https://github.com/skills/introduction-to-github'],
  ['sql basics', 'Interactive · SQLBolt lessons', 'https://sqlbolt.com/lesson/select_queries_introduction'],
  ['math for ai', 'Video series · Essence of Linear Algebra', 'https://www.youtube.com/playlist?list=PLZHQObOWTQDMsr9K-rj53DwVRMYO3t5Yr'],
  ['linear algebra basics', 'Video · Vectors, what even are they?', 'https://www.youtube.com/watch?v=fNk_zzaMo6b4'],
  ['probability basics', 'Video · Probability fundamentals', 'https://www.youtube.com/watch?v=Kgudt4PXs28'],
  ['statistics basics', 'Video · Statistics fundamentals', 'https://www.youtube.com/watch?v=xxpc-HPKN28'],
  ['numpy fundamentals', 'Quickstart · NumPy user guide', 'https://numpy.org/doc/stable/user/quickstart.html'],
  ['pandas fundamentals', 'Tutorial · 10 minutes to pandas', 'https://pandas.pydata.org/docs/user_guide/10min.html'],
  ['visualization basics', 'Tutorial · Matplotlib plot types', 'https://matplotlib.org/stable/plot_types/index.html'],
  ['data cleaning', 'Course · Data Cleaning', 'https://www.kaggle.com/learn/data-cleaning'],
  ['exploratory data analysis', 'Course · Data Visualization', 'https://www.kaggle.com/learn/data-visualization'],
  ['linear regression', 'Video · Linear Regression, Clearly Explained', 'https://www.youtube.com/watch?v=7ArmBVF2dCs'],
  ['logistic regression', 'Video · Logistic Regression, Clearly Explained', 'https://www.youtube.com/watch?v=yIYKR4sgzI8'],
  ['decision trees', 'Guide · Decision Trees in scikit-learn', 'https://scikit-learn.org/stable/modules/tree.html'],
  ['random forests', 'Guide · Random Forests in scikit-learn', 'https://scikit-learn.org/stable/modules/ensemble.html#forest'],
  ['boosting models', 'Guide · Gradient Boosting in scikit-learn', 'https://scikit-learn.org/stable/modules/ensemble.html#gradient-boosting'],
  ['clustering', 'Video · K-means clustering, Clearly Explained', 'https://www.youtube.com/watch?v=4b5d3muPQmA'],
  ['dimensionality reduction', 'Video · Principal Component Analysis', 'https://www.youtube.com/watch?v=FgakZw6K1QQ'],
  ['naive bayes', 'Guide · Naive Bayes in scikit-learn', 'https://scikit-learn.org/stable/modules/naive_bayes.html'],
  ['support vector machines', 'Guide · Support Vector Machines', 'https://scikit-learn.org/stable/modules/svm.html'],
  ['cross-validation', 'Guide · Cross-validation: evaluating estimator performance', 'https://scikit-learn.org/stable/modules/cross_validation.html'],
  ['hyperparameter tuning', 'Guide · Tuning the hyper-parameters of an estimator', 'https://scikit-learn.org/stable/modules/grid_search.html'],
  ['nlp fundamentals', 'Course · Hugging Face NLP course chapter 1', 'https://huggingface.co/learn/nlp-course/chapter1/1'],
  ['text preprocessing', 'Guide · Working with text data', 'https://scikit-learn.org/stable/tutorial/text_analytics/working_with_text_data.html'],
  ['feature extraction', 'Guide · Feature extraction from text', 'https://scikit-learn.org/stable/modules/feature_extraction.html#text-feature-extraction'],
  ['sentiment analysis', 'Pipeline · Text classification with Transformers', 'https://huggingface.co/docs/transformers/tasks/sequence_classification'],
  ['time series basics', 'Tutorial · Time series analysis with pandas', 'https://pandas.pydata.org/docs/getting_started/intro_tutorials/'],
  ['opencv basics', 'Tutorial · OpenCV-Python tutorials', 'https://docs.opencv.org/4.x/d6/d00/tutorial_py_root.html'],
  ['cnn fundamentals', 'Video · Convolutional Neural Networks', 'https://www.youtube.com/watch?v=KuXjwB4LzSA'],
  ['docker intro', 'Guide · Get started with Docker', 'https://docs.docker.com/get-started/'],
  ['fastapi intro', 'Tutorial · FastAPI first steps', 'https://fastapi.tiangolo.com/tutorial/first-steps/'],
  ['cloud basics', 'Course · AWS Cloud Practitioner Essentials', 'https://aws.amazon.com/training/digital/aws-cloud-practitioner-essentials/'],
  ['neural networks basics', 'Course · Neural Networks and Deep Learning', 'https://www.coursera.org/learn/neural-networks-deep-learning'],
  ['pytorch fundamentals', 'Tutorial · PyTorch Learn the Basics', 'https://pytorch.org/tutorials/beginner/basics/intro.html'],
  ['training loop', 'Tutorial · Training a classifier', 'https://pytorch.org/tutorials/beginner/blitz/cifar10_tutorial.html'],
  ['transfer learning', 'Tutorial · Transfer Learning for Computer Vision', 'https://pytorch.org/tutorials/beginner/transfer_learning_tutorial.html'],
  ['attention basics', 'Article · The Illustrated Transformer', 'https://jalammar.github.io/illustrated-transformer/'],
  ['transformers intro', 'Course · Hugging Face Transformers chapter 1', 'https://huggingface.co/learn/llm-course/chapter1/1'],
  ['bert introduction', 'Paper · BERT: Pre-training of Deep Bidirectional Transformers', 'https://arxiv.org/abs/1810.04805'],
  ['hugging face basics', 'Course · Hugging Face course', 'https://huggingface.co/learn/llm-course/chapter1/1'],
  ['prompt engineering', 'Guide · OpenAI prompt engineering best practices', 'https://platform.openai.com/docs/guides/prompt-engineering'],
  ['llm fundamentals', 'Course · Intro to Large Language Models', 'https://www.youtube.com/watch?v=zjkBMFhNj_g'],
  ['embeddings & vector search', 'Guide · OpenAI embeddings', 'https://platform.openai.com/docs/guides/embeddings'],
  ['rag basics', 'Tutorial · LangChain retrieval augmented generation', 'https://python.langchain.com/docs/tutorials/rag/'],
  ['vector databases', 'Guide · Pinecone vector database introduction', 'https://docs.pinecone.io/guides/get-started/quickstart'],
  ['agents intro', 'Guide · LangChain agents', 'https://python.langchain.com/docs/tutorials/agents/'],
  ['build ai chat app', 'Tutorial · OpenAI API quickstart', 'https://platform.openai.com/docs/quickstart'],
  ['streamlit dashboard', 'Tutorial · Streamlit get started', 'https://docs.streamlit.io/get-started/tutorials/create-an-app'],
  ['javascript for ai apps', 'Lesson · JavaScript Fetch API', 'https://javascript.info/fetch'],
  ['react for ai interfaces', 'Tutorial · React Tic-Tac-Toe fundamentals', 'https://react.dev/learn/tutorial-tic-tac-toe'],
  ['ai security & privacy', 'Guide · OWASP Top 10 for LLM Applications', 'https://owasp.org/www-project-top-10-for-large-language-model-applications/'],
  ['mlops basics', 'Course · Made With ML MLOps', 'https://madewithml.com/courses/mlops/'],
]

const getSourceLinks = (resource, phase, title) => {
  const normalized = `${title} ${resource}`.toLowerCase()
  const exactMatches = exactTopicSources.filter(([keyword]) => normalized.includes(keyword))
  const matches = sourceCatalog.filter(([keyword]) => resource.toLowerCase().includes(keyword))
  const defaults = (phaseSourceDefaults[phase] || []).flatMap((keyword) =>
    sourceCatalog.filter(([sourceKeyword]) => sourceKeyword === keyword),
  )
  const combined = [
    ...exactMatches.map(([, label, url]) => ['exact', label, url]),
    ...matches,
    ...defaults,
  ]
  const unique = combined.filter(
    (source, index, sources) => sources.findIndex((candidate) => candidate[2] === source[2]) === index,
  )

  return unique.slice(0, 3).map(([, label, url]) => ({ label, url }))
}

const stackGroups = [
  ['Python 3', 'The language of AI. Everything else is a library on top of it.'],
  ['NumPy · pandas', 'Array maths and tabular data wrangling.'],
  ['Matplotlib · Seaborn · Plotly', 'See the data before you model it.'],
  ['scikit-learn', 'Classical ML: regression, trees, clustering, pipelines, metrics.'],
  ['PyTorch', 'Neural networks, CNNs, training loops, and transfer learning.'],
  ['Hugging Face', 'Transformers, datasets, tokenizers, PEFT, and fine-tuning.'],
  ['LangChain · LlamaIndex', 'Orchestrating LLM apps, RAG pipelines, and agents.'],
  ['Vector DBs', 'FAISS, Chroma, Pinecone, and semantic retrieval.'],
  ['SQL', 'Data discovery, joins, aggregation, and the foundation beneath ML.'],
  ['FastAPI · Streamlit · Gradio', 'Turn models into useful interfaces and APIs.'],
  ['Docker', 'Reproducible environments from notebook to production.'],
  ['Git · GitHub Actions', 'Version control and CI/CD for reliable AI work.'],
  ['MLflow · Weights & Biases', 'Experiment tracking, model registry, and observability.'],
  ['Cloud · GPUs', 'AWS, Azure, GCP, managed endpoints, and compute decisions.'],
]

function App() {
  const [completed, setCompleted] = useState(() => {
    try {
      const saved = localStorage.getItem('ai-roadmap-progress')
      return saved ? JSON.parse(saved) : {}
    } catch {
      return {}
    }
  })

  const [theme, setTheme] = useState(() => {
    try {
      const savedTheme = localStorage.getItem('ai-roadmap-theme')
      return savedTheme || 'dark'
    } catch {
      return 'dark'
    }
  })

  const [selectedPhase, setSelectedPhase] = useState('All phases')
  const [searchTerm, setSearchTerm] = useState('')
  const [sourceCompleted, setSourceCompleted] = useState(() => {
    try {
      const saved = localStorage.getItem('ai-roadmap-source-progress')
      return saved ? JSON.parse(saved) : {}
    } catch {
      return {}
    }
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('ai-roadmap-theme', theme)
  }, [theme])

  useEffect(() => {
    localStorage.setItem('ai-roadmap-progress', JSON.stringify(completed))
  }, [completed])

  useEffect(() => {
    localStorage.setItem('ai-roadmap-source-progress', JSON.stringify(sourceCompleted))
  }, [sourceCompleted])

  const completedCount = Object.values(completed).filter(Boolean).length
  const progressPercent = Math.round((completedCount / roadmap.length) * 100)
  const completedHours = completedCount * 2

  const phases = useMemo(() => {
    const activePhases = selectedPhase === 'All phases' ? phaseOrder : [selectedPhase]

    return activePhases
      .map((phase) => ({
        name: phase,
        days: roadmap.filter((item) => {
          const matchesPhase = item.phase === phase
          const query = searchTerm.trim().toLowerCase()
          const matchesSearch =
            query.length === 0 ||
            item.title.toLowerCase().includes(query) ||
            item.learn.toLowerCase().includes(query) ||
            item.resource.toLowerCase().includes(query)
          return matchesPhase && matchesSearch
        }),
      }))
      .filter((phase) => phase.days.length > 0)
  }, [selectedPhase, searchTerm])

  const toggleDay = (day) => {
    setCompleted((prev) => ({
      ...prev,
      [day]: !prev[day],
    }))
  }

  const toggleSource = (day, sourceIndex) => {
    const sourceKey = `${day}-${sourceIndex}`
    setSourceCompleted((prev) => ({
      ...prev,
      [sourceKey]: !prev[sourceKey],
    }))
  }

  const resetProgress = () => {
    setCompleted({})
    setSourceCompleted({})
  }

  return (
    <div className="page-shell">
      <header className="topbar">
        <div className="topbar-left">
          <span className="eyebrow">Learning plan • 2 hours a day</span>
        </div>
        <div className="topbar-actions">
          <a className="home-link" href={import.meta.env.BASE_URL}>Home</a>
          <button
            type="button"
            className="theme-toggle"
            onClick={() => setTheme((current) => (current === 'dark' ? 'light' : 'dark'))}
            aria-label="Toggle color theme"
          >
            {theme === 'dark' ? 'Light mode' : 'Dark mode'}
          </button>
          <button type="button" className="ghost-button" onClick={resetProgress}>
            Reset progress
          </button>
        </div>
      </header>

      <main className="dashboard">
        <section className="hero-wrap">
          <div className="hero-copy">
            <p className="hero-label">learning plan</p>
            <h1>100 Days</h1>
            <h2>of Artificial Intelligence</h2>
            <p className="summary">
              A structured plan from beginner coding fundamentals to LLMs, deployment, and portfolio-ready AI projects.
            </p>
          </div>

          <div className="hero-metrics">
            <div className="metric-row">
              <div className="metric-box">
                <span>{progressPercent}%</span>
                <small>complete</small>
              </div>
              <div className="metric-box">
                <span>{completedCount}</span>
                <small>days</small>
              </div>
              <div className="metric-box">
                <span>{completedHours}</span>
                <small>hours</small>
              </div>
              <div className="metric-box last">
                <span>{completedCount}/100</span>
                <small>done</small>
              </div>
            </div>
          </div>
        </section>

        <section className="stack-section">
          <h3>The stack you will master</h3>
          <div className="stack-grid">
            {stackGroups.map(([title, text]) => (
              <div key={title} className="stack-card">
                <p className="stack-title">{title}</p>
                <p>{text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="schedule-section">
          <h3>The day-by-day schedule</h3>

          <div className="schedule-toolbar">
            <input
              type="text"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search a topic, tool or day..."
              aria-label="Search topics"
            />

            <select value={selectedPhase} onChange={(event) => setSelectedPhase(event.target.value)}>
              <option>All phases</option>
              {phaseOrder.map((phase) => (
                <option key={phase} value={phase}>{phase}</option>
              ))}
            </select>

            <button type="button" className="toolbar-button" onClick={resetProgress}>
              Reset progress
            </button>
          </div>

          <p className="helper-text">
            Mark source material independently, then use the day radio when the full session is complete. Progress is saved in this browser.
          </p>

          {phases.length === 0 && (
            <div className="empty-state">No items match your search.</div>
          )}

          {phases.map(({ name, days }) => {
            const completedInPhase = days.filter((item) => completed[item.day]).length

            return (
              <div key={name} className="phase-block">
                <div className="phase-header">
                  <span className="phase-name">{name.toUpperCase()} • DAYS {days[0]?.day}-{days[days.length - 1]?.day}</span>
                  <span className="phase-count">{completedInPhase}/{days.length}</span>
                </div>

                {days.map((item) => {
                  const sources = getSourceLinks(item.resource, item.phase, item.title)

                  return (
                  <div
                    key={item.day}
                    className={`day-row ${completed[item.day] ? 'complete' : ''}`}
                  >
                    <div className="day-index">DAY {String(item.day).padStart(3, '0')}</div>
                    <div className="day-content">
                      <div className="day-title-row">
                        <p className="day-title">{item.title}</p>
                        <label className="day-progress-control">
                          <input
                            type="checkbox"
                            checked={Boolean(completed[item.day])}
                            onChange={() => toggleDay(item.day)}
                          />
                          <span className="day-check">{completed[item.day] ? '✓' : ''}</span>
                          <span className="sr-only">Mark day {item.day} complete</span>
                        </label>
                      </div>

                      <div className="day-pill-row">
                        <span className="pill-tag">{item.phase}</span>
                        <span className="pill-tag">{item.resource}</span>
                      </div>

                      <div className="meta-block">
                        <div className="meta-item">
                          <span className="meta-label">TOPICS</span>
                          <p>{item.learn}</p>
                        </div>
                        <div className="meta-item">
                          <span className="meta-label">WHERE TO LEARN</span>
                          <div className="source-list">
                            {sources.map((source, sourceIndex) => (
                              <label key={source.url} className="source-item">
                                <input
                                  type="checkbox"
                                  checked={Boolean(sourceCompleted[`${item.day}-${sourceIndex}`])}
                                  onChange={() => toggleSource(item.day, sourceIndex)}
                                />
                                <span className="source-radio" aria-hidden="true">
                                  {sourceCompleted[`${item.day}-${sourceIndex}`] ? '✓' : ''}
                                </span>
                                <a href={source.url} target="_blank" rel="noreferrer">
                                  {source.label}
                                </a>
                              </label>
                            ))}
                          </div>
                        </div>
                        <div className="meta-item">
                          <span className="meta-label">HOW TO PRACTISE</span>
                          <p>{item.practice}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  )
                })}
              </div>
            )
          })}
        </section>
      </main>
    </div>
  )
}

export default App
