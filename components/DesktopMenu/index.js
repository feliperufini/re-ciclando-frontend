import { useState } from "react";
import { TbHome, TbChevronDown, TbRecycle } from "react-icons/tb";

export default function DesktopMenu() {
  const [open, setOpen] = useState(false);

  const handleOpenMenuDropdown = () => {
    setOpen(!open);
  };

  return (
    <aside className="z-20 hidden w-64 overflow-y-auto bg-emerald-500 md:block flex-shrink-0">
      <div className="py-4 text-gray-100">
        <a className="inline-flex ml-6 mt-1.5 mb-5 text-lg font-bold text-gray-100" href="/">
          <TbRecycle className="text-3xl mr-2" />
          <span>Re-Ciclando</span>
        </a>
        <ul className="pt-2 border-t-2 border-emerald-100">
          <li className="relative px-6 py-2">
            <a className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-200" href="/">
              <TbHome className="text-xl" />
              <span className="ml-4">Início</span>
            </a>
          </li>
          <li className="relative px-6 py-2">
            <a className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-200" href="/cards">
              <TbHome className="text-xl" />
              <span className="ml-4">Comprar Produtos</span>
            </a>
          </li>
          <li className="relative px-6 py-2">
            <a className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-200" href="/charts">
              <TbHome className="text-xl" />
              <span className="ml-4">Trocar Materiais</span>
            </a>
          </li>
          <li className="relative px-6 py-2">
            <a className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-200" href="/buttons">
              <TbHome className="text-xl" />
              <span className="ml-4">Pontos de Troca</span>
            </a>
          </li>
          <li className="relative px-6 py-2">
            <a className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-200" href="/modals">
              <TbHome className="text-xl" />
              <span className="ml-4">Dicas</span>
            </a>
          </li>
          <li className="relative px-6 py-2">
            <a className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-200" href="/tables">
              <TbHome className="text-xl" />
              <span className="ml-4">Sobre</span>
            </a>
          </li>
          <li className="relative px-6 py-2">
            <button className="inline-flex items-center justify-between w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-200" aria-haspopup="true" onClick={handleOpenMenuDropdown}>
              <span className="inline-flex items-center">
                <TbHome className="text-xl" />
                <span className="ml-4">Pages</span>
              </span>
              <TbChevronDown className="text-xl" />
            </button>
            {open &&
              <ul className="p-2 mt-2 space-y-2 overflow-hidden text-sm font-medium text-gray-600 rounded-md shadow-inner bg-emerald-200" aria-label="submenu">
                <li className="px-2 py-1 transition-colors duration-150 text-emerald-800 hover:text-emerald-900">
                  <a className="w-full" href="./login.html">Login</a>
                </li>
                <li className="px-2 py-1 transition-colors duration-150 text-emerald-800 hover:text-emerald-900">
                  <a className="w-full" href="./create-account.html">
                    Create account
                  </a>
                </li>
                <li className="px-2 py-1 transition-colors duration-150 text-emerald-800 hover:text-emerald-900">
                  <a className="w-full" href="./forgot-password.html">
                    Forgot password
                  </a>
                </li>
                <li className="px-2 py-1 transition-colors duration-150 text-emerald-800 hover:text-emerald-900">
                  <a className="w-full" href="./404.html">404</a>
                </li>
              </ul>
            }
          </li>
        </ul>
      </div>
    </aside >
  );
}