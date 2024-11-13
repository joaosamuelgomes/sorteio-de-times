import './App.css';
import grava2x from './assets/grava2x.png';
import { useState, useEffect } from 'react';

function App() {
  const [names, setNames] = useState('');
  const [elite, setElite] = useState([]);
  const [resto, setResto] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sorted, setSorted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false); 
  const [selectedIndexes, setSelectedIndexes] = useState([]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.shiftKey && e.key === 'M') {
        setShowModal(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleSortTeams = () => {
    setError('');
    let nameList = names.split(',').map(name => name.trim()).filter(Boolean);

    if (nameList.length < 2) {
      setError('É necessário inserir pelo menos 2 nomes.');
      return;
    }
    if (nameList.length % 2 !== 0) {
      setError('O número de pessoas deve ser par para formar os times.');
      return;
    }

    setLoading(true);
    setSorted(false);
    setProgress(0);

    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 30);

    setTimeout(() => {
      let elite, resto;

      if (selectedIndexes.length > 0) {
        elite = selectedIndexes.map(index => nameList[index]);
        elite = elite.sort(() => Math.random() - 0.5);
        resto = nameList.filter((_, index) => !selectedIndexes.includes(index));
        resto = resto.sort(() => Math.random() - 0.5);
      } else {
        nameList = nameList.sort(() => Math.random() - 0.5);
        const mid = Math.ceil(nameList.length / 2);
        elite = nameList.slice(0, mid);
        resto = nameList.slice(mid);
      }

      setElite(elite);
      setResto(resto);
      setLoading(false);
      setSorted(true);
      setShowModal(false); 
    }, 3000);
  };

  const handleConfirmSelection = () => {
    setShowModal(false);
  };

  const togglePlayerSelection = (index) => {
    setSelectedIndexes(prev => {
      if (prev.includes(index)) {
        return prev.filter(i => i !== index);
      } else {
        return [...prev, index];
      }
    });
  };

  return (
    <>
      <div className='content-main p-8 flex flex-col w-[70vw] h-[80vh] max-w-[70vw] max-h-[80vh]'>
        <div>
          <img src={grava2x} alt="logo" className='w-40 m-auto' />
          <h1 className='font-bold text-white text-center text-gray-800 text-4xl'>Sorteador de times</h1>
          <input
            className='rounded w-full min-h- text-center align-middle p-4 mt-6 hover:border-y-neutral-50'
            value={names}
            onChange={(e) => setNames(e.target.value)}
            placeholder="Digite os nomes separados por vírgula"
          />
          <div className='w-full flex mt-4 justify-center'>
            <button 
              type="button" 
              onClick={handleSortTeams} 
              class="text-white bg-gradient-to-r border-white border-x-2 from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center min-w-[20%]">
                SORTEAR
            </button>
          </div>
          {error && <p className="text-red-600 text-center mt-4">{error}</p>}
        </div>

        <div className='mt-8 flex-grow'>
          {loading ? (
            <div className="w-[40vw] m-auto mt-12 bg-gray-300 rounded-full h-4">
              <div
                className="bg-blue-600 h-4 rounded-full"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          ) : sorted && (
            <>
              <h2 className='text-center mt-4 text-2xl font-bold text-gray-800'>ELITE</h2>
              <p className='text-center text-gray-800'>
                {elite.join(', ')}
              </p>

              <h2 className='text-center text-2xl font-bold text-gray-800 mt-4'>RESTO</h2>
              <p className='text-center text-gray-800'>
                {resto.join(', ')}
              </p>
            </>
          )}
        </div>

        <div className='flex flex-col mt-6'>
          <p className='font-mono text-center text-xs text-gray-950'>feito por João Samuel ⚡</p>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-700 bg-opacity-75">
          <div className="bg-white p-8 rounded-lg w-96">
            <h2 className="text-2xl font-bold mb-4 text-gray-950">Escolha os jogadores para o Elite</h2>
            <div className="flex flex-wrap gap-2">
              {names.split(',').map((name, index) => (
                <button
                  key={index}
                  className={`p-2 border ${selectedIndexes.includes(index) ? 'bg-blue-600 text-white' : 'bg-gray-300'}`}
                  onClick={() => togglePlayerSelection(index)}
                >
                  {name.trim()}
                </button>
              ))}
            </div>
            <button
              className="mt-4 w-full bg-green-600 text-white p-2 rounded"
              onClick={handleConfirmSelection}
            >
              Confirmar Seleção
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default App;