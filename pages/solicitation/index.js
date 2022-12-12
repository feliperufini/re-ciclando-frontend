import { Avatar, Button, Modal, Table } from "flowbite-react";
import { useEffect, useState } from "react";
import { TbCircleCheck, TbInfoCircle } from "react-icons/tb";
import withAuth from "../../hoc/withAuth";
import BuyService from "../../services/BuyService";
import UserService from "../../services/UserService";
import ProductService from "../../services/ProductService";
import photoImg from '../../public/images/photo.png';
import avatarImg from '../../public/images/avatar.png';

const buyService = new BuyService();
const userService = new UserService();
const productService = new ProductService();

function SolicitaitonList() {
  const [listBuys, setListBuys] = useState([]);
  const [listUsers, setListUsers] = useState([]);
  const [listProducts, setListProducts] = useState([]);
  const [modalConfirmIsOpen, setModalConfirmIsOpen] = useState(false);
  const [itemOpenId, setItemOpenId] = useState('');

  useEffect(() => {
    setListBuys([]);
    const getBuys = async () => {
      const { data } = await buyService.getBuysList();
      setListBuys(data);
    };
    getBuys();

    const getUsers = async () => {
      const { data } = await userService.getUsersList();
      setListUsers(data);
    };
    getUsers();

    const getProducts = async () => {
      const { data } = await productService.getProductsList();
      setListProducts(data);
    };
    getProducts();
  }, []);

  function handleOpenConfirmModal(buyId) {
    setModalConfirmIsOpen(true);
    setItemOpenId(buyId);
  }

  function handleCloseConfirmModal() {
    setModalConfirmIsOpen(false);
    setItemOpenId('');
  }

  const handleConfirmBuy = async () => {
    setModalConfirmIsOpen(false);
    try {
      await buyService.putBuyDeliver(itemOpenId);
      setItemOpenId('');

      const { data } = await buyService.getBuysList();
      setListBuys(data);
      alert('Compra confirmada com sucesso!')
    } catch (error) {
      alert(`Erro ao confirmar compra!`);
    }
  }

  function formatDate(date) {
    var d = new Date(date),
      day = d.getDate().toString(),
      dayF = (day.length == 1) ? '0' + day : day,
      month = (d.getMonth() + 1).toString(),
      monthF = (month.length == 1) ? '0' + month : month,
      yearF = d.getFullYear();
    return dayF + "/" + monthF + "/" + yearF;
  }

  return (
    <div className="p-4 grid">
      <div className="flex">
        <div className="flex-1">
          <h2 className="text-2xl mb-4 font-semibold text-emerald-800 text-center float-left">Lista de Pedidos</h2>
        </div>
      </div>
      <Table>
        <Table.Head className="bg-emerald-200">
          <Table.HeadCell>
            Usuário
          </Table.HeadCell>
          <Table.HeadCell>
            Produto
          </Table.HeadCell>
          <Table.HeadCell>
            Valor
          </Table.HeadCell>
          <Table.HeadCell>
            Data
          </Table.HeadCell>
          <Table.HeadCell>
            Ações
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {listBuys.length > 0 && (
            listBuys.map(buy => (
              <Table.Row className="bg-white" key={buy._id}>
                {listUsers.length > 0 && (
                  listUsers.map(user => (
                    buy.userId == user._id && (
                      <Table.Cell>
                        <div className="flex gap-2 items-end">
                          <Avatar className="justify-start" alt="Avatar" img={user.avatar ? user.avatar : avatarImg.src} size="sm" />
                          {user.name} » {user.email}
                        </div>
                      </Table.Cell>
                    )
                  ))
                )}
                {listProducts.length > 0 && (
                  listProducts.map(product => (
                    buy.productId == product._id && (
                      <Table.Cell>
                        <div className="flex gap-2 items-end">
                          <Avatar className="justify-start" alt="Photo" img={product.photo ? product.photo : photoImg.src} size="sm" />
                          {product.name}
                        </div>
                      </Table.Cell>
                    )
                  )
                  )
                )}
                <Table.Cell>
                  <div className="flex">
                    {buy.coin}
                    <img aria-hidden="true" className="ml-1 object-cover justify-self-center" src="images/coin.png" alt="Coin" width={20} />
                  </div>
                </Table.Cell>
                <Table.Cell>
                  {formatDate(buy.date)}
                </Table.Cell>
                <Table.Cell className="inline-flex gap-2">
                  <a onClick={() => handleOpenConfirmModal(buy._id)} className="text-emerald-600 cursor-pointer" title="Confirmar">
                    <TbCircleCheck className="text-3xl" />
                  </a>
                </Table.Cell>
              </Table.Row>
            ))
          )}
        </Table.Body>
      </Table>
      <Modal show={modalConfirmIsOpen} size="md">
        <Modal.Body>
          <div className="text-center">
            <TbInfoCircle className="mx-auto mb-2 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-4 text-lg font-normal text-gray-500 dark:text-gray-400">
              Deseja realmente confirmar esta commpra?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="gray" onClick={handleConfirmBuy}>
                Sim
              </Button>
              <Button color="failure" onClick={handleCloseConfirmModal}>
                Não
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default withAuth(SolicitaitonList);
