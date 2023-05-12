import React from 'react';

import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './app/store';
import Layout from './Layout/Layout';
import PeoplePage from './PeoplePage/PeoplePage';
import HeroPage from './ProfilePage/HeroPage';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          element: <PeoplePage />,
          index: true
        },
        {
          path: 'people/:peopleId',
          element: <HeroPage />
        }
      ]
    }
  ]);

  return (
    <React.StrictMode>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </React.StrictMode>
  );
}

export default App;
