import { createSlice } from '@reduxjs/toolkit';
import { ROWS, COLUMNS, STEPS } from './config';

const getInitialPosition = () => ({
  row: Math.floor(Math.random() * (ROWS - 1) + 1),
  col: Math.floor(Math.random() * (COLUMNS - 1) + 1),
});
const initialPosition = getInitialPosition();

const initialState = {
  field: Array(ROWS).fill(Array(COLUMNS).fill(null)),
  path: Array(STEPS).fill(null),
  position: { initial: initialPosition, current: initialPosition },
  selectedCell: null,
  isNewGame: false,
  isPathBuild: false,
};

export const labyrinthReducer = createSlice({
  name: 'labyrinth',
  initialState,
  reducers: {
    setStartGame: (state) => {
      state.isNewGame = true;
      state.isPathBuild = true;
      // обновляем начальную позицию в случае повторного запуска игры
      state.position.initial = state.selectedCell ? getInitialPosition() : initialPosition;
      // При старте новой игры обнуляем path и выбранную ячейку
      state.path = initialState.path;
      state.selectedCell = initialState.selectedCell;
    },
    setEndGame: (state) => {
      state.isNewGame = false;
    },
    setPathBuild: (state, action) => {
      state.isPathBuild = action.payload;
    },
    setSelectedCell: (state, action) => {
      state.selectedCell = action.payload;
    },
    setPath: (state, action) => {
      state.path[action.payload.stepCounter] = action.payload.direction;
    },
    setFinalPosition: (state, action) => {
      state.position.current = action.payload ? action.payload : initialState.position;
    },
    resetState: (state) => {
      state.path = initialState.path;
      state.selectedCell = initialState.selectedCell;
      state.position = { initial: initialPosition, current: initialPosition };
      state.isNewGame = initialState.isNewGame;
    },
  },
});

export const { setStartGame, setEndGame, setPathBuild, setSelectedCell, setFinalPosition, setPath, resetState } =
  labyrinthReducer.actions;

export default labyrinthReducer.reducer;
