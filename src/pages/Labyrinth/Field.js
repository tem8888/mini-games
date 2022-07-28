import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { MdEmojiPeople, MdDirectionsRun } from 'react-icons/md';
import { BsFillHandThumbsDownFill, BsFillHandThumbsUpFill } from 'react-icons/bs';

import { setEndGame, setSelectedCell } from './labyrinthReducer';
import { getCellId } from './utils';
import styles from './labyrinth.module.css';

const Field = () => {
  const dispatch = useDispatch();
  const field = useSelector((state) => state.labyrinth.field); // => [[...],[...], ...]
  const isNewGame = useSelector((state) => state.labyrinth.isNewGame); // => boolean
  const isPathBuild = useSelector((state) => state.labyrinth.isPathBuild); // => boolean
  const selectedCell = useSelector((state) => state.labyrinth.selectedCell); // => id
  const position = useSelector((state) => state.labyrinth.position); // => {current/initial: {row: number, col: number}}

  let initialCellId = getCellId(position.initial);
  let currentCellId = getCellId(position.current);

  const handleCellClick = (e) => {
    // Блокируем нажатие на ячейку до тех пор, пока не сгенерится весь маршрут
    // и пока включен флаг текущей игры
    if (!isPathBuild && isNewGame) {
      dispatch(setSelectedCell(e.currentTarget.id));
      dispatch(setEndGame());
    }
  };

  const renderEndGameMessage = (cellId, initialId, currentId) => {
    if (!selectedCell) {
      // Стартовый вид
      return (
        cellId === initialId && <MdDirectionsRun size={80} className={styles.thumbIconYellow} />
      );
    }
    if (selectedCell === currentId) {
      // Если игрок угадал ячейку
      return (
        <div className={styles.endGameMessage}>
          {selectedCell === cellId && (
            <BsFillHandThumbsUpFill
              size={30}
              className={`${styles.thumbIcon} ${styles.thumbIconGreen}`}
            />
          )}
          {cellId === currentId && (
            <>
              <MdEmojiPeople size={80} className={styles.thumbIconGreen} />
              <span style={{ display: 'block' }}>Graz!</span>
            </>
          )}
        </div>
      );
    } else {
      // Если игрок ошибся в выборе ячейки
      return (
        <div className={styles.endGameMessage}>
          {selectedCell === cellId && (
            <BsFillHandThumbsDownFill
              size={30}
              className={`${styles.thumbIcon} ${styles.thumbIconRed}`}
            />
          )}
          {cellId === currentId && (
            <>
              <MdEmojiPeople size={80} className={styles.thumbIconRed} />
              <span style={{ display: 'block' }}>I'm Here!</span>
            </>
          )}
        </div>
      );
    }
  };

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th className="hide"></th>
          {field[0].map((_, index) => {
            return <th key={index}>{index + 1}</th>;
          })}
        </tr>
      </thead>
      <tbody>
        {field.map((row, rowIndex) => {
          return (
            <tr key={rowIndex}>
              <th>{rowIndex + 1}</th>
              {row.map((_, colIndex) => {
                /* Каждой ячейке присваиваем порядковый номер */
                let cellId = getCellId({
                  row: rowIndex + 1,
                  col: colIndex + 1,
                });
                return (
                  <td key={cellId} id={cellId} onClick={handleCellClick}>
                    {renderEndGameMessage(cellId, initialCellId, currentCellId)}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Field;
