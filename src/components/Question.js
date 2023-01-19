import React from "react";
import Option from "./Option";
import { nanoid } from "nanoid";

export default function Question(props) {
  function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
      // Generate random number
      var j = Math.floor(Math.random() * (i + 1));

      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }

  const [clickedRight, setClickedRight] = React.useState(false);

  React.useEffect(() => {
    let answers = [
      {
        value: props.correctAnswer,
        isCorrect: true,
        id: nanoid(),
        isChosen: false,
      },
    ];
    for (let i = 0; i < props.incorrectAnswers.length; i++) {
      answers.push({
        value: props.incorrectAnswers[i],
        isCorrect: false,
        id: nanoid(),
        isChosen: false,
      });
    }
    answers = shuffleArray(answers);

    setOptions(answers);
  }, [props.incorrectAnswers]);

  let answers = [
    {
      value: props.correctAnswer,
      isCorrect: true,
      id: nanoid(),
      isChosen: false,
    },
  ];
  for (let i = 0; i < props.incorrectAnswers.length; i++) {
    answers.push({
      value: props.incorrectAnswers[i],
      isCorrect: false,
      id: nanoid(),
      isChosen: false,
    });
  }
  answers = shuffleArray(answers);

  const [options, setOptions] = React.useState(answers);

  function chooseOption(id) {
    if (props.answerChecked) {
      return;
    }
    options.map((option) => {
      if (option.id == id && option.isCorrect) {
        setClickedRight(true);
        props.increaseScore();
      } else if (clickedRight && option.id == id && !option.isCorrect) {
        setClickedRight(false);
        props.decreaseScore();
      }
    });
    setOptions((prevOptions) =>
      prevOptions.map((option) => {
        return option.id === id
          ? { ...option, isChosen: true }
          : { ...option, isChosen: false };
      })
    );
  }

  const optionElements = options.map((option) => (
    <Option
      value={option.value}
      isCorrect={option.isCorrect}
      isChosen={option.isChosen}
      id={option.id}
      chooseOption={() => chooseOption(option.id)}
      answerChecked={props.answerChecked}
    />
  ));

  return (
    <div className="question-block">
      <h2>{props.questionText}</h2>
      <div className="options">{optionElements}</div>
      <div className="line"></div>
    </div>
  );
}
