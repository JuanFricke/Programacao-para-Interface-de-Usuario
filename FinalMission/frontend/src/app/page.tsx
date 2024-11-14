import React from 'react'
import { MenuLateral } from "./components/menuLateral";

interface HomeProps {
  children: React.ReactNode;
}

export const Home: React.FC<HomeProps> = ({ children }) => {
  return (
    <div className="container-principal">
      <MenuLateral />
      <main>
        {children}
      </main>
    </div>
  );
}