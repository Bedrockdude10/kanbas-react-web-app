export interface Question {
    _id: string;
    title: string;
    points: number;
    questionType: 'multipleChoice' | 'trueFalse' | 'fillInBlanks';
    questionText: string;
    choices?: { text: string; isCorrect: boolean }[];
    correctAnswers?: string[];
    correctAnswer?: boolean;
  }
  
  export interface Quiz {
    _id: string;
    name: string;
    description?: string;
    course: string;
    quizType: 'gradedQuiz' | 'practiceQuiz' | 'gradedSurvey' | 'ungradedSurvey';
    points: number;
    assignmentGroup: 'quizzes' | 'exams' | 'assignments' | 'projects';
    shuffleAnswers: boolean;
    timeLimit: number;
    multipleAttempts: boolean;
    attemptLimit: number;
    showCorrectAnswers: 'never' | 'immediately' | 'afterLastAttempt';
    accessCode?: string;
    oneQuestionAtATime: boolean;
    webcamRequired: boolean;
    lockQuestionsAfterAnswering: boolean;
    dueDate?: Date;
    availableDate?: Date;
    untilDate?: Date;
    published: boolean;
    questions: Question[];
    editing?: boolean;
  }
  
  export interface QuizzesState {
    quizzes: Quiz[];
  }
  
  export type NewQuiz = Omit<Quiz, "_id">;
  
  export interface Choice {
    text: string;
    isCorrect: boolean;
  }
  
  export interface Question {
    _id: string;
    title: string;
    points: number;
    questionType: 'multipleChoice' | 'trueFalse' | 'fillInBlanks';
    questionText: string;
    choices?: Choice[]; // For multipleChoice questions
    correctAnswers?: string[]; // For fillInBlanks questions
    correctAnswer?: boolean; // For trueFalse questions
  }

  export type NewQuestion = Omit<Question, "_id">;