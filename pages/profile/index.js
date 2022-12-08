import { Accordion, Label } from "flowbite-react";
import withAuth from "../../hoc/withAuth";
import avatarImg from '../../public/images/avatar.png';

function Profile() {
  return (
    <div className="flex flex-col p-4 items-center">
      <img className="rounded-full" src={avatarImg.src} width="200" />
      <h4 className="font-semibold">Felipe Andrade</h4>
      <h4 className="mb-10">felipe.andrade@mail.com</h4>
      <Accordion alwaysOpen={true} className="w-3/5 bg-emerald-200">
        <Accordion.Panel>
          <Accordion.Title>
            <Label value="Total já arrecadado..." />
          </Accordion.Title>
          <Accordion.Content>
            <p className="mb-2 text-gray-900">
              Flowbite is an open-source library of interactive components built on top of Tailwind CSS including buttons, dropdowns, modals, navbars, and more.
            </p>
          </Accordion.Content>
        </Accordion.Panel>
        <Accordion.Panel>
          <Accordion.Title>
            <Label value="Itens comprados..." />
          </Accordion.Title>
          <Accordion.Content>
            <p className="mb-2 text-gray-900">
              Flowbite is first conceptualized and designed using the Figma software so everything you see in the library has a design equivalent in our Figma file.
            </p>
          </Accordion.Content>
        </Accordion.Panel>
        <Accordion.Panel>
          <Accordion.Title>
            <Label value="Outros..." />
          </Accordion.Title>
          <Accordion.Content>
            <p className="mb-2 text-gray-900">
              The main difference is that the core components from Flowbite are open source under the MIT license, whereas Tailwind UI is a paid product. Another difference is that Flowbite relies on smaller and standalone components, whereas Tailwind UI offers sections of pages.
            </p>
          </Accordion.Content>
        </Accordion.Panel>
      </Accordion>
    </div>
  );
}

export default withAuth(Profile);