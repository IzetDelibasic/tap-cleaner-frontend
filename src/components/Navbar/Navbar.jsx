// -React-
import { useState } from "react";
import { Link } from "react-router-dom";
// -Icons-
import { FaRegTrashAlt } from "react-icons/fa";
import { FaTimes } from "react-icons/fa";
import { FiMenu } from "react-icons/fi";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="bg-emerald-600 border-b-2 border-black border-opacity-20 font-montserrat">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link to="/dashboard" className="flex items-center">
          <FaRegTrashAlt className="text-white cursor-pointer mr-2" />
          <div className="self-center text-xl font-medium font-montserrat whitespace-nowrap text-white">
            Tap Cleaner
          </div>
        </Link>
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-white">
            {isOpen ? <FaTimes className="" /> : <FiMenu className="" />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
