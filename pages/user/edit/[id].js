import { Button, Label, Textarea, TextInput } from "flowbite-react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import UploadImage from "../../../components/UploadImage";
import withAuth from "../../../hoc/withAuth";
import UserService from "../../../services/UserService";
import photoImg from '../../../public/images/photo.png';

const userService = new UserService();

function editUser() {
  const [userId, setUserId] = useState('');
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState(0);
  const [userPassword, setUserPassword] = useState(0);
  const [userLevel, setUserLevel] = useState('');
  const [userAvatar, setUserAvatar] = useState([]);
  const [inputImage, setInputImage] = useState();
  const router = useRouter();

  useEffect(() => {
    return async () => {
      if (!router.query.id) {
        return;
      }

      const userData = await userService.getUserData(router.query.id);
      setUserId(userData.data._id);
      setUserName(userData.data.name);
      setUserCoast(userData.data.coast);
      setUserInventory(userData.data.inventory);
      setUserDescription(userData.data.description);
      setUserPhoto({
        preview: userData.data.photo
      });
    }
  }, []);

  const handleUpdateUser = async () => {
    try {
      if (userName.length < 3) {
        alert('Nome precisa de pelo menos 3 caracteres!');
        return;
      }
      if (userEmail < 0) {
        alert('Você não pode cadastrar um preço negativo!');
        return;
      }
      if (userPassword < 0) {
        alert('Você não pode cadastrar um estoque negativo!');
        return;
      }
      if (userLevel.length < 3) {
        alert('Descrição precisa de pelo menos 3 caracteres!');
        return;
      }

      const bodyRequest = new FormData();
      bodyRequest.append('id', userId);
      bodyRequest.append('name', userName);
      bodyRequest.append('coast', userEmail);
      bodyRequest.append('inventory', userPassword);
      bodyRequest.append('description', userLevel);

      if (userAvatar.file) {
        bodyRequest.append('file', userAvatar.file);
      }

      await userService.putUserData(bodyRequest);
      router.push('/user');
    } catch (error) {
      alert(`Erro ao editar produto: ` + error);
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
          <h2 className="text-2xl font-semibold text-emerald-800 text-center float-left">Cadastrar Produto</h2>
        </div>
      </div>
      <form className="grid grid-cols-3 gap-4 mb-4">
        <div>
          <Label htmlFor="name" value="Nome" />
          <TextInput id="name" type="text" placeholder="Nome..." defaultValue={userName} required={true} shadow={true} onChange={e => setUserName(e.target.value)} />
          <div className="flex gap-2 mt-2">
            <UploadImage setImage={setUserPhoto} imagePreview={userAvatar?.preview || photoImg.src} onReferenceSet={setInputImage} className="cursor-pointer" />
            <span onClick={openFileInput} className="text-emerald-900 cursor-pointer self-end">Selecionar outra foto...</span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="coast" value="Coins" />
            <TextInput id="coast" type="number" placeholder="Coins..." defaultValue={userEmail} required={true} shadow={true} onChange={e => setUserCoast(e.target.value)} />
          </div>
          <div>
            <Label htmlFor="inventory" value="Estoque" />
            <TextInput id="inventory" type="number" placeholder="Estoque..." defaultValue={userPassword} required={true} shadow={true} onChange={e => setUserInventory(e.target.value)} />
          </div>
        </div>
        <div>
          <Label htmlFor="description" value="Descrição" />
          <Textarea id="description" placeholder="Descrição..." defaultValue={userLevel} required={true} rows={3} onChange={e => setUserDescription(e.target.value)} />
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