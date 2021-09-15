import { Comment, Input, Tooltip, Button, message } from "antd";
import moment from "moment";
import axiosInstance from "../util/axios";
import jwt_decode from "jwt-decode";

import { useState, useEffect } from "react";

const { TextArea } = Input;
const accessToken = localStorage.getItem("accessToken");
const decodedToken = jwt_decode(accessToken);

function Comments({ comments, adId, fetchComments }) {
  const [activeReply, setActiveReply] = useState(null);
  const [commentContent, setCommentContent] = useState(null);

  const postComment = () => {
    if (commentContent) {
      const commentObj = {
        sender: decodedToken._id,
        content: commentContent,
        replyTo: activeReply,
        createdDate: Date(),
      };
      console.log(new Date().toString());
      axiosInstance
        .put(`/ad/${adId}/new-comment`, commentObj)
        .then((res) => resetComment())
        .catch((error) => console.log(error.message));
    } else {
      message.error("Comment content is empty!");
    }
  };

  const deleteComment = (id) => {
    const deletingComment = {
      id: id,
    };
    axiosInstance
      .put(`/ad/${adId}/delete-comment`, deletingComment)
      .then((res) => {
        fetchComments(adId);
        message.success("Comment was deleted successfully");
      })
      .catch((error) => console.log(error.message));
  };

  const resetComment = () => {
    setActiveReply(null);
    setCommentContent(null);
    fetchComments(adId);
    message.success("Comment was posted successfully");
  };

  const cancelReply = () => {
    setActiveReply(null);
    setCommentContent(null);
  };

  return (
    <div>
      <h2>Comments</h2>
      {comments.map((elem1) => {
        if (!elem1.replyTo) {
          return (
            <Comment
              actions={[
                <>
                  {elem1._id !== activeReply && (
                    <span
                      id={elem1._id}
                      onClick={(e) => setActiveReply(e.target.id)}
                    >
                      Reply
                    </span>
                  )}
                  {elem1._id === activeReply && (
                    <span id={elem1._id} onClick={(e) => cancelReply()}>
                      Cancel
                    </span>
                  )}
                  {elem1.sender._id === decodedToken._id && (
                    <span
                      id={elem1._id}
                      onClick={(e) => deleteComment(e.target.id)}
                    >
                      Delete
                    </span>
                  )}

                  {elem1._id === activeReply && (
                    <>
                      <TextArea
                        rows={4}
                        className="comment-reply-input"
                        value={commentContent}
                        onChange={(e) => setCommentContent(e.target.value)}
                        placeholder="Reply to this comment ..."
                      />
                      <Button
                        type="primary"
                        className="post-comment-button"
                        onClick={() => postComment()}
                      >
                        Post Comment
                      </Button>
                    </>
                  )}
                </>,
              ]}
              author={
                <Tooltip title="Sender">
                  <span className="comment-action">{elem1.sender.name}</span>
                </Tooltip>
              }
              content={elem1.content}
              key={elem1._id}
              datetime={
                <Tooltip
                  title={moment(`${elem1.createdDate}`).format(
                    "YYYY-MM-DD HH:mm:ss"
                  )}
                >
                  <span>{moment(`${elem1.createdDate}`).fromNow()}</span>
                </Tooltip>
              }
            >
              {comments.map((elem2) => {
                if (elem2.replyTo === elem1._id) {
                  return (
                    <Comment
                      actions={[
                        <>
                          {elem2._id !== activeReply && (
                            <span
                              id={elem2._id}
                              onClick={(e) => setActiveReply(e.target.id)}
                            >
                              Reply
                            </span>
                          )}
                          {elem2._id === activeReply && (
                            <span id={elem2._id} onClick={(e) => cancelReply()}>
                              Cancel
                            </span>
                          )}
                          {elem2.sender._id === decodedToken._id && (
                            <span
                              id={elem2._id}
                              onClick={(e) => deleteComment(e.target.id)}
                            >
                              Delete
                            </span>
                          )}

                          {elem2._id === activeReply && (
                            <>
                              <TextArea
                                rows={4}
                                className="comment-reply-input"
                                value={commentContent}
                                onChange={(e) =>
                                  setCommentContent(e.target.value)
                                }
                                placeholder="Reply to this comment ..."
                              />
                              <Button
                                type="primary"
                                className="post-comment-button"
                                onClick={() => postComment()}
                              >
                                Post Comment
                              </Button>
                            </>
                          )}
                        </>,
                      ]}
                      author={
                        <Tooltip title="Sender">
                          <span className="comment-action">
                            {elem2.sender.name}
                          </span>
                        </Tooltip>
                      }
                      content={elem2.content}
                      key={elem2._id}
                      datetime={
                        <Tooltip
                          title={moment(`${elem2.createdDate}`).format(
                            "YYYY-MM-DD HH:mm:ss"
                          )}
                        >
                          <span>
                            {moment(`${elem2.createdDate}`).fromNow()}
                          </span>
                        </Tooltip>
                      }
                    >
                      {comments.map((elem3) => {
                        if (elem3.replyTo === elem2._id) {
                          return (
                            <Comment
                              actions={[
                                <>
                                  {elem3.sender._id === decodedToken._id && (
                                    <span
                                      id={elem3._id}
                                      onClick={(e) =>
                                        deleteComment(e.target.id)
                                      }
                                    >
                                      Delete
                                    </span>
                                  )}
                                </>,
                              ]}
                              author={
                                <Tooltip title="Sender">
                                  <span className="comment-action">
                                    {elem3.sender.name}
                                  </span>
                                </Tooltip>
                              }
                              content={elem3.content}
                              key={elem3._id}
                              datetime={
                                <Tooltip
                                  title={moment(`${elem3.createdDate}`).format(
                                    "YYYY-MM-DD HH:mm:ss"
                                  )}
                                >
                                  <span>
                                    {moment(`${elem3.createdDate}`).fromNow()}
                                  </span>
                                </Tooltip>
                              }
                            ></Comment>
                          );
                        }
                      })}
                    </Comment>
                  );
                }
              })}
            </Comment>
          );
        }
      })}
      {!activeReply && (
        <div className="new-comment-container">
          <TextArea
            rows={4}
            className="comment-reply-input"
            value={commentContent}
            onChange={(e) => setCommentContent(e.target.value)}
            placeholder="Write a new comment ..."
          />
          <Button
            type="primary"
            className="post-comment-button"
            onClick={() => postComment()}
          >
            Post Comment
          </Button>
        </div>
      )}
    </div>
  );
}

export default Comments;
