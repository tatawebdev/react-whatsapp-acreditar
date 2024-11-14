import React from "react";
import ChatBalloon from "./ChatBalloon";
import PropTypes from "prop-types";

export default function ImageGallery({
  direction,
  userName,
  time,
  status,
  images,
  profileImage,
}) {
  return (
    <ChatBalloon
      direction={direction}
      userName={userName}
      time={time}
      status={status}
      profileImage={profileImage}
    >
      <div className="flex gap-2 overflow-x-auto py-2.5">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Gallery image ${index + 1}`}
            className="w-20 h-20 rounded-lg object-cover"
          />
        ))}
      </div>
    </ChatBalloon>
  );
}
ImageGallery.propTypes = {
  direction: PropTypes.oneOf(["sent", "received"]).isRequired,
  userName: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
  profileImage: PropTypes.string.isRequired,
};
