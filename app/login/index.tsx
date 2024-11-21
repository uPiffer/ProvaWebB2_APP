import React, { useState } from 'react';
import './App.css'; 
import { getData, storeData } from '../storage';
import { useRouter } from 'expo-router';

interface LoginFormData {
  email: string;
  password: string;
}

export default function LoginScreen() {
  const router = useRouter();

  const [loginForm, setLoginForm] = useState<LoginFormData>({
    email: '',
    password: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginForm((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/signin", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginForm),
      });

      const responseData = await response.json();
      if (response.ok) {
        await storeData(responseData.user.token);
        console.log('Token:', await getData());
        router.replace('/home');
      }
    } catch (error) {
      console.error('Erro durante o login:', error);
    }
  };

  return (
    <div className="wrapper">
      <header>
        <h1 className="main-title">Acessar Conta</h1>
        <p className="description-text">Faça login para continuar</p>
      </header>

      <form className="form" onSubmit={handleFormSubmit}>
        <input
          type="email"
          name="email"
          value={loginForm.email}
          onChange={handleInputChange}
          placeholder="Digite seu e-mail"
          className="input"
          required
        />
        <input
          type="password"
          name="password"
          value={loginForm.password}
          onChange={handleInputChange}
          placeholder="Digite sua senha"
          className="input"
          required
        />
        <button type="submit" className="action-btn signin-btn">Entrar</button>
      </form>

      <footer className="footer-note">
        <p>Não tem uma conta? <a href="/cadastro">Crie agora!</a></p>
      </footer>
    </div>
  );
}
