import React, { useState, useEffect, useRef, useMemo } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Modal from 'react-modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as api from './services/api';
import GameList from './components/GameList';
import GameForm from './components/GameForm';
import Menu from './components/Menu';
import Home from './pages/Home';
import Reports from './pages/Reports';
import ConfirmationModal from './components/ConfirmationModal';
import './App.css';

Modal.setAppElement('#root');

function App() {
  const [games, setGames] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [confirmationModalIsOpen, setConfirmationModalIsOpen] = useState(false);
  const [gameToDelete, setGameToDelete] = useState(null);
  const [currentGame, setCurrentGame] = useState(null);
  const fileInputRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'hours', direction: 'descending' });

  useEffect(() => {
    fetchGames();
  }, []);

  const fetchGames = async () => {
    const response = await api.getGames();
    setGames(response.data);
  };

  const handleSave = async (game) => {
    try {
      if (game.id) {
        await api.updateGame(game.id, game);
        toast.success('Jogo atualizado com sucesso!');
      } else {
        await api.createGame(game);
        toast.success('Jogo adicionado com sucesso!');
      }
      fetchGames();
      setModalIsOpen(false);
      setCurrentGame(null);
    } catch (error) {
      toast.error('Erro ao salvar o jogo.');
    }
  };

  const handleEdit = (game) => {
    setCurrentGame(game);
    setModalIsOpen(true);
  };

  const handleDelete = (id) => {
    setGameToDelete(id);
    setConfirmationModalIsOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await api.deleteGame(gameToDelete);
      toast.success('Jogo deletado com sucesso!');
      fetchGames();
      setConfirmationModalIsOpen(false);
      setGameToDelete(null);
    } catch (error) {
      toast.error('Erro ao deletar o jogo.');
    }
  };

  const openModal = () => {
    setCurrentGame(null);
    setModalIsOpen(true);
  }

  const closeModal = () => {
    setModalIsOpen(false);
  }

  const handleImportClick = () => {
    fileInputRef.current.click();
  };

  const handleFileImport = async (event) => {
    const file = event.target.files[0];
    if (file) {
      try {
        await api.uploadFile(file);
        toast.success('Jogos importados com sucesso!');
        fetchGames();
      } catch (error) {
        toast.error('Falha ao importar o arquivo.');
      }
    }
  };

  const handleDownloadTemplate = async () => {
    try {
      const response = await api.downloadTemplate();
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'template.xlsx');
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      toast.error('Falha ao baixar o template.');
    }
  };

  const sortedAndFilteredGames = useMemo(() => {
    let filteredGames = games.filter(game =>
      game.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (sortConfig.key) {
      filteredGames.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }

    return filteredGames;
  }, [games, searchTerm, sortConfig]);

  const requestSort = (key) => {
    let direction = 'ascending';
    // Se já estiver ordenando pela mesma chave, inverte a direção
    if (sortConfig.key === key) {
      direction = sortConfig.direction === 'ascending' ? 'descending' : 'ascending';
    } 
    // Se for uma nova chave, a direção padrão é ascendente (já definida)
    setSortConfig({ key, direction });
  };

  return (
    <Router>
      <div className="App">
        <ToastContainer />
        <header className="App-header">
          <h1>Controle de Jogos</h1>
          <Menu />
        </header>
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add" element={
              <>
                <div className="toolbar">
                  <div className="search-container">
                    <input
                      type="text"
                      placeholder="Buscar por nome..."
                      className="search-input"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <button onClick={openModal} className="add-button">Adicionar Jogo</button>
                  <button onClick={handleImportClick} className="import-button">Importar Excel</button>
                  <button onClick={handleDownloadTemplate} className="download-button">Baixar Modelo</button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                    accept=".xlsx, .xls"
                    onChange={handleFileImport}
                  />
                </div>
                <GameList 
                  games={sortedAndFilteredGames} 
                  onEdit={handleEdit} 
                  onDelete={handleDelete} 
                  requestSort={requestSort}
                  sortConfig={sortConfig}
                />
              </>
            } />
            <Route path="/reports" element={<Reports games={games} />} />
          </Routes>
        </main>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Game Modal"
          className="modal"
          overlayClassName="overlay"
        >
          <GameForm currentGame={currentGame} onSave={handleSave} onCancel={closeModal} />
        </Modal>
        <ConfirmationModal
          isOpen={confirmationModalIsOpen}
          onRequestClose={() => setConfirmationModalIsOpen(false)}
          onConfirm={confirmDelete}
          message="Você tem certeza que deseja deletar este jogo? Esta ação não pode ser desfeita."
        />
      </div>
    </Router>
  );
}

export default App;
