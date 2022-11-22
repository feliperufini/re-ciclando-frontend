import { Table } from "flowbite-react";
import { useRouter } from "next/router";
import { useState } from "react";
import { TbEdit, TbTrash } from "react-icons/tb";
import withAuth from "../../hoc/withAuth";
import ProductService from "../../services/ProductService";

const productService = new ProductService();

function Catalog() {
  const [listProducts, setListProducts] = useState([]);
  const router = useRouter();

  async () => {
    setListProducts([]);

    try {
      const { data } = await productService.getProductsList();
      setListProducts(data);
      console.log(listProducts);
    } catch (e) {
      alert('Erro carregar produtos: ' + e?.response?.data?.error);
    }
  }

  // const onClickListProducts = (id) => {
  //   router.push(`/product/${id}`);
  // }

  return (
    <div className="p-4">
      <Table>
        <Table.Head className="bg-emerald-200">
          <Table.HeadCell>
            Product name
          </Table.HeadCell>
          <Table.HeadCell>
            Color
          </Table.HeadCell>
          <Table.HeadCell>
            Category
          </Table.HeadCell>
          <Table.HeadCell>
            Price
          </Table.HeadCell>
          <Table.HeadCell>
            Actions
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {listProducts.length > 0 && (
            listProducts.map(product => (
              <Table.Row className="bg-white">
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
                  {product.photo}
                </Table.Cell>
                <Table.Cell className="flex">
                  <a href="/tables" className="font-medium text-blue-600">
                    <TbEdit className="text-lg" />
                  </a>
                  <a href="/product/id" className="font-medium text-red-600">
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
