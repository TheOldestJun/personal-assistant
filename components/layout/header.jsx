'use client';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useDispatch } from 'react-redux';

import { logout } from '@/store/reducers/authSlice';
import { Image } from '@heroui/react';

export default function Header() {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    dispatch(logout());
  };

  return (
    <header className="w-full bg-sky-300 text-sky-900 shadow-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between p-4">
        {/* Логотип */}
        <Image
          src="/virtual-assistant.png"
          alt="MyApp Logo"
          width={40}
          height={40}
        />

        {/* Меню для десктопа */}
        <nav className="hidden gap-6 md:flex">
          <a href="#" className="transition-colors hover:text-blue-400">
            Головна
          </a>
          <a href="#" className="transition-colors hover:text-blue-400">
            Про нас
          </a>
          <a href="#" className="transition-colors hover:text-blue-400">
            Контакти
          </a>
          <a
            href="#"
            className="transition-colors hover:text-red-400"
            onClick={handleLogout}
          >
            Вихід
          </a>
        </nav>

        {/* Кнопка бургер */}
        <button
          className="transition-transform duration-300 md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle Menu"
        >
          <div
            className={`transition-transform duration-300 ${
              open ? 'scale-110 rotate-180' : 'scale-100 rotate-0'
            }`}
          >
            {open ? <X size={28} /> : <Menu size={28} />}
          </div>
        </button>
      </div>

      {/* Выпадающее меню с анимацией */}
      <div
        className={`flex flex-col items-center space-y-3 overflow-hidden bg-sky-800 transition-all duration-300 ease-in-out md:hidden ${open ? 'max-h-40 py-4 opacity-80' : 'max-h-0 py-0 opacity-0'} `}
      >
        <a
          href="#"
          className="text-white transition-colors hover:text-gray-400"
        >
          Головна
        </a>
        <a
          href="#"
          className="text-white transition-colors hover:text-blue-400"
        >
          Про нас
        </a>
        <a
          href="#"
          className="text-white transition-colors hover:text-blue-400"
        >
          Контакти
        </a>
        <a
          href="#"
          className="text-white transition-colors hover:text-red-400"
          onClick={handleLogout}
        >
          Вихід
        </a>
      </div>
    </header>
  );
}
