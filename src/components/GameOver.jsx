import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";

const gifs = {
  connections: [
    "https://media2.giphy.com/media/fKbgG8zDPuLh6/giphy.gif?cid=6c09b952ld6fbxm59396o042ne1549xkl90jghjqd9l8v12g&ep=v1_gifs_search&rid=giphy.gif&ct=g",
    "https://gifdb.com/images/high/aww-sad-kitty-crying-6tu5uei1bmmwcvrd.gif",
  ],
  wordle: [
    "https://media3.giphy.com/media/ely3apij36BJhoZ234/200w.gif?cid=6c09b952w2jv51k24sr74xkmbyxgeo9foqg4rhexf5ixyta2&ep=v1_gifs_search&rid=200w.gif&ct=g",
    "https://media2.giphy.com/media/fTzWh3nyE3BDnWmOy5/200w.gif?cid=6c09b952e0nmqlque3fuziz0inkqgvi20a6h7ntsuf9qftl9&ep=v1_gifs_search&rid=200w.gif&ct=g",
  ],
};

function GameOver(props) {
  const [open, setOpen] = useState(true);

  console.log(props);

  return (
    <div className="gameover-container">
      {open && (
        <div className="gameover">
          <div onClick={() => setOpen(false)} className="close">
            <CloseIcon />
          </div>
          {props.win ? (
            <div className="message">
              <p>Great job!</p>
              <img
                src={gifs[props.game][0]}
                alt="good job gif"
                style={{ width: 280, borderRadius: 5 }}
              />
            </div>
          ) : (
            <div className="message">
              <p>Better luck next time!</p>
              <img
                src={gifs[props.game][1]}
                alt="sad gif"
                style={{ width: 300 }}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default GameOver;
