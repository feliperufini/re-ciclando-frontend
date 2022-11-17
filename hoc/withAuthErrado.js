import { useEffect, useState } from "react";
import DesktopMenu from "../components/DesktopMenu";
import HeaderNavbar from "../components/HeaderNavbar";

export default function withAuth(Page) {
  return (props) => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    const [userLogged, setUserLogged] = useState(null);

    useEffect(() => {
      setIsAuthenticated(
        {
          id: localStorage.getItem('id'),
          name: localStorage.getItem('name'),
          email: localStorage.getItem('email'),
          avatar: localStorage.getItem('avatar')
        }
      );
      setUserLogged(localStorage.getItem('token') !== null);
    }, []);

    if (isAuthenticated === null) {
      return null;
    }

    if (isAuthenticated) {
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

    return (
      <Login afterAuth={() => setIsAuthenticated(true)} />
    );
  }
}