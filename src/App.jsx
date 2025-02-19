import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import QuizList from "./components/QuizList";
import Quiz from "./components/Quiz";
import Scoreboard from "./components/Scoreboard";

const App = () => {

  return (
    <div className="w-full md:w-[70%] mx-auto">
    <Router>
      <Routes>
        <Route path="/" element={<QuizList />} />
        <Route path="/quiz/:quizId" element={<Quiz />} />
        <Route path="/scoreboard" element={<Scoreboard />} />
      </Routes>
    </Router>
    </div>
  );
};

export default App;
