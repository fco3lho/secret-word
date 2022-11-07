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

  const [pickedWord, setPickedWord] = useState("")
  const [pickedCategory, setPickedCategory] = useState("")
  const [letters, setLetters] = useState([])

  const pickWordAndCategory = () => {
    //Pegando uma categoria aleatoria
    const categories = Object.keys(words)
    const category = categories[Math.floor(Math.random() * Object.keys(categories).length)]
    console.log(category)

    //Pegando uma palavra aleatoria dentro da categoria
    const word = words[category][Math.floor(Math.random() * words[category].length)]
    console.log(word)
    return {word, category}
  }

  //Função que faz com que, ao clicar no botão 'Começar jogo', inicie o jogo
  const startGame = () => {
    //Pega uma palavra e uma categoria
    const {word, category} = pickWordAndCategory()

    //Cria um array de letras
    let wordLetters = word.split("")
    wordLetters = wordLetters.map((l) => l.toLowerCase())

    //Setando estados
    setPickedWord(word)
    setPickedCategory(category)
    setLetters(letters)
    
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
