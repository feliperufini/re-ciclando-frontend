import { Button, Label, Textarea, TextInput } from "flowbite-react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import UploadImage from "../../../components/UploadImage";
import withAuth from "../../../hoc/withAuth";
import ProductService from "../../../services/ProductService";
import photoImg from '../../../public/images/photo.png';

const productService = new ProductService();

function editProduct() {
  const [productId, setProductId] = useState('');
  const [productName, setProductName] = useState('');
  const [productCoast, setProductCoast] = useState(0);
  const [productInventory, setProductInventory] = useState(0);
  const [productDescription, setProductDescription] = useState('');
  const [productPhoto, setProductPhoto] = useState([]);
  const [inputImage, setInputImage] = useState();
  const router = useRouter();

  useEffect(() => {
    return async () => {
      if (!router.query.id) {
        return;
      }

      const productData = await productService.getProductData(router.query.id);
      setProductId(productData.data._id);
      setProductName(productData.data.name);
      setProductCoast(productData.data.coast);
      setProductInventory(productData.data.inventory);
      setProductDescription(productData.data.description);
      setProductPhoto({
        preview: productData.data.photo
      });
    }
  }, []);

  const handleUpdateProduct = async () => {
    try {
      if (productName.length < 3) {
        alert('Nome precisa de pelo menos 3 caracteres!');
        return;
      }
      if (productCoast < 0) {
        alert('Você não pode cadastrar um preço negativo!');
        return;
      }
      if (productInventory < 0) {
        alert('Você não pode cadastrar um estoque negativo!');
        return;
      }
      if (productDescription.length < 3) {
        alert('Descrição precisa de pelo menos 3 caracteres!');
        return;
      }

      const bodyRequest = new FormData();
      bodyRequest.append('id', productId);
      bodyRequest.append('name', productName);
      bodyRequest.append('coast', productCoast);
      bodyRequest.append('inventory', productInventory);
      bodyRequest.append('description', productDescription);

      if (productPhoto.file) {
        bodyRequest.append('file', productPhoto.file);
      }

      await productService.putProductData(bodyRequest);
      router.push('/product');
    } catch (error) {
      alert(`Erro ao editar produto: ` + error);
    }
  }

  const openFileInput = () => {
    inputImage?.click();
  }

  function handleCancelUpdateProduct() {
    router.push('/product')
  }

  return (
    <div className="p-4 grid">
      <div className="flex mb-4">
        <div className="flex-1">
          <h2 className="text-2xl font-semibold text-emerald-800 text-center float-left">Cadastrar Produto</h2>
        </div>
      </div>
      <form className="grid grid-cols-3 gap-4 mb-4">
        <div>
          <Label htmlFor="name" value="Nome" />
          <TextInput id="name" type="text" placeholder="Nome..." defaultValue={productName} required={true} shadow={true} onChange={e => setProductName(e.target.value)} />
          <div className="flex gap-2 mt-2">
            <UploadImage setImage={setProductPhoto} imagePreview={productPhoto?.preview || photoImg.src} onReferenceSet={setInputImage} className="cursor-pointer" />
            <span onClick={openFileInput} className="text-emerald-900 cursor-pointer self-end">Selecionar outra foto...</span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="coast" value="Coins" />
            <TextInput id="coast" type="number" placeholder="Coins..." defaultValue={productCoast} required={true} shadow={true} onChange={e => setProductCoast(e.target.value)} />
          </div>
          <div>
            <Label htmlFor="inventory" value="Estoque" />
            <TextInput id="inventory" type="number" placeholder="Estoque..." defaultValue={productInventory} required={true} shadow={true} onChange={e => setProductInventory(e.target.value)} />
          </div>
        </div>
        <div>
          <Label htmlFor="description" value="Descrição" />
          <Textarea id="description" placeholder="Descrição..." defaultValue={productDescription} required={true} rows={3} onChange={e => setProductDescription(e.target.value)} />
        </div>
      </form>
      <div className="flex gap-4 ml-auto">
        <Button onClick={handleUpdateProduct}>Salvar alterações</Button>
        <Button onClick={handleCancelUpdateProduct} color="failure">Cencelar</Button>
      </div>
    </div>
  );
}

export default withAuth(editProduct);