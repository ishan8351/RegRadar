import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Architecture from './Architecture';
import Navbar from './Navbar';
import Footer from './Footer';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased selection:bg-blue-200 selection:text-blue-900">
        <Navbar />

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/architecture" element={<Architecture />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
