import { useEffect, useState } from "react";
import { word } from "./Wordle";

function Letter(props) {
  const [colorTemp, setColorTemp] = useState("#d4d6da");
  const [color, setColor] = useState("#d4d6da");

  useEffect(() => {
    // if letter in final guess
    if (props.attempt !== 0) {
      const prev_guess = props.guesses[props.attempt - 1][0];
      if (prev_guess.join("").includes(props.letter)) {
        setTimeout(() => setColor(colorTemp), 350 * 5);
      }
    }
  }, [props.attempt]); // to update keyboard color only once user presses enter (attempt changes)

  const click = () => {
    if (props.index < 5 && !props.gameover) {
      if (color !== "#6aaa64") {
        // if not already found correct
        let newColor = "#787c7e"; // not present color - dark gray
        if (word[props.index] === props.letter) {
          newColor = "#6aaa64"; // correct - green
        } else if (word.includes(props.letter)) {
          newColor = "#c9b458"; // present - yellow
        }
        setColorTemp(newColor);
      }

      props.guesses[props.attempt][1]((prev) => {
        const updated = [...prev];
        updated[props.index] = props.letter;
        return updated;
      });

      props.setIndex((i) => i + 1);
    }
  };

  return (
    <div
      className="key letter"
      style={{
        backgroundColor: color,
        color: color === "#d4d6da" ? "black" : "white",
      }}
      onClick={click}
    >
      <p>{props.letter}</p>
    </div>
  );
}

export default Letter;
