import { HashRouter, Routes, Route } from "react-router-dom";
import Connections from "./components/connections/Connections";
import Home from "./components/Home";
import Crossword from "./components/crossword/Crossword";
import SpellingBee from "./components/spellingbee/SpellingBee";
import Wordle from "./components/wordle/Wordle";
import Strands from "./components/strands/Strands";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/connections" element={<Connections />} />
        <Route path="/crossword" element={<Crossword />} />
        <Route path="/spelling-bee" element={<SpellingBee />} />
        <Route path="/wordle" element={<Wordle />} />
        <Route path="/strands" element={<Strands />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
