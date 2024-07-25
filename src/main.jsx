import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'

import Home from './components/Home.jsx'
import Login, {loginLoader} from './components/Login.jsx'
import Signup from './components/Signup.jsx'

import User, {userLoader} from './pages/User.jsx'
import Dashboard from './components/Dashboard.jsx'
import Book from './components/Book.jsx'
import ProfilePage from './components/ProfilePage.jsx'

import Admin from './pages/Admin.jsx'
import RoomList from './components/RoomList.jsx'
import UserList from './components/UserList.jsx'


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path='/' element={<App/>}>
        <Route path='' element={<Home/>} />
        <Route path='login' element={<Login/>} loader={loginLoader}/>
        <Route path='signup' element={<Signup/>} />
        <Route path='signout' element={<Home/>}/>
      </Route>
      <Route path='/user' element={<User/>} loader={userLoader}>
        <Route  path='' element={<Dashboard/>}/>
        <Route path='book' element={<Book/>}/>
        <Route path='profile' element={<ProfilePage/>}/>
      </Route>
      <Route path='/admin' element={<Admin/>}>
        <Route  path='' element={<RoomList/>}/>
        <Route path='userlist' element={<UserList/>}/>  
      </Route>
    </Route>
  )
);
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <RouterProvider router = {router}/>
  </React.StrictMode>,
)
