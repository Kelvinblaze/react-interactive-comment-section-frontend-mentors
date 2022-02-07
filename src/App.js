import CommentCard from "./components/CommentCard";

import { useEffect, useState } from "react";

export default function App() {
  const BASE_URL = "http://localhost:8080/";
  let [comments, setComments] = useState([]);

  async function getComments() {
    let apiCall = await fetch(`${BASE_URL}comments`);
    let apiRes = await apiCall.json();

    let comments = apiRes;
    setComments(comments);
  }

  // Increment Score
  function incrementScore(id) {
    let isUser = comments.filter((comment) => comment.id === id);
    let currentScore = isUser[0].score;

    if (currentScore < 0) {
      return;
    } else {
      let incremented_score = isUser[0].score++;
      setComments([...comments], incremented_score);
    }
  }

  function decrementScore(id) {
    let isUser = comments.filter((comment) => comment.id === id);
    let currentScore = isUser[0].score;

    if (currentScore === 0) {
      return;
    } else {
      let decremented_score = isUser[0].score--;
      setComments([...comments], decremented_score);
    }
  }

  useEffect(() => {
    getComments();
  }, []);
  return (
    <div className="tw-bg-very-light-gray tw-w-full tw-min-h-screen tw-h-auto">
      <div className="stable-alignment tw-py-16 tw-space-y-5">
        {comments.map((comment, i) => (
          <div key={i}>
            <CommentCard
              comment={comment}
              incrementScore={incrementScore}
              decrementScore={decrementScore}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
