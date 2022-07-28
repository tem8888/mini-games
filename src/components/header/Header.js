import styles from './header.module.css';
import { Link } from 'react-router-dom';
import { MdOutlineArrowBackIosNew } from 'react-icons/md';

const Header = ({ title }) => {
  return (
    <header className={styles.header}>
      <div className="container">
        <div className={styles.headerLink}>
          <Link to="/">
            <MdOutlineArrowBackIosNew
              size={20}
              style={{ marginRight: '5px' }}
            />{' '}
            Главная
          </Link>
        </div>
        <h2 className={styles.title}>{title}</h2>
      </div>
    </header>
  );
};

export default Header;
