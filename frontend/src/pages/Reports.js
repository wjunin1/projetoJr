import React, { useState, useEffect } from 'react';
import * as api from '../services/api';
import '../styles/Reports.css';

const Reports = () => {
  const [games, setGames] = useState([]);
  const [sortConfigs, setSortConfigs] = useState({
    platform: { key: 'platform', direction: 'ascending' },
    rating: { key: 'rating', direction: 'descending' },
    genre: { key: 'genre', direction: 'ascending' },
    year: { key: 'year', direction: 'ascending' }
  });

  useEffect(() => {
    api.getGames().then(response => {
      setGames(response.data);
    });
  }, []);

  const totalGames = games.length;
  const totalHours = games.reduce((acc, game) => acc + (game.hours || 0), 0);
  const finishedGames = games.filter(game => game.finished).length;

  const platformStats = games.reduce((acc, game) => {
    if (!acc[game.platform]) {
      acc[game.platform] = { total: 0, finished: 0 };
    }
    acc[game.platform].total++;
    if (game.finished) {
      acc[game.platform].finished++;
    }
    return acc;
  }, {});

  const ratingStats = games.reduce((acc, game) => {
    if (!acc[game.rating]) {
      acc[game.rating] = 0;
    }
    acc[game.rating]++;
    return acc;
  }, {});

  const genreStats = games.reduce((acc, game) => {
    if (!acc[game.genre]) {
      acc[game.genre] = { total: 0, hours: 0 };
    }
    acc[game.genre].total++;
    acc[game.genre].hours += game.hours || 0;
    return acc;
  }, {});
  
  // Estatísticas por ano
  const yearStats = games.reduce((acc, game) => {
    // Determina a categoria de ano
    const yearCategory = game.year < 1995 ? 'Até 1994' : game.year.toString();
    
    if (!acc[yearCategory]) {
      acc[yearCategory] = { total: 0, hours: 0, finished: 0 };
    }
    acc[yearCategory].total++;
    acc[yearCategory].hours += game.hours || 0;
    if (game.finished) {
      acc[yearCategory].finished++;
    }
    return acc;
  }, {});

  // Nova função para clique direto nas setas
  const handleSortDirectionClick = (event, table, key, direction) => {
    event.stopPropagation(); // Impede que o clique se propague para o cabeçalho
    
    setSortConfigs(prevConfigs => {
      const newConfigs = { ...prevConfigs };
      // Se já está nessa chave e direção, não faz nada
      if (newConfigs[table].key === key && newConfigs[table].direction === direction) {
        return prevConfigs;
      }
      
      // Define a nova chave e direção
      newConfigs[table].key = key;
      newConfigs[table].direction = direction;
      return newConfigs;
    });
  };

  // Função para obter as setas de ordenação com handlers de clique
  const getSortIndicator = (table, key) => {
    const isCurrentSortKey = sortConfigs[table].key === key;
    const currentDirection = sortConfigs[table].direction;
    
    return (
      <span className="sort-indicators">
        <span 
          title="Ordenar ascendente (A-Z, 0-9)"
          className={isCurrentSortKey && currentDirection === 'ascending' ? 'active-indicator' : 'inactive-indicator'}
          onClick={(e) => handleSortDirectionClick(e, table, key, 'ascending')}
        >
          ▲
        </span>
        <span 
          title="Ordenar descendente (Z-A, 9-0)"
          className={isCurrentSortKey && currentDirection === 'descending' ? 'active-indicator' : 'inactive-indicator'}
          onClick={(e) => handleSortDirectionClick(e, table, key, 'descending')}
        >
          ▼
        </span>
      </span>
    );
  };

  const requestSort = (table, key) => {
    setSortConfigs(prevConfigs => {
      const newConfigs = { ...prevConfigs };
      // Se já está ordenando por esta chave, inverte a direção
      if (newConfigs[table].key === key) {
        newConfigs[table].direction = newConfigs[table].direction === 'ascending' ? 'descending' : 'ascending';
      } else {
        // Se for uma nova chave, define ela com direção ascendente
        newConfigs[table].key = key;
        newConfigs[table].direction = 'ascending';
      }
      return newConfigs;
    });
  };

  // Função para ordenar as entradas das tabelas
  const getSortedEntries = (table, data) => {
    const config = sortConfigs[table];
    return Object.entries(data).sort((a, b) => {
      let aValue, bValue;
      
      if (config.key === table) {
        // Ordenando pela chave (nome da plataforma, nota, gênero, ano)
        aValue = a[0];
        bValue = b[0];
        
        // Tratamento especial para ordenação de anos
        if (table === 'year') {
          if (a[0] === 'Até 1994') return config.direction === 'ascending' ? -1 : 1;
          if (b[0] === 'Até 1994') return config.direction === 'ascending' ? 1 : -1;
        }
      } else {
        // Ordenando por uma propriedade do valor
        aValue = a[1][config.key];
        bValue = b[1][config.key];
      }
      
      // Conversão para números, se aplicável
      const aNum = !isNaN(aValue) ? Number(aValue) : aValue;
      const bNum = !isNaN(bValue) ? Number(bValue) : bValue;
      
      if (aNum < bNum) {
        return config.direction === 'ascending' ? -1 : 1;
      }
      if (aNum > bNum) {
        return config.direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });
  };

  const sortedPlatformEntries = getSortedEntries('platform', platformStats);
  const sortedRatingEntries = getSortedEntries('rating', ratingStats);
  const sortedGenreEntries = getSortedEntries('genre', genreStats);
  const sortedYearEntries = getSortedEntries('year', yearStats);

  return (
    <div className="reports-container">
      <h2 className="reports-title">Relatórios</h2>

      <div className="report-section">
        <h3 className="section-title">Visão Geral</h3>
        <div className="stats-cards">
          <div className="stat-card total-card">
            <div className="stat-value">{totalGames}</div>
            <div className="stat-label">Total de Jogos</div>
          </div>
          <div className="stat-card hours-card">
            <div className="stat-value">{totalHours}</div>
            <div className="stat-label">Horas Jogadas</div>
          </div>
          <div className="stat-card finished-card">
            <div className="stat-value">{finishedGames}</div>
            <div className="stat-label">Jogos Zerados</div>
          </div>
          <div className="stat-card completion-card">
            <div className="stat-value">{totalGames ? ((finishedGames / totalGames) * 100).toFixed(1) : '0.0'}%</div>
            <div className="stat-label">Conclusão</div>
          </div>
        </div>
      </div>

      <div className="report-section">
        <h3 className="section-title">Jogos por Ano de Lançamento</h3>
        <div className="table-responsive">
          <table className="report-table">
            <thead>
              <tr>
                <th className="sortable" onClick={() => requestSort('year', 'year')}>
                  Ano{getSortIndicator('year', 'year')}
                </th>
                <th className="sortable" onClick={() => requestSort('year', 'total')}>
                  Total de Jogos{getSortIndicator('year', 'total')}
                </th>
                <th className="sortable" onClick={() => requestSort('year', 'finished')}>
                  Jogos Zerados{getSortIndicator('year', 'finished')}
                </th>
                <th className="sortable" onClick={() => requestSort('year', 'percentage')}>
                  % Concluído{getSortIndicator('year', 'percentage')}
                </th>
                <th className="sortable" onClick={() => requestSort('year', 'hours')}>
                  Horas Jogadas{getSortIndicator('year', 'hours')}
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedYearEntries.map(([year, stats]) => {
                const percentage = ((stats.finished / stats.total) * 100).toFixed(1);
                stats.percentage = parseFloat(percentage); // Adicionamos para ordenação
                return (
                  <tr key={year}>
                    <td>{year}</td>
                    <td>{stats.total}</td>
                    <td>{stats.finished}</td>
                    <td>
                      <div className="progress-container">
                        <div 
                          className="progress-bar" 
                          style={{ width: `${percentage}%` }}
                        ></div>
                        <span className="progress-text">{percentage}%</span>
                      </div>
                    </td>
                    <td>{stats.hours}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="report-section">
        <h3 className="section-title">Plataformas</h3>
        <div className="table-responsive">
          <table className="report-table">
            <thead>
              <tr>
                <th className="sortable" onClick={() => requestSort('platform', 'platform')}>
                  Plataforma{getSortIndicator('platform', 'platform')}
                </th>
                <th className="sortable" onClick={() => requestSort('platform', 'total')}>
                  Total de Jogos{getSortIndicator('platform', 'total')}
                </th>
                <th className="sortable" onClick={() => requestSort('platform', 'finished')}>
                  Jogos Zerados{getSortIndicator('platform', 'finished')}
                </th>
                <th className="sortable" onClick={() => requestSort('platform', 'percentage')}>
                  % Zerados{getSortIndicator('platform', 'percentage')}
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedPlatformEntries.map(([platform, stats]) => {
                const percentage = ((stats.finished / stats.total) * 100).toFixed(1);
                stats.percentage = parseFloat(percentage); // Adicionamos para ordenação
                return (
                  <tr key={platform}>
                    <td>{platform}</td>
                    <td>{stats.total}</td>
                    <td>{stats.finished}</td>
                    <td>
                      <div className="progress-container">
                        <div 
                          className="progress-bar" 
                          style={{ width: `${percentage}%` }}
                        ></div>
                        <span className="progress-text">{percentage}%</span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="report-section">
        <h3 className="section-title">Notas</h3>
        <div className="table-responsive">
          <table className="report-table">
            <thead>
              <tr>
                <th className="sortable" onClick={() => requestSort('rating', 'rating')}>
                  Nota{getSortIndicator('rating', 'rating')}
                </th>
                <th className="sortable" onClick={() => requestSort('rating', 'total')}>
                  Total de Jogos{getSortIndicator('rating', 'total')}
                </th>
                <th>Percentual %</th>
              </tr>
            </thead>
            <tbody>
              {sortedRatingEntries.map(([rating, total]) => {
                const percentage = ((total / totalGames) * 100).toFixed(1);
                return (
                  <tr key={rating}>
                    <td>{rating}</td>
                    <td>{total}</td>
                    <td>
                      <div className="progress-container">
                        <div 
                          className="progress-bar rating-bar" 
                          style={{ 
                            width: `${percentage}%`,
                            backgroundColor: `hsl(${rating * 12}, 70%, 50%)`
                          }}
                        ></div>
                        <span className="progress-text">{percentage}%</span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="report-section">
        <h3 className="section-title">Gêneros</h3>
        <div className="table-responsive">
          <table className="report-table">
            <thead>
              <tr>
                <th className="sortable" onClick={() => requestSort('genre', 'genre')}>
                  Gênero{getSortIndicator('genre', 'genre')}
                </th>
                <th className="sortable" onClick={() => requestSort('genre', 'total')}>
                  Total de Jogos{getSortIndicator('genre', 'total')}
                </th>
                <th className="sortable" onClick={() => requestSort('genre', 'hours')}>
                  Horas Jogadas{getSortIndicator('genre', 'hours')}
                </th>
                <th>Distribuição</th>
              </tr>
            </thead>
            <tbody>
              {sortedGenreEntries.map(([genre, stats]) => {
                const percentage = ((stats.total / totalGames) * 100).toFixed(1);
                return (
                  <tr key={genre}>
                    <td>{genre}</td>
                    <td>{stats.total}</td>
                    <td>{stats.hours}</td>
                    <td>
                      <div className="progress-container">
                        <div 
                          className="progress-bar genre-bar" 
                          style={{ width: `${percentage}%` }}
                        ></div>
                        <span className="progress-text">{percentage}%</span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Reports;
