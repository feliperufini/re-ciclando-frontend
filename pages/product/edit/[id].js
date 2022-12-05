import { Button, FileInput, Label, Table, Textarea, TextInput } from "flowbite-react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { TbEdit, TbTrash } from "react-icons/tb";
import MyPhoto from "../../../components/Photo";
import withAuth from "../../../hoc/withAuth";
import ProductService from "../../../services/ProductService";

const productService = new ProductService();

function editProduct() {
  const [product, setProduct] = useState([]);
  const router = useRouter();

  const getProductData = async (idProduct) => {
    try {
      const { data } = await productService.getProductData(idProduct);
      return data;
    } catch (e) {
      alert('Erro ao obter dados do produto!');
    }
  }

  // useEffect(() => {
  //   async function fetchData() {
  //     if (!router.query.id) {
  //       return;
  //     }

  //     const productData = await getProductData(router.query.id);
  //     setProduct(productData);
  //     console.log(product);
  //   }
  //   fetchData();
  // }, [router.query.id]);

  useEffect(() => {
    return async () => {
      if (!router.query.id) {
        return;
      }

      const productData = await getProductData(router.query.id);
      setProduct(productData);
    }
  }, [router.query.id]);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold text-emerald-800 text-center mb-2">Edição de Produto</h2>
      <form className="flex flex-col gap-4">
        <div className="flex-auto">
          <div className="mb-2 block">
            <Label htmlFor="name" value="Nome" />
          </div>
          <TextInput id="name" type="text" placeholder="Nome..." value={product.name} required={true} shadow={true} />
        </div>
        <div className="flex gap-4">
          <div className="flex-auto">
            <div className="mb-2 block">
              <Label htmlFor="coast" value="Coins" />
            </div>
            <TextInput id="coast" type="number" placeholder="Coins..." value={product.coast} required={true} shadow={true} />
          </div>
          <div className="flex-auto">
            <div className="mb-2 block">
              <Label htmlFor="inventory" value="Estoque" />
            </div>
            <TextInput id="inventory" type="number" placeholder="Estoque..." value={product.inventory} required={true} shadow={true} />
          </div>
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="description" value="Descrição" />
          </div>
          <Textarea id="description" placeholder="Descrição..." value={product.description} required={true} rows={3} />
        </div>
        <div className="flex gap-4">
          <MyPhoto src={product.photo} />
          <FileInput id="file" />
        </div>
        <div className="flex gap-4 justify-end">
          <Button type="submit">
            Salvar alterações
          </Button>
          <Button color="failure">
            Cencelar
          </Button>
        </div>
      </form>
    </div>
  );
}

export default withAuth(editProduct);
