import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import RootLayout from './pages/Root';
import HomePage from './pages/Home';
import AboutPage from './pages/About';
import ContactPage from './pages/Help&Support';
import ServicesPage from './pages/Services';
import DetailMentorPage from './pages/DetailMentor';
import BookMentorPage from './pages/BookMentor';
import LogIn from './pages/LogIn';
import SignUp from './pages/SignUp';
import TermOfService from './pages/TermOfService';
import PrivacyPolicy from './pages/PrivacyPolicy';

const router = createBrowserRouter([
  {
    path: '',
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'about', element: <AboutPage /> },
      {
        path: 'services',
        children: [
          { index: true, element: <ServicesPage /> },
          { path: ':type/:id', element: <DetailMentorPage /> },
          { path: 'book/:type/:id', element: <BookMentorPage /> }
        ]
      },
      { path: 'support', element: <ContactPage /> },
    ]
  },
  { path: 'login', element: <LogIn /> },
  { path: 'signup', element: <SignUp /> },
  { path: 'termofservice', element: <TermOfService /> },
  { path: 'privacy', element: <PrivacyPolicy /> },
])

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
