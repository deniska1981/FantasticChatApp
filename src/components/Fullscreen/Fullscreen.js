import React, { useState } from "react";
import "./Fullscreen.css";

export default function Fullscreen() {
  const [fullscreen, setFullscreen] = useState(false);

  function toggleFullScreen() {
    if (fullscreen) {
      window.document.exitFullscreen();
      setFullscreen(false);
    } else {
      window.document.getElementsByClassName("chat")[0].requestFullscreen();
      setFullscreen(true);
    }
  }

  return (
    <div className="fullscreen-toggle">
      <img
        className="fullscreen-toggle__img"
        src={
          fullscreen
            ? "./svg/fullscreen-exit-btn.svg"
            : "./svg/fullscreen-btn.svg"
        }
        alt=""
        onClick={toggleFullScreen}
      />
    </div>
  );
}
