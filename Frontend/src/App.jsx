import './App.css'
import Header from './components/Header'
import Hero from './components/Hero'
import Create from './components/Create'
import Footer from './components/Footer'
import axios from 'axios'
import { useEffect } from 'react'
function App() {
  
useEffect(()=>{
  /* WE DID NOT WRITE LOCALHOST BECAUSE DEPLOY KARNE KE BAAD ALAG-ALAG URL HOTA RHEGA,BUT the problem would be that this url does not exist */
  axios.get('/api/notes')
  .then((res)=>console.log(res))
  .catch((err)=>console.log(err))
}
,[])

  return (
    <>
      <Header/>
      <Hero/>
      <Create/>
      <Footer/>
    </>
  )
}

export default App
