import React from 'react' ;
import Dropdown from './Dropdown'; 

const arr = ['Vermicompost','Vermiwash','Pots', 'Gardening Kit']

const Navbar = () => {
  return (
    <nav className='flex flex-row items-center justify-between bg-orange-100 py-4 z-40 '>  
        <div className='container px-6 z-40'>
        <img src='trijha final logo.png' className='h-20 w-20 mx-10' alt='logo'/>
        </div> 
        <div className='container mx-auto z-40'>
            <ul className='flex flex-row mx-7 '>
                <li className='mx-10 font- font-firs-text-trial-bold text-center text-lg text-slate-900 '><a href='/' className=''>Home</a></li>
                <Dropdown className='mx-10 font- font-firs-text-trial-bold text-lg text-slate-900' name="Products" arr={arr}/> 
                <li className='mx-10 font- font-firs-text-trial-bold text-center text-lg text-slate-900'><a href='#' className=''>About Us</a></li>
                <li className='mx-10 font- font-firs-text-trial-bold text-center text-lg text-slate-900'><a href='#' className=''>Contact Us</a></li>
            </ul>
        </div>

    </nav>
  )
}

export default Navbar