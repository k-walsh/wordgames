import { useEffect, useState } from "react";

function Block(props) {
  const [clicked, setClicked] = useState(false);
  const [style, setStyle] = useState("block");

  useEffect(() => {
    if (props.numClicked >= 4 && !clicked) {
      setStyle("blockUnhover");
    } else if (props.numClicked < 4 && !clicked) {
      setStyle("block");
    }
  }, [props.numClicked, clicked]);

  useEffect(() => {
    setStyle("block");
    setClicked(false);
  }, [props.clear]);

  const click = () => {
    if (props.numClicked < 4 || clicked) {
      if (clicked) {
        props.setNumClicked((num) => num - 1);
        setStyle("block");
        props.setSelected((before) => before.filter((w) => w !== props.word));
      } else {
        props.setNumClicked((num) => num + 1);
        setStyle("block blockClicked");
        props.setSelected((before) => [...before, props.word]);
      }
      setClicked((prevState) => !prevState);
    }
  };

  return (
    <div
      className={style}
      onClick={props.numClicked < 4 || clicked ? click : undefined}
    >
      <p>{props.word}</p>
    </div>
  );
}

export default Block;
