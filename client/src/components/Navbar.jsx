import React, { useState } from 'react';
import { NavbarMenu } from '../mocks/data'
import { IoFastFood } from "react-icons/io5";
import { MdMenu } from 'react-icons/md'
import { PiShoppingCartThin } from 'react-icons/pi'
import { Link } from 'react-router-dom';
import { IoIosLogOut } from 'react-icons/io';
import ResponsiveMenu from './ResponsiveMenu';

export const filterMenuItens = (menuItems, isLoggedIn) => {
    return menuItems.filter(item => {
        if (item.requireLogin && !isLoggedIn) {
            return false
        }
        return true;
    });
};


const Navbar = ({ isLoggedIn, handleLogout }) => {
    const [open, setOpen] = useState(false);

    const filteredNavbarMenu = filterMenuItens(NavbarMenu, isLoggedIn);

    return (
        <>
            <nav className='bg-gray-100 fixed top-0 left-0 right-0 z-10'>
                <div className="container flex justify-between items-center  ">
                    {/* Logo section */}
                    <div className='text-2xl flex items-center gap-2 font-bold py-8 '>
                        <IoFastFood />
                        <p>Fast</p>
                        <p className='text-primary'>Snack</p>
                    </div>
                    {/* Menu section */}
                    <div className='hidden md:block '>
                        <ul className='flex items-center gap-6 text-gray-600'>
                            {filteredNavbarMenu.map((item) => {
                                return (
                                    <li key={item.id}>
                                        <Link
                                            to={item.link}
                                            className='
                                            inline-block py-1 px-3 
                                            hover:text-primary transition duration-300 ease-out'>
                                            {item.title}
                                        </Link>
                                    </li>
                                );
                            })
                            }
                        </ul>
                    </div>
                    {/* Icons section */}
                    <div className='flex items-center gap-4'>
                        {isLoggedIn ? (
                            <button
                                className='items-center text-2xl hover:bg-primary hover:text-white rounded-full p-1 transition ease-in duration-300 hidden md:block'
                                onClick={handleLogout}
                            >
                                <IoIosLogOut />
                            </button>
                        ) : (
                            <div className='flex items-center'>
                                <Link
                                    to='/cadastrar'
                                    className='text-gray-600 hover:text-red-500 transition duration-300 hidden md:block ease-out'>Criar conta</Link>
                                <Link
                                    to='/login'
                                    className='mx-3 bg-red-600 py-2 px-4 rounded-lg text-white  hover:bg-red-500 transition duration-300  hidden md:block ease-in-out shadow-md'>Login</Link>
                            </div>

                        )}

                    </div>
                    {/* Menu mobile section */}
                    <div className="md:hidden" onClick={() => setOpen(!open)}>
                        <MdMenu className='text-4xl' />
                    </div>
                </div>
            </nav >

            {/* Mobile sidebar section */}
            < ResponsiveMenu open={open} isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
        </>

    );
}

export default Navbar;