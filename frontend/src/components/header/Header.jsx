import { useState } from "react";
import "./header.css";
import HeaderLeft from "./HeaderLeft";
import HeaderRight from "./HeaderRight";
import CustomNavbar from "./Navbar";  // Import Custom Navbar component here

const Header = () => {
  
    const [toggle, setToggle] = useState(false);

    return ( 
        <header className="header">
            <HeaderLeft toggle={toggle} setToggle={setToggle} />
            <CustomNavbar toggle={toggle} setToggle={setToggle} />  {/* Use CustomNavbar here */}
            <HeaderRight />
        </header>
     );
}
 
export default Header;