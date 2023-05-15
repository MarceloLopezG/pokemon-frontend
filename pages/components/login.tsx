import React, { useState, useEffect } from 'react';
import axios from "axios";
import Router from 'next/router';
import styles from '../../styles/login.module.css';

const urlLogin = 'http://localhost:3000/users/login';


const Login = () => {
    const [input, setInput] = useState({
        email: '',
        password: ''
    });


    const handleChange = (event: any) => {
        event.preventDefault();
        const { name, value } = event.target;
        setInput({ ...input, [name]: value });
    }


    const handleSubmitLogin = (event: any) => {
        event.preventDefault();
        axios.post(urlLogin, {
            email: input.email,
            password: input.password,
        })
            .then((response) => {
                let userLogged = response.data;
                localStorage.setItem('userId', userLogged.user.id);
                localStorage.setItem('accessToken', userLogged.token);
                Router.push('/') // redirect to home  
            })
            .catch((error) => {
                return false;
            });
    }



    return (
        <>
            <main>
                <div className={styles.cardLogin}>
                    <h1>Iniciar sesión</h1>
                    <form onSubmit={handleSubmitLogin}>
                        <div className={styles.formContent}>
                            <p className={styles.textLogin}>Correo electrónico</p>
                            <input type="email" className={styles.inputLogin} placeholder="Correo electrónico" name="email" id='email' value={input.email} onChange={handleChange} required />
                        </div>

                        <div className={styles.formContent}>
                            <p className={styles.textLogin}>Contraseña</p>
                            <input className={styles.inputLogin} type="password" placeholder="********" name="password" id='password' value={input.password} onChange={handleChange} required />
                        </div>
                        <button type='submit' className={styles.btnLogin}>Iniciar sesión </button>
                    </form>
                </div>
            </main>
        </>
    )
}


export default Login;