import { Avatar, Button, Card, Modal, Table } from "flowbite-react";
import { useEffect, useState } from "react";
import { TbEdit, TbInfoCircle, TbTrash } from "react-icons/tb";
import withAuth from "../../hoc/withAuth";
import TradepointService from "../../services/TradepointService";
import { useRouter } from "next/router";

const tradepointService = new TradepointService();

function TradepointList() {
  const [listTradepoints, setListTradepoints] = useState([]);
  const [modalDeleteIsOpen, setModalDeleteIsOpen] = useState(false);
  const [itemOpenId, setItemOpenId] = useState('');
  const router = useRouter();

  useEffect(() => {
    setListTradepoints([]);
    const getTradepoints = async () => {
      const { data } = await tradepointService.getTradepointsList();
      setListTradepoints(data);
    };
    getTradepoints();
  }, []);

  function handleOpenDeleteModal(tradepointId) {
    setModalDeleteIsOpen(true);
    setItemOpenId(tradepointId);
  }

  function handleCloseDeleteModal() {
    setModalDeleteIsOpen(false);
    setItemOpenId('');
  }

  const confirmDeleteTradepoint = async () => {
    setModalDeleteIsOpen(false);
    try {
      await tradepointService.delTradepointDelete(itemOpenId);
      setItemOpenId('');

      const { data } = await tradepointService.getSystemTradepoints();
      setListTradepoints(data);
      alert('Ponto de troca deletado com sucesso!')
    } catch (error) {
      alert(`Erro ao deletar ponto de troca!`);
    }
  }

  function handleCreateNewTradepoint() {
    router.push('/tradepoint/create')
  }
  function handleEditTradepoint(tradepointId) {
    router.push('/tradepoint/edit/' + tradepointId);
  }

  return (
    <div className="p-4 grid">
      <div className="flex">
        <div className="flex-1">
          <h2 className="text-2xl mb-4 font-semibold text-emerald-800 text-center float-left">Lista de Pontos de Troca</h2>
        </div>
        <div className="flex-1">
          <Button onClick={handleCreateNewTradepoint} className="ml-auto" color="success">Cadastrar</Button>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {listTradepoints.length > 0 && (
          listTradepoints.map(tradepoint => (
            <Card key={tradepoint._id} className="items-center">
              <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                {tradepoint.title}
              </h5>
              <p>
                {tradepoint.address}
              </p>
              <div className="flex m-auto gap-2">
                <a onClick={() => handleEditFeedstock(feedstock._id)} className="font-medium text-blue-600 cursor-pointer">
                  <TbEdit className="text-lg" />
                </a>
                <a onClick={() => handleOpenDeleteModal(feedstock._id)} className="font-medium text-red-600 cursor-pointer">
                  <TbTrash className="text-lg" />
                </a>
              </div>
            </Card>
          ))
        )}
      </div>
      <Modal show={modalDeleteIsOpen} size="md">
        <Modal.Body>
          <div className="text-center">
            <TbInfoCircle className="mx-auto mb-2 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-4 text-lg font-normal text-gray-500 dark:text-gray-400">
              Deseja realmente excluir este item?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="gray" onClick={confirmDeleteTradepoint}>
                Sim
              </Button>
              <Button color="failure" onClick={handleCloseDeleteModal}>
                Não
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default withAuth(TradepointList);
