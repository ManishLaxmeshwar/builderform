import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CreateFormPage from './pages/CreateFormPage';
import PreviewPage from './pages/PreviewPage';
import MyFormsPage from './pages/MyFormsPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/create" element={<CreateFormPage />} />
        <Route path="/preview" element={<PreviewPage />} />
        <Route path="/myforms" element={<MyFormsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
