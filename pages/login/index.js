import { useState } from "react";
import { validateEmail, validatePassword } from "../../utils/validators";
import Link from "next/link";
import UserService from "../../services/UserService";

const userService = new UserService();

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const validationForm = () => {
    return (
      validateEmail(email)
      && validatePassword(password)
    );
  }

  const onSubmitLogin = async (e) => {
    e.preventDefault();
    if (!validationForm()) {
      return;
    }

    try {
      await userService.login({
        email: email,
        password: password
      });
    } catch (e) {
      alert(
        "Erro ao realizar o login: " + e?.response?.data?.error
      );
    }
  }

  return (
    <div className="flex items-center min-h-screen p-6 bg-gradient-to-r from-emerald-500 to-emerald-300">
      <div className="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl">
        <div className="flex flex-col overflow-y-auto md:flex-row">
          <div className="h-32 md:h-auto md:w-1/2">
            <img aria-hidden="true" className="object-cover w-full h-full" src="images/welcome1.jpg" alt="Welcome" />
          </div>
          <div className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
            <div className="w-full">
              <form onSubmit={onSubmitLogin}>
                <h1 className="mb-4 text-xl font-semibold text-gray-700">Login</h1>
                <label className="block mb-4 text-md">
                  <span className="text-gray-700">E-mail</span>
                  <input type="text" className={`block w-full pl-1 mt-1 border-2 rounded text-md ${email && !validateEmail(email) ? 'border-red-400' : 'border-gray-300 focus:border-emerald-300'}  focus:outline-none`} onChange={event => setEmail(event.target.value)} placeholder="email@example.com" />
                </label>
                <label className="block mb-4 text-md">
                  <span className="text-gray-700">Senha</span>
                  <input type="password" className={`block w-full pl-1 mt-1 border-2 rounded text-md ${password && !validatePassword(password) ? 'border-red-400' : 'border-gray-300 focus:border-emerald-300'} focus:outline-none`} onChange={event => setPassword(event.target.value)} placeholder="********" />
                </label>
                <button type="submit" className="block w-full px-4 py-2 mb-4 text-md font-medium leading-5 text-center text-white transition-colors duration-150 bg-emerald-500 border border-transparent rounded-lg active:bg-emerald-500 hover:bg-emerald-600 focus:outline-none">
                  Login
                </button>
                <p className="mb-1">
                  <a className="text-md font-medium text-emerald-700 hover:underline" href="./forgot-password.html">
                    Esqueceu sua senha?
                  </a>
                </p>
                <p>
                  <Link href="/signup">
                    <a className="text-md font-medium text-emerald-700 hover:underline">Cadastrar-se</a>
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
