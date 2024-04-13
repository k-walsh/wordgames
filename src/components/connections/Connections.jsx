import Block from "./Block";
import "../../styles/connections.css";
import { useEffect, useState } from "react";
import GameOver from "../GameOver";
import Buttons from "./Buttons";

const answers = {
  BLUE: "yellow",
  DOWN: "yellow",
  GLUM: "yellow",
  LOW: "yellow",

  HULU: "green",
  NETFLIX: "green",
  PEACOCK: "green",
  PRIME: "green",

  GREEN: "blue",
  MUSTARD: "blue",
  PLUM: "blue",
  SCARLET: "blue",

  KETCHUP: "purple",
  MAYO: "purple",
  RELISH: "purple",
  TARTAR: "purple",
};

const all = Object.keys(answers);

const answers_master = {
  yellow: all.slice(0, 4),
  green: all.slice(4, 8),
  blue: all.slice(8, 12),
  purple: all.slice(12, 16),
};

const categories = {
  yellow: "SYNONYMS FOR SAD",
  green: "STREAMING SERVICES",
  blue: "CLUE CHARACTERS",
  purple: "CONDIMENTS",
};

const colors = {
  yellow: "#F9DF6D",
  green: "#A0C35A",
  blue: "#B1C4F0",
  purple: "#BA81C5",
};

export function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

function Connections() {
  const [words, setWords] = useState(shuffle(Object.keys(answers)));
  const [numClicked, setNumClicked] = useState(0);
  const [clear, setClear] = useState(false);
  const [selected, setSelected] = useState([]);
  const [mistakes, setMistakes] = useState([4, 3, 2, 1]);
  const [found, setFound] = useState({});

  const [incorrect, setIncorrect] = useState(false);
  const [gameover, setGameover] = useState(false);
  const [win, setWin] = useState("");

  const updateFound = (color) => {
    if (!(color in found)) {
      setFound((prevState) => ({
        ...prevState,
        [color]: answers_master[color],
      }));
      setWords((prevState) =>
        prevState.filter((w) => !answers_master[color].includes(w))
      );
    }
  };

  useEffect(() => {
    if (mistakes.length === 0) {
      setWin(false);
      setSelected([]);
      setClear((val) => !val);

      // show answers
      setTimeout(() => updateFound("yellow"), 0);
      setTimeout(() => updateFound("green"), 1000);
      setTimeout(() => updateFound("blue"), 2000);
      setTimeout(() => updateFound("purple"), 3000);

      setTimeout(() => setGameover(true), 4000);
    }
  }, [mistakes]);

  useEffect(() => {
    if (words.length === 0) {
      setWin(true);
      setGameover(true);
    }
  }, [words]);

  return (
    <div className="connections">
      <p>Create four groups of four!</p>
      <div className="connections-found">
        {Object.keys(found).map((color) => (
          <div
            key={color}
            style={{ backgroundColor: [colors[color]] }}
            className="found-row"
          >
            <p style={{ fontWeight: "bold" }}>{categories[color]}</p>
            <p>{found[color].join(", ")}</p>
          </div>
        ))}
      </div>
      <div className="connections-grid">
        {words.map((word, i) => (
          <Block
            key={i}
            word={word}
            numClicked={numClicked}
            setNumClicked={setNumClicked}
            clear={clear}
            setSelected={setSelected}
          />
        ))}
      </div>
      {incorrect && !gameover && (
        <div className="alert">
          <p>incorrect! try again!</p>
        </div>
      )}
      {!gameover && win === "" && (
        <div className="mistakes">
          <p>Mistakes remaining:</p>
          {mistakes.map((m, i) => (
            <div className="dot" key={i} />
          ))}
        </div>
      )}
      {!gameover && win === "" && (
        <Buttons
          setNumClicked={setNumClicked}
          setSelected={setSelected}
          setClear={setClear}
          setFound={setFound}
          setWords={setWords}
          setMistakes={setMistakes}
          setIncorrect={setIncorrect}
          numClicked={numClicked}
          answers={answers}
          selected={selected}
        />
      )}

      {gameover && <GameOver win={win} />}
    </div>
  );
}

export default Connections;
