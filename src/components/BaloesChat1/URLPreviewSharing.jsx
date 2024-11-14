import React from "react";
import ChatBalloon from "./ChatBalloon";
import PropTypes from "prop-types";

export default function URLPreviewSharing({
  direction,
  userName,
  time,
  status,
  url,
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
      <div className="flex items-center py-2.5 space-x-2">
        <span className="text-sm font-normal text-gray-900 dark:text-white">
          {url}
        </span>
        <svg
          className="w-5 h-5 text-gray-500 dark:text-gray-400"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 5H6a3 3 0 00-3 3v6a3 3 0 003 3h3"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 5h3a3 3 0 013 3v6a3 3 0 01-3 3h-3"
          />
        </svg>
      </div>
    </ChatBalloon>
  );
}
URLPreviewSharing.propTypes = {
  direction: PropTypes.oneOf(["sent", "received"]).isRequired,
  userName: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  profileImage: PropTypes.string.isRequired,
};
