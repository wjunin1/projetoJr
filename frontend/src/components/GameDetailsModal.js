import React from 'react';

const GameDetailsModal = ({ game, onClose }) => {
  if (!game) {
    return null;
  }

  return (
    <div className="details-modal-content">
      <h2>Detalhes do Jogo</h2>
      <div className="details-grid">
        <div><strong>Nome:</strong> {game.name}</div>
        <div><strong>Ano de lançamento:</strong> {game.year}</div>
        <div><strong>Gênero:</strong> {game.genre || '-'}</div>
        <div><strong>Plataforma:</strong> {game.platform || '-'}</div>
        <div><strong>Nota:</strong> {game.rating ?? '-'}</div>
        <div><strong>Horas jogadas:</strong> {game.hours ?? 0}</div>
        <div><strong>Zerado:</strong> {game.finished ? 'Sim' : 'Não'}</div>
        <div><strong>Ano jogado:</strong> {game.playedYear || '-'}</div>
      </div>
      <div className="form-buttons">
        <button type="button" onClick={onClose}>Fechar</button>
      </div>
    </div>
  );
};

export default GameDetailsModal;
