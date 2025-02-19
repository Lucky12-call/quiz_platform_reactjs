import { useSelector } from "react-redux";

const AttemptHistory = () => {
  const attemptHistory = useSelector((state) => state.quiz.attemptHistory);

  return (
    <div className="mt-10">
      {/* attempt history array */}
      {attemptHistory.map((history, i) => (
        <div
          key={i}
          className={`w-full h-20 flex justify-between items-center p-5 border rounded-lg mb-5 ${
            history.correctQuiz >= 7 ? "bg-green-200" : "bg-red-200"
          }`}
        >
          <div>
            <h1 className="font-semibold text-start">
              Score: {history.correctQuiz} / 10
            </h1>
            <h1 className="font-semibold text-start">
              Attempt: {history.attempt}
            </h1>
          </div>

          <div>
            <div>
              <h1 className="font-semibold text-end">{history.currentTime}</h1>
              <h1 className="font-semibold text-end">{history.currentDate}</h1>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AttemptHistory;
