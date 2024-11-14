import React from "react";
import { useSelectedUser } from "../../context/contatos/SelectedUserContext";

const HeaderChat = () => {
  const { selectedUser } = useSelectedUser();

  if (!selectedUser) {
    return <div></div>;
  }

  return (
    <div className="flex flex-col space-y-4">
      {/* Cabeçalho do chat */}
      <div className="flex flex-none space-x-2 items-center">
        <img
          src="https://flowbite.com/docs/images/people/profile-picture-3.jpg"
          className="rounded-full h-12 w-12"
          alt="User avatar"
        />
        <div className="flex flex-col">
          {/* Exibe o nome do usuário selecionado */}
          <span className="font-bold text-[#e9edef]">
            {selectedUser.contact_name}
          </span>
          <span className="text-sm text-[#aebac1]">
            {/* Exibe status do usuário, você pode ajustar conforme seus dados */}
            {selectedUser.status
              ? `Online ${selectedUser.status}`
              : "Status desconhecido"}
          </span>
        </div>
      </div>

      <div className="flex flex-none items-center space-x-8">
        <svg viewBox="0 0 24 24" width="24" height="24" className="">
          <path
            fill="#aebac1"
            d="M15.9 14.3H15l-.3-.3c1-1.1 1.6-2.7 1.6-4.3 0-3.7-3-6.7-6.7-6.7S3 6 3 9.7s3 6.7 6.7 6.7c1.6 0 3.2-.6 4.3-1.6l.3.3v.8l5.1 5.1 1.5-1.5-5-5.2zm-6.2 0c-2.6 0-4.6-2.1-4.6-4.6s2.1-4.6 4.6-4.6 4.6 2.1 4.6 4.6-2 4.6-4.6 4.6z"
          ></path>
        </svg>
        <svg viewBox="0 0 24 24" width="24" height="24">
          <path
            fill="#aebac1"
            d="M12 7a2 2 0 1 0-.001-4.001A2 2 0 0 0 12 7zm0 2a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 9zm0 6a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 15z"
          ></path>
        </svg>
      </div>
    </div>
  );
};

export default HeaderChat;
