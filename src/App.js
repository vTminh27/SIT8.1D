import React from 'react';
import './App.css';
import PostPage from './PostPage';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';


function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path='/'element={ <PostPage /> } /> 
      </Routes>
    </Router>
    </>
  );
}

export default App;
