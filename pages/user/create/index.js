import { Button, Label, Textarea, TextInput } from "flowbite-react";
import { useState } from "react";
import withAuth from "../../../hoc/withAuth";
import UserService from "../../../services/UserService";
import photoImg from '../../../public/images/photo.png';
import { useRouter } from "next/router";
import UploadImage from "../../../components/UploadImage";
import { validateEmail } from "../../../utils/validators";

const userService = new UserService();

function Catalog() {
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [userLevel, setUserLevel] = useState(0);
  const [userAvatar, setUserAvatar] = useState([]);
  const [inputImage, setInputImage] = useState();
  const router = useRouter();

  const handleCreateNewUser = async () => {
    try {
      if (userName.length < 3) {
        alert('Nome precisa de pelo menos 3 caracteres!');
        return;
      }
      if (!validateEmail(userEmail)) {
        alert('E-mail informado é inválido!');
        return;
      }
      if (userPassword.length < 6) {
        alert('A senha deve possuir no mínimo 6 caracteres!');
        return;
      }
      if (userLevel > 3 || userLevel < 2) {
        alert('O nível informado para o usuário é inválido!');
        return;
      }

      const bodyRequest = new FormData();
      bodyRequest.append('name', userName);
      bodyRequest.append('email', userEmail);
      bodyRequest.append('password', userPassword);
      bodyRequest.append('level', userLevel);

      if (userAvatar.file) {
        bodyRequest.append('file', userAvatar.file);
      }

      await userService.postUserCreate(bodyRequest);
      router.push('/user');
      alert('Usuário cadastrado com sucesso!');
    } catch (error) {
      alert(`Erro ao cadastrar usuário: ` + error);
    }
  }

  const openFileInput = () => {
    inputImage?.click();
  }

  function handleCancelCreateUser() {
    router.push('/user')
  }

  return (
    <div className="p-4 grid">
      <div className="flex mb-4">
        <div className="flex-1">
          <h2 className="text-2xl font-semibold text-emerald-800 text-center float-left">Cadastrar Usuário</h2>
        </div>
      </div>
      <form className="grid grid-cols-3 gap-4 mb-4">
        <div>
          <Label htmlFor="name" value="Nome" />
          <TextInput id="name" type="text" placeholder="Nome..." required={true} onChange={e => setUserName(e.target.value)} />
          <div className="flex gap-2 mt-2">
            <UploadImage setImage={setUserAvatar} imagePreview={userAvatar?.preview || photoImg.src} onReferenceSet={setInputImage} className="cursor-pointer" />
            <span onClick={openFileInput} className="text-emerald-900 cursor-pointer self-end">Selecionar outra foto...</span>
          </div>
        </div>
        <div>
          <Label htmlFor="email" value="E-mail" />
          <TextInput id="email" type="email" placeholder="E-mail..." required={true} onChange={e => setUserEmail(e.target.value)} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="password" value="Senha" />
            <TextInput id="password" type="password" required={true} onChange={e => setUserPassword(e.target.value)} />
          </div>
          <div>
            <Label htmlFor="level" value="Nível" />
            <TextInput id="level" type="number" required={true} onChange={e => setUserLevel(e.target.value)} min={2} max={3} />
          </div>
        </div>
      </form>
      <div className="flex gap-2 ml-auto">
        <Button onClick={handleCreateNewUser}>Cadastrar</Button>
        <Button onClick={handleCancelCreateUser} color="failure">Cancelar</Button>
      </div>
    </div>
  );
}

export default withAuth(Catalog);
