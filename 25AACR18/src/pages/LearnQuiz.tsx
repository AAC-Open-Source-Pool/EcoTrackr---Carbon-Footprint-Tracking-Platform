
import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { BookOpen, Check, X, Award, Lightbulb, Earth, Star } from "lucide-react";

const LearnQuiz = () => {
  const [activeTopic, setActiveTopic] = useState("all");
  const [activeQuiz, setActiveQuiz] = useState<any>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  const [quizScore, setQuizScore] = useState(0);

  const topics = [
    { id: "all", name: "All Topics" },
    { id: "basics", name: "Eco Basics" },
    { id: "energy", name: "Energy" },
    { id: "waste", name: "Waste" },
    { id: "water", name: "Water" },
    { id: "biodiversity", name: "Biodiversity" }
  ];

  const quizzes = [
    {
      id: 1,
      title: "Climate Change Basics",
      description: "Test your knowledge about climate change causes and effects",
      topic: "basics",
      difficulty: "Beginner",
      points: 50,
      questionCount: 5,
      duration: "5 min",
      completed: false,
      image: "🌍",
      questions: [
        {
          question: "What is the main greenhouse gas contributing to climate change?",
          options: ["Carbon Dioxide (CO₂)", "Nitrogen", "Oxygen", "Hydrogen"],
          correctAnswer: "Carbon Dioxide (CO₂)",
          explanation: "Carbon dioxide (CO₂) is the primary greenhouse gas emitted through human activities, primarily from burning fossil fuels."
        },
        {
          question: "Which of these is NOT a consequence of global warming?",
          options: ["Rising sea levels", "Increasing polar ice", "More extreme weather events", "Ocean acidification"],
          correctAnswer: "Increasing polar ice",
          explanation: "Global warming is causing polar ice to melt, not increase. The other options are all consequences of climate change."
        },
        {
          question: "What percentage of Earth's surface is covered by water?",
          options: ["About 50%", "About 60%", "About 70%", "About 80%"],
          correctAnswer: "About 70%",
          explanation: "Approximately 71% of the Earth's surface is water-covered, with oceans holding about 96.5% of all Earth's water."
        },
        {
          question: "Which activity contributes the most to global greenhouse gas emissions?",
          options: ["Transportation", "Electricity production", "Agriculture", "Residential heating"],
          correctAnswer: "Electricity production",
          explanation: "Electricity production generates the largest share of greenhouse gas emissions globally, primarily from burning fossil fuels."
        },
        {
          question: "What is the Paris Agreement?",
          options: [
            "A tourism pact between European countries",
            "An international treaty on climate change mitigation",
            "A trade agreement between Pacific nations",
            "A space exploration partnership"
          ],
          correctAnswer: "An international treaty on climate change mitigation",
          explanation: "The Paris Agreement is an international treaty adopted in 2015 aimed at reducing global greenhouse gas emissions and limiting global temperature increase."
        }
      ]
    },
    {
      id: 2,
      title: "Renewable Energy",
      description: "Learn about clean energy sources and technologies",
      topic: "energy",
      difficulty: "Intermediate",
      points: 75,
      questionCount: 5,
      duration: "8 min",
      completed: true,
      score: 80,
      image: "⚡",
      questions: []
    },
    {
      id: 3,
      title: "Waste Management",
      description: "Test your knowledge of recycling and composting",
      topic: "waste",
      difficulty: "Beginner",
      points: 40,
      questionCount: 4,
      duration: "4 min",
      completed: false,
      image: "♻️",
      questions: []
    },
    {
      id: 4,
      title: "Water Conservation",
      description: "Learn how to save water in daily activities",
      topic: "water",
      difficulty: "Beginner",
      points: 35,
      questionCount: 3,
      duration: "3 min",
      completed: false,
      image: "💧",
      questions: []
    },
    {
      id: 5,
      title: "Biodiversity Importance",
      description: "Understand why biodiversity matters for our planet",
      topic: "biodiversity",
      difficulty: "Advanced",
      points: 100,
      questionCount: 8,
      duration: "12 min",
      completed: false,
      image: "🌿",
      questions: []
    },
    {
      id: 6,
      title: "Carbon Footprint",
      description: "Calculate and reduce your personal carbon impact",
      topic: "basics",
      difficulty: "Intermediate",
      points: 60,
      questionCount: 5,
      duration: "6 min",
      completed: true,
      score: 100,
      image: "👣",
      questions: []
    }
  ];

  const ecoTips = [
    {
      id: 1,
      title: "Unplug Electronics",
      description: "Unplugging unused electronics can save up to 10% of your energy usage.",
      category: "energy",
      points: 5,
      read: false
    },
    {
      id: 2,
      title: "Skip the Beef",
      description: "Reducing beef consumption by just one meal per week can save water equivalent to 100 showers.",
      category: "basics",
      points: 5,
      read: true
    },
    {
      id: 3,
      title: "Use Cold Water",
      description: "Washing clothes in cold water can reduce energy usage by up to 90% per load.",
      category: "water",
      points: 5,
      read: false
    }
  ];

  const filteredQuizzes = activeTopic === "all" 
    ? quizzes 
    : quizzes.filter(quiz => quiz.topic === activeTopic);

  const handleStartQuiz = (quiz: any) => {
    setActiveQuiz(quiz);
    setCurrentQuestionIndex(0);
    setQuizScore(0);
    setSelectedAnswer(null);
    setIsAnswerChecked(false);
  };

  const handleAnswerSelect = (answer: string) => {
    if (!isAnswerChecked) {
      setSelectedAnswer(answer);
    }
  };

  const checkAnswer = () => {
    if (!selectedAnswer || isAnswerChecked) return;
    
    setIsAnswerChecked(true);
    
    const currentQuestion = activeQuiz.questions[currentQuestionIndex];
    if (selectedAnswer === currentQuestion.correctAnswer) {
      setQuizScore(prev => prev + 1);
    }
  };

  const goToNextQuestion = () => {
    if (currentQuestionIndex < activeQuiz.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setIsAnswerChecked(false);
    } else {
      // Quiz completed
      const finalScore = Math.round((quizScore + (selectedAnswer === activeQuiz.questions[currentQuestionIndex].correctAnswer ? 1 : 0)) / activeQuiz.questions.length * 100);
      setActiveQuiz({
        ...activeQuiz,
        completed: true,
        score: finalScore
      });
    }
  };

  const getCurrentQuestion = () => {
    return activeQuiz?.questions[currentQuestionIndex];
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center space-x-3">
          <BookOpen className="h-8 w-8 text-green-600" />
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Learn & Quiz</h1>
            <p className="text-gray-600">Expand your knowledge about sustainability and earn points</p>
          </div>
        </div>

        {/* Topic Filter */}
        <div className="flex flex-wrap gap-2">
          {topics.map((topic) => (
            <Button
              key={topic.id}
              variant={activeTopic === topic.id ? "default" : "outline"}
              onClick={() => setActiveTopic(topic.id)}
              className={activeTopic === topic.id ? "bg-green-600 hover:bg-green-700" : ""}
              size="sm"
            >
              {topic.name}
            </Button>
          ))}
        </div>

        {/* Quizzes */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Eco Quizzes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredQuizzes.map((quiz) => (
              <Card key={quiz.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="text-4xl mb-2">{quiz.image}</div>
                    {quiz.completed && (
                      <Badge className="bg-green-100 text-green-800">
                        {quiz.score}% Score
                      </Badge>
                    )}
                  </div>
                  <CardTitle>{quiz.title}</CardTitle>
                  <CardDescription>{quiz.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                    <span>{quiz.questionCount} questions</span>
                    <span>{quiz.duration}</span>
                    <span className="capitalize">{quiz.difficulty}</span>
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button 
                        className="w-full bg-green-600 hover:bg-green-700"
                        onClick={() => handleStartQuiz(quiz)}
                      >
                        {quiz.completed ? "Retake Quiz" : "Start Quiz"}
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-lg">
                      {activeQuiz && activeQuiz.id === quiz.id && !activeQuiz.completed && getCurrentQuestion() && (
                        <>
                          <DialogHeader>
                            <DialogTitle className="flex items-center space-x-2">
                              <Earth className="h-5 w-5 text-green-600" />
                              <span>{activeQuiz.title}</span>
                            </DialogTitle>
                            <DialogDescription>
                              Question {currentQuestionIndex + 1} of {activeQuiz.questions.length}
                            </DialogDescription>
                          </DialogHeader>
                          
                          <div className="py-4">
                            <Progress 
                              value={(currentQuestionIndex / activeQuiz.questions.length) * 100} 
                              className="mb-6"
                            />
                            
                            <div className="space-y-6">
                              <h3 className="text-lg font-medium">
                                {getCurrentQuestion().question}
                              </h3>
                              
                              <div className="space-y-3">
                                {getCurrentQuestion().options.map((option: string) => (
                                  <Button
                                    key={option}
                                    variant="outline"
                                    onClick={() => handleAnswerSelect(option)}
                                    className={`w-full justify-start text-left h-auto py-3 px-4 ${
                                      selectedAnswer === option 
                                        ? isAnswerChecked 
                                          ? option === getCurrentQuestion().correctAnswer
                                            ? "border-green-500 bg-green-50"
                                            : "border-red-500 bg-red-50"
                                          : "border-green-300 bg-green-50" 
                                        : ""
                                    } ${
                                      isAnswerChecked && option === getCurrentQuestion().correctAnswer
                                        ? "border-green-500 bg-green-50"
                                        : ""
                                    }`}
                                    disabled={isAnswerChecked}
                                  >
                                    {isAnswerChecked && option === getCurrentQuestion().correctAnswer && (
                                      <Check className="h-5 w-5 text-green-500 mr-2" />
                                    )}
                                    {isAnswerChecked && selectedAnswer === option && option !== getCurrentQuestion().correctAnswer && (
                                      <X className="h-5 w-5 text-red-500 mr-2" />
                                    )}
                                    {option}
                                  </Button>
                                ))}
                              </div>
                              
                              {isAnswerChecked && (
                                <div className="p-4 bg-blue-50 rounded-lg">
                                  <div className="flex items-start space-x-2">
                                    <Lightbulb className="h-5 w-5 text-blue-500 mt-0.5" />
                                    <div>
                                      <p className="font-medium text-blue-900">Explanation</p>
                                      <p className="text-sm text-blue-800">
                                        {getCurrentQuestion().explanation}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              )}
                              
                              {!isAnswerChecked ? (
                                <Button 
                                  onClick={checkAnswer} 
                                  disabled={!selectedAnswer}
                                  className="w-full bg-green-600 hover:bg-green-700"
                                >
                                  Check Answer
                                </Button>
                              ) : (
                                <Button 
                                  onClick={goToNextQuestion} 
                                  className="w-full bg-blue-600 hover:bg-blue-700"
                                >
                                  {currentQuestionIndex < activeQuiz.questions.length - 1 ? 'Next Question' : 'See Results'}
                                </Button>
                              )}
                            </div>
                          </div>
                        </>
                      )}
                      
                      {/* Quiz Results */}
                      {activeQuiz && activeQuiz.id === quiz.id && activeQuiz.completed && (
                        <>
                          <DialogHeader>
                            <DialogTitle className="text-center">Quiz Completed!</DialogTitle>
                          </DialogHeader>
                          <div className="py-6 flex flex-col items-center">
                            <div className="w-32 h-32 rounded-full bg-green-100 flex items-center justify-center mb-4">
                              <div className="text-center">
                                <div className="text-4xl font-bold text-green-700">{activeQuiz.score}%</div>
                                <div className="text-sm text-green-600">Score</div>
                              </div>
                            </div>
                            
                            <div className="text-center mb-6">
                              <h3 className="text-lg font-medium mb-2">
                                {activeQuiz.score >= 80 ? 'Great job!' : activeQuiz.score >= 50 ? 'Good effort!' : 'Keep learning!'}
                              </h3>
                              <p className="text-gray-600">
                                {activeQuiz.score >= 80 
                                  ? 'You\'re an eco-expert!' 
                                  : activeQuiz.score >= 50 
                                  ? 'You have a solid understanding of environmental concepts.' 
                                  : 'There\'s always more to learn about sustainability.'}
                              </p>
                            </div>
                            
                            <div className="flex items-center space-x-2 mb-6">
                              <Award className="h-5 w-5 text-yellow-500" />
                              <span className="font-medium">
                                {activeQuiz.points} Eco-Points Earned
                              </span>
                            </div>
                            
                            <Button 
                              onClick={() => handleStartQuiz(quiz)}
                              className="bg-green-600 hover:bg-green-700"
                            >
                              Retake Quiz
                            </Button>
                          </div>
                        </>
                      )}
                    </DialogContent>
                  </Dialog>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Daily Eco Tips */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Daily Eco Tips</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {ecoTips.map((tip) => (
              <Card key={tip.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg flex items-center space-x-2">
                      <Lightbulb className="h-5 w-5 text-yellow-500" />
                      <span>{tip.title}</span>
                    </CardTitle>
                    {tip.read ? (
                      <Badge variant="outline">Read</Badge>
                    ) : (
                      <Badge className="bg-blue-100 text-blue-800">New</Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{tip.description}</p>
                  <div className="flex justify-between items-center">
                    <Badge className="bg-green-100 text-green-800">
                      +{tip.points} pts
                    </Badge>
                    <Button variant="ghost" size="sm" className="text-green-600">
                      {tip.read ? 'Reread Tip' : 'Mark as Read'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default LearnQuiz;
