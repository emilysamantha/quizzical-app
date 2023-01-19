import React from "react";

export default function Option(props) {
  const uncheckedStyles = {
    backgroundColor: props.isChosen ? "#D6DBF5" : "#F5F7FB",
    border: props.isChosen ? "none" : "0.8px solid #4D5B9E",
  };

  const checkedStyles = {
    backgroundColor: props.isCorrect
      ? "#94D7A2"
      : props.isChosen
      ? "#ffd1d1"
      : "#F5F7FB",
    border: props.isCorrect
      ? "none"
      : props.isChosen
      ? "none"
      : "0.8px solid #b9bbca",
    color: props.isCorrect ? "#293264" : "#b9bbca",
  };

  return props.answerChecked ? (
    <div
      className="option-box"
      style={checkedStyles}
      onClick={props.chooseOption}
    >
      <p>{props.value}</p>
    </div>
  ) : (
    <div
      className="option-box"
      style={uncheckedStyles}
      onClick={props.chooseOption}
    >
      <p>{props.value}</p>
    </div>
  );
}
