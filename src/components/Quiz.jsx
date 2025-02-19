import { useState, useEffect } from "react";
import { quizData } from "../data/quizData";
import { useNavigate } from "react-router-dom";
import Scoreboard from "./Scoreboard";
import { useDispatch, useSelector } from "react-redux";
import {
  setCorrectQuiz,
  setCurrentQuestionIndex,
} from "../state/slices/quizSlice";
import Timer from "./Timer";

const Quiz = () => {
  const [selectedAnswer, setSelectedAnswer] = useState(""); // Store ID for MCQ or text for open-ended
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30); // 30-second timer
  const [error, setError] = useState(""); // error for empty answer

  const currentQuestionIndex = useSelector(
    (state) => state.quiz.currentQuestionIndex
  );
  const dispatch = useDispatch();

  const navigateTo = useNavigate();

  const currentQuestion = quizData[currentQuestionIndex];

  // Reset timer when moving to the next question
  useEffect(() => {
    setTimeLeft(30); // Reset timer to 30 seconds
    setSelectedAnswer(""); // Reset selected answer
    setIsSubmitted(false); // Reset submission state
  }, [currentQuestionIndex]);

  const handleAnswerSelect = (value) => {
    if (!isSubmitted) {
      setSelectedAnswer(value);
    }
  };

  const handleSubmit = async () => {
    if (!selectedAnswer) {
      setError("Please select a option or fill the input box!");
      return;
    }

    setError("");

    setIsSubmitted(true);
    if (isCorrect) {
      dispatch(setCorrectQuiz());
    }
    if (currentQuestionIndex === 9) {
      navigateTo("/scoreboard");
    }
  };

  //handle next question
  const handleNextQuestion = () => {
    dispatch(setCurrentQuestionIndex());
  };

  const isCorrect =
    currentQuestion.type === "mcq"
      ? selectedAnswer === currentQuestion.correctAnswer
      : selectedAnswer.trim() === currentQuestion.correctAnswer;

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Quiz Show</h1>

      {/* Timer Display */}
      <Timer
        timeLeft={timeLeft}
        setTimeLeft={setTimeLeft}
        setIsSubmitted={setIsSubmitted}
      />

      {/* question  */}
      <p className="text-lg mb-4 font-bold">
        {currentQuestion.id}. {currentQuestion.question}
      </p>

      {/* options to choose */}
      {currentQuestion.type === "mcq" ? (
        <div className="space-y-3">
          {currentQuestion.options.map((option) => (
            <button
              key={option.id}
              onClick={() => handleAnswerSelect(option.id)} // Store the ID for MCQ
              className={`w-full text-left p-3 rounded-lg font-semibold ${
                selectedAnswer === option.id ? "bg-blue-500 text-white" : ""
              } ${
                isSubmitted &&
                option.id === currentQuestion.correctAnswer &&
                "bg-green-500 text-white"
              } ${
                isSubmitted &&
                selectedAnswer === option.id &&
                !isCorrect &&
                "bg-red-500 text-white"
              }`}
              disabled={isSubmitted || timeLeft === 0} // Disable buttons when time is up
            >
              {option.id}. {option.text}
            </button>
          ))}
        </div>
      ) : (
        // input to getting numerical answer
        <input
          type="text"
          value={selectedAnswer} // Store the text for open-ended questions
          onChange={(e) => handleAnswerSelect(e.target.value)} // Update the text
          className="w-full p-3 border rounded-lg"
          placeholder="Type your answer here"
          disabled={isSubmitted || timeLeft === 0} // Disable input when time is up
        />
      )}

      { !selectedAnswer && <p className="text-sm text-red-500">{error}</p>}
      {/* submit answer button  */}
      {!isSubmitted && timeLeft > 0 && (
        <button
          onClick={handleSubmit}
          className="w-full mt-4 p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Submit
        </button>
      )}

      {(isSubmitted || timeLeft === 0) && (
        <div className="mt-4">
          <p
            className={`text-lg font-semibold ${
              isCorrect ? "text-green-600" : "text-red-600"
            }`}
          >
            {isCorrect ? "Correct! 🎉" : "Incorrect! 😢"}
          </p>
          {!isCorrect && (
            <p className="text-gray-600">
              The correct answer is: {currentQuestion.correctAnswer}
            </p>
          )}

          {/* next question button  */}
          {currentQuestionIndex < quizData.length - 1 && (
            <button
              onClick={handleNextQuestion}
              className="w-full mt-4 p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Next Question
            </button>
          )}

          {/* scoreboard */}
          {isSubmitted && <Scoreboard />}
        </div>
      )}
    </div>
  );
};

export default Quiz;
