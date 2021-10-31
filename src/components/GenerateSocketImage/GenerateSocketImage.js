import React from "react";
import "./generate-socket-image.css";

export default function GenerateSocketImage(props) {
  const { sockets } = props;

  return (
    <>
      <div class="background-image">
        {sockets > 0 && (
          <div className={`socket-container ${sockets === 6 && "rotate-on-six"}`}>
            {[...Array(sockets)].map((x, i) => (
              <div className="one-socket"> </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
