import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import Home from './pages/home'
import { Signup } from './component/authentication/signup'
import { Signin } from './component/authentication/signin'
import { Dashboard } from './pages/dashboard'
import { CreateShop } from './pages/createShop'
import SearchItem from './pages/SearchItem'

function App() {

  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path='/'element={<Home/>}></Route>
        <Route path='/signup'element={<Signup/>}></Route>
        <Route path='/signin'element={<Signin/>}></Route>
        <Route path='/dashboard'element={<Dashboard/>}></Route>
        <Route path='/createshop'element={<CreateShop/>}></Route>
        <Route path='/searchItem'element={<SearchItem/>}></Route>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
