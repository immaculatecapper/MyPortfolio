import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Projects from './pages/Projects.jsx';
import Education from './pages/Education.jsx';
import Services from './pages/Services.jsx';
import Contact from './pages/Contact.jsx';
import Signin from './pages/Signin.jsx';
import Signup from './pages/Signup.jsx';
import Messages from './pages/Messages.jsx';
import Users from './pages/Users.jsx';
import NotFound from './pages/NotFound.jsx';

// Top-level route table. Every page is nested inside <Layout /> so it
// shares the same navigation bar and footer.
export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/education" element={<Education />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        {/* Signed-in users see their own messages; admins see and manage all */}
        <Route path="/messages" element={<PrivateRoute><Messages /></PrivateRoute>} />
        <Route path="/users" element={<PrivateRoute adminOnly><Users /></PrivateRoute>} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
