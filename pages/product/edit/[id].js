import { Button, FileInput, Label, Textarea, TextInput } from "flowbite-react";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import MyPhoto from "../../../components/Photo";
import UploadImage from "../../../components/UploadImage";
import withAuth from "../../../hoc/withAuth";
import ProductService from "../../../services/ProductService";
import photoImg from '../../../public/images/photo.png';

const productService = new ProductService();

function editProduct() {
  const [productName, setProductName] = useState('');
  const [productCoast, setProductCoast] = useState(0);
  const [productInventory, setProductInventory] = useState(0);
  const [productDescription, setProductDescription] = useState('');
  const [productPhoto, setProductPhoto] = useState();
  const [inputImage, setInputImage] = useState();
  const router = useRouter();
  const referenceInput = useRef(null);

  const getProductData = async (idProduct) => {
    try {
      const { data } = await productService.getProductData(idProduct);
      return data;
    } catch (e) {
      alert('Erro ao obter dados do produto!');
    }
  }

  useEffect(() => {
    return async () => {
      if (!router.query.id) {
        return;
      }

      const productData = await getProductData(router.query.id);
      setProductName(productData.name);
      setProductCoast(productData.coast);
      setProductInventory(productData.inventory);
      setProductDescription(productData.description);
      setProductPhoto({
        preview: productData.photo
      });
    }
  }, [router.query.id]);

  const updateProduct = async () => {
    try {
      console.log(productPhoto);

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
      bodyRequest.append('name', productName);
      bodyRequest.append('coast', productCoast);
      bodyRequest.append('inventory', productInventory);
      bodyRequest.append('description', productDescription);

      if (productPhoto.file) {
        bodyRequest.append('file', productPhoto.file);
      }

      await productService.updateProduct(bodyRequest);

      router.push('/product');
      alert(`Produto alterado com sucesso!`);
    } catch (error) {
      alert(`Erro ao editar perfil!`);
    }
  }

  const onChangePhoto = () => {
    if (!referenceInput?.current?.files?.length) {
      return;
    }

    const file = referenceInput?.current?.files[0];
    updatePhotoUrl(file);
  }

  const updatePhotoUrl = (file) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onloadend = () => {
      setProductPhoto({
        preview: fileReader.result,
        file
      });
    }
  }

  const openFileInput = () => {
    inputImage?.click();
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold text-emerald-800 text-center mb-2">Edição de Produto</h2>
      <form className="flex flex-col gap-4">
        <div className="flex-auto">
          <div className="mb-2 block">
            <Label htmlFor="name" value="Nome" />
          </div>
          <TextInput id="name" type="text" placeholder="Nome..." defaultValue={productName} required={true} shadow={true} onChange={e => setProductName(e.target.value)} />
        </div>
        <div className="flex gap-4">
          <div className="flex-auto">
            <div className="mb-2 block">
              <Label htmlFor="coast" value="Coins" />
            </div>
            <TextInput id="coast" type="number" placeholder="Coins..." defaultValue={productCoast} required={true} shadow={true} onChange={e => setProductCoast(e.target.value)} />
          </div>
          <div className="flex-auto">
            <div className="mb-2 block">
              <Label htmlFor="inventory" value="Estoque" />
            </div>
            <TextInput id="inventory" type="number" placeholder="Estoque..." defaultValue={productInventory} required={true} shadow={true} onChange={e => setProductInventory(e.target.value)} />
          </div>
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="description" value="Descrição" />
          </div>
          <Textarea id="description" placeholder="Descrição..." defaultValue={productDescription} required={true} rows={3} onChange={e => setProductDescription(e.target.value)} />
        </div>
        <div className="flex gap-4">
          <MyPhoto src={productPhoto} onChange={onChangePhoto} />
          {/* <FileInput id="file" accept="image/*" /> */}
          <UploadImage setImage={setProductPhoto} imagePreview={productPhoto?.preview || photoImg.src} onReferenceSet={setInputImage} />
          <span onClick={openFileInput}>selecionar outra foto...</span>
        </div>
        <div className="flex gap-4 justify-end">
          <Button type="submit" onClick={updateProduct}>
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
