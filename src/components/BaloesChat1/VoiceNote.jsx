import React from "react";
import ChatBalloon from "./ChatBalloon";
import PropTypes from 'prop-types';

export default function VoiceNote({
  direction,
  userName,
  time,
  status,
  audioUrl,
  profileImage,
}) {
  return (
    <ChatBalloon direction={direction} userName={userName} time={time} status={status} profileImage={profileImage}>
      <div className="flex items-center gap-2 py-2.5">
        <svg className="w-6 h-6 text-gray-500 dark:text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H6a3 3 0 00-3 3v6a3 3 0 003 3h3" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 5h3a3 3 0 013 3v6a3 3 0 01-3 3h-3" />
        </svg>
        <audio controls className="w-full">
          <source src={audioUrl} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      </div>
    </ChatBalloon>
  );
}
VoiceNote.propTypes = {
  direction: PropTypes.oneOf(['sent', 'received']).isRequired,
  userName: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  audioUrl: PropTypes.string.isRequired,
  profileImage: PropTypes.string.isRequired,
};