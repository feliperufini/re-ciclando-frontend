import DesktopMenu from "../../components/DesktopMenu";
import HeaderNavbar from "../../components/HeaderNavbar";
import MobileMenu from "../../components/MobileMenu";

export default function Home() {
  return (
    <div className="flex h-screen bg-emerald-100 dark:bg-gray-900">
      <DesktopMenu />
      {/* <MobileMenu /> */}
      <div className="flex flex-col flex-1">
        <HeaderNavbar />
        {/* <main className="h-full pb-16 overflow-y-auto">
          <div className="container px-6 mx-auto grid">
            <h2 className="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
              Blank
            </h2>
          </div>
        </main> */}
      </div >
    </div >
  );
}