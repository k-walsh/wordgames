import { useEffect, useState } from "react";
import { word } from "./Wordle";

function Box(props) {
  const [borderColor, setBorderColor] = useState("#d3d6da");
  const [fillColor, setFillColor] = useState("white");
  const [textColor, setTextColor] = useState("black");

  useEffect(() => {
    if (props.letter !== "") {
      setBorderColor("#878a8c");
    } else {
      setBorderColor("#d3d6da");
    }
  }, [props.letter]);

  useEffect(() => {
    // if submitted and valid
    if (props.attempt !== 0 && props.letter !== "") {
      let new_fill = "#787c7e"; // absent
      let new_border = "#787c7e";
      if (word[props.index] === props.letter) {
        new_fill = "#6aaa64"; // correct - green
        new_border = "#6aaa64";
      } else if (word.includes(props.letter)) {
        new_fill = "#c9b458"; // present - yellow
        new_border = "#c9b458";
      }

      setTimeout(() => {
        setFillColor(new_fill);
        setBorderColor(new_border);
        setTextColor("white");
      }, props.index * 350);
    }
  }, [props.attempt]);

  return (
    <div
      className={textColor === "white" ? "tile activeTile" : "tile"}
      style={{
        borderColor: borderColor,
        backgroundColor: fillColor,
        color: textColor,
      }}
    >
      <p>{props.letter}</p>
    </div>
  );
}

export default Box;
