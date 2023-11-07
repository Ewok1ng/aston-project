import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';

import { Main, History } from './pages';
import { Link } from 'react-router-dom';

function App() {
    return (
        <div className="app">
            <BrowserRouter>
                <header>
                    <Link to={'/'}>Main</Link>
                    <Link to={'/history'}>History</Link>
                </header>
                <Routes>
                    <Route path="/" element={<Main />} />
                    <Route path="/history" element={<History />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
