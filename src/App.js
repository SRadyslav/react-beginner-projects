import React from 'react';
import './index.scss';

const questions = [
  {
    title: 'React - это ... ?',
    variants: ['библиотека', 'фреймворк', 'приложение'],
    correct: 0,
  },
  {
    title: 'Компонент - это ... ',
    variants: ['приложение', 'часть приложения или страницы', 'то, что я не знаю что такое'],
    correct: 1,
  },
  {
    title: 'Что такое JSX?',
    variants: [
      'Это простой HTML',
      'Это функция',
      'Это тот же HTML, но с возможностью выполнять JS-код',
    ],
    correct: 2,
  },
];

function Result({ steps, correct, tryAgain }) {
  return (
    <div className="result">
      <img src="https://cdn-icons-png.flaticon.com/512/2278/2278992.png" />
      <h2>Вы отгадали {correct} {correct === 1 ? "ответ" : "ответа"} из {steps}</h2>
      <button onClick={tryAgain}>Попробовать снова</button>
    </div>
  );
}

const Game = ({ question, onClickVariant, steps, step }) => {
  const percentage = Math.round(100 / steps * step)
  return (
    <>
      <div className="progress">
        <div style={{ width: `${percentage}%` }} className="progress__inner"></div>
      </div>
      <h1>{question.title}</h1>
      <ul>
        {question.variants.map((text, i) =>
          <li
            onClick={() => onClickVariant(i)}
            key={text}
          >{text}</li>)}
      </ul>
    </>
  );
}

function App() {
  const [step, setStep] = React.useState(0)
  const [correct, setCorrect] = React.useState(0)
  const question = questions[step]
  const steps = questions.length

  const onClickVariant = (index) => {
    setStep(step + 1)
    if (index !== question.correct) return
    setCorrect(correct + 1)
  }

  const tryAgain = () => {
    setStep(0)
    setCorrect(0)
  }

  return (
    <div className="App">
      {steps !== step
        ? <Game question={question} onClickVariant={onClickVariant} steps={steps} step={step} />
        : <Result tryAgain={tryAgain} correct={correct} steps={steps} />}
    </div>
  );
}

export default App;
