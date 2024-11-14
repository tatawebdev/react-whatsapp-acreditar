import React from "react";
import ChatBalloon from "./ChatBalloon";
import PropTypes from "prop-types";

export default function FileAttachment({
  direction,
  userName,
  time,
  status,
  fileName,
  fileUrl,
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
      <div className="flex items-center space-x-2">
        <svg
          className="w-6 h-6 text-gray-500 dark:text-gray-400"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M7 8l3 3 7-7"
          />
        </svg>
        <a
          href={fileUrl}
          className="text-sm font-semibold text-blue-500 dark:text-blue-400"
        >
          {fileName}
        </a>
      </div>
    </ChatBalloon>
  );
}
FileAttachment.propTypes = {
  direction: PropTypes.oneOf(["sent", "received"]).isRequired,
  userName: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  fileName: PropTypes.string.isRequired,
  fileUrl: PropTypes.string.isRequired,
  profileImage: PropTypes.string.isRequired,
};
