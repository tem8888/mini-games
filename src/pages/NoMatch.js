import React from 'react';
import { Link } from 'react-router-dom';

const NoMatch = () => {
  return (
    <div
      className="container"
      style={{ marginTop: '30px', fontSize: '2rem', lineHeight: '2' }}
    >
      <p className="noMatchMessage">Страница не найдена</p>
      <Link
        to="/"
        style={{
          textDecoration: 'underline',
        }}
      >
        Вернуться на главную
      </Link>
    </div>
  );
};

export default NoMatch;
