import './App.css';
import grava2x from './assets/grava2x.png';
import { useState } from 'react';

function App() {
  const [names, setNames] = useState(''); 
  const [elite, setElite] = useState([]); 
  const [resto, setResto] = useState([]); 
  const [loading, setLoading] = useState(false); 
  const [sorted, setSorted] = useState(false); 
  const [progress, setProgress] = useState(0); 
  const [error, setError] = useState(''); // Estado para armazenar a mensagem de erro

  const handleSortTeams = () => {
    setError(''); // Limpa o erro antes de iniciar a validação
    let nameList = names.split(',').map(name => name.trim()).filter(Boolean);

    // Validação: pelo menos 2 nomes e número par de nomes
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

    // Inicia o progresso da barra
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
      nameList = nameList.sort(() => Math.random() - 0.5);

      // Divide a lista em dois times
      const mid = Math.ceil(nameList.length / 2);
      const elite = nameList.slice(0, mid);
      const resto = nameList.slice(mid);

      // Atualiza os times no estado
      setElite(elite);
      setResto(resto);
      setLoading(false);  
      setSorted(true); 
    }, 3000);  
  };

  return (
    <>
      <div className='content-main p-8 flex flex-col w-[70vw] h-[80vh]'>
        <div>
          <img src={grava2x} alt="logo" className='w-40 m-auto' />
          <h1 className='font-bold text-white text-center text-4xl'>Sorteador de times</h1>
          <input 
            className='rounded w-full text-center align-middle p-4 mt-6 hover:border-y-neutral-50'
            value={names}
            onChange={(e) => setNames(e.target.value)}
            placeholder="Digite os nomes separados por vírgula"
          />
          <button
            className='mt-4 align-middle justify-center w-full bg-blue-600 text-white p-2 rounded'
            onClick={handleSortTeams}
          >
            Sortear
          </button>

          {error && <p className="text-red-600 text-center mt-4">{error}</p>} {/* Exibe a mensagem de erro */}
        </div>
        
        <div className='mt-8 flex-grow'>
          {loading ? (
            <div className="w-[40vw] m-auto mt-20 bg-gray-300 rounded-full h-4">
              <div 
                className="bg-blue-600 h-4 rounded-full" 
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          ) : sorted && (
            <>
              <h2 className='text-center mt-12 text-2xl font-bold text-white'>ELITE</h2>
              <p className='text-center text-white'>
                {elite.join(', ')}
              </p>

              <h2 className='text-center text-2xl font-bold text-white mt-4'>RESTO</h2>
              <p className='text-center text-white'>
                {resto.join(', ')}
              </p>
            </>
          )}
        </div>

        <div className='flex flex-col'>
          <p className='font-mono text-center'>feito por João Samuel ⚡</p>
          <p className='text-center text-[0.5rem] opacity-50 font-thin mt-4'>sorteio (possivelmente) manipulado</p>
        </div>
      </div>
    </>
  );
}

export default App;