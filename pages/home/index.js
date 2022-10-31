import DesktopMenu from "../../components/DesktopMenu";
import HeaderNavbar from "../../components/HeaderNavbar";
import MobileMenu from "../../components/MobileMenu";
import Welcome from "../welcome";

export default function Home() {
  return (
    <div className="flex h-screen bg-emerald-100">
      <DesktopMenu />
      {/* <MobileMenu /> */}
      <div className="flex flex-col flex-1">
        <HeaderNavbar />
        <main className="h-full pb-16 overflow-y-auto">
          <Welcome />
        </main>
      </div >
    </div >
  );
}