"use client";
import { useState } from "react";
import { Menu, X } from "lucide-react";

import { Image } from "@heroui/react";

export default function Header() {
    const [open, setOpen] = useState(false);

    return (
        <header className="w-full bg-sky-300 text-sky-900 shadow-md">
            <div className="max-w-7xl mx-auto flex justify-between items-center p-4">
                {/* Логотип */}
                <Image src="/virtual-assistant.png" alt="MyApp Logo" width={40} height={40} />

                {/* Меню для десктопа */}
                <nav className="hidden md:flex gap-6">
                    <a href="#" className="hover:text-blue-400 transition-colors">Головна</a>
                    <a href="#" className="hover:text-blue-400 transition-colors">Про нас</a>
                    <a href="#" className="hover:text-blue-400 transition-colors">Контакти</a>
                </nav>

                {/* Кнопка бургер */}
                <button
                    className="md:hidden transition-transform duration-300"
                    onClick={() => setOpen(!open)}
                    aria-label="Toggle Menu"
                >
                    <div
                        className={`transition-transform duration-300 ${open ? "rotate-180 scale-110" : "rotate-0 scale-100"
                            }`}
                    >
                        {open ? <X size={28} /> : <Menu size={28} />}
                    </div>
                </button>
            </div>

            {/* Выпадающее меню с анимацией */}
            <div
                className={`
          md:hidden bg-sky-800 flex flex-col items-center space-y-3 
          transition-all duration-300 ease-in-out 
          overflow-hidden
          ${open ? "max-h-40 opacity-80 py-4" : "max-h-0 opacity-0 py-0"}
        `}
            >
                <a href="#" className="hover:text-gray-400 transition-colors text-white">Головна</a>
                <a href="#" className="hover:text-blue-400 transition-colors text-white">Про нас</a>
                <a href="#" className="hover:text-blue-400 transition-colors text-white">Контакти</a>
            </div>
        </header>
    );
}