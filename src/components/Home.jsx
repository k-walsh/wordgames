import { Link } from "react-router-dom";
import "../styles/home.css";

function Home() {
  return (
    <div className="homepage">
      <Link
        to="/connections"
        className="homepageButton"
        style={{ backgroundColor: "#b1a7f9" }}
      >
        <img
          src={process.env.PUBLIC_URL + "/images/connections.svg"}
          alt="connections"
          className="nytImg"
        />
        <h1>Connections</h1>
      </Link>
      <Link
        to="/crossword"
        className="homepageButton"
        style={{ backgroundColor: "#6494e6" }}
      >
        <img
          src={process.env.PUBLIC_URL + "/images/daily.svg"}
          alt="daily"
          className="nytImg"
        />
        <h1>Crossword</h1>
      </Link>
      <Link
        to="/spelling-bee"
        className="homepageButton"
        style={{ backgroundColor: "#f7da21" }}
      >
        <img
          src={process.env.PUBLIC_URL + "/images/spelling-bee.svg"}
          alt="spelling-bee"
          className="nytImg"
        />
        <h1>SpellingBee</h1>
      </Link>
      <Link
        to="/wordle"
        className="homepageButton"
        style={{ backgroundColor: "#d3d6da" }}
      >
        <img
          src={process.env.PUBLIC_URL + "/images/wordle.svg"}
          alt="wordle"
          className="nytImg"
        />
        <h1>Wordle</h1>
      </Link>
      <Link
        to="/strands"
        className="homepageButton"
        style={{ backgroundColor: "#bfddd9" }}
      >
        <img
          src={process.env.PUBLIC_URL + "/images/strands.svg"}
          alt="strands"
          className="nytImg"
        />
        <h1>Strands</h1>
      </Link>
    </div>
  );
}

export default Home;
