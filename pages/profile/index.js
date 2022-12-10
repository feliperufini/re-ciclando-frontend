import { Accordion, Avatar, Button, Label, TextInput } from "flowbite-react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import UploadImage from "../../components/UploadImage";
import withAuth from "../../hoc/withAuth";
import avatarImg from '../../public/images/avatar.png';
import FeedstockService from "../../services/FeedstockService";
import TradeService from "../../services/TradeService";
import UserService from "../../services/UserService";
import { validateName, validateEmail, validatePassword } from '../../utils/validators';

const userService = new UserService();
const tradeService = new TradeService();
const feedstockService = new FeedstockService();

function Profile() {
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [userAvatar, setUserAvatar] = useState([]);
  const [inputImage, setInputImage] = useState();
  const [totalTrades] = useState([]);
  const [lastTrades] = useState([]);
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

    const getTrades = async () => {
      const { data } = await tradeService.getTradesByUser(localStorage.getItem('id'));
      for (let i = 0; i < data.length && i < 3; i++) {
        let feedstock = await feedstockService.getFeedstockById(data[i].feedstockId);
        lastTrades.push(
          <div key={data[i]._id}>
            <p className="font-semibold text-emerald-800">Troca {i + 1} - {formatDate(data[i].date)}</p>
            <div className="text-start text-emerald-900">
              <p>Item: {feedstock.data.name}</p>
              <p>Peso: {data[i].amount}g</p>
            </div>
          </div>
        )
      }
    };
    getTrades();

    const getTotalTrades = async () => {
      const { data } = await tradeService.getTradesByUser(localStorage.getItem('id'), true);
      for (let i = 0; i < data.length; i++) {
        totalTrades.push(
          <div key={data[i]._id} className="text-start mb-4 text-emerald-900">
            <p className="font-semibold text-emerald-800">{data[i].feedstock.name}</p>
            <p>Peso: {data[i].total}g</p>
            <div className="flex">
              <p>Coins: {Math.round(data[i].total / data[i].feedstock.coin)}</p>
              <img aria-hidden="true" className="h-4 w-4 ml-0.5 mt-1" src="images/coin.png" alt="Coin" width={16} />
            </div>
          </div>
        )
      }
    };
    getTotalTrades();
  }, []);

  function formatDate(date) {
    var d = new Date(date),
      day = d.getDate().toString(),
      dayF = (day.length == 1) ? '0' + day : day,
      month = (d.getMonth() + 1).toString(),
      monthF = (month.length == 1) ? '0' + month : month,
      yearF = d.getFullYear();
    return dayF + "/" + monthF + "/" + yearF;
  }

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
            <Accordion.Panel hidden />
            <Accordion.Panel className="bg-emerald-100">
              <Accordion.Title className="bg-emerald-100">
                <Label value="Total já arrecadado..." className="cursor-pointer" />
              </Accordion.Title>
              <Accordion.Content>
                <div className="grid grid-cols-2 gap-4">
                  <div className="w-full text-center">
                    <span className="font-semibold text-xl text-emerald-700">Total:</span>
                    {totalTrades.map(
                      (trade) => trade
                    )}
                  </div>
                  <div className="w-full text-center">
                    <span className="font-semibold text-xl text-emerald-700">Últimas Trocas:</span>
                    {lastTrades.map(
                      (trade) => trade
                    )}
                  </div>
                </div>
              </Accordion.Content>
            </Accordion.Panel>
            <Accordion.Panel className="bg-emerald-100">
              <Accordion.Title className="bg-emerald-100">
                <Label value="Itens comprados..." className="cursor-pointer" />
              </Accordion.Title>
              <Accordion.Content>
                <p className="mb-2 text-gray-900">
                  Flowbite is first conceptualized and designed using the Figma software so everything you see in the library has a design equivalent in our Figma file.
                </p>
              </Accordion.Content>
            </Accordion.Panel>
            <Accordion.Panel className="bg-emerald-100">
              <Accordion.Title className="bg-emerald-100">
                <Label value="Editar perfil..." className="cursor-pointer" />
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
                <Label value="Outros..." className="cursor-pointer" />
              </Accordion.Title>
              <Accordion.Content>
                <p className="mb-2 text-emerald-700">
                  -- Este usuário ainda não possui conquistas adicionadas! --
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