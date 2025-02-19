import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import QuizList from "./components/QuizList";
import Quiz from "./components/Quiz";
import Scoreboard from "./components/Scoreboard";

const App = () => {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<QuizList />} />
        <Route path="/quiz/:quizId" element={<Quiz />} />
        <Route path="/scoreboard" element={<Scoreboard />} />
      </Routes>
    </Router>
  );
};

export default App;
