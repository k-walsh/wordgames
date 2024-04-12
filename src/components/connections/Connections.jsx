import Block from "./Block";
import "../../styles/connections.css";
import { useEffect, useState } from "react";
import GameOver from "./GameOver";
import Buttons from "./Buttons";

const answers = {
  y1: "yellow",
  y2: "yellow",
  y3: "yellow",
  y4: "yellow",

  g1: "green",
  g2: "green",
  g3: "green",
  g4: "green",

  b1: "blue",
  b2: "blue",
  b3: "blue",
  b4: "blue",

  p1: "purple",
  p2: "purple",
  p3: "purple",
  p4: "purple",
};

const all = Object.keys(answers);

const answers_master = {
  yellow: all.slice(0, 4),
  green: all.slice(4, 8),
  blue: all.slice(8, 12),
  purple: all.slice(12, 16),
};

const categories = {
  yellow: "YELLOW CATEGORY DESCRIPTION",
  green: "GREEN CATEGORY DESCRIPTION",
  blue: "BLUE CATEGORY DESCRIPTION",
  purple: "PURPLE CATEGORY DESCRIPTION",
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
  const [winOrLose, setWinOrLose] = useState("");

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
      setWinOrLose("lose");
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
      setGameover(true);
      setWinOrLose("win");
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
            {console.log(color)}
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
      {!gameover && winOrLose === "" && (
        <div className="mistakes">
          <p>Mistakes remaining:</p>
          {mistakes.map((m, i) => (
            <div className="dot" key={i} />
          ))}
        </div>
      )}
      {!gameover && winOrLose === "" && (
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

      {/* {(gameover && (winOrLose === 'lose')) && (

      )}  */}
      {gameover && <GameOver winOrLose={winOrLose} />}
    </div>
  );
}

export default Connections;
