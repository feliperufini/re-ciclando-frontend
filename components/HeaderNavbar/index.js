import { Avatar, Dropdown } from "flowbite-react";
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { TbBellRinging, TbLogout, TbSettings, TbUser } from "react-icons/tb";
import ProductService from '../../services/ProductService';
import UserService from '../../services/UserService';
import ResultSearch from '../ResultSearch';

const productService = new ProductService();
const userService = new UserService();

export default function HeaderNavbar() {
  const [resultSearch, setResultSearch] = useState([]);
  const [textSearch, setTextSearch] = useState('');
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userAvatar, setUserAvatar] = useState('');
  const router = useRouter();

  useEffect(() => {
    setUserName(localStorage.getItem('name'));
    setUserEmail(localStorage.getItem('email'));
    setUserAvatar(localStorage.getItem('avatar'));
  }, [])

  const onSearch = async (e) => {
    setTextSearch(e.target.value);
    setResultSearch([]);

    if (e.target.value.length < 3) {
      return;
    }

    try {
      const { data } = await productService.search(textSearch);
      setResultSearch(data);
    } catch (e) {
      alert('Erro ao pesquisar produto: ' + e?.response?.data?.error);
    }
  }

  const onClickResultSearch = (id) => {
    setResultSearch([]);
    setTextSearch('');
    router.push(`/product/${id}`);
  }

  const logout = () => {
    userService.logout();
    router.push('/login');
  }

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
            <input className="w-full pl-8 pr-2 pt-1 pb-1 text-sm form-input text-gray-700 placeholder-gray-500 bg-gray-100 border-0 rounded-md focus:placeholder-gray-300 focus:outline-none focus:ring-red-600;" type="text" placeholder="Procurar produtos..." aria-label="Search" value={textSearch} onChange={onSearch} />
          </div>
          {resultSearch.length > 0 && (
            <div className="absolute inline-block bg-gray-100 w-1/4 m-auto mt-7 right-0 left-4 shadow-md rounded-b-md">
              {resultSearch.map(product => (
                <ResultSearch
                  photo={product.photo}
                  name={product.name}
                  description={product.description}
                  coast={product.coast}
                  key={product._id}
                  id={product._id}
                  onClick={onClickResultSearch}
                />
              ))}
            </div>
          )}
        </div>
        <ul className="flex items-center flex-shrink-0 space-x-6">
          <li className="relative">
            <Dropdown
              label={<TbBellRinging className="text-xl mr-2" />}
              inline={true}
              arrowIcon={false}
              placement="left-start"
            >
              <Dropdown.Header className="w-64">
                <span className="block text-sm font-medium text-emerald-700">
                  Bem-Vindo ao Re-Ciclando!
                </span>
                <span className="text-sm text-emerald-900">
                  Sinta-se a vontade para usar e abusar da enconomia!
                </span>
              </Dropdown.Header>
            </Dropdown>
          </li>
          <li className="relative">
            <Dropdown
              label={<Avatar className="justify-start" alt="Photo" img={userAvatar} rounded={true} size="md" />}
              arrowIcon={false}
              inline={true}
            >
              <Dropdown.Header className="w-64">
                <span className="block text-sm">
                  {userName}
                </span>
                <span className="block truncate text-sm font-medium">
                  {userEmail}
                </span>
              </Dropdown.Header>
              <a href="/profile">
                <Dropdown.Item>
                  <TbUser className="text-lg mr-2" />
                  <span>Perfil</span>
                </Dropdown.Item>
              </a>
              <Dropdown.Item>
                <TbSettings className="text-lg mr-2" />
                <span>Configura????es</span>
              </Dropdown.Item>
              <Dropdown.Item onClick={logout}>
                <TbLogout className="text-lg mr-2" />
                <span>Sair</span>
              </Dropdown.Item>
            </Dropdown>
          </li >
        </ul >
      </div >
    </header>
  );
}