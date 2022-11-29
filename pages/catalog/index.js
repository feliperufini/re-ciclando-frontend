import { Button, Card, Modal } from "flowbite-react";
import { useEffect, useState } from "react";
import { TbInfoCircle } from "react-icons/tb";
import withAuth from "../../hoc/withAuth";
import ProductService from "../../services/ProductService";

const productService = new ProductService();

function Catalog() {
  const [listProducts, setListProducts] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [itemOpenId, setItemOpenId] = useState('');

  useEffect(() => {
    setListProducts([]);
    const getProducts = async () => {
      const { data } = await productService.getProductsListAvailable();
      setListProducts(data);
    };
    getProducts();
  }, []);

  function handleOpenModal(productId) {
    setModalIsOpen(true);
    setItemOpenId(productId);
  }

  function handleCloseModal() {
    setModalIsOpen(false);
    setItemOpenId('');
  }

  function confirmBuy() {
    handleCloseModal();
    const userId = localStorage.getItem('id');

    useEffect(() => {
      const getProducts = async () => {
        const { data } = await productService.getProductsListAvailable();
        setListProducts(data);
      };
      getProducts();
    }, []);
    console.log(userId, itemOpenId);
  }

  return (
    <div className="p-4 grid grid-cols-6">
      {listProducts.length > 0 && (
        listProducts.map(product => (
          <div className="max-w-sm p-1" key={product._id}>
            <Card imgAlt="Imagem do Produto" imgSrc={product.photo}>
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
  );
}

export default withAuth(Catalog);
