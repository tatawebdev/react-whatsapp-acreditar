import React from "react";
import ChatBalloon from "./ChatBalloon";
import PropTypes from "prop-types";

export default function ImageAttachment({
  direction,
  userName,
  time,
  status,
  imageUrl,
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
      <div className="flex justify-center py-2.5">
        <img src={imageUrl} alt="Attachment" className="w-full rounded-lg" />
      </div>
    </ChatBalloon>
  );
}

ImageAttachment.propTypes = {
  direction: PropTypes.oneOf(["sent", "received"]).isRequired,
  userName: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  profileImage: PropTypes.string.isRequired,
};
