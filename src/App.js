//CSS
import './App.css';

//React
import { useCallback, useEffect, useState } from "react";

//Data
import {wordsList} from './data/words'

//Components
import StartScreen from './components/StartScreen';
import Game from './components/Game';
import GameOver from './components/GameOver';

const stages = [
  {id: 1, name: "start"},
  {id: 2, name: "game"},
  {id: 3, name: "end"},
]

const numberGuesses = 3

function App() {
  const [gameStage, setGameStage] = useState(stages[0].name)
  const [words] = useState(wordsList)

  const [pickedWord, setPickedWord] = useState("")
  const [pickedCategory, setPickedCategory] = useState("")
  const [letters, setLetters] = useState([])

  const [guessedLetters, setGuessedLetters] = useState([]) 
  const [wrongLetters, setWrongLetters] = useState([])
  const [guesses, setGuesses] = useState(numberGuesses)
  const [score, setScore] = useState(0)

  const pickWordAndCategory = useCallback(() => {
    //Pegando uma categoria aleatoria
    const categories = Object.keys(words)
    const category = categories[Math.floor(Math.random() * Object.keys(categories).length)]

    //Pegando uma palavra aleatoria dentro da categoria
    const word = words[category][Math.floor(Math.random() * words[category].length)]
    return {category, word}
  }, [words])

  //Função que faz com que, ao clicar no botão 'Começar jogo', inicie o jogo
  const startGame = useCallback(() => {
    //Limpando as letras
    clearLetterStates()

    //Pega uma palavra e uma categoria
    const {category, word} = pickWordAndCategory()

    //Cria um array de letras
    let wordLetters = word.split("")
    wordLetters = wordLetters.map((l) => l.toLowerCase())

    console.log(wordLetters)

    //Setando estados
    setPickedWord(word)
    setPickedCategory(category)
    setLetters(wordLetters)
    
    setGameStage(stages[1].name)
  }, [pickWordAndCategory])

  //Processa as letras inseridas pelo usuário
  const verifyLetter = (letter) => {
    const normalizedLetter = letter.toLowerCase()

    //Checando se a letra já foi utiliza  da anteriormente
    if(guessedLetters.includes(normalizedLetter) || wrongLetters.includes(normalizedLetter)){
      return
    }

    //Empurra letra adivinhada ou remove um palpite
    if(letters.includes(normalizedLetter)){
      setGuessedLetters((actualGuessedLetters) => [
        ...actualGuessedLetters,
        normalizedLetter
      ])
    } else {
      setWrongLetters((actualWrongLetters) => [
        ...actualWrongLetters,
        normalizedLetter
      ])

      setGuesses((actualGuesses) => actualGuesses - 1)
    }
  }

  const clearLetterStates = () => {
    setGuessedLetters([])
    setWrongLetters([])
  }

  //Checa se as chances acabaram
  useEffect(() => {
    if(guesses <= 0) {
      //Reseta todos os estados
      clearLetterStates()

      setGameStage(stages[2].name)
    }
  }, [guesses])

  //Checa a condição de vitória
  useEffect(() => {
    const uniqueLetters = [...new Set(letters)]
    
    //Condição de vitória
    if(guessedLetters.length === uniqueLetters.length){
      //Adiciona pontuação
      setScore((actualScore) => (actualScore += 100))

      //Reinicia o jogo
      startGame()
    }

  }, [guessedLetters, letters, startGame])

  //Reinicia o jogo
  const retry = () => {
    setScore(0)
    setGuesses(numberGuesses)
    setGameStage(stages[0].name)
  }
  
  return (
    <div className="App">
      {/* Se 'gameStage' estiver no stage 0 ou no stage de 'start', então executa 'StartScreen' */}
      {gameStage === 'start' && <StartScreen startGame={startGame}/>} 

      {/* Se 'gameStage' estiver no stage 1 ou no stage de 'game', então executa 'Game' */}
      {gameStage === 'game' && <Game 
        verifyLetter={verifyLetter} 
        pickedWord={pickedWord} 
        pickedCategory={pickedCategory} 
        letters={letters} 
        guessedLetters={guessedLetters}
        wrongLetters={wrongLetters}
        guesses={guesses}
        score={score}
      />}

      {/* Se 'gameStage' estiver no stage 2 ou no stage de 'end', então executa 'GameOver' */}
      {gameStage === 'end' && <GameOver retry={retry} score={score}/>}
    </div>
  );
}

export default App;
