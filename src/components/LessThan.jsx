import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';

const PracticeButton = ({ onClick, isCorrect = null, children, className = '', disabled = false }) => {
  if (isCorrect === true || isCorrect === false) {
    return (
      <button 
        onClick={onClick}
        disabled={disabled}
        className={`w-full px-4 py-2 rounded-lg ${
          isCorrect ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
        }`}
      >
        {children}
      </button>
    );
  }
  
  return (
    <Button
      variant="outline"
      onClick={onClick}
      disabled={disabled}
      className="w-full bg-white hover:bg-gray-400"
    >
      {children}
    </Button>
  );
};

const LessThan = () => {
  const [selectedSymbol, setSelectedSymbol] = useState('equal');
  const [practiceQuestion, setPracticeQuestion] = useState(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState('');
  const [score, setScore] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);

  const symbols = {
    equal: {
      symbol: '=',
      name: 'Equal To',
      description: 'Shows that the value on the left is exactly the same as the value on the right.',
      examples: ['5 = 5', '2 + 3 = 5', '10 = 10']
    },
    less: {
      symbol: '<',
      name: 'Less Than',
      description: 'Shows that the value on the left is smaller than the value on the right.',
      examples: ['3 < 5', '-2 < 0', '1 < 10']
    },
    greater: {
      symbol: '>',
      name: 'Greater Than',
      description: 'Shows that the value on the left is larger than the value on the right.',
      examples: ['8 > 6', '10 > -5', '100 > 99']
    },
    lessEqual: {
      symbol: '≤',
      name: 'Less Than or Equal To',
      description: 'Shows that the value on the left is smaller than or equal to the value on the right. Best used when expressing maximum limits, thresholds, or inclusive upper bounds (e.g., age restrictions, maximum capacity).',
      examples: ['Age ≤ 12 for child ticket', 'Capacity ≤ 50 people', 'Speed ≤ 30 mph in school zone']
    },
    greaterEqual: {
      symbol: '≥',
      name: 'Greater Than or Equal To',
      description: 'Shows that the value on the left is larger than or equal to the value on the right. Best used when expressing minimum requirements, thresholds, or inclusive lower bounds (e.g., minimum age requirements, minimum purchase amounts).',
      examples: ['Age ≥ 18 to vote', 'Purchase ≥ $50 for free shipping', 'Score ≥ 70 to pass']
    }
  };

  const generateQuestion = () => {
    const contextScenarios = [
      { 
        text: "Maximum of 50:",
        num1: "Capacity",
        num2: "50",
        correctSymbol: ['≤'],
        context: "people"
      },
      {
        text: "Maximum of 30:",
        num1: "Speed",
        num2: "30",
        correctSymbol: ['≤'],
        context: "mph"
      },
      {
        text: "Minimum of 18:",
        num1: "Age",
        num2: "18",
        correctSymbol: ['≥'],
        context: "years"
      },
      {
        text: "Minimum of $50:",
        num1: "Purchase",
        num2: "$50",
        correctSymbol: ['≥'],
        context: ""
      },
      {
        text: "Minimum of 70:",
        num1: "Score",
        num2: "70",
        correctSymbol: ['≥'],
        context: "%"
      }
    ];

    const abstractQuestions = () => {
      const num1 = Math.floor(Math.random() * 20) - 10;
      const num2 = Math.floor(Math.random() * 20) - 10;
      let correctSymbol;

      if (num1 === num2) {
        correctSymbol = ['='];
        return {
          text: "Compare these numbers:",
          num1: num1.toString(),
          num2: num2.toString(),
          correctSymbol,
          context: ""
        };
      } else if (num1 < num2) {
        correctSymbol = ['<'];
        return {
          text: "Compare these numbers:",
          num1: num1.toString(),
          num2: num2.toString(),
          correctSymbol,
          context: ""
        };
      } else {
        correctSymbol = ['>'];
        return {
          text: "Compare these numbers:",
          num1: num1.toString(),
          num2: num2.toString(),
          correctSymbol,
          context: ""
        };
      }
    };

    // 50-50 chance of getting either type of question
    const useContext = Math.random() < 0.5;
    const scenario = useContext 
      ? contextScenarios[Math.floor(Math.random() * contextScenarios.length)]
      : abstractQuestions();

    setPracticeQuestion({
      text: scenario.text,
      num1: scenario.num1,
      num2: scenario.num2,
      correctSymbol: scenario.correctSymbol,
      context: scenario.context
    });
    setUserAnswer('');
    setFeedback('');
  };

  const [isAnsweredCorrectly, setIsAnsweredCorrectly] = useState(false);

  const checkAnswer = (selectedSymbol) => {
    if (isAnsweredCorrectly) return;
    
    setTotalQuestions(prev => prev + 1);
    setUserAnswer(selectedSymbol);
    
    if (practiceQuestion.correctSymbol.includes(selectedSymbol)) {
      setFeedback('Correct! ✨');
      setScore(prev => prev + 1);
      setIsAnsweredCorrectly(true);
      setTimeout(() => {
        generateQuestion();
        setIsAnsweredCorrectly(false);
      }, 1500);
    } else {
      setFeedback('Try again! Think about the relationship between the numbers.');
    }
  };

  useEffect(() => {
    generateQuestion();
  }, []);

  const getSymbolState = (symbol) => {
    if (userAnswer === symbol) {
      return feedback === 'Correct! ✨';
    }
    return null;
  };

  return (
    <div className="bg-gray-100 p-8 w-[780px] overflow-auto">
      <Card className="w-[748px] mx-auto shadow-md bg-white">
        <div className="bg-sky-50 p-6 rounded-t-lg w-[748px]">
          <h1 className="text-sky-900 text-2xl font-bold">Comparison Symbols</h1>
          <p className="text-sky-800">Learn how to compare numbers using mathematical symbols!</p>
        </div>

        <CardContent className="space-y-6 pt-6 w-[748px]">
          <div className="bg-blue-50 p-4 rounded border border-blue-200">
            <h2 className="text-blue-900 font-bold mb-2">What are Comparison Symbols?</h2>
            <p className="text-blue-600">
              Comparison symbols are mathematical symbols that show the relationship between two values, 
              expressions, or quantities. They help us understand if numbers are equal, greater than, 
              less than, or not equal to each other. Learn more about these symbols below and practice using them!
            </p>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <Button
                onClick={() => setSelectedSymbol('less')}
                className={`w-full px-4 py-2 rounded-lg ${
                  selectedSymbol === 'less'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 hover:bg-gray-300'
                }`}
              >
                Less Than
              </Button>
              <Button
                onClick={() => setSelectedSymbol('equal')}
                className={`w-full px-4 py-2 rounded-lg ${
                  selectedSymbol === 'equal'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 hover:bg-gray-300'
                }`}
              >
                Equal To
              </Button>
              <Button
                onClick={() => setSelectedSymbol('greater')}
                className={`w-full px-4 py-2 rounded-lg ${
                  selectedSymbol === 'greater'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 hover:bg-gray-300'
                }`}
              >
                Greater Than
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-4 w-2/3 mx-auto">
              <Button
                onClick={() => setSelectedSymbol('lessEqual')}
                className={`w-full px-4 py-2 rounded-lg ${
                  selectedSymbol === 'lessEqual'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 hover:bg-gray-300'
                }`}
              >
                Less Than or Equal To
              </Button>
              <Button
                onClick={() => setSelectedSymbol('greaterEqual')}
                className={`w-full px-4 py-2 rounded-lg ${
                  selectedSymbol === 'greaterEqual'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 hover:bg-gray-300'
                }`}
              >
                Greater Than or Equal To
              </Button>
            </div>
          </div>

          <Card className="border border-gray-200">
            <CardContent className="space-y-4 p-6">
              <div className="flex items-center gap-4">
                <span className="text-4xl font-mono">
                  {symbols[selectedSymbol].symbol}
                </span>
                <span className="text-xl font-bold">{symbols[selectedSymbol].name}</span>
              </div>
              <p className="text-gray-700">{symbols[selectedSymbol].description}</p>
              <div>
                <h3 className="font-semibold mb-2">Examples:</h3>
                <ul className="list-disc list-inside space-y-1">
                  {symbols[selectedSymbol].examples.map((example, index) => (
                    <li key={index} className="text-gray-700">{example}</li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>

          <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
            <h2 className="text-purple-900 font-bold mb-4">Practice Time!</h2>
            <div className="space-y-4">
              <p className="text-lg font-semibold text-center text-purple-800">
                What symbol goes between these numbers?
              </p>
              <div className="text-xl text-center space-y-2 py-6">
                <div className="font-semibold text-purple-900">{practiceQuestion?.text}</div>
                <div className="text-2xl space-x-4">
                  <span>{practiceQuestion?.num1}</span>
                  <span className="px-4">?</span>
                  <span>{practiceQuestion?.num2}</span>
                  <span className="text-lg text-gray-600">{practiceQuestion?.context}</span>
                </div>
              </div>
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  <PracticeButton
                    onClick={() => checkAnswer(symbols.less.symbol)}
                    isCorrect={userAnswer === symbols.less.symbol ? getSymbolState(symbols.less.symbol) : null}
                    disabled={isAnsweredCorrectly}
                  >
                    <span className={userAnswer === symbols.less.symbol ? 'text-white' : 'text-black'}>
                      {symbols.less.symbol}
                    </span>
                  </PracticeButton>
                  <PracticeButton
                    onClick={() => checkAnswer(symbols.equal.symbol)}
                    isCorrect={userAnswer === symbols.equal.symbol ? getSymbolState(symbols.equal.symbol) : null}
                    disabled={isAnsweredCorrectly}
                  >
                    <span className={userAnswer === symbols.equal.symbol ? 'text-white' : 'text-black'}>
                      {symbols.equal.symbol}
                    </span>
                  </PracticeButton>
                  <PracticeButton
                    onClick={() => checkAnswer(symbols.greater.symbol)}
                    isCorrect={userAnswer === symbols.greater.symbol ? getSymbolState(symbols.greater.symbol) : null}
                    disabled={isAnsweredCorrectly}
                  >
                    <span className={userAnswer === symbols.greater.symbol ? 'text-white' : 'text-black'}>
                      {symbols.greater.symbol}
                    </span>
                  </PracticeButton>
                </div>
                <div className="grid grid-cols-2 gap-4 w-2/3 mx-auto">
                  <PracticeButton
                    onClick={() => checkAnswer(symbols.lessEqual.symbol)}
                    isCorrect={userAnswer === symbols.lessEqual.symbol ? getSymbolState(symbols.lessEqual.symbol) : null}
                    disabled={isAnsweredCorrectly}
                  >
                    <span className={userAnswer === symbols.lessEqual.symbol ? 'text-white' : 'text-black'}>
                      {symbols.lessEqual.symbol}
                    </span>
                  </PracticeButton>
                  <PracticeButton
                    onClick={() => checkAnswer(symbols.greaterEqual.symbol)}
                    isCorrect={userAnswer === symbols.greaterEqual.symbol ? getSymbolState(symbols.greaterEqual.symbol) : null}
                    disabled={isAnsweredCorrectly}
                  >
                    <span className={userAnswer === symbols.greaterEqual.symbol ? 'text-white' : 'text-black'}>
                      {symbols.greaterEqual.symbol}
                    </span>
                  </PracticeButton>
                </div>
              </div>
              {feedback && (
                <p className={`text-center font-semibold ${
                  feedback.includes('Correct') ? 'text-green-600' : 'text-red-600'
                }`}>
                  {feedback}
                </p>
              )}
              <p className="text-center text-purple-700">
                Score: {score}/{totalQuestions}
              </p>
              <Button
                onClick={generateQuestion}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white"
              >
                New Question
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      <p className="text-center text-gray-600 mt-4">
        Understanding comparison symbols is essential for mathematics and problem solving!
      </p>
    </div>
  );
};

export default LessThan;