import { useEffect, useState } from 'react';
import './App.css';

const WOT_STATISTIC = 'WOT_STATISTIC';

function App() {
  const [average, setAverage] = useState(null);
  const [last, setLast] = useState('');

  useEffect(() => {
    const lastAverage = localStorage.getItem(WOT_STATISTIC);
    if (lastAverage) {
      setAverage(lastAverage);
    }
  }, []);

  useEffect(() => {
    if (average !== null) {
      localStorage.setItem(WOT_STATISTIC, average);
    }
  }, [average]);

  const handleAmountChange = ({ target: { value } }) => {
    if (/^[0-9]*$/.test(value)) {
      setLast(value);
    }
  };

  const handleKeyDown = ({ key }) => {
    if (key === 'Enter') {
      if (!average) {
        setAverage(last);
      } else {
        setAverage(Math.ceil((Number(average) + Number(last)) / 2));
      }
      setLast('');
    }
  };

  const handleClearClick = () => {
    setAverage('');
    setLast('');
  };

  return (
    <div className='app'>
      <div className='app__widget'>
          <div className='app__widget__display'>
            Средний опыт: {average || 0}
          </div>
          <input
            type="text"
            value={last}
            onChange={handleAmountChange}
            onKeyDown={handleKeyDown}
            className='app__widget__input'
          />
          <button
            type='button'
            onClick={handleClearClick}
            className='app__widget__clear'
          >
            Отчистить
          </button>
      </div>
    </div>
  );
}

export default App;
