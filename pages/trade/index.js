import { Card, Label, Select, TextInput } from "flowbite-react";
import React, { useEffect, useState } from "react";
import withAuth from "../../hoc/withAuth";
import TradeService from "../../services/TradeService";
import FeedstockService from "../../services/FeedstockService";
import UserService from "../../services/UserService";

const tradeService = new TradeService();
const feedstockService = new FeedstockService();
const userService = new UserService();

function Home() {
  const [feedstockList, setFeedstockList] = useState([]);
  const [feedstockItem, setFeedstockItem] = useState([]);
  const [feedstockAmount, setFeedstockAmount] = useState([]);
  const [emailUser, setEmailUser] = useState([]);

  useEffect(() => {
    const getFeedstocks = async () => {
      const { data } = await feedstockService.getFeedstocksList();
      setFeedstockList(data);
    };
    getFeedstocks();
  }, []);

  const onSubmitTrade = async (e) => {
    e.preventDefault();
    try {
      const { data } = await userService.getUserByEmail(emailUser);

      await tradeService.putTradeCreate({
        feedstockId: feedstockItem,
        userId: data._id,
        amount: feedstockAmount
      });

      // creditar as moedas na conta do usuário do email informado
      // ---------------------------------------------------------

      alert('Moedas creditadas com sucesso!');
    } catch (e) {
      alert(
        "Erro ao realizar troca: " + e?.response?.data?.error
      );
    }
  }

  return (
    <div className="flex flex-col p-4 items-center">
      <form onSubmit={onSubmitTrade} className="w-96">
        <div>
          <Label value="E-mail:" />
          <TextInput type="email" shadow={true} placeholder="email@example.com" required={true} onChange={element => setEmailUser(element.target.value)} />
        </div>
        <div className="mt-4">
          <div className="absolue">
            <Label value="Matéria Prima:" />
            <Select required={true} onChange={element => setFeedstockItem(element.target.value)}>
              {feedstockList.length > 0 && (
                feedstockList.map(feedstock => (
                  <option key={feedstock._id} value={feedstock._id}>{feedstock.name}</option>
                ))
              )}
            </Select>
            <Label value="Peso:" />
            <TextInput type="number" shadow={true} placeholder="gramas" required={true} onChange={element => setFeedstockAmount(element.target.value)} />
          </div>
        </div>
        <button type="submit" className="block w-24 py-2 mt-4 text-md font-medium text-center rounded-lg text-white transition-colors duration-150 bg-emerald-500 border border-transparent active:bg-emerald-500 hover:bg-emerald-600 focus:outline-none">
          Confirmar
        </button>
      </form>

    </div>
  );
}

export default withAuth(Home);