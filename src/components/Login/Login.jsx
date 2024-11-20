// Login.js
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { auth } from '../../firebase/firebase';
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import './Login.css'; 

const Login = () => {
  const navigateHome = useNavigate();
  const [credentials, setCredentials] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!credentials.email || !credentials.password) {
      return toast.error("Tous les champs sont requis");
    }

    signInWithEmailAndPassword(auth, credentials.email, credentials.password)
      .then(() => {
        navigateHome("/"); 
      })
      .catch((err) => toast.error(err.message));
  };

  return (
    <div className="wrapper">
      <div className="container main">
        <div className="row">
          <div className="col-md-6 side-image">
            <img src="images/white.png" alt="" className="img-fluid" />
          
          </div>

          <div className="col-md-6 right">
            <div className="input-box">
              <header>Se connecter</header>
              <form onSubmit={handleSubmit}>
                <div className="input-field">
                  <input
                    type="email"
                    className="input"
                    name="email"
                    required
                    autoComplete="off"
                    onChange={handleChange}
                    value={credentials.email}
                  />
                  <label htmlFor="email">Email</label>
                </div>
                <div className="input-field">
                  <input
                    type="password"
                    className="input"
                    id="pass"
                    name="password"
                    required
                    onChange={handleChange}
                    value={credentials.password}
                  />
                  <label htmlFor="pass">Mot de passe</label>
                </div>
                <div className="input-field">
                  <input type="submit" className="submit" value="Login" />
                </div>
              </form>
              <div className="signin">
                <span>Je n'ai pas encore de compte <a href="/signup">inscrivez-vous ici</a></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
