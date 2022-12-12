import { Button, Label, Textarea, TextInput } from "flowbite-react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import UploadImage from "../../../components/UploadImage";
import withAuth from "../../../hoc/withAuth";
import UserService from "../../../services/UserService";
import avatarImg from '../../../public/images/avatar.png';
import { validateEmail } from "../../../utils/validators";

const userService = new UserService();

function editUser() {
  const [userId, setUserId] = useState('');
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [userLevel, setUserLevel] = useState(0);
  const [userAvatar, setUserAvatar] = useState([]);
  const [inputImage, setInputImage] = useState();
  const router = useRouter();

  useEffect(() => {
    return async () => {
      if (!router.query.id) {
        return;
      }

      const userData = await userService.getUpdateProfile(router.query.id);
      setUserId(userData.data._id);
      setUserName(userData.data.name);
      setUserEmail(userData.data.email);
      setUserLevel(userData.data.level);
      setUserAvatar({
        preview: userData.data.avatar
      });
    }
  }, []);

  const handleUpdateUser = async () => {
    try {
      if (userName.length < 3) {
        alert('Nome precisa de pelo menos 3 caracteres!');
        return;
      }
      if (!validateEmail(userEmail)) {
        alert('E-mail informado é inválido!');
        return;
      }
      if (userPassword && userPassword.length < 6) {
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
      bodyRequest.append('level', userLevel);

      if (userPassword.length >= 6) {
        bodyRequest.append('password', userPassword);
      }
      if (userAvatar.file) {
        bodyRequest.append('file', userAvatar.file);
      }

      await userService.putUpdateProfile(bodyRequest, userId);
      router.push('/user');
      alert('Usuário alterado com sucesso!');
    } catch (error) {
      alert('Erro ao editar usuário: ' + error);
    }
  }

  const openFileInput = () => {
    inputImage?.click();
  }

  function handleCancelUpdateUser() {
    router.push('/user')
  }

  return (
    <div className="p-4 grid">
      <div className="flex mb-4">
        <div className="flex-1">
          <h2 className="text-2xl font-semibold text-emerald-800 text-center float-left">Editar Usuário</h2>
        </div>
      </div>
      <form className="grid grid-cols-3 gap-4 mb-4">
        <div>
          <Label htmlFor="name" value="Nome" />
          <TextInput id="name" type="text" placeholder="Nome..." defaultValue={userName} required={true} shadow={true} onChange={e => setUserName(e.target.value)} />
          <div className="flex gap-2 mt-2">
            <UploadImage setImage={setUserAvatar} imagePreview={userAvatar?.preview || avatarImg.src} onReferenceSet={setInputImage} className="cursor-pointer" />
            <span onClick={openFileInput} className="text-emerald-900 cursor-pointer self-end">Selecionar outra foto...</span>
          </div>
        </div>
        <div>
          <Label htmlFor="email" value="E-mail" />
          <TextInput id="email" type="email" placeholder="E-mail..." defaultValue={userEmail} required={true} shadow={true} onChange={e => setUserEmail(e.target.value)} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="password" value="Senha" />
            <TextInput id="password" type="password" shadow={true} onChange={e => setUserPassword(e.target.value)} />
          </div>
          <div>
            <Label htmlFor="level" value="Nível" />
            <TextInput id="level" type="number" value={userLevel} required={true} shadow={true} onChange={e => setUserLevel(e.target.value)} min={2} max={3} />
          </div>
        </div>
      </form>
      <div className="flex gap-4 ml-auto">
        <Button onClick={handleUpdateUser}>Salvar alterações</Button>
        <Button onClick={handleCancelUpdateUser} color="failure">Cencelar</Button>
      </div>
    </div>
  );
}

export default withAuth(editUser);