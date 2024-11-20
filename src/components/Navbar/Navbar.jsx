import React, { useContext, useState } from "react";
import { NavLink, Link } from 'react-router-dom'; // Assurez-vous d'importer Link
import { IoMdSearch } from "react-icons/io";
import SearchBar from "../SearchBar";
import { FaCartShopping } from "react-icons/fa6";
import { assets } from '../../assets/assets';
import './Navbar.css';
import { ShopContext } from "../../context/ShopContext";

const Navbar = ({ handleOrderPopup }) => {
  const [menu, setMenu] = useState("home");
  const { getCartCount } = useContext(ShopContext);

  return (
    <div className="navbar-container">
      <div className="navbar-content">
        <Link to={'/'}>
          <img src={assets.logo} alt="logo" className='logo' />
        </Link>
        <ul className="navbar-menu">
          <Link className="page-menu" to='/' >
            <p onClick={() => setMenu("home")} className={menu === "home" ? "active" : ""}>Accueil</p>
          </Link>
          <Link to='/collection' className="page-menu">
            <p onClick={() => setMenu("collection")} className={menu === "collection" ? "active" : ""}>Collection</p>
          </Link>
       
          <Link to='/ajouter-produit' className="page-menu">
            <p onClick={() => setMenu("addProduct")} className={menu === "addProduct" ? "active" : ""}>Ajouter un Produit</p>
          </Link>
          {/* Ajout de la page Mes Produits */}
          <Link to='/mes-produits' className="page-menu">
            <p onClick={() => setMenu("mesProduits")} className={menu === "mesProduits" ? "active" : ""}>Mes Produits</p>
          </Link>
          <Link to='/contact' className="page-menu">
            <p onClick={() => setMenu("contact")} className={menu === "contact" ? "active" : ""}>Contactez-Nous</p>
          </Link>
        </ul>

        <div className="navbar-right">
          <SearchBar />
          <Link to="/signup" className="signup-btn">
            <button className="signup-btn">S'inscrire</button>
          </Link>
          <Link className="cart-btn" to='/cart'>
            <button onClick={handleOrderPopup} className="cart-btn">
              <span className="cart-text">Panier</span>
              <FaCartShopping className="cart-icon" />
              <p className="cart-badge">{getCartCount()}</p>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
