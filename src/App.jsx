import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Posts from './components/pages/Posts';

function App() {

  return (
    <Router>

      <Routes>
        {/* Protected route */}
        <Route path="/" element={<Posts/>}/>

      </Routes>

  </Router>
  )
}

export default App
