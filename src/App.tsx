import * as React from "react";
import QuestionCard from "./Components/QuestionCard";
import { GlobalStyle, Wrapper } from "./App.styles";

const TOTAL_QUESTIONS = 5;

export type AnswerObject = {
  question: string;
  correctAnswer: string;
  answer: string;
  correct: boolean;
};

export default function App() {
  const [questions, setQuestions] = React.useState([{
    question: "Which is the largest country in the world by population?",
    correct_answer: "China",
    answer: ["India", "USA", "China", "Russia"],
  },
  {
    question: "When did the second world war end?",
    correct_answer: "1945",
    answer: ["1945", "1939", "1944", "1942"],
  },
  {
    question: "Which was the first country to issue paper currency?",
    correct_answer: "China",
    answer: ["USA", "France", "Italy", "China"],
  },
  {
    question: "Which city hosted the 1996 Summer Olympics?",
    correct_answer: "Atlanta",
    answer: ["Atlanta", "Sydney", "Athens", "Beijing"],
  },
  {
    question: "Who invented the telephone?",
    correct_answer: "Alexander Graham Bell",
    answer: [
      "Albert Einstein",
      "Alexander Graham Bell,",
      "Isaac Newton",
      "Marie Curie",
    ],
  },]);
  const [number, setNumber] = React.useState<number>(0);
  const [quizOver, setQuizOver] = React.useState<boolean>(true);
  const [userAnswers, setUserAnswers] = React.useState<AnswerObject[]>([]);
  const [score, setScore] = React.useState<number>(0);
  const [complete, setComplete] = React.useState<boolean>(false);

  const startQuiz = async () => {
    setComplete(false);
    setQuizOver(false);
    setUserAnswers([]);
    setScore(0);
    setNumber(0);
  };


  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!quizOver) {
      const answer = e.currentTarget.value;
      const correct = questions[number].correct_answer === answer;
      if(correct){
        setScore(score + 1);
      }
      const answerObject = {
        question: questions[number].question,
        correctAnswer: questions[number].correct_answer,
        answer: answer,
        correct: correct,
      };
      setUserAnswers((prev) => [...prev, answerObject]);
    }
  };

  const handleNext = () => {
    if (number < TOTAL_QUESTIONS - 1) setNumber((prev) => prev + 1);
    else setComplete(true);
  };

  console.log(number);

  return (
    <>
      <GlobalStyle />
      <Wrapper>
        <h1>Quiz Competion</h1>
        {complete && <div className="complete">Quiz is complete</div>}

        {quizOver || complete ? (
          <>
            <button className="start" onClick={startQuiz}>
              Start Quiz
            </button>
          </>
        ) : null}
        {complete ? <p className="score">Score: {score}</p> : null}

        {!quizOver && !complete && (
          <QuestionCard
            questionNum={number + 1}
            question={questions[number].question}
            answers={questions[number].answer}
            totalQuestions={TOTAL_QUESTIONS}
            userAnswer={userAnswers ? userAnswers[number] : undefined}
            callback={checkAnswer}
          />
        )}

        {!quizOver && !complete && !!userAnswers[number] && (
          <button className="next" onClick={handleNext}>
            Next Question
          </button>
        )}
      </Wrapper>
    </>
  );
}
