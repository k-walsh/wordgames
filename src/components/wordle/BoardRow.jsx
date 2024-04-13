import Box from "./Box";

function BoardRow(props) {
  return (
    <div className="board-row">
      {props.guess.map((letter, i) => (
        <Box key={i} letter={letter} index={i} attempt={props.attempt} />
      ))}
    </div>
  );
}

export default BoardRow;
