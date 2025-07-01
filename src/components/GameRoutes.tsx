import React from 'react';
import { Route, Routes } from 'react-router-dom';
import GamePlayPage from '../pages/GamePlayPage';

const GameRoutes = () => {
  return (
    <Routes>
      <Route path="/games/play/:gameId" element={<GamePlayPage />} />
    </Routes>
  );
};

export default GameRoutes;
