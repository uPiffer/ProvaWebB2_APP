import { useState, useEffect, useContext } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity } from 'react-native';
import { getData, storeData } from '../storage';
import { useRouter } from 'expo-router';
import '../App.css'; 
import { AuthContext } from '../authcontext';

interface Post {
  title: string;
  content: string;
  authorId: number;
}

interface User {
  id: number
  name: string;
  email: string;
}

export default function NewPost() {
  const router = useRouter();
  
  const [userData, setuserData] = useState<User>({
    id: 0,
    name: '',
    email: '',
  });

  const [postContent, setPostContent] = useState<string>('');
  const [postTitle, setPostTitle] = useState<string>('');
  const {user} = useContext(AuthContext);

  /*const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsMounted(true), 100);
    () => clearTimeout(timer);

    if (!user) {
      router.replace("/login");
      return;
    }

  }, []); */

  const token = getData();
    console.log(token)
    if(!token){
      router.replace('/login');
    }


  const handlePostSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(postTitle);
    console.log(postContent);
    try{
        const response = await fetch("http://localhost:3000/post/create", {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              title: postTitle,
              content: postContent,
              authorId: user?.id
            })
        }) 
        console.log(response);
    }
    catch(error){
        console.log(error);
    }
};

return (
  <div className="nova-postagem-container">
    <div className="user-info">
      <div className="username">@{user?.email.split('@')[0]}</div>
    </div>

    <form className="post-form-container" onClick={handlePostSubmit}>
        <div className="form-title">Criar Nova Postagem</div>
        <div className="post-input-container">
        <input
          type="text"
          value={postTitle}
          onChange={(e) => setPostTitle(e.target.value)}
          placeholder="Título da postagem"
          className="post-title-input"
        />
          <textarea
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
            placeholder="Escreva sua postagem aqui..."
            className="post-input"
          />
        </div>
        <button className="publish-button">
          Publicar
        </button>
      </form>
    </div>
);
}