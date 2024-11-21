// /app/cadastro/index.tsx
import React, { useState } from 'react';
import './App.css'; 
import { useRouter } from 'expo-router';

interface FormData {
  name: string;
  email: string;
  password: string;
}

export default function Cadastro() {
  const router = useRouter();

  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    password: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/signup", {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(formData)
      });
      
      const responseData = await response.json();
      
      if (response.ok) {
        alert("Cadastro realizado com sucesso!");
        router.replace('/login');
      } else {
        alert("Erro no cadastro. Tente novamente.");
      }

    } catch (error) {
      console.error("Erro ao cadastrar: ", error);
      alert("Houve um erro no cadastro.");
    }
  };

  return (
    <div className="container">
      <header className="header">
        <h1>Criar uma Conta</h1>
        <p>Preencha os dados abaixo para se registrar</p>
      </header>

      <form className="form" onSubmit={handleSubmit}>
        <input 
          type="text" 
          name="name" 
          value={formData.name} 
          onChange={handleChange} 
          placeholder="Nome Completo" 
          className="input"
          required 
        />
        <input 
          type="email" 
          name="email" 
          value={formData.email} 
          onChange={handleChange} 
          placeholder="E-mail" 
          className="input"
          required 
        />
        <input 
          type="password" 
          name="password" 
          value={formData.password} 
          onChange={handleChange} 
          placeholder="Senha" 
          className="input"
          required 
        />
        <button type="submit" className="submit-button">Cadastrar</button>
      </form>

      <footer className="footer">
        <p>Já tem uma conta? <a href="/login">Entre agora</a></p>
      </footer>
    </div>
  );
}
