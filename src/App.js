import React from "react";
import blobYellow from "./images/blob-yellow.png";
import blobBlue from "./images/blob-blue.png";
import Question from "./components/Question";

export default function App() {
  const [gameStarted, setGameStarted] = React.useState(false);
  const [questions, setQuestions] = React.useState([]);
  const [answerChecked, setAnswerChecked] = React.useState(false);

  const [score, setScore] = React.useState(0);

  function increaseScore() {
    setScore((prevScore) => prevScore + 1);
  }

  function decreaseScore() {
    setScore((prevScore) => prevScore - 1);
  }

  React.useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=5&category=9&type=multiple")
      .then((res) => res.json())
      .then((data) => setQuestions(data.results));
  }, []);

  function startGame() {
    setGameStarted(true);
  }

  function checkAnswers() {
    setAnswerChecked(true);
  }

  function playAgain() {
    setAnswerChecked(false);
    fetch("https://opentdb.com/api.php?amount=5&category=9&type=multiple")
      .then((res) => res.json())
      .then((data) => setQuestions(data.results));
  }

  const questionElements = questions.map((question) => (
    <Question
      questionText={question.question}
      correctAnswer={question.correct_answer}
      incorrectAnswers={question.incorrect_answers}
      answerChecked={answerChecked}
      increaseScore={() => increaseScore()}
      decreaseScore={() => decreaseScore()}
    />
  ));

  return gameStarted ? (
    <main>
      <img src={blobYellow} alt="yellow blob" className="blob-yellow" />
      <div className="questions-page-content">
        <h1>Quizzical</h1>
        <div className="questions">{questionElements}</div>
        {answerChecked ? (
          <div className="bottom-section">
            <h3>You scored {score}/5 correct answers!</h3>
            <button className="small-btn" onClick={playAgain}>
              Play Again
            </button>
          </div>
        ) : (
          <button className="small-btn" onClick={checkAnswers}>
            Check Answers
          </button>
        )}
      </div>
      <img src={blobBlue} alt="blue blob" className="blob-blue" />
    </main>
  ) : (
    <main>
      <img src={blobYellow} alt="yellow blob" className="blob-yellow" />
      <div className="start-game-page">
        <div className="start-game-description">
          <h1>Quizzical</h1>
          <p>Test your trivia skills by answering these questions!</p>
          <button className="start-btn" onClick={startGame}>
            Start Quiz
          </button>
        </div>
      </div>
      <img src={blobBlue} alt="blue blob" className="blob-blue" />
    </main>
  );
}
