import React from "react";
import "./generate-socket-image.css";

export default function GenerateSocketImage(props) {
  const { sockets, summary } = props;

  return (
    <>
      <div className="background-image loot-image">
        {sockets > 0 && (
          <div className={`socket-container`}>
            {[...Array(sockets)].map((x, i) => (
              <div key={i} className={`one-socket ${summary && "summary"}`}></div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
