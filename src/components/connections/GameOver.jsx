import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";

function GameOver(props) {
  const [open, setOpen] = useState(true);

  return (
    <div className="gameover-container">
      {open && (
        <div className="gameover">
          <div onClick={() => setOpen(false)} className="close">
            <CloseIcon />
          </div>
          {props.winOrLose === "win" ? (
            <div className="message">
              <p>Great job!</p>
              <img
                src="https://media2.giphy.com/media/fKbgG8zDPuLh6/giphy.gif?cid=6c09b952ld6fbxm59396o042ne1549xkl90jghjqd9l8v12g&ep=v1_gifs_search&rid=giphy.gif&ct=g"
                alt="you got it dude"
                style={{ width: 280, borderRadius: 5 }}
              />
            </div>
          ) : (
            <div className="message">
              <p>Better luck next time!</p>
              <img
                src="https://gifdb.com/images/high/aww-sad-kitty-crying-6tu5uei1bmmwcvrd.gif"
                alt="sad kitty"
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
