import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FileUpload from './pages/uploadFile.jsx';
import Message from './pages/sendMessage.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/upload" element={<FileUpload />} />
        <Route path="/send-message" element={<Message />} />
      </Routes>
    </Router>
  );
}

export default App;