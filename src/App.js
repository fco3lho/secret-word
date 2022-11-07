//CSS
import './App.css';

//React
import { useCallback, useEffect, useState } from 'react';

//Data
import {wordsList} from './data/words'

//Components
import StartScreen from './components/StartScreen';
import Game from './components/Game';
import GameOver from './components/GameOver';

const stages = [
  {id: 1, name: "start"},
  {id: 2, name: "game"},
  {id: 3, name: "end"}
]

function App() {
  const [gameStage, setGameStage] = useState(stages[0].name)
  const [words] = useState(wordsList)

  //Função que faz com que, ao clicar no botão 'Começar jogo', inicie o jogo
  const startGame = () => {
    setGameStage(stages[1].name)
  }

  //Processa as letras inseridas pelo usuário
  const verifyLetter = () => {
    setGameStage(stages[2].name)
  }

  //Reinicia o jogo
  const retry = () => {
    setGameStage(stages[0].name)
  }
  
  return (
    <div className="App">
      {/* Se 'gameStage' estiver no stage 0 ou no stage de 'start', então executa 'StartScreen' */}
      {gameStage === 'start' && <StartScreen startGame={startGame}/>} 

      {/* Se 'gameStage' estiver no stage 1 ou no stage de 'game', então executa 'Game' */}
      {gameStage === 'game' && <Game verifyLetter={verifyLetter}/>}

      {/* Se 'gameStage' estiver no stage 2 ou no stage de 'end', então executa 'GameOver' */}
      {gameStage === 'end' && <GameOver retry={retry}/>}
    </div>
  );
}

export default App;
