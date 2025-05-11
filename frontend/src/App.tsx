import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter,Outlet,Route,Routes } from 'react-router-dom'
import Home from './pages/home'
import { Signup } from './component/authentication/signup'
import { Signin } from './component/authentication/signin'
import { Dashboard } from './pages/dashboard'
import { CreateShop } from './pages/createShop'
import SearchItem from './pages/SearchItem'
import { ShopList } from './pages/shopList'
import { ViewItems } from './pages/viewItems'
import { AddItems } from './component/additems'
import { Footer } from './component/footer'

function App() {

  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path='/'element={<Layout/>}>
        <Route path='/'element={<Home/>}></Route>
        <Route path='/signup'element={<Signup/>}></Route>
        <Route path='/signin'element={<Signin/>}></Route>
        <Route path='/dashboard'element={<Dashboard/>}></Route>
        <Route path='/createshop'element={<CreateShop/>}></Route>
        <Route path='/searchItem'element={<SearchItem/>}></Route>
        <Route path='/shoplist' element={<ShopList/>}></Route>
        <Route path='/viewItems/:id' element={<ViewItems/>}></Route>
        <Route path='/additems/:id' element={<AddItems/>}></Route>
        </Route>
      </Routes>
      </BrowserRouter>
      
    </>
  )
}

function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default App
