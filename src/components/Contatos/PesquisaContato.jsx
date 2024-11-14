// Barra de pesquisa
import React from "react";

const PesquisaContato = () => {
  return (
    <div className="flex space-x-2 items-center px-4">
      <div className="flex-grow flex items-center space-x-2 bg-[#202c33] py-1 px-4 rounded-md">
        <svg
          viewBox="0 0 24 24"
          width="24"
          height="24"
          className="cursor-pointer"
        >
          <path
            fill="#aebac1"
            d="M15.009 13.805h-.636l-.22-.219a5.184 5.184 0 0 0 1.256-3.386 5.207 5.207 0 1 0-5.207 5.208 5.183 5.183 0 0 0 3.385-1.255l.221.22v.635l4.004 3.999 1.194-1.195-3.997-4.007zm-4.808 0a3.605 3.605 0 1 1 0-7.21 3.605 3.605 0 0 1 0 7.21z"
          ></path>
        </svg>
        <input
          type="text"
          className="focus:outline-none bg-[#202c33] w-full text-[#aebac1] text-xs"
          placeholder="Rechercher ou démarrer une nouvelle discussion"
        />
      </div>
      <svg
        viewBox="0 0 24 24"
        width="20"
        height="20"
        className="cursor-pointer"
      >
        <path
          fill="#aebac1"
          d="M10 18.1h4v-2h-4v2zm-7-12v2h18v-2H3zm3 7h12v-2H6v2z"
        ></path>
      </svg>
    </div>
  );
};

export default PesquisaContato;
