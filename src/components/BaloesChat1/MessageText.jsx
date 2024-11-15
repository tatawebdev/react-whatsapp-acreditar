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

