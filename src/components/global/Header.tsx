import React from 'react';
import Logo from './Logo';
import ThemeSwitcher from './ThemeSwitcher';
import UserButton from './UserButton';

const Header = () => {
  return (
    <header className="flex justify-between items-center border-b bg-background h-[60px] px-4 md:px-6 py-2">
      <Logo />
      <nav className="flex gap-4 items-center">
        <UserButton />
        <ThemeSwitcher />
      </nav>
    </header>
  );
};

export default Header;
