import { useRouter } from "next/router";
import DesktopMenu from "../components/DesktopMenu";
import HeaderNavbar from "../components/HeaderNavbar";
import UserService from "../services/UserService"

const userService = new UserService();

export default function withAuth(Page) {
  return (props) => {
    const router = useRouter();

    if (typeof window !== 'undefined') {
      if (!userService.isAuthenticated()) {
        router.replace('/');
        return null;
      }

      const userLogged = userService.getInfoUserLogged();

      return (
        <div className="flex h-screen bg-emerald-100">
          <DesktopMenu />
          <div className="flex flex-col flex-1">
            <HeaderNavbar />
            <main className="h-full pb-8 overflow-y-auto">
              <Page userLogged={userLogged} {...props} />
            </main>
          </div >
        </div >
      );
    }

    return null;
  }
}