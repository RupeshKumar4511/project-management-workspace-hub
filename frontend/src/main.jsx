import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { store } from './app/store.js'
import { Provider } from 'react-redux'
import Welcome from './components/Welcome.jsx'
import CreateUser from './components/CreateUser.jsx'
import VerifyUser from './components/VerifyUser.jsx'
import ErrorPage from './components/ErrorPage.jsx'
import Reset from './components/Reset.jsx'
import Home from './components/Home.jsx'
import ResetPassword from './components/ResetPassword.jsx'
import { StrictMode } from 'react'
import WorkspaceHub from './components/WorkspaceHub.jsx'

const router = createBrowserRouter([

  {
    path: '/', element: <Home />,
    errorElement: <ErrorPage />,
    children: [
      { path: '/', element: <Welcome /> },
      { path: '/create-user', element: <CreateUser /> },
      { path: '/verify-user', element: <VerifyUser /> },
      { path: '/reset', element: <Reset /> },
      { path: '/reset-password', element: <ResetPassword /> },
    ]
  },
  {
    path: '/app', element: <WorkspaceHub />,
    errorElement: <ErrorPage />
  },
  {
    path: '/workspace', element: <App />,
    errorElement: <ErrorPage />
  },


])
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
);
