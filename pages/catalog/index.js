import { Button, Card, Modal } from "flowbite-react";
import { useEffect, useState } from "react";
import { TbInfoCircle } from "react-icons/tb";
import withAuth from "../../hoc/withAuth";
import ProductService from "../../services/ProductService";

const productService = new ProductService();

function Catalog() {
  const [listProducts, setListProducts] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    setListProducts([]);
    const getProducts = async () => {
      const { data } = await productService.getProductsListAvailable();
      setListProducts(data);
    };
    getProducts();
  }, []);

  function handleOpenModal() {
    setModalIsOpen(true);
  }

  function handleCloseModal() {
    setModalIsOpen(false);
  }

  function confirmBuy() {
    handleCloseModal();
    const idUser = localStorage.getItem('id');
    console.log(idUser);
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
              <div className="flex items-center justify-between">
                <span className="text-3xl font-bold text-gray-900 dark:text-white">
                  ${product.coast}
                </span>
                <a data-toggle="modal" data-target="#buyModal" onClick={handleOpenModal} className="cursor-pointer rounded-lg bg-emerald-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-emerald-800 focus:outline-none focus:ring-4 focus:ring-emerald-300 dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800">
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
