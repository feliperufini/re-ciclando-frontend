import DesktopMenu from "../../components/desktop-menu";
import HeaderNavbar from "../../components/header-navbar";
import MobileMenu from "../../components/mobile-menu";
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