import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  DeliveredStatus,
  FailedStatus,
  None,
  PendingStatus,
  ReadStatus,
  SentStatus,
} from "./StatusMessage";




export default function ChatBalloon(props) {
  const {
    timestamp,
    children,
    user_name,
    user_img_src,
    status,
    message_drop_down,
    sent_by_user,
  } = props;
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const statusComponents = {
    sent: SentStatus,
    delivered: DeliveredStatus,
    read: ReadStatus,
    pending: PendingStatus,
    failed: FailedStatus,
  };

  const StatusComponent = statusComponents[status] || None;
  timestamp
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  const alignmentClass = !!sent_by_user ? "justify-start" : "justify-end";

  return (
    <>
      <div className={`flex items-start gap-2.5 ${alignmentClass}`}>
        {user_img_src && (
          <img
            className="w-8 h-8 rounded-full"
            src={user_img_src}
            alt="Profile"
          />
        )}

        <div
          className={`flex flex-col max-w-[320px] leading-1.5 pt-6-px pl-9-px pr-7-px pb-8-px mb-1.5 border-gray-200 bg-gray-100 ${
            !!sent_by_user
              ? "rounded-e-xl rounded-es-xl "
              : "rounded-s-xl rounded-ss-xl"
          } dark:bg-[#005c4b]`}
        >
          {" "}
          {user_name && (
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <span className="text-sm font-semibold text-gray-900 dark:text-white">
                {user_name}
              </span>
              {timestamp && (
                <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                  {timestamp}
                </span>
              )}
            </div>
          )}
          <span className="flex items-end">
            {children && <> {children}</>}

            <span className="flex items-end">
              <span className="h-[18px]">
                <span className="time-14-12 p-0 m-0 font-inherit text-base align-baseline border-0 outline-none pl-0.5 pr-1 text-[0.675rem] text-white text-opacity-60">
                  14:12
                </span>
              </span>
              {!sent_by_user && (
                <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                  <StatusComponent />
                </span>
              )}
            </span>
          </span>
        </div>
        {message_drop_down && (
          <button
            onClick={toggleDropdown}
            className="inline-flex self-center items-center p-2 text-sm font-medium text-center text-gray-900 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-800 dark:focus:ring-gray-600"
            type="button"
          >
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 4 15"
            >
              <path d="M3.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 6.041a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 5.959a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
            </svg>
          </button>
        )}
        {message_drop_down && isDropdownOpen && (
          <div className="z-10 absolute bg-white divide-y divide-gray-100 rounded-lg shadow w-40 dark:bg-gray-700 dark:divide-gray-600">
            <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
              <li>
                <a
                  href="#"
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Reply
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Forward
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Copy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Report
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Delete
                </a>
              </li>
            </ul>
          </div>
        )}
      </div>
    </>
  );
}

