import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import MainLayout from './layouts/MainLayout'
import HomePage from './pages/home/HomePage'
import ProfilePage from './pages/profile/ProfilePage'
import EditProfilePage from './pages/edit-profile/EditProfilePage'
import ChatPage from './pages/chat/ChatPage'
import RegisterPage from './pages/auth/RegisterPage'
import LoginPage from './pages/auth/LoginPage'

// hello world kjdbvbhdsbvuydsgvdvdgvhjhsdhv

const browserRouter = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: '/home',
        element: <HomePage />
      },
      {
        path: '/profile/:id',
        element: <ProfilePage />
      },
      {
        path: '/account/edit',
        element: <EditProfilePage />
      },
      {
        path: '/chat',
        element: <ChatPage />
      },
    ]
  },
  {
    path: '/login',
    element: <LoginPage />
  },
  {
    path: '/register',
    element: <RegisterPage />
  },
])

const App = () => {
  return (
    <>
      <RouterProvider router={browserRouter} />
    </>
  )
}

export default App