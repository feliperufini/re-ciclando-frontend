import { Link } from "react-router-dom";

export function Login() {
  return (
    <div className="flex items-center min-h-screen p-6 bg-gradient-to-r from-emerald-500 to-emerald-300">
      <div className="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl">
        <div className="flex flex-col overflow-y-auto md:flex-row">
          <div className="h-32 md:h-auto md:w-1/2">
            <img aria-hidden="true" className="object-cover w-full h-full" src="/src/assets/welcome1.jpg" alt="Welcome" />
          </div>
          <div className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
            <div className="w-full">
              <h1 className="mb-4 text-xl font-semibold text-gray-700">Login</h1>
              <label className="block text-md">
                <span className="text-gray-700">E-mail</span>
                <input type="text" className="block w-full pl-1 mt-1 border-2 rounded text-md border-gray-300 focus:border-emerald-300 focus:outline-none" placeholder="email@example.com" />
              </label>
              <label className="block mt-4 text-md">
                <span className="text-gray-700">Senha</span>
                <input type="password" className="block w-full pl-1 mt-1 border-2 rounded text-md border-gray-300 focus:border-emerald-300 focus:outline-none" placeholder="********" />
              </label>
              <a className="block w-full px-4 py-2 mt-4 text-md font-medium leading-5 text-center text-white transition-colors duration-150 bg-emerald-500 border border-transparent rounded-lg active:bg-emerald-500 hover:bg-emerald-600 focus:outline-none" href="#">
                Login
              </a>
              <p className="mt-4">
                <a className="text-md font-medium text-emerald-700 hover:underline" href="./forgot-password.html">
                  Esqueceu sua senha?
                </a>
              </p>
              <p className="mt-1">
                <Link className="text-md font-medium text-emerald-700 hover:underline" to="/signup">
                  Cadastrar-se
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
