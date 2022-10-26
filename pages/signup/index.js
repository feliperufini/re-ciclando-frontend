import { useState } from "react";
import { useRouter } from "next/router";
import { validateName, validateEmail, validatePassword, validateConfirmPassword } from "../../utils/validators";
import Link from "next/link";
import UserService from "../../services/UserService";

const userService = new UserService();

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [privacyPolicy, setPrivacyPolicy] = useState(false);
  const router = useRouter();

  const validationForm = () => {
    return (
      validateName(name)
      && validateEmail(email)
      && validatePassword(password)
      && validateConfirmPassword(password, confirmPassword)
      && privacyPolicy
    );
  }

  const onSubmitSignup = async (e) => {
    e.preventDefault();
    if (!validationForm()) {
      alert('Você deve preencher todo o formulário e aceitar os termos para prosseguir!');
      return;
    }

    try {
      const bodySignup = new FormData();
      bodySignup.append("name", name);
      bodySignup.append("email", email);
      bodySignup.append("password", password);

      await userService.signup(bodySignup);

      await userService.login({
        email: email,
        password: password
      });
      
      router.push('/');
    } catch (e) {
      alert(
        "Erro ao realizar o cadastro: " + e?.response?.data?.error
      );
    }
  }

  return (
    <div className="flex items-center min-h-screen p-6 bg-gradient-to-r from-emerald-500 to-emerald-300">
      <div className="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl">
        <div className="flex flex-col overflow-y-auto md:flex-row">
          <div className="h-32 md:h-auto md:w-1/2">
            <img aria-hidden="true" className="object-cover w-full h-full" src="/images/welcome3.jpg" alt="Welcome" />
          </div>
          <div className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
            <div className="w-full">
              <form onSubmit={onSubmitSignup}>
                <h1 className="mb-2 text-xl font-semibold text-gray-700">Cadastre-se</h1>
                <label className="block mt-2 text-md">
                  <span className="text-gray-700">Nome</span>
                  <input type="text" className={`block w-full pl-1 mt-1 border-2 rounded text-md ${name && !validateName(name) ? 'border-red-400' : 'border-gray-300 focus:border-emerald-300'}  focus:outline-none`} onChange={event => setName(event.target.value)} placeholder="Nome Sobrenome" />
                </label>
                <label className="block mt-2 text-md">
                  <span className="text-gray-700">E-mail</span>
                  <input type="text" className={`block w-full pl-1 mt-1 border-2 rounded text-md ${email && !validateEmail(email) ? 'border-red-400' : 'border-gray-300 focus:border-emerald-300'}  focus:outline-none`} onChange={event => setEmail(event.target.value)} placeholder="email@example.com" />
                </label>
                <label className="block mt-2 text-md">
                  <span className="text-gray-700">Senha</span>
                  <input type="password" className={`block w-full pl-1 mt-1 border-2 rounded text-md ${password && !validatePassword(password) ? 'border-red-400' : 'border-gray-300 focus:border-emerald-300'}  focus:outline-none`} onChange={event => setPassword(event.target.value)} placeholder="********" />
                </label>
                <label className="block mt-2 text-md">
                  <span className="text-gray-700">Confirmar Senha</span>
                  <input type="password" className={`block w-full pl-1 mt-1 border-2 rounded text-md ${confirmPassword && password != confirmPassword && !validatePassword(confirmPassword) ? 'border-red-400' : 'border-gray-300 focus:border-emerald-300'}  focus:outline-none`} onChange={event => setConfirmPassword(event.target.value)} placeholder="********" />
                </label>
                <div className="flex mt-4 text-sm">
                  <label className="flex items-center dark:text-gray-400">
                    <input type="checkbox" className="text-emerald-600 form-checkbox focus:border-emerald-400 focus:outline-none focus:shadow-outline-emerald dark:focus:shadow-outline-gray" onChange={event => setPrivacyPolicy(event.target.checked)} />
                    <span className="ml-2">
                      Li e aceito os <a className="underline" href="/privacy-policy" target="_blank">termos de uso</a>
                    </span>
                  </label>
                </div>
                <button type="submit" className="block w-full px-4 py-2 mt-4 text-md font-medium leading-5 text-center text-white transition-colors duration-150 bg-emerald-500 border border-transparent rounded-lg active:bg-emerald-500 hover:bg-emerald-600 focus:outline-none">
                  Cadastrar
                </button>
                <p className="mt-4">
                  Já possui conta?
                  <Link href="/">
                    <a className="text-md font-medium text-emerald-700 ml-1 hover:underline">Login</a>
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
