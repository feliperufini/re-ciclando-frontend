import { Button, Label, Textarea, TextInput } from "flowbite-react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import withAuth from "../../../hoc/withAuth";
import FeedstockService from "../../../services/FeedstockService";

const feedstockService = new FeedstockService();

function editFeedstock() {
  const [feedstockName, setFeedstockName] = useState('');
  const [feedstockCoin, setFeedstockCoin] = useState('');
  const [feedstockInventory, setFeedstockInventory] = useState('');
  const router = useRouter();

  useEffect(() => {
    return async () => {
      if (!router.query.id) {
        return;
      }

      const feedstockData = await feedstockService.getFeedstockUpdate(router.query.id);
      setFeedstockName(feedstockData.data.name);
      setFeedstockCoin(feedstockData.data.coin);
      setFeedstockInventory(feedstockData.data.inventory);
    }
  }, []);

  const handleUpdateFeedstock = async () => {
    try {
      if (feedstockName.length < 3) {
        alert('Nome precisa de pelo menos 3 caracteres!');
        return;
      }
      if (feedstockCoin < 1) {
        alert('O valor precisa ser maior que zero!');
        return;
      }
      if (feedstockInventory < 0) {
        alert('O estoque não pode ser negativo!');
        return;
      }

      await feedstockService.putFeedstockUpdate({
        "name": feedstockName,
        "coin": feedstockCoin,
        "inventory": feedstockInventory
      }, router.query.id);

      router.push('/feedstock');
      alert('Matéria Prima alterada com sucesso!');
    } catch (error) {
      alert('Erro ao editar matéria prima: ' + error);
    }
  }

  function handleCancelUpdateFeedstock() {
    router.push('/feedstock')
  }

  return (
    <div className="p-4 grid">
      <div className="flex mb-4">
        <div className="flex-1">
          <h2 className="text-2xl font-semibold text-emerald-800 text-center float-left">Editar Matéria Prima</h2>
        </div>
      </div>
      <form className="grid grid-cols-3 gap-4 mb-4">
        <div>
          <Label htmlFor="name" value="Nome" />
          <TextInput id="name" type="text" placeholder="Nome..." defaultValue={feedstockName} required={true} shadow={true} onChange={e => setFeedstockName(e.target.value)} />
        </div>
        <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="coin" value="Coin por Kg" />
          <TextInput id="coin" type="number" value={feedstockCoin} required={true} shadow={true} onChange={e => setFeedstockCoin(e.target.value)} min={1} />
        </div>
          <div>
            <Label htmlFor="inventory" value="Em Estoque (g)" />
            <TextInput id="inventory" type="number" value={feedstockInventory} required={true} shadow={true} onChange={e => setFeedstockInventory(e.target.value)} min={0} />
          </div>
        </div>
      </form>
      <div className="flex gap-4 ml-auto">
        <Button onClick={handleUpdateFeedstock}>Salvar alterações</Button>
        <Button onClick={handleCancelUpdateFeedstock} color="failure">Cencelar</Button>
      </div>
    </div>
  );
}

export default withAuth(editFeedstock);