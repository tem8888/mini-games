import { ROWS, COLUMNS, ROUTES } from './config';

export function get_random(list) {
  return list[Math.floor(Math.random() * list.length)];
}

export function getAvailableRoutes(coordinates) {
  const result = [];
  const row = coordinates.row;
  const col = coordinates.col;
  // сoordinates [2,3], size 3 = index 6

  ROUTES['up'] + row > 0 && result.push('up');
  ROUTES['down'] + row <= ROWS && result.push('down');
  ROUTES['right'] + col <= COLUMNS && result.push('right');
  ROUTES['left'] + col > 0 && result.push('left');

  return result;
}

export function getCurrentPosition(position, direction = '') {
  if (!direction) return position;
  const newPosition = { ...position };
  if (direction === 'right' || direction === 'left') {
    newPosition.col = newPosition.col + ROUTES[direction];
  } else {
    newPosition.row = newPosition.row + ROUTES[direction];
  }
  return newPosition;
}

export function setIntervalX(callback, delay, repetitions) {
  let x = 0;
  const intervalId = setInterval(() => {
    callback(x);
    x++;
    if (x >= repetitions) {
      clearInterval(intervalId);
    }
  }, delay);
}

export function getCellId(position) {
  return (position.row * COLUMNS - COLUMNS + position.col).toString();
}
