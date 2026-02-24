import React from 'react';

const GameList = ({ games, onEdit, onDetails, onDelete, onAddHours, requestSort, sortConfig }) => {
  const getSortIndicator = (key) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === 'ascending' ? ' ▲' : ' ▼';
    }
    return null;
  };

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th className="sortable" onClick={() => requestSort('year')}>Ano{getSortIndicator('year')}</th>
            <th className="sortable" onClick={() => requestSort('name')}>Jogo{getSortIndicator('name')}</th>
            <th className="sortable" onClick={() => requestSort('genre')}>Gênero{getSortIndicator('genre')}</th>
            <th className="sortable" onClick={() => requestSort('platform')}>Plataforma{getSortIndicator('platform')}</th>
            <th className="sortable" onClick={() => requestSort('rating')}>Nota{getSortIndicator('rating')}</th>
            <th className="sortable" onClick={() => requestSort('hours')}>Horas{getSortIndicator('hours')}</th>
            <th>Zerado</th>
            <th className="sortable" onClick={() => requestSort('playedYear')}>Ano jogado{getSortIndicator('playedYear')}</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {games.map((game) => (
            <tr key={game.id}>
              <td>{game.year}</td>
              <td>{game.name}</td>
              <td>{game.genre}</td>
              <td>{game.platform}</td>
              <td>{game.rating}</td>
              <td>{game.hours}</td>
              <td>{game.finished ? 'Sim' : 'Não'}</td>
              <td>{game.playedYear || '-'}</td>
              <td>
                <button className="add-hours" onClick={() => onAddHours(game)}>+ Hora</button>
                <button className="details" onClick={() => onDetails(game)}>Detalhes</button>
                <button className="edit" onClick={() => onEdit(game)}>Editar</button>
                <button className="delete" onClick={() => onDelete(game.id)}>Deletar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GameList;
