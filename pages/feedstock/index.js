import { Avatar, Button, Modal, Table } from "flowbite-react";
import { useEffect, useState } from "react";
import { TbEdit, TbInfoCircle, TbTrash } from "react-icons/tb";
import withAuth from "../../hoc/withAuth";
import FeedstockService from "../../services/FeedstockService";
import { useRouter } from "next/router";

const feedstockService = new FeedstockService();

function FeedstockList() {
  const [listFeedstocks, setListFeedstocks] = useState([]);
  const [modalDeleteIsOpen, setModalDeleteIsOpen] = useState(false);
  const [itemOpenId, setItemOpenId] = useState('');
  const router = useRouter();

  useEffect(() => {
    setListFeedstocks([]);
    const getFeedstocks = async () => {
      const { data } = await feedstockService.getFeedstocksList();
      setListFeedstocks(data);
    };
    getFeedstocks();
  }, []);

  function handleOpenDeleteModal(feedstockId) {
    setModalDeleteIsOpen(true);
    setItemOpenId(feedstockId);
  }

  function handleCloseDeleteModal() {
    setModalDeleteIsOpen(false);
    setItemOpenId('');
  }

  const confirmDeleteFeedstock = async () => {
    setModalDeleteIsOpen(false);
    try {
      await feedstockService.delFeedstockDelete(itemOpenId);
      setItemOpenId('');

      const { data } = await feedstockService.getSystemFeedstocks();
      setListFeedstocks(data);
      alert('Matéria Prima deletada com sucesso!')
    } catch (error) {
      alert(`Erro ao deletar matéria prima!`);
    }
  }

  function handleCreateNewFeedstock() {
    router.push('/feedstock/create')
  }
  function handleEditFeedstock(feedstockId) {
    router.push('/feedstock/edit/' + feedstockId);
  }

  return (
    <div className="p-4 grid">
      <div className="flex">
        <div className="flex-1">
          <h2 className="text-2xl mb-4 font-semibold text-emerald-800 text-center float-left">Lista de Matérias Prima</h2>
        </div>
        <div className="flex-1">
          <Button onClick={handleCreateNewFeedstock} className="ml-auto" color="success">Cadastrar</Button>
        </div>
      </div>
      <Table>
        <Table.Head className="bg-emerald-200">
          <Table.HeadCell>
            Nome
          </Table.HeadCell>
          <Table.HeadCell>
            Coins p/ Kg
          </Table.HeadCell>
          <Table.HeadCell>
            Em stoque
          </Table.HeadCell>
          <Table.HeadCell>
            Ações
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {listFeedstocks.length > 0 && (
            listFeedstocks.map(feedstock => (
              <Table.Row className="bg-white" key={feedstock._id}>
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900">
                  {feedstock.name}
                </Table.Cell>
                <Table.Cell>
                  {feedstock.coin}
                </Table.Cell>
                <Table.Cell>
                  {feedstock.inventory / 1000}Kg
                </Table.Cell>
                <Table.Cell className="inline-flex gap-2">
                  <a onClick={() => handleEditFeedstock(feedstock._id)} className="font-medium text-blue-600 cursor-pointer">
                    <TbEdit className="text-lg" />
                  </a>
                  <a onClick={() => handleOpenDeleteModal(feedstock._id)} className="font-medium text-red-600 cursor-pointer">
                    <TbTrash className="text-lg" />
                  </a>
                </Table.Cell>
              </Table.Row>
            ))
          )}
        </Table.Body>
      </Table>
      <Modal show={modalDeleteIsOpen} size="md">
        <Modal.Body>
          <div className="text-center">
            <TbInfoCircle className="mx-auto mb-2 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-4 text-lg font-normal text-gray-500 dark:text-gray-400">
              Deseja realmente excluir este item?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="gray" onClick={confirmDeleteFeedstock}>
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

export default withAuth(FeedstockList);
