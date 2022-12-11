import { Button, Card, Modal, Toast } from "flowbite-react";
import { useEffect, useState } from "react";
import { TbInfoCircle } from "react-icons/tb";
import withAuth from "../../hoc/withAuth";
import BuyService from "../../services/BuyService";
import ProductService from "../../services/ProductService";
import UserService from "../../services/UserService";
import photoImg from '../../public/images/photo.png';

const productService = new ProductService();
const userService = new UserService();
const buyService = new BuyService();

function Catalog() {
  const [listProducts, setListProducts] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [itemOpenId, setItemOpenId] = useState('');
  const [userCoin, setUserCoin] = useState([]);

  useEffect(() => {
    setListProducts([]);
    const getProducts = async () => {
      const { data } = await productService.getProductsListAvailable();
      setListProducts(data);
    };
    getProducts();
  }, []);

  useEffect(() => {
    const thisUserCoin = async () => {
      const user = await userService.getProfile(localStorage.getItem('id'));
      setUserCoin(user.data.coin);
    };
    thisUserCoin();
  }, []);

  function handleOpenModal(productId) {
    setModalIsOpen(true);
    setItemOpenId(productId);
  }

  function handleCloseModal() {
    setModalIsOpen(false);
    setItemOpenId('');
  }

  const confirmBuy = async () => {
    setModalIsOpen(false);
    try {
      await buyService.postProductBuy({
        userId: localStorage.getItem('id'),
        productId: itemOpenId
      });
      const user = await userService.getProfile(localStorage.getItem('id'));
      
      setUserCoin(user.data.coin);
      setItemOpenId('');

      const { data } = await productService.getProductsListAvailable();
      setListProducts(data);
      alert('Compra realizada com sucesso!')
    } catch (error) {
      alert(`Erro ao realizar compra!`);
    }
  }

  return (
    <div className="container p-4 mx-auto grid">
      <div className="my-2 mx-4">
        <h2 className="text-2xl font-semibold text-emerald-800 text-center float-left">Lista de Produtos Disponíveis</h2>
        <span className="px-2 py-1 w-auto font-semibold leading-tight float-right flex justify-self-end justify-end border border-yellow-400 text-yellow-600 bg-yellow-100 rounded-full">
          <p className="pl-1">{userCoin}</p>
          <img aria-hidden="true" className="ml-1 object-cover justify-self-center" src="images/coin.png" alt="Coin" width={24} />
        </span>
      </div>
      <div className="grid grid-cols-6">
        {listProducts.length > 0 && (
          listProducts.map(product => (
            <div className="max-w-sm p-1" key={product._id}>
              <Card imgAlt="Imagem do Produto" imgSrc={product.photo ? product.photo : photoImg.src}>
                <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                  {product.name}
                </h5>
                <p>
                  {product.description}
                </p>
                <div className="flex items-center justify-between -mx-3">
                  <img aria-hidden="true" className="mr-1 object-cover justify-self-center" src="images/coin.png" alt="Coin" width={24} />
                  <span className="text-xl mr-auto font-bold text-gray-900 dark:text-white">
                    {product.coast}
                  </span>
                  <a onClick={() => handleOpenModal(product._id)} className="cursor-pointer rounded-lg px-3 py-2 text-center text-sm font-medium bg-emerald-700 text-white hover:bg-emerald-800 focus:outline-none focus:ring-4 focus:ring-emerald-300 dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800">
                    Comprar
                  </a>
                </div>
              </Card>
            </div>
          ))
        )}
        <Modal show={modalIsOpen} size="md">
          <Modal.Body>
            <div className="text-center">
              <TbInfoCircle className="mx-auto mb-2 h-14 w-14 text-gray-400 dark:text-gray-200" />
              <h3 className="mb-4 text-lg font-normal text-gray-500 dark:text-gray-400">
                Deseja realmente comprar este item?
              </h3>
              <div className="flex justify-center gap-4">
                <Button color="gray" onClick={confirmBuy}>
                  Sim
                </Button>
                <Button color="failure" onClick={handleCloseModal}>
                  Não
                </Button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
}

export default withAuth(Catalog);
