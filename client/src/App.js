import Navbar from './components/header/Navbar';
import './App.css';
import {  Routes, Route } from 'react-router-dom'
import Newnav from './components/NewNavbar/newnav';
import Maincomponent from './components/home/Maincomponent';
import Footer from './components/footer/footer';
import Sign_in from './components/signup/sign_in';
import Sign_up from './components/signup/sign_up';
import Cart from './components/cart/Cart';
import Buynow from './components/buynow/Buynow';

function App() {
  return (
    <>
    <Navbar/>
    <Newnav/>
    <Routes>
      <Route path='/' element={<Maincomponent/>} />
      <Route path='/login' element={<Sign_in/>} />
      <Route path='/register' element={<Sign_up/>} />
      <Route path='/getproductsone/:id' element={<Cart/>} />
      <Route path='/buynow' element={<Buynow/>} />
    </Routes>
    
    <Footer/>

    </>
  );
}

export default App;
