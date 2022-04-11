import React from 'react';
import { Route, Routes } from "react-router-dom";
import { AlbumsPage } from './app/components/AlbumPage';
import { HomePage } from './app/components/HomePage';
import { MainNavigation } from './app/components/MainNavigation';
import { TodosPage } from './app/components/TodosPage';
import './index.scss'

function App() {

  return (
    <>
      <MainNavigation />

      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/todos' element={<TodosPage />} />
        <Route path='/photos' element={<AlbumsPage />} />
      </Routes>
    </>
    );
}

export default App;
