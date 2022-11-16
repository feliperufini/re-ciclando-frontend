import { Table } from "flowbite-react";
import { TbEdit, TbTrash } from "react-icons/tb";
import withAuth from "../../hoc/withAuth";

function Catalog() {
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
            <span className="sr-only">
              Edit
            </span>
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          <Table.Row className="bg-white">
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900">
              Apple MacBook Pro 17"
            </Table.Cell>
            <Table.Cell>
              Sliver
            </Table.Cell>
            <Table.Cell>
              Laptop
            </Table.Cell>
            <Table.Cell>
              $2999
            </Table.Cell>
            <Table.Cell className="flex">
              <a href="/tables" className="font-medium text-blue-600">
                <TbEdit className="text-lg" />
              </a>
              <a href="/product/id" className="font-medium text-red-600">
                <TbTrash className="text-lg"/>
              </a>
            </Table.Cell>
          </Table.Row>
          <Table.Row className="bg-white">
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
              Microsoft Surface Pro
            </Table.Cell>
            <Table.Cell>
              White
            </Table.Cell>
            <Table.Cell>
              Laptop PC
            </Table.Cell>
            <Table.Cell>
              $1999
            </Table.Cell>
            <Table.Cell className="flex">
              <a href="/tables" className="font-medium text-blue-600">
                <TbEdit className="text-lg" />
              </a>
              <a href="/product/id" className="font-medium text-red-600">
                <TbTrash className="text-lg"/>
              </a>
            </Table.Cell>
          </Table.Row>
          <Table.Row className="bg-white">
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
              Magic Mouse 2
            </Table.Cell>
            <Table.Cell>
              Black
            </Table.Cell>
            <Table.Cell>
              Accessories
            </Table.Cell>
            <Table.Cell>
              $99
            </Table.Cell>
            <Table.Cell className="flex">
              <a href="/tables" className="font-medium text-blue-600">
                <TbEdit className="text-lg" />
              </a>
              <a href="/product/id" className="font-medium text-red-600">
                <TbTrash className="text-lg"/>
              </a>
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </div>
  );
}

export default withAuth(Catalog);
