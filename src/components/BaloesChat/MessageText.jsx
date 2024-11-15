import React from "react";
import ChatBalloon from "./ChatBalloon";
import PropTypes from "prop-types";

export default function MessageText(props) {
  const { content } = props;
  
  return (
    <ChatBalloon {...props}>

      <p className="text-sm font-normal text-gray-900 dark:text-white">
        {content}
        <span className="p-0 m-0 font-inherit text-base align-baseline border-0 outline-none pl-1 pr-1"></span>

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


