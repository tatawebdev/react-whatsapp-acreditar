import React, { useState } from "react";
import "./Emojis.css";  // Arquivo CSS para estilos

export default function Emojis() {
  const [selectedEmoji, setSelectedEmoji] = useState("");

  const emojis = [
    { unicode: "😀", label: "Grinning Face" },
    { unicode: "😃", label: "Grinning Face with Big Eyes" },
    { unicode: "😄", label: "Grinning Face with Smiling Eyes" },
    // Adicione mais emojis conforme necessário
  ];

  const handleEmojiClick = (emoji) => {
    setSelectedEmoji(emoji);
  };

  return (
    <div className="emoji-panel">
      <div className="emoji-header">
        <h3>Emojis & Pessoas</h3>
      </div>
      <div className="emoji-list">
        {emojis.map((emoji, index) => (
          <span
            key={index}
            className="emoji-item"
            data-unicode={emoji.unicode}
            onClick={() => handleEmojiClick(emoji.unicode)}
            role="button"
            aria-label={`Emoji: ${emoji.label}`}
          >
            {emoji.unicode}
          </span>
        ))}
      </div>
      {selectedEmoji && (
        <div className="emoji-selected">
          <p>Você selecionou: {selectedEmoji}</p>
        </div>
      )}
    </div>
  );
}
