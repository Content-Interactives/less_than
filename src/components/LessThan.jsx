import React, { useState, useEffect } from 'react';
import { Button } from '../components/ui/button';

const PracticeButton = ({ onClick, isCorrect = null, children, className = '', disabled = false }) => {
  if (isCorrect === true || isCorrect === false) {
    return (
      <button 
        onClick={onClick}
        disabled={disabled}
        className={`w-12 h-12 aspect-square border-2 rounded-lg ${
          isCorrect ? 'bg-[#008545] text-white border-[#008545]' : 'bg-yellow-500 text-white border-yellow-500'
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
      className="w-12 h-12 aspect-square border-2 border-gray-300 rounded-lg bg-white hover:bg-gray-100"
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
  const [isAnsweredCorrectly, setIsAnsweredCorrectly] = useState(false);

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
    <>
      <style>{`
        @property --r {
          syntax: '<angle>';
          inherits: false;
          initial-value: 0deg;
        }

        .glow-button { 
          min-width: auto; 
          height: auto; 
          position: relative; 
          border-radius: 8px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1;
          transition: all .3s ease;
          padding: 7px;
        }

        .glow-button::before {
          content: "";
          display: block;
          position: absolute;
          background: rgb(250, 245, 255);
          inset: 2px;
          border-radius: 4px;
          z-index: -2;
        }

        .simple-glow {
          background: conic-gradient(
            from var(--r),
            transparent 0%,
            rgb(0, 255, 132) 2%,
            rgb(0, 214, 111) 8%,
            rgb(0, 174, 90) 12%,
            rgb(0, 133, 69) 14%,
            transparent 15%
          );
          animation: rotating 3s linear infinite;
          transition: animation 0.3s ease;
        }

        .simple-glow.stopped {
          animation: none;
          background: none;
        }

        @keyframes rotating {
          0% {
            --r: 0deg;
          }
          100% {
            --r: 360deg;
          }
        }
      `}</style>
      <div className="w-[500px] h-auto mx-auto shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-2px_rgba(0,0,0,0.1),0_0_0_1px_rgba(0,0,0,0.05)] bg-white rounded-lg overflow-hidden">
        <div className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-[#5750E3] text-sm font-medium select-none">Comparison Symbols Practice</h2>
            <button
              onClick={() => {
                setScore(0);
                setTotalQuestions(0);
                generateQuestion();
              }}
              className="text-gray-500 hover:text-gray-700 text-sm px-3 py-1 rounded border border-gray-300 hover:border-gray-400 transition-colors"
            >
              Reset
            </button>
          </div>

          <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
            <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
              <div className="text-xl text-center space-y-2 pb-6">
                <div className="font-semibold text-purple-900">{practiceQuestion?.text}</div>
                <div className="text-2xl space-x-4 flex items-center justify-center">
                  <span>{practiceQuestion?.num1}</span>
                  <span className="px-4">?</span>
                  <span>{practiceQuestion?.num2}</span>
                  {practiceQuestion?.context && (
                    <span className="text-lg text-black ml-4">{practiceQuestion?.context}</span>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-center gap-2">
                  <PracticeButton
                    onClick={() => checkAnswer(symbols.less.symbol)}
                    isCorrect={userAnswer === symbols.less.symbol ? getSymbolState(symbols.less.symbol) : null}
                    disabled={isAnsweredCorrectly}
                    className="w-12 h-12 aspect-square border-2 border-gray-300 rounded-lg"
                  >
                    <span className={userAnswer === symbols.less.symbol ? 'text-white' : 'text-black'}>
                      {symbols.less.symbol}
                    </span>
                  </PracticeButton>
                  <PracticeButton
                    onClick={() => checkAnswer(symbols.lessEqual.symbol)}
                    isCorrect={userAnswer === symbols.lessEqual.symbol ? getSymbolState(symbols.lessEqual.symbol) : null}
                    disabled={isAnsweredCorrectly}
                    className="w-12 h-12 aspect-square border-2 border-gray-300 rounded-lg"
                  >
                    <span className={userAnswer === symbols.lessEqual.symbol ? 'text-white' : 'text-black'}>
                      {symbols.lessEqual.symbol}
                    </span>
                  </PracticeButton>
                  <PracticeButton
                    onClick={() => checkAnswer(symbols.equal.symbol)}
                    isCorrect={userAnswer === symbols.equal.symbol ? getSymbolState(symbols.equal.symbol) : null}
                    disabled={isAnsweredCorrectly}
                    className="w-12 h-12 aspect-square border-2 border-gray-300 rounded-lg"
                  >
                    <span className={userAnswer === symbols.equal.symbol ? 'text-white' : 'text-black'}>
                      {symbols.equal.symbol}
                    </span>
                  </PracticeButton>
                  <PracticeButton
                    onClick={() => checkAnswer(symbols.greaterEqual.symbol)}
                    isCorrect={userAnswer === symbols.greaterEqual.symbol ? getSymbolState(symbols.greaterEqual.symbol) : null}
                    disabled={isAnsweredCorrectly}
                    className="w-12 h-12 aspect-square border-2 border-gray-300 rounded-lg"
                  >
                    <span className={userAnswer === symbols.greaterEqual.symbol ? 'text-white' : 'text-black'}>
                      {symbols.greaterEqual.symbol}
                    </span>
                  </PracticeButton>
                  <PracticeButton
                    onClick={() => checkAnswer(symbols.greater.symbol)}
                    isCorrect={userAnswer === symbols.greater.symbol ? getSymbolState(symbols.greater.symbol) : null}
                    disabled={isAnsweredCorrectly}
                    className="w-12 h-12 aspect-square border-2 border-gray-300 rounded-lg"
                  >
                    <span className={userAnswer === symbols.greater.symbol ? 'text-white' : 'text-black'}>
                      {symbols.greater.symbol}
                    </span>
                  </PracticeButton>
                </div>
                <p className="font-medium text-sm text-center text-purple-700">What symbol goes between these numbers?</p>
              </div>
            </div>

            {feedback && (
              <div className={`p-4 rounded-lg mb-4 ${
                feedback.includes('Correct') 
                  ? 'bg-[#008545]/10 border border-[#008545]' 
                  : 'bg-yellow-50 border border-yellow-200'
              }`}>
                <p className={`font-medium text-sm ${
                  feedback.includes('Correct') ? 'text-[#008545]' : 'text-yellow-600'
                }`}>
                  {feedback}
                </p>
              </div>
            )}

            <div className="flex justify-between items-center relative">
              <div className="w-[100px]"></div>
              <p className="text-purple-700 text-sm absolute left-1/2 -translate-x-1/2">
                Score: {score}/{totalQuestions}
              </p>
              <Button
                onClick={() => {
                  setTotalQuestions(prev => prev + 1);
                  generateQuestion();
                }}
                className="bg-gray-500 hover:bg-gray-600 text-white text-sm px-4 py-2 rounded"
              >
                Skip
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LessThan;