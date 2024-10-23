import React from 'react'
import { Outlet } from 'react-router-dom'
import { IoIosLogOut } from "react-icons/io";

export default function Layout() {
    return (
        <div className="flex flex-col min-h-screen">
            <header className="bg-orange-200 p-4 shadow flex justify-between items-center">
                <h1 className="text-xl">FastSnack</h1>
                <div className="flex items-center">
                    <IoIosLogOut className="mr-1" />
                    <span>Sair</span>
                </div>
            </header>

            <div className="flex flex-1">
                <nav className="bg-orange-400 text-white w-64 hidden md:block shadow-inner" >
                    <ul className="p-2">
                        <li className="mb-2">Home</li>
                        <li className="mb-2">Evento</li>
                        <li className="mb-2">Produtos</li>
                    </ul>
                </nav>

                <main className="flex-1 p-4 bg-gray-100">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}
