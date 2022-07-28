import React from 'react';
import { Link } from 'react-router-dom';
import img from '../../../assets/lab.webp';
import styles from './gamecard.module.css';

const GameCard = () => {
  return (
    <Link to="/labyrinth" className={styles.gameCard}>
      <h3 className={styles.title}>Игра лабиринт</h3>
      <div className={styles.gameCardImg}>
        <img src={img} alt="Игра Лабиринт" />
      </div>

      <p>Двигайся в лабиринте по стрелкам и укажи конечную точку.</p>
      <ul className={styles.settingsList}>
        <li>
          <b>Уровень сложности:</b> Легкий
        </li>
        <li>
          <b>Скорость:</b> Низкая
        </li>
        <li>
          <b>Количество ходов:</b> 10
        </li>
      </ul>
    </Link>
  );
};

export default GameCard;
