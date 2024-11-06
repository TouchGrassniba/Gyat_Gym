import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GymMember from './components/GymMember';
import MemberList from './components/MemberList';
import AiChat from './components/ChatWithAI'; // Import the new AiChat component
import Home from './components/Home';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path="/createmember" element={<GymMember />} />
          <Route path="/memberlist" element={<MemberList />} />
          <Route path="/aichat" element={<AiChat />} /> {/* Route for AI chat */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
