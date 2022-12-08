import { Avatar } from "flowbite-react";
import avatarImg from '../../public/images/avatar.png';

export default function MyAvatar({ src }) {
    const getAvatar = () => {
        if (src && src !== 'undefined') {
            return src;
        }
        return avatarImg.src;
    }

    return (
        <Avatar alt="Avatar" img={getAvatar()} rounded={true} />
    );
}