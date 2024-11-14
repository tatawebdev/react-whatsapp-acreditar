// Tela de contatos (onde os contatos são listados)
import React from "react";
import ListaContatos from "../components/Contatos/ListaContatos";
import PesquisaContato from "../components/Contatos/PesquisaContato";
import useOnlineStatus from "../hooks/useOnlineStatus";

const ContatosScreen = () => {
  const isOnline = useOnlineStatus();

  return (
    <div className="flex flex-col flex-none h-full w-[30rem] border-r border-[#272f34]">
      {/*  Header */}
      <div className="flex justify-between bg-[#202c33] px-4 py-2">
        <img
          src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
          className="rounded-full h-12 w-12"
          alt=""
        />
        <div className="flex items-center space-x-8">
          <svg viewBox="0 0 24 24" width="24" height="24">
            <path
              fill="#aebac1"
              d="M12.072 1.761a10.05 10.05 0 0 0-9.303 5.65.977.977 0 0 0 1.756.855 8.098 8.098 0 0 1 7.496-4.553.977.977 0 1 0 .051-1.952zM1.926 13.64a10.052 10.052 0 0 0 7.461 7.925.977.977 0 0 0 .471-1.895 8.097 8.097 0 0 1-6.012-6.386.977.977 0 0 0-1.92.356zm13.729 7.454a10.053 10.053 0 0 0 6.201-8.946.976.976 0 1 0-1.951-.081v.014a8.097 8.097 0 0 1-4.997 7.209.977.977 0 0 0 .727 1.813l.02-.009z"
            ></path>
            <path
              fill="#009588"
              d="M19 1.5a3 3 0 1 1 0 6 3 3 0 0 1 0-6z"
            ></path>
          </svg>
          <svg viewBox="0 0 24 24" width="24" height="24">
            <path
              fill="#aebac1"
              d="M19.005 3.175H4.674C3.642 3.175 3 3.789 3 4.821V21.02l3.544-3.514h12.461c1.033 0 2.064-1.06 2.064-2.093V4.821c-.001-1.032-1.032-1.646-2.064-1.646zm-4.989 9.869H7.041V11.1h6.975v1.944zm3-4H7.041V7.1h9.975v1.944z"
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
      {/*  Header */}

      {/*  Body */}

      <div className="flex flex-col space-y-2 flex-grow">
        <div className="flex flex-col">
          {!isOnline && (
            <div className="flex bg-[#182229] px-4 py-6 space-x-4">
              <svg
                viewBox="0 0 48 48"
                width="48"
                height="48"
                className="cursor-pointer"
              >
                <path
                  fill="#00a884"
                  d="M24.154 2C11.919 2 2 11.924 2 24.165S11.919 46.33 24.154 46.33s22.154-9.924 22.154-22.165S36.389 2 24.154 2zm7.547 21.037h-6.738l3.08-3.08c-1.059-1.059-2.406-1.733-4.043-1.733-3.176 0-5.775 2.599-5.775 5.775 0 3.177 2.599 5.776 5.775 5.776 2.503 0 4.62-1.637 5.391-3.85h2.021c-.866 3.273-3.85 5.776-7.412 5.776-4.235 0-7.701-3.465-7.701-7.701 0-4.235 3.465-7.701 7.701-7.701 2.118 0 4.043.866 5.391 2.31l2.31-2.31v6.738z"
                ></path>
              </svg>
              <div className="flex flex-col space-y-1">
                <h1 className="text-[#e9edef]">Mise à jour disponible</h1>
                <a className="text-[#aebac1] text-sm" href="#">
                  <span>Cliquer ici pour mettre Whatsapp à jour</span>
                  <svg
                    viewBox="0 0 8 12"
                    width="8"
                    height="12"
                    className="inline"
                  >
                    <path
                      fill="currentColor"
                      d="m2.173 1 4.584 4.725-4.615 4.615-1.103-1.103 3.512-3.512L1 2.173 2.173 1z"
                    ></path>
                  </svg>
                </a>
              </div>
            </div>
          )}
        </div>
        <div className="flex flex-col space-y-4 flex-grow">
          <PesquisaContato />
          <ListaContatos />
        </div>
      </div>
    </div>
  );
};

export default ContatosScreen;
