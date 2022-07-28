import { configureStore } from '@reduxjs/toolkit';
import labyrinthReducer from '../pages/Labyrinth/labyrinthReducer';

export const store = configureStore({
  reducer: {
    labyrinth: labyrinthReducer,
  },
});
