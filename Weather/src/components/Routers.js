import React from 'react'
import { Route, Routes } from 'react-router-native'
// Screens
import Home from './Home'
import CityWeather from './CityWeather'
import Signin from './Signin'
import Signup from './Signup'
import Contactus from './Contactus'
export default ScreensNavigation = () => {
    return(
        <Routes>
            <Route path='/home' exact element={<Home/>} errorElement={<Home/>} />
            <Route path='/CityWeather' exact element={<CityWeather/>} errorElement={<Home/>} />
            <Route path='/Signin' exact element={<Signin/>} errorElement={<Home/>} />
            <Route path='/Signup' exact element={<Signup/>} errorElement={<Home/>} />
            <Route path='/Contactus' exact element={<Contactus/>} errorElement={<Home/>} />

            <Route path='*' element={<Home/>} />
        </Routes>
    )
}