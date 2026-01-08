import React, { useEffect, useRef } from 'react'
import { Outlet } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast';

import Footer from './components/Footer'
import Navbar from './components/Navbar/Navbar'
import DisclaimerPopup from './components/DisclaimerPopup';

import { setPopularMovies, setBollywoodMovies, setHollywoodMovies, setSeries } from './store/dataslice'

function App() {


  const hasFetched = useRef(false);

  const dispatch = useDispatch()

  useEffect(() => {
    if (hasFetched.current) return;

    const init = async () => {
    
      try {
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/movies/all`)
          .then(res => {
            dispatch(setPopularMovies(res.data.popular))
            dispatch(setHollywoodMovies(res.data.hollywood))
            dispatch(setBollywoodMovies(res.data.bollywood))
            dispatch(setSeries(res.data.series))
          });
        
        hasFetched.current = true;
      } catch (error) {
        console.log(error)
        alert("Somthing went wrong")
      }

    };
    init();
  }, []);


  return (
    <>
      <Toaster />
      {/* <DisclaimerPopup/> */}
      <Navbar />
      <Outlet />
      <Footer />
    </>
  )
}

export default App