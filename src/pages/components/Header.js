import Image from "next/image";
import logo from "../../../public/nobg.png";

const Header = () => {
  return (
    <header>
      <Image className="w-96 h-60 mx-auto" src={logo} />
    </header>
  );
};

export default Header;
