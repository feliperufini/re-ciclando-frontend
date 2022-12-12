import { Avatar, Button, Modal, Table } from "flowbite-react";
import { useEffect, useState } from "react";
import { TbEdit, TbInfoCircle, TbTrash } from "react-icons/tb";
import withAuth from "../../hoc/withAuth";
import UserService from "../../services/UserService";
import avatarImg from '../../public/images/avatar.png';
import { useRouter } from "next/router";

const userService = new UserService();

function UserList() {
  const [listUsers, setListUsers] = useState([]);
  const [itemOpenId, setItemOpenId] = useState('');
  const [modalDeleteIsOpen, setModalDeleteIsOpen] = useState(false);
  const [userVerifyLevel, setUserVerifyLevel] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const getUserLevel = async () => {
      const { data } = await userService.getProfile();
      setUserVerifyLevel(data.level);
    };
    getUserLevel();

    setListUsers([]);
    const getUsers = async () => {
      const { data } = await userService.getSystemUsers();
      setListUsers(data);
    };
    getUsers();
  }, []);

  if (!listUsers.length) {
    return null;
  }

  function handleOpenDeleteModal(userId) {
    setModalDeleteIsOpen(true);
    setItemOpenId(userId);
  }

  function handleCloseDeleteModal() {
    setModalDeleteIsOpen(false);
    setItemOpenId('');
  }

  const confirmDeleteUser = async () => {
    setModalDeleteIsOpen(false);
    try {
      // apenas reduzir o nível do usuário, não apagar ele do sistema
      await userService.delUserDelete(itemOpenId);
      setItemOpenId('');

      const { data } = await userService.getSystemUsers();
      setListUsers(data);
      alert('Usuário deletado com sucesso!')
    } catch (error) {
      alert(`Erro ao deletar usuário!`);
    }
  }

  function handleCreateNewUser() {
    router.push('/user/create')
  }
  function handleEditUser(userId) {
    router.push('/user/edit/' + userId);
  }

  return (
    <div className="p-4 grid">
      <div className="flex">
        <div className="flex-1">
          <h2 className="text-2xl mb-4 font-semibold text-emerald-800 text-center float-left">Lista de Usuários</h2>
        </div>
        <div className="flex-1">
          {userVerifyLevel == 3 && (
            <Button onClick={handleCreateNewUser} className="ml-auto" color="success">Cadastrar</Button>
          )}
          {userVerifyLevel == 2 && (
            <Button disabled={true} className="ml-auto" color="dark">Cadastrar</Button>
          )}
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
            E-mail
          </Table.HeadCell>
          <Table.HeadCell>
            Nível
          </Table.HeadCell>
          <Table.HeadCell>
            Ações
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {listUsers.length > 0 && (
            listUsers.map(user => (
              <Table.Row className="bg-white" key={user._id}>
                <Table.Cell className="float-left">
                  <Avatar className="justify-start" alt="Photo" img={user.avatar ? user.avatar : avatarImg.src} size="md" />
                </Table.Cell>
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900">
                  {user.name}
                </Table.Cell>
                <Table.Cell>
                  {user.email}
                </Table.Cell>
                <Table.Cell>
                  {user.level}
                </Table.Cell>
                {userVerifyLevel == 3 && (
                  <Table.Cell className="inline-flex -mt-16 gap-2">
                    <a onClick={() => handleEditUser(user._id)} className="font-medium text-blue-600 cursor-pointer">
                      <TbEdit className="text-lg" />
                    </a>
                    <a onClick={() => handleOpenDeleteModal(user._id)} className="font-medium text-red-600 cursor-pointer">
                      <TbTrash className="text-lg" />
                    </a>
                  </Table.Cell>
                )}
                {userVerifyLevel == 2 && (
                  <Table.Cell className="inline-flex -mt-16 gap-2">
                    <a className="font-medium text-gray-600">
                      <TbEdit className="text-lg" />
                    </a>
                    <a className="font-medium text-gray-600">
                      <TbTrash className="text-lg" />
                    </a>
                  </Table.Cell>
                )}
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
              Deseja realmente excluir este item?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="gray" onClick={confirmDeleteUser}>
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

export default withAuth(UserList);
