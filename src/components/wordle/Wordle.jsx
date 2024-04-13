import Letter from "./Letter";
import "../../styles/wordle.css";
import { useEffect, useState } from "react";
import BoardRow from "./BoardRow";
import GameOver from "../GameOver";

const keyboard1 = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
const keyboard2 = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
const keyboard3 = ["Z", "X", "C", "V", "B", "N", "M"];

export const word = "BROWN";

async function checkValid(word) {
  try {
    const response = await fetch(
      "https://api.dictionaryapi.dev/api/v2/entries/en/" + word
    );
    const status = await response.status;
    return status === 200;
  } catch (error) {
    console.log("!!!!", error);
  }
}

function Wordle() {
  const [attempt, setAttempt] = useState(0);
  const [index, setIndex] = useState(0);
  const [attempt1, setAttempt1] = useState(["", "", "", "", ""]);
  const [attempt2, setAttempt2] = useState(["", "", "", "", ""]);
  const [attempt3, setAttempt3] = useState(["", "", "", "", ""]);
  const [attempt4, setAttempt4] = useState(["", "", "", "", ""]);
  const [attempt5, setAttempt5] = useState(["", "", "", "", ""]);
  const [attempt6, setAttempt6] = useState(["", "", "", "", ""]);
  const [alert, setAlert] = useState(false);

  const [win, setWin] = useState(false);
  const [lose, setLose] = useState(false);
  const [gameover, setGameover] = useState(false);

  const guesses = {
    0: [attempt1, setAttempt1],
    1: [attempt2, setAttempt2],
    2: [attempt3, setAttempt3],
    3: [attempt4, setAttempt4],
    4: [attempt5, setAttempt5],
    5: [attempt6, setAttempt6],
    6: [[], gameover],
  };

  useEffect(() => {
    if (attempt !== 0 && guesses[attempt - 1][0].join("") === word) {
      setWin(true);
      setTimeout(() => setGameover(true), 350 * 5 + 1000);
    } else if (attempt === 6) {
      setTimeout(() => {
        setAlert(true);
        setLose(true);
      }, 350 * 5 + 500);
      setTimeout(() => setGameover(true), 350 * 5 + 3000);
    }
  }, [attempt]);

  const submit = async () => {
    if (index === 5) {
      const valid = await checkValid(guesses[attempt][0].join(""));
      if (valid) {
        setAttempt((curr) => curr + 1);
        setIndex(0);
      } else {
        setAlert(true);
        setTimeout(() => {
          setAlert(false);
        }, 3000);
      }
    } else {
      setAlert(true);
      setTimeout(() => {
        setAlert(false);
      }, 3000);
    }
  };

  const backspace = () => {
    if (index !== 0) {
      guesses[attempt][0][index - 1] = "";
      guesses[attempt][1]([...guesses[attempt][0]]);

      setIndex((i) => i - 1);
      setAlert(false);
    }
  };

  return (
    <div className="wordle">
      <div className="board-container">
        <div className="board">
          {Object.keys(guesses).map((guess_key, i) => (
            <BoardRow
              key={"row-" + i}
              guess={guesses[guess_key][0]}
              attempt={attempt}
            />
          ))}
        </div>
      </div>
      <div className="keyboard">
        <div className="keyboard-row">
          {keyboard1.map((l, i) => (
            <Letter
              key={i}
              letter={l}
              index={index}
              setIndex={setIndex}
              attempt={attempt}
              gameover={gameover}
              guesses={guesses}
            />
          ))}
        </div>
        <div className="keyboard-row">
          <div className="spacer"></div>
          {keyboard2.map((l, i) => (
            <Letter
              key={i}
              letter={l}
              index={index}
              setIndex={setIndex}
              attempt={attempt}
              gameover={gameover}
              guesses={guesses}
            />
          ))}
          <div className="spacer"></div>
        </div>
        <div className="keyboard-row">
          <div className="key oneAndHalf" onClick={submit}>
            ENTER
          </div>
          {keyboard3.map((l, i) => (
            <Letter
              key={i}
              letter={l}
              index={index}
              setIndex={setIndex}
              attempt={attempt}
              gameover={gameover}
              guesses={guesses}
            />
          ))}
          <div className="key oneAndHalf" onClick={backspace}>
            <svg
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              height="20"
              viewBox="0 0 24 24"
              width="20"
              className="game-icon"
              data-testid="icon-backspace"
            >
              <path
                fill="var(--color-tone-1)"
                d="M22 3H7c-.69 0-1.23.35-1.59.88L0 12l5.41 8.11c.36.53.9.89 1.59.89h15c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H7.07L2.4 12l4.66-7H22v14zm-11.59-2L14 13.41 17.59 17 19 15.59 15.41 12 19 8.41 17.59 7 14 10.59 10.41 7 9 8.41 12.59 12 9 15.59z"
              ></path>
            </svg>
          </div>
        </div>
      </div>
      {alert && !lose && (
        <div className="alert">
          {index < 5 ? <p>not enough letters!</p> : <p>invalid word!</p>}
        </div>
      )}
      {alert && lose && (
        <div className="alert">
          <p>{word}</p>
        </div>
      )}
      {gameover && <GameOver win={win} game="wordle" />}
    </div>
  );
}

export default Wordle;
