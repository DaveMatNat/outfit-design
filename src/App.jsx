import { useState, useEffect } from 'react'
import './App.css'
import Randomize from './components/Randomize'
import Avatar from './components/Avatar'
import ThemeSwitcher from './components/ThemeSwitcher'

import outfits from './data/outfits.json'

function App() {
  const [options, setOptions] = useState({})
  const [indexes, setIndexes] = useState({})
  const [isRandomizing, setIsRandomizing] = useState(false)

  useEffect(() => {
    setOptions(outfits);
    setIndexes(
      Object.fromEntries(
        Object.keys(outfits).map((cat) => [cat, 0])
      )
    );
  }, []);

  const randomize = () => {
    if (!isRandomizing) {
      setIsRandomizing(true);

      // Start fade out transition
      setTimeout(() => {
        const newIndexes = {};
        for (let cat in options) {
          newIndexes[cat] = Math.floor(Math.random() * options[cat].length)
        }
        setIndexes(newIndexes);

        // End transition after images have time to load
        setTimeout(() => {
          setIsRandomizing(false);
        }, 300);
      }, 150);
    }
  }

  const countCombinations = () => {
    let count = 1;
    for (let cat in options) {
      count *= options[cat].length
    }
    return count
  }

  const spice = { color: 'var(--color-accent)' }

  return (
    <>
      <ThemeSwitcher />
      <div className='App'>
        <h1>design<span style={spice}>UR</span>outfit</h1>
        <h2>Total Combinations: <span style={spice}>{countCombinations()}</span></h2>
      <Randomize randomize={randomize} isRandomizing={isRandomizing} />
      <Avatar
        options={options}
        indexes={indexes}
        setIndexes={setIndexes}
        isRandomizing={isRandomizing}
      />
    </div >
    </>
  )
}

export default App;