import React, { useState, useEffect } from 'react';

const GameForm = ({ currentGame, onSave, onCancel }) => {
  const [game, setGame] = useState({
    year: '',
    name: '',
    genre: '',
    platform: '',
    rating: '',
    hours: '',
    finished: false,
    playing: false
  });

  const genres = ['MMORPG', 'Simulação', 'FPS', 'ARPG', 'Aventura', 'Corrida', 'Ação', 'Luta', 'Esportes', 'Terror', 'RPG', 'Estrategia', 'Card Game', 'Puzzle'];
  const platforms = ['PC', 'PS1', 'Xbox One', 'SNES', 'PS3', 'Atari', 'NES', 'Arcade', 'GB', 'N64', 'PS2', 'MegaDrive', 'GBA', 'GBC', 'Sega CD', 'PC Engine', 'Switch', 'Game Cube', 'Saturn', 'Game Gear', 'Deamcast', '32x', 'Neo Geo'];
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 1998 }, (_, i) => currentYear - i);

  useEffect(() => {
    if (currentGame) {
      setGame(currentGame);
    } else {
      setGame({
        year: '',
        name: '',
        genre: '',
        platform: '',
        rating: '',
        hours: '',
        finished: false,
        playing: false
      });
    }
  }, [currentGame]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setGame({
      ...game,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(game);
  };

  return (
    <form onSubmit={handleSubmit}>
      <select name="year" value={game.year} onChange={handleChange} required>
        <option value="">Selecione o Ano</option>
        {years.map(year => <option key={year} value={year}>{year}</option>)}
      </select>
      <input type="text" name="name" placeholder="Nome do Jogo" value={game.name} onChange={handleChange} required />
      <select name="genre" value={game.genre} onChange={handleChange} required>
        <option value="">Selecione o Gênero</option>
        {genres.map(genre => <option key={genre} value={genre}>{genre}</option>)}
      </select>
      <select name="platform" value={game.platform} onChange={handleChange} required>
        <option value="">Selecione a Plataforma</option>
        {platforms.map(platform => <option key={platform} value={platform}>{platform}</option>)}
      </select>
      <input type="number" name="rating" placeholder="Nota" value={game.rating} onChange={handleChange} />
      <input type="number" name="hours" placeholder="Horas" value={game.hours} onChange={handleChange} />
      <label>
        Zerado:
        <input type="checkbox" name="finished" checked={game.finished} onChange={handleChange} />
      </label>
      <label>
        Jogando:
        <input type="checkbox" name="playing" checked={game.playing} onChange={handleChange} />
      </label>
      <div className="form-buttons">
        <button type="submit">Salvar</button>
        <button type="button" onClick={onCancel}>Cancelar</button>
      </div>
    </form>
  );
};

export default GameForm;
