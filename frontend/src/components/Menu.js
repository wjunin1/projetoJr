import React from 'react';
import { Link } from 'react-router-dom';

const Menu = () => {
  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/add">Adicionar Jogo</Link></li>
        <li><Link to="/reports">Relatórios</Link></li>
      </ul>
    </nav>
  );
};

export default Menu;
