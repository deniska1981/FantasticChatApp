import React, { useState } from "react";
import "./Input.css";
import Emoji from "../Emoji/Emoji";

export default function Input({ onSendMessage }) {
  const initialState = {
    text: "",
  };

  const [state, setState] = useState(initialState);

  function onChange(e) {
    setState({ text: e.target.value });
  }

  function onSubmit(e) {
    e.preventDefault();
    const input = document.getElementsByClassName("msg-form__input")[0];
    if (state.text === "") {
      input.placeholder = "You need to enter something...";
    } else {
      onSendMessage(state.text);
      setState({ text: "" });
      input.placeholder = "Enter your message...";
      input.focus();
    }
  }

  function onClick(e) {
    const input = document.getElementsByClassName("msg-form__input")[0];
    input.value = input.value + e.target.innerHTML;
    setState({ text: input.value });
    input.focus();
  }

  function toggleEmoji(e) {
    e.preventDefault();
    const emoji_list = document.getElementsByClassName("emoji-list")[0];
    if (emoji_list.style.display === "none") {
      emoji_list.style.display = "flex";
    } else emoji_list.style.display = "none";
  }

  return (
    <div className="chat__input">
      <Emoji onClick={onClick} />
      <form className="msg-form" onSubmit={(e) => onSubmit(e)}>
        <button
          className="msg-form__emoji-btn"
          type="button"
          onMouseDown={toggleEmoji}
        >
          <img src="../svg/emoticon.svg" alt="emoticon" width="24" />
        </button>
        <input
          className="msg-form__input"
          onChange={(e) => onChange(e)}
          value={state.text}
          type="text"
          placeholder="Enter your message..."
          autoFocus={true}
        />
        <button className="msg-form__btn">
          <img src="svg/send-message.svg" alt="send-message" width="24" />
        </button>
      </form>
    </div>
  );
}
