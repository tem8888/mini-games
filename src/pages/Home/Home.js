import React from 'react';
import GameCard from './gamecard/GameCard';
import styles from './home.module.css';

const Home = () => {
  console.log('Home');

  return (
    <div className="container">
      <div className={styles.gamesList}>
        <GameCard />
      </div>
    </div>
  );
};

export default Home;
