import React, { useEffect, useState } from "react";
import { fetchAllConversations } from "../../services/contatoService";
import { useSelectedUser } from "../../context/contatos/SelectedUserContext";

export default function ListaContatos() {
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { selectedUser, setSelectedUser } = useSelectedUser(); 


  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const { data, error } = await fetchAllConversations();

        if (error) throw new Error(error.message); // Lança erro caso exista
        setConversations(data);

        console.log(data);
      } catch (err) {
        setError(err.message); // Captura e define o erro
      } finally {
        setLoading(false); // Finaliza o carregamento
      }
    };

    fetchConversations();
  }, []);


  // Função para tratar o clique no item
  const handleClick = (user) => {
    setSelectedUser(user);
    // Aqui você pode fazer outras ações, como abrir um chat, exibir detalhes, etc.
    console.log("Usuário selecionado:", user.contact_name);
  };

  if (loading) return <div>Loading...</div>; // Exibe enquanto carrega
  if (error) return <div>Error: {error}</div>; // Exibe erro caso haja

  return (
    <>
      {/*  Items */}
      <div className="overflow-x-hidden overflow-y-auto flex-grow scroller h-10">
        {conversations.map((user) => (
          <div
            key={user.id}
            className="flex items-center space-x-2 px-4 hover:bg-[#202c33] hover:m-0 cursor-pointer transition mr-2"
            onClick={() => handleClick(user)} // Adicionando o evento onClick
          >
            <svg viewBox="0 0 212 212" className="flex-none w-12 h-12">
              <path
                fill="#DFE5E7"
                className="background"
                d="M106.251.5C164.653.5 212 47.846 212 106.25S164.653 212 106.25 212C47.846 212 .5 164.654.5 106.25S47.846.5 106.251.5z"
              ></path>
              <g fill="#FFF">
                <path className="primary" d={user.avatarPath}></path>
              </g>
            </svg>
            <div className="flex justify-between border-b py-4 border-[#272f34]">
              <div className="flex flex-col w-80">
                <span className="text-white">{user.contact_name}</span>
                <div className="flex text-[#aebac1] space-x-2">
                  <svg
                    viewBox="0 0 18 18"
                    width="18"
                    height="18"
                    className="flex-none"
                  >
                    <path
                      fill="#aebac1"
                      d="m17.394 5.035-.57-.444a.434.434 0 0 0-.609.076l-6.39 8.198a.38.38 0 0 1-.577.039l-.427-.388a.381.381 0 0 0-.578.038l-.451.576a.497.497 0 0 0 .043.645l1.575 1.51a.38.38 0 0 0 .577-.039l7.483-9.602a.436.436 0 0 0-.076-.609zm-4.892 0-.57-.444a.434.434 0 0 0-.609.076l-6.39 8.198a.38.38 0 0 1-.577.039l-2.614-2.556a.435.435 0 0 0-.614.007l-.505.516a.435.435 0 0 0 .007.614l3.887 3.8a.38.38 0 0 0 .577-.039l7.483-9.602a.435.435 0 0 0-.075-.609z"
                    ></path>
                  </svg>
                  <span className="text-sm truncate">{user.from}</span>
                </div>
              </div>
              <div className="flex flex-col flex-none text-xs items-end space-y-1 w-20 pr-2">
                {user.unreadMessages > 0 && (
                  <div className="flex bg-[#00a884] justify-center text-xs items-center rounded-full w-5 h-5 text-black">
                    {user.unreadMessages}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      {/*  Items */}
    </>
  );
}
