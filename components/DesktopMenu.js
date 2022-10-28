import { useState } from "react";
import { TbHome, TbChevronDown, TbRecycle } from "react-icons/tb";

export default function DesktopMenu() {
  const [open, setOpen] = useState(false);

  const handleOpenDropdown = () => {
    setOpen(!open);
  };

  return (
    <aside className="z-20 hidden w-64 overflow-y-auto bg-emerald-500 md:block flex-shrink-0">
      <div className="py-4 text-gray-100">
        <a className="inline-flex ml-6 text-lg font-bold text-gray-100" href="#">
          <TbRecycle className="text-xl mt-0.5 mr-2" />
          Re-Ciclando
        </a>
        <ul className="mt-5 pt-2 border-t-2 border-emerald-100">
          <li className="relative px-6 py-2">
            <a className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-200" href="../forms.html">
              <TbHome className="text-xl" />
              <span className="ml-4">Forms</span>
            </a>
          </li>
          <li className="relative px-6 py-2">
            <a className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-200" href="../cards.html">
              <TbHome className="text-xl" />
              <span className="ml-4">Cards</span>
            </a>
          </li>
          <li className="relative px-6 py-2">
            <a className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-200" href="../charts.html">
              <TbHome className="text-xl" />
              <span className="ml-4">Charts</span>
            </a>
          </li>
          <li className="relative px-6 py-2">
            <a className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-200" href="../buttons.html">
              <TbHome className="text-xl" />
              <span className="ml-4">Buttons</span>
            </a>
          </li>
          <li className="relative px-6 py-2">
            <a className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-200" href="../modals.html">
              <TbHome className="text-xl" />
              <span className="ml-4">Modals</span>
            </a>
          </li>
          <li className="relative px-6 py-2">
            <a className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-200" href="../tables.html">
              <TbHome className="text-xl" />
              <span className="ml-4">Tables</span>
            </a>
          </li>
          <li className="relative px-6 py-2">
            <button className="inline-flex items-center justify-between w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-200" aria-haspopup="true" onClick={handleOpenDropdown}>
              <span className="inline-flex items-center">
                <TbHome className="text-xl" />
                <span className="ml-4">Pages</span>
              </span>
              <TbChevronDown className="text-xl" />
            </button>
            {open ? (
              <ul className="p-2 mt-2 space-y-2 overflow-hidden text-sm font-medium text-gray-500 rounded-md shadow-inner bg-emerald-200" aria-label="submenu">
                <li className="px-2 py-1 transition-colors duration-150 hover:text-gray-200">
                  <a className="w-full" href="./login.html">Login</a>
                </li>
                <li className="px-2 py-1 transition-colors duration-150 hover:text-gray-200">
                  <a className="w-full" href="./create-account.html">
                    Create account
                  </a>
                </li>
                <li className="px-2 py-1 transition-colors duration-150 hover:text-gray-200">
                  <a className="w-full" href="./forgot-password.html">
                    Forgot password
                  </a>
                </li>
                <li className="px-2 py-1 transition-colors duration-150 hover:text-gray-200">
                  <a className="w-full" href="./404.html">404</a>
                </li>
              </ul>
            ) : null}
          </li>
        </ul>
      </div>
    </aside >
  );
}