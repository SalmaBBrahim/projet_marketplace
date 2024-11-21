import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Header/Header';
import SignUp from './components/SignUp/SignUp';
import Navbar from './components/Navbar/Navbar'; 
import AOS from 'aos'; 
import 'aos/dist/aos.css'; 
import { Toaster } from 'react-hot-toast';
import Login from './components/Login/Login';
import Footer from './components/Footer/Footer';
import Collection from './pages/Collection';
import Product from './pages/Product';
import { ShopContextProvider } from './context/ShopContext'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import Cart from './pages/Cart';
import { auth } from './firebase/firebaseConfig'; 
import Checkout from './pages/Checkout';
import ConfirmationPage from './pages/ConfirmationPage';
import Populaire from './components/Populaire/Populaire';  // Importer Populaire
import AddProductPage from './pages/AddProductPage';
import MesProduits from './pages/MesProduits';

const App = () => {
  const [orderPopup, setOrderPopup] = useState(false); 
  const [userName, setUserName] = useState("");

  const handleOrderPopup = () => {
    setOrderPopup(!orderPopup); 
  };

  useEffect(() => {
    AOS.init({ 
      offset: 100,
      duration: 800,
      easing: 'ease-in-sine',
      delay: 100,
    });
    AOS.refresh(); 
  }, []);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUserName(user.displayName); 
      } else {
        setUserName("");
      }
    });
  }, []);

  return (
    <ShopContextProvider> 
      <div className="App">
        <Toaster />
        <Navbar handleOrderPopup={handleOrderPopup} />
        <Routes>
          {/* Afficher Populaire uniquement sur la page d'accueil */}
          <Route path="/" element={<><Home handleOrderPopup={handleOrderPopup} /><Populaire /></>} />
          <Route path="/collection" element={<Collection />} />
          <Route path="/product/:productId" element={<Product />} />
          <Route path="/cart" element={<Cart/>} />
          <Route path="/checkout" element={<Checkout/>} />
          <Route path="/confirmation" element={<ConfirmationPage/>} />
          <Route path="/ajouter-produit" element={<AddProductPage />}/>
          <Route path="/mes-produits" element={<MesProduits/>} />


          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
        <Footer />
      </div>
    </ShopContextProvider>
  );
};

export default App;
