import { useState, useEffect } from "react";
import { shuffle } from "./Connections";

function Buttons(props) {
  const [deselectClass, setDeselectClass] = useState("cbutton");
  const [submitClass, setSubmitClass] = useState("cbutton");

  const deselect = () => {
    props.setNumClicked(0);
    props.setSelected([]);
    props.setClear((val) => !val);
  };

  useEffect(() => {
    if (props.numClicked > 0) {
      setDeselectClass("cbutton cbuttonActive");
    } else {
      setDeselectClass("cbutton");
    }

    if (props.numClicked === 4) {
      setSubmitClass("cbutton cbuttonSubmit");
    } else {
      setSubmitClass("cbutton");
    }
  }, [props.numClicked]);

  const submit = () => {
    const category = props.answers[props.selected[0]];
    let correct = true;
    for (let i = 1; i < 4; i++) {
      if (category !== props.answers[props.selected[i]]) {
        correct = false;
        break;
      }
    }
    console.log(correct);

    if (correct) {
      // set background color to answer, move to top
      props.setFound((prevState) => ({
        ...prevState,
        [category]: props.selected,
      }));
      props.setWords((prevState) =>
        prevState.filter((w) => !props.selected.includes(w))
      );
      props.setNumClicked(0);
      props.setSelected([]);
      props.setClear((val) => !val);
    } else {
      // decrease mistakes
      props.setMistakes((before) => [...before.slice(1)]);
      setSubmitClass("cbutton");

      props.setIncorrect(true);

      setTimeout(() => {
        props.setIncorrect(false);
      }, 3000);
    }
  };

  return (
    <div className="buttons">
      <div
        className="cbutton cbuttonActive"
        onClick={() => {
          props.setWords((prevState) => shuffle(prevState));
          props.setClear((val) => !val);
        }}
      >
        <p>Shuffle</p>
      </div>
      <div className={deselectClass} style={{ width: 120 }} onClick={deselect}>
        <p>Deselect all</p>
      </div>
      <div className={submitClass} onClick={submit}>
        <p>Submit</p>
      </div>
    </div>
  );
}

export default Buttons;
