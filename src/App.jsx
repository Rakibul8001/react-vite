import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/pages/Home';
import Profile from './components/pages/Profile';

function App() {

  return (
    <Router>

      <Routes>
        {/* Protected route */}
        <Route path="/" element={<Home/>}/>
        <Route path="/profile" element={<Profile key={Date.now()}/> }/>

      </Routes>

  </Router>
  )
}

export default App
