import { useEffect, useState } from "react";
import { TbBellRinging, TbLogout, TbSettings, TbUser } from "react-icons/tb";
import UserService from '../../services/UserService';
import Avatar from "../avatar";

const userService = new UserService();

export default function HeaderNavbar() {
  const [userDropdown, setUserDropdown] = useState(false);
  const [bellDropdown, setBellDropdown] = useState(false);

  const handleOpenUserDropdown = () => {
    setUserDropdown(!userDropdown);
  };

  const handleOpenBellDropdown = () => {
    setBellDropdown(!bellDropdown);
  };

  return (
    <header className="z-10 py-4 bg-emerald-400 shadow-md">
      <div className="container flex items-center justify-between h-full px-6 mx-auto text-emerald-600">
        <button className="p-1 -ml-1 mr-5 rounded-md md:hidden focus:outline-none focus:shadow-outline-emerald" aria-label="Menu">
          <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path>
          </svg>
        </button>
        <div className="flex justify-center flex-1 lg:mr-32">
          <div className="relative w-full max-w-xl mr-6 focus-within:text-emerald-500">
            <div className="absolute inset-y-0 flex items-center pl-2">
              <svg className="w-4 h-4" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path>
              </svg>
            </div>
            <input className="w-full pl-8 pr-2 pt-1 pb-1 text-sm text-gray-700 placeholder-gray-500 bg-gray-100 border-0 rounded-md focus:placeholder-gray-300 focus:outline-none form-input" type="text" placeholder="Procurar produtos..." aria-label="Search" />
          </div>
        </div>
        <ul className="flex items-center flex-shrink-0 space-x-6">
          <li className="relative">
            <button className="relative align-middle rounded-md focus:outline-none focus:shadow-outline-emerald" aria-label="Notifications" aria-haspopup="true" onClick={handleOpenBellDropdown}>
              <TbBellRinging className="text-xl mr-2" />
            </button>
            {bellDropdown &&
              <ul className="absolute right-0 w-56 p-2 mt-2 space-y-2 text-gray-600 bg-white border border-gray-100 rounded-md shadow-md" aria-label="submenu">
                <li className="flex">
                  <a className="inline-flex items-center justify-between w-full px-2 py-1 text-sm font-semibold transition-colors duration-150 rounded-md hover:bg-gray-100 hover:text-gray-800" href="#">
                    <span>Mensagem</span>
                    <span className="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-600 bg-red-100 rounded-full">
                      0
                    </span>
                  </a>
                </li>
              </ul>
            }
          </li>
          <li className="relative">
            <button className="align-middle rounded-full focus:shadow-outline-emerald focus:outline-none" aria-label="Account" aria-haspopup="true" onClick={handleOpenUserDropdown}>
              <img className="rounded-full w-8" src="/images/avatar.png" />
            </button>
            {userDropdown &&
              <ul className="absolute right-0 w-56 p-2 mt-2 space-y-2 text-gray-600 bg-white border border-gray-100 rounded-md shadow-md" aria-label="submenu">
                <li className="flex">
                  <a className="inline-flex items-center w-full px-2 py-1 text-sm font-semibold transition-colors duration-150 rounded-md hover:bg-gray-100 hover:text-gray-800" href="#">
                    <TbUser className="text-lg mr-2" />
                    <span>Perfil</span>
                  </a>
                </li>
                <li className="flex">
                  <a className="inline-flex items-center w-full px-2 py-1 text-sm font-semibold transition-colors duration-150 rounded-md hover:bg-gray-100 hover:text-gray-800" href="#">
                    <TbSettings className="text-lg mr-2" />
                    <span>Configurações</span>
                  </a>
                </li>
                <li className="flex">
                  <a className="inline-flex items-center w-full px-2 py-1 text-sm font-semibold transition-colors duration-150 rounded-md hover:bg-gray-100 hover:text-gray-800" href="#">
                    <TbLogout className="text-lg mr-2" />
                    <span>Sair</span>
                  </a>
                </li>
              </ul>
            }
          </li >
        </ul >
      </div >
    </header >
  );
}