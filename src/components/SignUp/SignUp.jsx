// SignUp.js
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { auth } from '../../firebase/firebaseConfig';
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import './SignUp.css'; 

const SignUp = () => {
    const navigateLogin = useNavigate();
    const [UserSignUp, SetUserSignup] = useState({ username: "", email: "", password: "" });

    const handleChange = (e) => {
        SetUserSignup({ ...UserSignUp, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault(); // Empêche le rechargement de la page
        if (!UserSignUp.username || !UserSignUp.email || !UserSignUp.password) {
            return toast.error("All fields are required");
        } else {
            createUserWithEmailAndPassword(auth, UserSignUp.email, UserSignUp.password)
                .then(async (res) => {
                    const user = res.user;
                    await updateProfile(user, {
                        displayName: UserSignUp.username
                    });
                    navigateLogin("/login");
                })
                .catch((err) => toast.error(err.message));
        }
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
                            <header>S'inscrire</header>
                            <form autoComplete='off' className='form-group' onSubmit={handleSubmit}>
                                <div className="input-field">
                                    <input
                                        type="text"
                                        name="username"
                                        className='input'
                                        required
                                        onChange={handleChange}
                                        value={UserSignUp.username}
                                    />
                                    <label htmlFor="username">Nom d'utilisateur</label>
                                </div>
                                <div className="input-field">
                                    <input
                                        type="email"
                                        name="email"
                                        className='input'
                                        required
                                        onChange={handleChange}
                                        value={UserSignUp.email}
                                    />
                                    <label htmlFor="email">Email</label>
                                </div>
                                <div className="input-field">
                                    <input
                                        type="password"
                                        name="password"
                                        className='input'
                                        required
                                        onChange={handleChange}
                                        value={UserSignUp.password}
                                    />
                                    <label htmlFor="password">Mot de passe</label>
                                </div>
                                <div className="input-field">
                                    <button type='submit' className='submit btn btn-success btn-md mybtn'>S'inscrire</button>
                                </div>
                            </form>
                            <div className="signin">
                                <span>J'ai déjà un compte? <a href="/login">Connectez-vous ici</a></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
