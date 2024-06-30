import React from 'react';
import { FaInstagram, FaLinkedin} from 'react-icons/fa';
import { SiGmail } from 'react-icons/si';
const Footer = () => {
  return (
    <div className="flex flex-col">
       
      <footer className="bg-black text-slate-200 py-4 w-full">
        {/*First Section    */ }
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="flex flex-col items-center justify-center h-full w-full">
            <h2 className="text-2xl underline py-4">Policies</h2>
            <ul className="text-center">
              <li className="my-5">
                <a href="#" className="hover:scale-105 hover:text-gray-400 transition transform duration-300">
                  Privacy Policy
                </a>
              </li>
              <li className="my-5">
                <a href="#" className="hover:scale-105 hover:text-gray-400 transition transform duration-300">
                  Shipping Policy
                </a>
              </li>
              <li className="my-5">
                <a href="#" className="hover:scale-105 hover:text-gray-400 transition transform duration-300">
                  Refund and Return Policy
                </a>
              </li>
            </ul>
          </div>


          {/*Second Section    */ }


          <div className="flex flex-col items-center justify-start h-full w-full self-start">
            <h2 className="text-2xl underline py-4">Customer Care</h2>
            <ul className="text-center">
                <li className="my-5">
                <a href="#" className="hover:scale-105 hover:text-gray-400 transition transform duration-300">
                    +91 8690085464
                </a>
                </li>
                <li className="my-5">
                <a href="#" className="hover:scale-105 hover:text-gray-400 transition transform duration-300">
                    +91 9319796155
                </a>
                </li>
            </ul>
            </div>


            {/*Third Section    */ }


            <div className="flex flex-col items-center justify-start h-full w-full self-start">
                <h2 className="text-2xl underline py-4">Email</h2>
                <ul className="text-center">
                    <li className="my-5">
                    <a href="#" className="hover:scale-105 hover:text-gray-400 transition transform duration-300">
                        trijha.iitd@gmail.com
                    </a>
                    </li>
                </ul>
            </div>


          {/*Fourth Section    */ }


            <div className="flex flex-col items-center justify-start h-full w-full">
                <h2 className="text-2xl underline py-4">Follow Us</h2> 
                <div className="flex flex-row"> 

                    <a href="https://www.instagram.com/trijha_/" target="_blank" rel="noopener noreferrer" className="hover:scale-105 hover:text-gray-400 transition transform duration-300 p-2"><FaInstagram size={32} /> </a>
                    <a href="https://linkedin.com/in/yourprofile" target="_blank" rel="noopener noreferrer" className="hover:scale-105 hover:text-gray-400 transition transform duration-300 p-2"><FaLinkedin size={32}/> </a> 
                </div>
             
          </div>


        </div>
      </footer>
    </div>
  );
};

export default Footer;
