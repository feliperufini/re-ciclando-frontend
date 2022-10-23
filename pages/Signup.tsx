import { useState, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";

export function Signup() {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [cpf, setCpf] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleSignup(event: FormEvent) {
    event.preventDefault();

    setCpf(cpf.replace(/\./g, "").replace("-", ""));
    console.log(cpf);
    
    navigate('/')
  }

  return (
    <div className="flex items-center min-h-screen p-6 bg-gradient-to-r from-emerald-500 to-emerald-300">
      <div className="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl">
        <div className="flex flex-col overflow-y-auto md:flex-row">
          <div className="h-32 md:h-auto md:w-1/2">
            <img aria-hidden="true" className="object-cover w-full h-full" src="/src/assets/welcome3.jpg" alt="Welcome" />
          </div>
          <div className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
            <div className="w-full">
              <form onSubmit={handleSignup}>
                <h1 className="mb-2 text-xl font-semibold text-gray-700">Cadastre-se</h1>
                <label className="block mt-2 text-md">
                  <span className="text-gray-700">Nome</span>
                  <input type="text" onChange={event => setName(event.target.value)} className="block w-full pl-1 mt-1 border-2 rounded text-md border-gray-300 focus:border-emerald-300 focus:outline-none" placeholder="Felipe Andrade" />
                </label>
                <label className="block mt-2 text-md">
                  <span className="text-gray-700">CPF</span>
                  <input type="text" onChange={event => setCpf(event.target.value)} className="block w-full pl-1 mt-1 border-2 rounded text-md border-gray-300 focus:border-emerald-300 focus:outline-none" placeholder="000.000.000-00" />
                </label>
                <label className="block mt-2 text-md">
                  <span className="text-gray-700">E-mail</span>
                  <input type="text" onChange={event => setEmail(event.target.value)} className="block w-full pl-1 mt-1 border-2 rounded text-md border-gray-300 focus:border-emerald-300 focus:outline-none" placeholder="email@example.com" />
                </label>
                <label className="block mt-2 text-md">
                  <span className="text-gray-700">Senha</span>
                  <input type="password" onChange={event => setPassword(event.target.value)} className="block w-full pl-1 mt-1 border-2 rounded text-md border-gray-300 focus:border-emerald-300 focus:outline-none" placeholder="********" />
                </label>
                <label className="block mt-2 text-md">
                  <span className="text-gray-700">Confirmar Senha</span>
                  <input type="password" className="block w-full pl-1 mt-1 border-2 rounded text-md border-gray-300 focus:border-emerald-300 focus:outline-none" placeholder="********" />
                </label>
                <div className="flex mt-4 text-sm">
                  <label className="flex items-center dark:text-gray-400">
                    <input type="checkbox" className="text-emerald-600 form-checkbox focus:border-emerald-400 focus:outline-none focus:shadow-outline-emerald dark:focus:shadow-outline-gray" />
                    <span className="ml-2">
                      Li e aceito os <a className="underline" href="/privacy-policy" target="_blank">termos de uso</a>
                    </span>
                  </label>
                </div>
                <button type="submit" className="block w-full px-4 py-2 mt-4 text-md font-medium leading-5 text-center text-white transition-colors duration-150 bg-emerald-500 border border-transparent rounded-lg active:bg-emerald-500 hover:bg-emerald-600 focus:outline-none">
                  Cadastrar
                </button>
                <p className="mt-4">
                  <Link className="text-md font-medium text-emerald-700 hover:underline" to="/login">
                    Já possui conta? Login
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
