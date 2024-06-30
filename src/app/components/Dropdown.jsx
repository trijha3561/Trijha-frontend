import React, { useState } from 'react';
import { FiChevronDown } from 'react-icons/fi'; 

const Dropdown = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleMouseEnter = () => {
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    setIsOpen(false);
  };

  return (
    <div className={`relative ${props.className} active:bg-orange-100`} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}> 
        <div className='flex flex-row items-center'>
      <button
        className="dropdown-toggle bg-transparent active:bg-white"
        onClick={toggleDropdown}
      >
        <span className='mr-1'>{props.name}</span> 
      </button>
      <FiChevronDown className='' />
      </div>
      {isOpen && (
        <ul className="dropdown-menu absolute top-full left-0 mt-1 bg-white border border-gray-300 rounded shadow-lg">
          {props.arr.map((ele, index) => (
            <li key={index} className="dropdown-item py-2 px-4 cursor-pointer bg-orange-20  text-md hover:bg-gray-100 ">
              {ele}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
