import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Main } from './Components/Main';
import ZenBubbleGame from './Pages/Bubble';
import PuzzleGameSection from './Pages/Puzzle';
import SnakeGame from './Pages/Snake';



function App() {
  return (
   <Router>
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/bubble" element={<ZenBubbleGame />} />
      <Route path="/puzzle" element={<PuzzleGameSection />} />
      <Route path="/snake" element={<SnakeGame />} />

    </Routes>
   </Router>
  );
}

export default App;
