import React from 'react'
import { Route, Routes } from 'react-router-dom'
import LandingPage from './Pages/LandingPage/LandingPage'
import Home from './Pages/Home/Home'
import About from './Pages/About/About'
import Courses from './Pages/Courses/Courses'
import Contact from './Pages/Contact/Contact'
import Login from './Pages/Login/Login'
import Signup from './Pages/SignUp/Signup'
const App = () => {
  return (
 
   <Routes>
    <Route index element={<LandingPage/>}/>
    <Route path='/landing' element={<LandingPage/>}/>
    <Route path='/login' element={<Login/>}/>
    <Route path='/signUp' element={<Signup/>}/>
    <Route path='/home' element={<Home/>}/>
    <Route path='/about' element={<About/>}/>
    <Route path='/courses' element={<Courses/>}/>
    <Route path='/contact' element={<Contact/>}/>

   </Routes>

  )
}

export default App