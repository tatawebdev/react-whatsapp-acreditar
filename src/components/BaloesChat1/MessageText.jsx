import React from "react";
import ChatBalloon from "./ChatBalloon";
import PropTypes from "prop-types";

export default function MessageText(props) {
  const { content } = props;
  
  console.log(Object.keys(props));
  return (
    <ChatBalloon>
      <p className="text-sm font-normal text-gray-900 dark:text-white">
        {content}
      </p>
    </ChatBalloon>
  );
  //   <ChatBalloon
  //     direction={direction}
  //     userName={userName}
  //     time={time}
  //     status={status}
  //     profileImage={profileImage}
  //   >
  //     <p className="text-sm font-normal text-gray-900 dark:text-white">
  //       {message}
  //     </p>
  //   </ChatBalloon>
  // );
}


MessageText.propTypes = {
  id: PropTypes.string,
  conversation_id: PropTypes.string,
  content: PropTypes.string,
  sent_by_user: PropTypes.bool,
  from: PropTypes.string,
  message_id: PropTypes.string,
  timestamp: PropTypes.string,
  type: PropTypes.string,
  created_at: PropTypes.string,
  updated_at: PropTypes.string,
  status: PropTypes.string,
  error_data: PropTypes.object,
  conversation_session_id: PropTypes.string,
};