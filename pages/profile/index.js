import { Accordion, Avatar, Button, Label, TextInput } from "flowbite-react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import UploadImage from "../../components/UploadImage";
import withAuth from "../../hoc/withAuth";
import avatarImg from '../../public/images/avatar.png';
import UserService from "../../services/UserService";
import { validateName, validateEmail, validatePassword } from '../../utils/validators';


const userService = new UserService();

function Profile() {
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [userAvatar, setUserAvatar] = useState([]);
  const [inputImage, setInputImage] = useState();
  const router = useRouter();

  useEffect(() => {
    const getUser = async () => {
      const { data } = await userService.getProfile();
      setUserName(data.name);
      setUserEmail(data.email);
      setUserAvatar({
        preview: data.avatar
      });
    };
    getUser();
  }, []);

  const handleUpdateProfile = async () => {
    try {
      if (!validateName(userName)) {
        alert('Nome precisa de pelo menos 3 caracteres!');
        return;
      }
      if (!validateEmail(userEmail)) {
        alert('Você precisa informar um e-mail válido!');
        return;
      }
      if (!validatePassword(userPassword) && userPassword) {
        alert('Senha precisa de pelo menos 5 caracteres!');
        return;
      }

      const bodyRequest = new FormData();
      bodyRequest.append('name', userName);
      bodyRequest.append('email', userEmail);
      if (userPassword) {
        console.log(userPassword);
        bodyRequest.append('password', userPassword);
      }
      
      if (userAvatar.file) {
        bodyRequest.append('file', userAvatar.file);
      }

      await userService.putUpdateProfile(bodyRequest, localStorage.getItem('id'));
      const { data } = await userService.getProfile();
        
      localStorage.setItem('name', userName);
      localStorage.setItem('email', userEmail);
      localStorage.setItem('avatar', data.avatar);

      alert('Usuário alterado com sucesso!');
      router.push('/profile')
    } catch (error) {
      alert(`Erro ao editar usuário: ` + error);
    }
  }

  const openFileInput = () => {
    inputImage?.click();
  }

  return (
    <div className="grid p-4">
      <div className="grid text-center">
        <Avatar className="justify-start" alt="Avatar" img={userAvatar.preview ? userAvatar.preview : avatarImg.src} rounded={true} size="xl" />
        <span className="font-semibold">{userName}</span>
        <span className="mb-8">{userEmail}</span>
      </div>
      <div className="grid grid-cols-1">
        <div className="flex-none ml-10">
          <Accordion alwaysOpen={true} className="w-3/5 mx-auto bg-emerald-200">
            <Accordion.Panel className="bg-emerald-100">
              <Accordion.Title className="bg-emerald-100">
                <Label value="Total já arrecadado..." />
              </Accordion.Title>
              <Accordion.Content>
                <p className="mb-2 text-gray-900">
                  Flowbite is an open-source library of interactive components built on top of Tailwind CSS including buttons, dropdowns, modals, navbars, and more.
                </p>
              </Accordion.Content>
            </Accordion.Panel>
            <Accordion.Panel className="bg-emerald-100">
              <Accordion.Title className="bg-emerald-100">
                <Label value="Itens comprados..." />
              </Accordion.Title>
              <Accordion.Content>
                <p className="mb-2 text-gray-900">
                  Flowbite is first conceptualized and designed using the Figma software so everything you see in the library has a design equivalent in our Figma file.
                </p>
              </Accordion.Content>
            </Accordion.Panel>
            <Accordion.Panel className="bg-emerald-100">
              <Accordion.Title className="bg-emerald-100">
                <Label value="Editar perfil..." />
              </Accordion.Title>
              <Accordion.Content>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name" value="Nome" />
                    <TextInput id="name" type="text" required={true} defaultValue={userName} onChange={e => setUserName(e.target.value)} />
                  </div>
                  <div>
                    <Label htmlFor="email" value="Email" />
                    <TextInput id="email" type="email" required={true} defaultValue={userEmail} onChange={e => setUserEmail(e.target.value)} />
                  </div>
                  <div className="flex gap-2 ml-2">
                    <UploadImage setImage={setUserAvatar} imagePreview={userAvatar.preview || avatarImg.src} onReferenceSet={setInputImage} size={'lg'} className="cursor-pointer" />
                    <span onClick={openFileInput} className="text-emerald-900 cursor-pointer self-end">Selecionar outro avatar...</span>
                  </div>
                  <div>
                    <Label htmlFor="password" value="Senha" />
                    <TextInput id="password" type="password" required={true} onChange={e => setUserPassword(e.target.value)} />
                  </div>
                </div>
                <div className="float-right mb-4">
                  <Button onClick={handleUpdateProfile}>Salvar</Button>
                </div>
              </Accordion.Content>
            </Accordion.Panel>
            <Accordion.Panel className="bg-emerald-100">
              <Accordion.Title className="bg-emerald-100">
                <Label value="Outros..." />
              </Accordion.Title>
              <Accordion.Content>
                <p className="mb-2 text-gray-900">
                  The main difference is that the core components from Flowbite are open source under the MIT license, whereas Tailwind UI is a paid product. Another difference is that Flowbite relies on smaller and standalone components, whereas Tailwind UI offers sections of pages.
                </p>
              </Accordion.Content>
            </Accordion.Panel>
          </Accordion>
        </div>
      </div>
    </div>
  );
}

export default withAuth(Profile);