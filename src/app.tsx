import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ListPage from './pages/list';
import EditPage from './pages/edit';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<ListPage />} />
        <Route path='/edit/:id' element={<EditPage />} />
      </Routes>
    </BrowserRouter>
  );
}
