import { Avatar, Button, Modal, Table } from "flowbite-react";
import { useEffect, useState } from "react";
import { TbEdit, TbInfoCircle, TbTrash } from "react-icons/tb";
import withAuth from "../../hoc/withAuth";
import ProductService from "../../services/ProductService";
import photoImg from '../../public/images/photo.png';
import { useRouter } from "next/router";

const productService = new ProductService();

function Catalog() {
  const [listProducts, setListProducts] = useState([]);
  const [itemOpenId, setItemOpenId] = useState('');
  const [modalDeleteIsOpen, setModalDeleteIsOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setListProducts([]);
    const getProducts = async () => {
      const { data } = await productService.getProductsList();
      setListProducts(data);
    };
    getProducts();
  }, []);

  if (!listProducts.length) {
    return null;
  }

  function handleOpenDeleteModal(productId) {
    setModalDeleteIsOpen(true);
    setItemOpenId(productId);
  }

  function handleCloseDeleteModal() {
    setModalDeleteIsOpen(false);
    setItemOpenId('');
  }

  const confirmDeleteProduct = async () => {
    setModalDeleteIsOpen(false);
    try {
      await productService.delProductDelete(itemOpenId);
      setItemOpenId('');

      const { data } = await productService.getProductsList();
      setListProducts(data);
      alert('Produto deletado com sucesso!')
    } catch (error) {
      alert(`Erro ao deletar produto!`);
    }
  }

  function handleCreateNewProduct() {
    router.push('/product/create')
  }

  return (
    <div className="p-4 grid">
      <div className="flex">
        <div className="flex-1">
          <h2 className="text-2xl mb-4 font-semibold text-emerald-800 text-center float-left">Lista de Produtos</h2>
        </div>
        <div className="flex-1">
          <Button onClick={handleCreateNewProduct} className="ml-auto" color="success">Cadastrar</Button>
        </div>
      </div>
      <Table>
        <Table.Head className="bg-emerald-200">
          <Table.HeadCell>
            Foto
          </Table.HeadCell>
          <Table.HeadCell>
            Nome
          </Table.HeadCell>
          <Table.HeadCell>
            Descrição
          </Table.HeadCell>
          <Table.HeadCell>
            Preço
          </Table.HeadCell>
          <Table.HeadCell>
            Estoque
          </Table.HeadCell>
          <Table.HeadCell>
            Ações
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {listProducts.length > 0 && (
            listProducts.map(product => (
              <Table.Row className="bg-white" key={product._id}>
                <Table.Cell className="float-left">
                  <Avatar className="justify-start" alt="Photo" img={product.photo ? product.photo : photoImg.src} size="md" status={product.inventory > 0 ? 'online' : 'busy'} statusPosition="bottom-right" />
                </Table.Cell>
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900">
                  {product.name}
                </Table.Cell>
                <Table.Cell>
                  {product.description}
                </Table.Cell>
                <Table.Cell>
                  {product.coast}
                </Table.Cell>
                <Table.Cell>
                  {product.inventory}
                </Table.Cell>
                <Table.Cell className="inline-flex -mt-16 gap-2">
                  <a href={'/product/edit/' + product._id} className="font-medium text-blue-600">
                    <TbEdit className="text-lg" />
                  </a>
                  <a onClick={() => handleOpenDeleteModal(product._id)} className="font-medium text-red-600 cursor-pointer">
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
                Deseja realmente comprar este item?
              </h3>
              <div className="flex justify-center gap-4">
                <Button color="gray" onClick={confirmDeleteProduct}>
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

export default withAuth(Catalog);
