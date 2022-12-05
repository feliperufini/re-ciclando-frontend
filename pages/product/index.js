import { Table } from "flowbite-react";
import { useEffect, useState } from "react";
import { TbEdit, TbTrash } from "react-icons/tb";
import MyPhoto from "../../components/Photo";
import withAuth from "../../hoc/withAuth";
import ProductService from "../../services/ProductService";

const productService = new ProductService();

function Catalog() {
  const [listProducts, setListProducts] = useState([]);

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

  return (
    <div className="p-4 grid">
      <h2 className="text-2xl mb-4 font-semibold text-emerald-800 text-center float-left">Lista de Produtos</h2>
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
                  <MyPhoto src={product.photo} />
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
                  <a href={'/product/delete/' + product._id} className="font-medium text-red-600">
                    <TbTrash className="text-lg" />
                  </a>
                </Table.Cell>
              </Table.Row>
            ))
          )}
        </Table.Body>
      </Table>
    </div>
  );
}

export default withAuth(Catalog);
