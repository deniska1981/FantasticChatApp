import React from "react";

function Avatars({ selectAvatar }) {
  const avatars = [];
  for (let i = 1; i <= 16; i++) {
    const path = `../svg/avatar-${i}.svg`;
    avatars.push(path);
  }

  function renderAvatars(avatar, index) {
    return (
      <li className="reg-form__avatar" key={index}>
        <img src={avatar} alt={`Avatar ${index}`} onClick={selectAvatar} />
      </li>
    );
  }

  return (
    <ul className="reg-form__avatar-list">
      {avatars.map((avatar, index) => renderAvatars(avatar, index))}
    </ul>
  );
}

export default Avatars;
