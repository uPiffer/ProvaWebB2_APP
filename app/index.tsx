import { useRouter } from 'expo-router';
import './App.css';

export default function WelcomePage() {
  const router = useRouter();

  return (
    <div className="wrapper">
      <header>
        <h1 className="main-title">Bem-vindo ao Novo App</h1>
        <p className="description-text">Inicie sua experiência agora</p>
      </header>

      <div className="action-container">
        <button className="action-btn signin-btn" onClick={() => router.replace('/login')}>
          Login
        </button>
        <button className="action-btn signup-btn" onClick={() => router.replace('/cadastro')}>
          Registrar-se
        </button>
      </div>

      <footer className="footer-note">
        <p>&copy; 2024 Meu Novo App. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}
