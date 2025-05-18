
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import GamePlayPartnerPage from '../pages/GamePlayPartnerPage';

const GameRoutes = () => {
  return (
    <Routes>
      <Route path="/games/play/:gameId" element={<GamePlayPartnerPage />} />
    </Routes>
  );
};

export default GameRoutes;
