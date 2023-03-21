import React, { useState, useEffect } from "react";
import "./App.css";
import Registration from "./components/Registration/Registration";
import Fullscreen from "./components/Fullscreen/Fullscreen";
import Header from "./components/Header/Header";
import Messages from "./components/Messages/Messages";
import Input from "./components/Input/Input";

export default function App() {
  const initialChatState = {
    member: { username: "", avatar: "" },
    messages: [],
  };
  const [chat, setChat] = useState(initialChatState);
  const [drone, setDrone] = useState(null);

  useEffect(() => {
    if (chat.member.username !== "") {
      const drone = new window.Scaledrone("jLVyY8bhcRis8oaW", {
        data: chat.member,
      });
      setDrone(drone);
    }
  }, [chat.member]);

  useEffect(() => {
    if (chat.messages.length) {
      const scrollElement = document.getElementsByClassName("msg-list")[0];
      scrollElement.scrollTop = scrollElement.scrollHeight;
    }
  }, [chat.messages.length]);

  if (drone) {
    drone.on("open", (error) => {
      if (error) {
        return console.error(error);
      }
      chat.member.id = drone.clientId;
      setChat({ ...chat }, chat.member);

      const room = drone.subscribe("observable-room");

      room.on("message", (message) => {
        const { data, member, id } = message;
        chat.messages.push({ member, data, id });
        setChat({ ...chat }, chat.messages);
      });
    });
  }

  const onSendMessage = (message) => {
    drone.publish({
      room: "observable-room",
      message,
    });
  };

  const handleRegFormSubmit = (username, avatar) => {
    chat.member = {
      username: username,
      avatar: avatar,
    };
    setChat({ ...chat }, chat.member);
  };

  return chat.member.username === "" ? (
    <Registration handleRegFormSubmit={handleRegFormSubmit} />
  ) : (
    <div className="chat">
      <Header username={chat.member.username} />
      <Fullscreen />
      <Messages messages={chat.messages} thisMember={chat.member} />
      <Input onSendMessage={onSendMessage} />
    </div>
  );
}
