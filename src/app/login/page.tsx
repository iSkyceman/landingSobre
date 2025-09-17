'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';  // import ajouté

export default function LoginPage() {
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const username = form.username.value;
    const password = form.password.value;

    if (username === 'admin' && password === 'supermotdepasse') {
      localStorage.setItem('isAdmin', '1');
      router.push('/admin-dossiers');
    } else {
      setError('Identifiants incorrects');
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: '#151e30',             // fond sombre
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <div style={{
        background: '#212D47',           // boite plus claire sur fond sombre
        borderRadius: 14,
        boxShadow: '0 2px 20px #0005',
        padding: '28px 32px 22px 32px',
        width: '100%',
        maxWidth: 350,                   // largeur maximale réduite
        minWidth: 0,
        minHeight: 0
      }}>
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <Image
            src="/images/logo-iSkyce-industrie-5.0.webp"
            alt="Logo iSkyce"
            width={140}             // largeur en pixels obligatoire
            height={60}             // hauteur approximative, à ajuster si besoin
            style={{ margin: '0 auto 1rem auto', display: 'block' }}
          />
          <h2 style={{ 
            margin: 0, 
            marginBottom: 14, 
            fontWeight: 600, 
            fontSize: '1.2rem',
            color: '#fff' 
          }}>
            Connexion à l’interface
          </h2>
        </div>

        <form onSubmit={handleLogin}>
          <label style={{ color: '#e0e6ef', fontSize: 15, fontWeight: 500 }}>
            Identifiant
            <input
              name="username"
              autoFocus
              placeholder="admin"
              required
              style={inputStyle}
            />
          </label>

          <label style={{ color: '#e0e6ef', fontSize: 15, fontWeight: 500, marginTop: 10, display: 'block' }}>
            Mot de passe
            <input
              name="password"
              type="password"
              placeholder="••••••••••"
              required
              style={inputStyle}
            />
          </label>

          {error && <p style={{ color: '#ff7e6e', margin: '10px 0 0 0' }}>{error}</p>}

          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8, marginTop: 22 }}>
            <button type="submit" style={btnPrimary}>Connexion</button>
            <button type="button" style={btnSecondary} onClick={() => router.push('/')}>
              Retour
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  display: 'block',
  width: '100%',
  margin: '8px 0 14px 0',
  padding: '9px 8px',
  border: '1px solid #2a3b59',
  background: '#182235',
  color: '#e9edfa',
  borderRadius: 6,
  fontSize: '1em',
  fontWeight: 500,
  outline: 'none'
};

const btnPrimary: React.CSSProperties = {
  background: '#0051ff',
  padding: '8px 10px',
  border: 'none',
  borderRadius: 5,
  color: '#fff',
  fontWeight: 600,
  cursor: 'pointer',
  flex: 1
};

const btnSecondary: React.CSSProperties = {
  background: '#34435a',
  padding: '8px 10px',
  border: 'none',
  borderRadius: 5,
  color: '#fff',
  fontWeight: 600,
  cursor: 'pointer',
  flex: 1
};
