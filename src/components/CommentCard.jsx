import ReplyCommentCard from "./ReplyCommentCard";
import { useState, useEffect } from "react";
export default function CommentCard({
  comment,
  incrementScore,
  decrementScore,
}) {
  let [replies, setReplies] = useState([]);

  function incrementReplyScore(id) {
    let isUser = replies.filter((reply) => reply.id === id);
    let currentReplyScore = isUser[0].score;

    if (currentReplyScore < 0) {
      return;
    } else {
      let incrementedReplyScore = isUser[0].score++;
      setReplies([...replies], incrementedReplyScore);
    }
  }

  function decrementReplyScore(id) {
    let isUser = replies.filter((reply) => reply.id === id);
    let currentReplyScore = isUser[0].score;

    if (currentReplyScore == 0) {
      return;
    } else {
      let decrementedReplyScore = isUser[0].score--;
      setReplies([...replies], decrementedReplyScore);
    }
  }

  // Set Replies
  useEffect(() => {
    setReplies(comment.replies);
  }, []);

  return (
    <div className="tw-space-y-5">
      {/* MAIN COMMENT */}

      <div className="tw-bg-white tw-p-5 tw-rounded-lg">
        <div className="tw-grid tw-grid-cols-1 lg:tw-grid-cols-12 tw-gap-5">
          <div className="card-counter tw-col-span-1 md:tw-col-span-2 lg:tw-col-span-1">
            <div className="tw-hidden lg:tw-flex tw-bg-very-light-gray tw-text-grayish-blue tw-text-center tw-rounded-lg tw-flex-col tw-items-center tw-font-bold">
              <button
                onClick={() => incrementScore(comment.id)}
                className="material-icons tw-py-3 tw-w-full tw-text-light-grayish-blue"
              >
                add
              </button>
              <span className="tw-text-moderate-blue">{comment.score}</span>
              <button
                onClick={() => {
                  decrementScore(comment.id);
                }}
                className="material-icons tw-py-3 tw-w-full tw-text-light-grayish-blue"
              >
                remove
              </button>
            </div>
          </div>
          <div className="card-wrapper tw-space-y-3 tw-col-span-1 md:tw-col-span-10 lg:tw-col-span-11 ">
            <div className="card-comment-header tw-flex tw-items-center tw-justify-between">
              <div className="tw-flex tw-items-center tw-space-x-4">
                <div className="comment-avatar">
                  <img
                    src={comment.user.image.png}
                    alt={comment.user.username}
                    className="tw-w-8"
                  />
                </div>

                <span className="tw-font-bold">{comment.user.username}</span>
                <span className="tw-text-gray-500">{comment.createdAt}</span>
              </div>
              <div className="tw-hidden lg:tw-block">
                <button className="tw-text-moderate-blue tw-flex tw-space-x-2 tw-items-center">
                  <span className="material-icons-outlined">reply</span>
                  <span className="tw-font-bold">Reply</span>
                </button>
              </div>
            </div>

            <div>
              <p className="tw-text-gray-500">{comment.content}</p>
            </div>
          </div>
        </div>

        {/* Mobile Actions */}
        <div className="tw-pt-5 tw-flex lg:tw-hidden tw-items-center tw-justify-between ">
          <div className="tw-flex tw-flex-row tw-flex-none tw-bg-very-light-gray tw-text-grayish-blue tw-text-center tw-rounded-lg  tw-items-center tw-font-bold">
            <button
              onClick={() => incrementScore(comment.id)}
              className="material-icons tw-p-3 tw-w-full tw-text-light-grayish-blue"
            >
              add
            </button>
            <span className=" tw-text-moderate-blue">{comment.score}</span>
            <button
              onClick={() => {
                decrementScore(comment.id);
              }}
              className="material-icons tw-p-3 tw-w-full tw-text-light-grayish-blue"
            >
              remove
            </button>
          </div>

          <div>
            <button className="tw-text-moderate-blue tw-flex tw-space-x-2 tw-items-center">
              <span className="material-icons-outlined">reply</span>
              <span className="tw-font-bold">Reply</span>
            </button>
          </div>
        </div>
      </div>

      <div className="tw-space-y-5 tw-border-l-4">
        {replies.length === 0
          ? []
          : replies.map((comment, i) => {
              return (
                <div className="tw-ml-8 " key={i}>
                  <ReplyCommentCard
                    comment={comment}
                    incrementReplyScore={incrementReplyScore}
                    decrementReplyScore={decrementReplyScore}
                  />
                </div>
              );
            })}
      </div>
    </div>
  );
}
