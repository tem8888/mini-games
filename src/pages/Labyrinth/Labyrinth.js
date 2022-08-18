import { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { setStartGame, setEndGame, setSelectedCell, resetState } from './labyrinthReducer';
import Header from '../../components/header/Header';
import PathGenerator from './PathGenerator';
import Field from './Field';
import Button from '../../components/button/Button';
import styles from './labyrinth.module.css';

export default function Labyrinth() {
  console.log('Labyrinth');

  const dispatch = useDispatch();
  const isNewGame = useSelector((state) => state.labyrinth.isNewGame); // => boolean
  const isPathBuild = useSelector((state) => state.labyrinth.isPathBuild); // => boolean
  const field = useSelector((state) => state.labyrinth.field); // => [[...],[...], ...]
  const selectedCell = useSelector((state) => state.labyrinth.selectedCell); // => id
  const position = useSelector((state) => state.labyrinth.position); // => {current/initial: {row: number, col: number}}

  useEffect(() => {
    // В случае размонтирования компонента сбрасываем стейт
    return () => dispatch(resetState());
  }, [dispatch]);

  const handleGameStart = () => {
    // Пока не завершилась прошлая игра, новую начать нельзя
    if (!isPathBuild && !isNewGame) {
      dispatch(setStartGame());
    }
  };

  const handleCellClick = useCallback(
    (e) => {
      // Блокируем нажатие на ячейку до тех пор, пока не сгенерится весь маршрут
      // и пока включен флаг текущей игры
      if (!isPathBuild && isNewGame) {
        dispatch(setSelectedCell(e.currentTarget.id));
        dispatch(setEndGame());
      }
    },
    [isNewGame, isPathBuild, dispatch],
  );

  return (
    <>
      <Header title={'Игра Лабиринт'} />
      <Button onClick={handleGameStart}>New Game</Button>
      <div className={styles.wrapper}>
        <Field
          field={field}
          selectedCell={selectedCell}
          position={position}
          isNewGame={isNewGame}
          isPathBuild={isPathBuild}
          handleCellClick={handleCellClick}
        />
        <PathGenerator isNewGame={isNewGame} />
      </div>
    </>
  );
}
