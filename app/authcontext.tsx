"use client";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import React, {
  createContext,
  FormEvent,
  ReactNode,
  useEffect,
  useState,
} from "react";
import { getData } from './storage';

interface AuthProviderProps {
  children: ReactNode;
}

type AuthContextType = {
  isAuthenticated: boolean;
  user: userData | null;
  signIn: (data: signInData, event: FormEvent) => Promise<void>;
  register: (data: registerData, event: FormEvent) => Promise<void>;
};

type signInData = {
  email: string;
  password: string;
};

type registerData = {
  name: string;
  email: string;
  password: string;
};

type userData = {
  id: number;
  name: string;
  email: string;
};

export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<userData | null>(null);
  const router = useRouter();
  const isAuthenticated = !!user;

  const signIn = async ({ email, password }: signInData, event?: FormEvent) => {
    event?.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Falha ao fazer login");
      }

      const responseData = await response.json();
      await AsyncStorage.setItem('myToken', responseData.token);
      setUser({
        id: responseData.usuario.id,
        name: responseData.usuario.name,
        email: responseData.usuario.email,
      });

      console.log("Login realizado com sucesso");
      console.log(responseData.usuario);
      router.replace("/home");
    } catch (error) {
      alert("Usuário ou senha incorretos");
      console.error("Erro no login:", error);
    }
  };

  const register = async (
    { name, email, password }: registerData,
    event: FormEvent
  ) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      if (!response.ok) {
        throw new Error("Falha ao registrar");
      }

      await signIn({ email, password });
    } catch (error) {
      console.error("Erro no registro: ", error);
    }
  };

  useEffect(() => {
    const getUser = async () => {
      try {
        const token = await getData();
        if (token) {
          const response = await fetch("http://localhost:3000/me", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token }),
          });

          if (!response.ok) {
            throw new Error("Falha ao buscar usuário");
          }

          const responseData = await response.json();
          setUser(responseData.user);
        }
      } catch (err) {
        console.error("Erro ao buscar usuário:", err);
      }
    };
    getUser();
    console.log(user);
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, signIn, register }}>
      {children}
    </AuthContext.Provider>
  );
}
