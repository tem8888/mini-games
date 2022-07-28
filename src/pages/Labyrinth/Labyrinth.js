import { useSelector, useDispatch } from 'react-redux';

import { setStartGame } from './labyrinthReducer';
import Header from '../../components/header/Header';
import PathGenerator from './PathGenerator';
import Field from './Field';
import Button from '../../components/button/Button';
import styles from './labyrinth.module.css';

export default function Labyrinth() {
  const dispatch = useDispatch();
  const isNewGame = useSelector((state) => state.labyrinth.isNewGame); // => boolean
  const isPathBuild = useSelector((state) => state.labyrinth.isPathBuild); // => boolean

  const handleGameStart = () => {
    // Пока не завершилась прошлая игра, новую начать нельзя
    if (!isPathBuild && !isNewGame) {
      dispatch(setStartGame());
    }
  };

  return (
    <>
      <Header title={'Игра Лабиринт'} />
      <Button onClick={handleGameStart}>New Game</Button>
      <div className={styles.wrapper}>
        <Field />
        <PathGenerator isNewGame={isNewGame} />
      </div>
    </>
  );
}
