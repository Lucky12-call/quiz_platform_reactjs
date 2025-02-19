import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  resetCorrectQuiz,
  resetCurrentQuestionIndex,
  setAttempt,
  setAttemptHistory,
} from "../state/slices/quizSlice";
import AttemptHistory from "./AttemptHistory";

const Scoreboard = () => {
  const correctQuiz = useSelector((state) => state.quiz.correctQuiz);
  const attempt = useSelector((state) => state.quiz.attempt);
  const currentQuestionIndex = useSelector(
    (state) => state.quiz.currentQuestionIndex
  );

  const dispatch = useDispatch();

  const handleAttempt = () => {
    dispatch(setAttempt());
    dispatch(resetCorrectQuiz());

    const currentTime = new Date().toLocaleTimeString();
    const currentDate = new Date().toLocaleDateString();
    dispatch(
      setAttemptHistory({ attempt, correctQuiz, currentTime, currentDate })
    );
    dispatch(resetCurrentQuestionIndex());
  };

  return (
    <div className="text-center p-5">
      <div className="w-full flex flex-col justify-center items-center p-5 border rounded-lg mb-5">
        <h2 className="text-2xl font-bold m-5">Quiz Completed!</h2>
        <h2 className="text-xl font-semibold mb-3">***Current Attempt***</h2>
        <p className="text-xl font-semibold mb-2">
          Your Score: {correctQuiz} / 10
        </p>
        <p className="text-lg font-semibold mb-2">Attempt: {attempt}</p>

        <h2 className={`text-lg md:text-xl shadow-2xl border p-2 text-green-500 ${correctQuiz === 10 ? "block" : "hidden"}`}>
          Congratulations Your All Questions Right
        </h2>
      </div>

      {/* show this section when all questions has Completed */}
      {currentQuestionIndex >= 9 && (
        <div>
          {/* attempt Again button  */}
          <Link to={"/"}>
            <button
              onClick={handleAttempt}
              className="px-7 py-3 bg-blue-500 text-white rounded-lg"
            >
              Attempt Again
            </button>
          </Link>

          {/* attempt history card */}
          <AttemptHistory />
        </div>
      )}
    </div>
  );
};

export default Scoreboard;
