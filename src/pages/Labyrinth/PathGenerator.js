import { useEffect, createRef, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CSSTransition } from 'react-transition-group';
import {
  BsFillArrowRightSquareFill,
  BsFillArrowUpSquareFill,
  BsFillArrowDownSquareFill,
  BsFillArrowLeftSquareFill,
} from 'react-icons/bs';

import { setFinalPosition, setPath, setPathBuild } from './labyrinthReducer';
import styles from './labyrinth.module.css';
import { getAvailableRoutes, getCurrentPosition, get_random } from './utils';
import { STEPS, DELAY } from './config';

const arrows = {
  up: <BsFillArrowUpSquareFill size={50} color={'#577590'} />,
  right: <BsFillArrowRightSquareFill size={50} color={'#577590'} />,
  down: <BsFillArrowDownSquareFill size={50} color={'#577590'} />,
  left: <BsFillArrowLeftSquareFill size={50} color={'#577590'} />,
};

const PathGenerator = (props) => {
  console.log('Path Generator');

  const dispatch = useDispatch();
  const path = useSelector((state) => state.labyrinth.path); // => ['right', 'up', ...]
  const positionInitial = useSelector((state) => state.labyrinth.position.initial); // => {row: number, col: number}

  useEffect(() => {
    // запускаем таймер при начале новой игры
    if (props.isNewGame) {
      let currentPosition = positionInitial;
      let direction = '';
      let stepCounter = 0;

      let timerId = setInterval(() => {
        // Определяем рандомное направление движения из доступных
        direction = get_random(getAvailableRoutes(currentPosition));
        // Определяем новую позицию на поле
        currentPosition = getCurrentPosition(currentPosition, direction);
        dispatch(setPath({ direction, stepCounter }));
        stepCounter += 1;
        // По достижению заданного числа шагов отключаем таймер, диспатчим флаг завершения и финальную позицию
        if (stepCounter >= STEPS) {
          clearInterval(timerId);
          dispatch(setPathBuild(false));
          dispatch(setFinalPosition(currentPosition));
        }
      }, DELAY);
      // Отключаем таймер если компонент размонтируется раньше, чем выполнятся все шаги
      return () => {
        clearInterval(timerId);
        dispatch(setPathBuild(false));
      };
    }
  }, [props.isNewGame, positionInitial, dispatch]);

  return (
    <div className={styles.pathWrapper}>
      {path.map((direction, index) => {
        const nodeRef = createRef(null);
        return (
          <div key={index} id={index} className={styles.pathBox}>
            <CSSTransition
              in={!!direction}
              exit={false}
              timeout={300}
              classNames="arrow"
              nodeRef={nodeRef}
            >
              <span ref={nodeRef} style={{ height: '50px' }}>
                {arrows[direction]}
              </span>
            </CSSTransition>
          </div>
        );
      })}
    </div>
  );
};

export default memo(PathGenerator);
