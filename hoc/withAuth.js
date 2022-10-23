import { useRouter } from "next/router";
import Cabecalho from "../componentes/layout/Cabecalho";
import Rodape from "../componentes/layout/Rodape";
import Loading from "../componentes/loading";
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
                <>
                    {/* <Cabecalho userLogged={userLogged} /> */}
                    {/* <Loading /> */}
                    <Page userLogged={userLogged} {...props} />
                    {/* <Rodape userLogged={userLogged} /> */}
                </>
            );
        }

        return null;
    }
}