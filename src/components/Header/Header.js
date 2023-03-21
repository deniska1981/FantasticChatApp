import React from "react";
import "./Header.css";

export default function Header({ username }) {
  return (
    <div className="chat__header">
      <h1 className="heading">Welcome to Fantastic Chat {username}!</h1>
    </div>
  );
}
