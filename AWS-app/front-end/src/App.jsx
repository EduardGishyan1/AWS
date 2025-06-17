import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FileUpload from './pages/uploadFile.jsx';
import Message from './pages/sendMessage.jsx';
import { SignIn, SignUp} from './pages/auth.jsx';
import ConfirmEmail from './pages/confirmation.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/confirm" element={<ConfirmEmail />} />
        <Route path="/upload" element={<FileUpload />} />
        <Route path="/send-message" element={<Message />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </Router>
  );
}

export default App;