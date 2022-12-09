import { Avatar } from "flowbite-react";
import photoImg from '../../public/images/photo.png';

export default function MyPhoto({ src, size }) {
    const getPhoto = () => {
        if (src && src !== 'undefined') {
            return src;
        }
        return photoImg.src;
    }

    return (
        <Avatar className="justify-start" alt="Photo" img={getPhoto()} rounded={true} size={size} />
    );
}