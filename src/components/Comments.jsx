import { Comment, Input, Tooltip, Button } from "antd";
import moment from "moment";
import { useState, useEffect } from "react";

const { TextArea } = Input;

function Comments({ comments }) {
  const [activeReply, setActiveReply] = useState(null);

  return (
    <div>
      <h1>comments</h1>
      {comments.map((elem) => {
        if (elem.level === 1) {
          return (
            <Comment
              actions={[
                <>
                  {elem._id !== activeReply && (
                    <span
                      id={elem._id}
                      onClick={(e) => setActiveReply(e.target.id)}
                    >
                      Reply
                    </span>
                  )}
                  {elem._id === activeReply && (
                    <>
                      <span id={elem._id} onClick={(e) => setActiveReply(null)}>
                        Cancel
                      </span>
                      <TextArea rows={4} className="comment-reply-input" />
                      <Button type="primary" className="post-comment-button">
                        Post Comment
                      </Button>{" "}
                    </>
                  )}
                </>,
              ]}
              author={
                <Tooltip title="Sender">
                  <span className="comment-action">{elem.sender.name}</span>
                </Tooltip>
              }
              content={elem.content}
              key={elem._id}
              datetime={
                <Tooltip
                  title={moment(`${elem.createdAt}`).format(
                    "YYYY-MM-DD HH:mm:ss"
                  )}
                >
                  <span>{moment(`${elem.createdAt}`).fromNow()}</span>
                </Tooltip>
              }
            >
              {comments.map((elem) => {
                if (elem.level === 2) {
                  return (
                    <Comment
                      actions={[
                        <>
                          <span>Reply</span>
                          {true && (
                            <TextArea
                              rows={4}
                              className="comment-reply-input"
                            />
                          )}
                        </>,
                      ]}
                      author={<a>Han Solo</a>}
                      content={
                        <p>
                          We supply a series of design principles, practical
                          patterns and high quality design resources (Sketch and
                          Axure).
                        </p>
                      }
                    >
                      {comments.map((elem) => {
                        if (elem.level === 3) {
                          return (
                            <Comment
                              actions={[
                                <>
                                  <span>Reply</span>
                                  {true && (
                                    <TextArea
                                      rows={4}
                                      className="comment-reply-input"
                                    />
                                  )}
                                </>,
                              ]}
                              author={<a>Han Solo</a>}
                              content={
                                <p>
                                  We supply a series of design principles,
                                  practical patterns and high quality design
                                  resources (Sketch and Axure).
                                </p>
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
    </div>
  );
}

export default Comments;
