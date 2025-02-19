import { Link } from "react-router-dom";

const QuizList = () => {
  return (
    <div className="w-full h-full flex flex-col items-center mt-20 p-4">
      <h1 className="text-2xl font-bold mb-4">***Start Quizzes***</h1>
      <div className="m-5">
        <h2 className="text-xl font-semibold">Instructions:</h2>
        <ol>
          <li>
            1. For multiple-choice questions, select the one best answer (A, B,
            C, or D).
          </li>
          <li>
            2. For integer-type questions, write your numerical answer clearly.
          </li>
          <li>3. No calculators unless specified.</li>
          <li>4. You have 30 second time for each quiz.</li>
        </ol>
      </div>
      <Link to="/quiz/1">
        <button className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer">
          Start Sample Quiz
        </button>
      </Link>
    </div>
  );
};

export default QuizList;
