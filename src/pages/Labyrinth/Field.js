import React from 'react';
import PropTypes from 'prop-types';
import { MdEmojiPeople, MdDirectionsRun } from 'react-icons/md';
import { BsFillHandThumbsDownFill, BsFillHandThumbsUpFill } from 'react-icons/bs';

import { getCellId } from './utils';
import styles from './labyrinth.module.css';

const Field = (props) => {
  console.log('Field');

  let initialCellId = getCellId(props.position.initial);
  let currentCellId = getCellId(props.position.current);

  const renderEndGameMessage = (cellId, initialId, currentId) => {
    if (!props.selectedCell) {
      // Стартовый вид
      return (
        cellId === initialId && <MdDirectionsRun size={80} className={styles.thumbIconYellow} />
      );
    }
    if (props.selectedCell === currentId) {
      // Если игрок угадал ячейку
      return (
        <div className={styles.endGameMessage}>
          {props.selectedCell === cellId && (
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
          {props.selectedCell === cellId && (
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
          {props.field[0].map((_, index) => {
            return <th key={index}>{index + 1}</th>;
          })}
        </tr>
      </thead>
      <tbody>
        {props.field.map((row, rowIndex) => {
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
                  <td key={cellId} id={cellId} onClick={props.handleCellClick}>
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

export default React.memo(Field);

Field.propTypes = {
  field: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)),
  selectedCell: PropTypes.number,
  position: PropTypes.shape({
    initial: PropTypes.shape({
      row: PropTypes.number,
      col: PropTypes.number,
    }),
    current: PropTypes.shape({
      row: PropTypes.number,
      col: PropTypes.number,
    }),
  }),
  isNewGame: PropTypes.bool,
  isPathBuild: PropTypes.bool,
  handleCellClick: PropTypes.func,
};
