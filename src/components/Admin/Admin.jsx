import React, { useState, useEffect } from 'react';
import { db } from '../../firebase/config';
import { useAuth } from '../../context/AuthContext';
import { collection, addDoc, getDocs, deleteDoc, doc, query, orderBy } from 'firebase/firestore';
import './Admin.css';

const Admin = () => {
  const { user, loginWithGoogle, logout } = useAuth();
  const [news, setNews] = useState([]);
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');

  useEffect(() => {
    if (user && user.isAdmin) {
      fetchNews();
    }
  }, [user]);

  const fetchNews = async () => {
    const q = query(collection(db, 'news'), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    const newsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setNews(newsData);
  };

  const handleAddNews = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'news'), {
        title,
        summary,
        date: new Date().toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' }),
        createdAt: new Date()
      });
      setTitle('');
      setSummary('');
      fetchNews();
      alert('Noticia publicada con éxito');
    } catch (error) {
      alert('Error al publicar: ' + error.message);
    }
  };

  const handleDeleteNews = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar esta noticia?')) {
      await deleteDoc(doc(db, 'news', id));
      fetchNews();
    }
  };

  if (!user) {
    return (
      <div className="admin-container">
        <div className="admin-login-card glass">
          <h2>Acceso Administrativo</h2>
          <p>Por favor, inicie sesión con su cuenta autorizada.</p>
          <button className="btn-google-login" onClick={loginWithGoogle}>
            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" />
            Entrar con Google
          </button>
        </div>
      </div>
    );
  }

  if (!user.isAdmin) {
    return (
      <div className="admin-container">
        <div className="admin-login-card glass">
          <h2>Acceso Denegado</h2>
          <p>Lo siento, {user.displayName}. No tienes permisos para acceder a esta sección.</p>
          <button onClick={logout} className="btn-logout">Cerrar Sesión</button>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <header className="admin-header">
        <h1>Panel de Claudia</h1>
        <div className="admin-user-info">
          <span>Hola, {user.displayName}</span>
          <button onClick={logout} className="btn-logout">Cerrar Sesión</button>
        </div>
      </header>

      <main className="admin-main">
        <section className="admin-form-section glass">
          <h2>Publicar Nueva Noticia</h2>
          <form onSubmit={handleAddNews} className="admin-form">
            <input 
              type="text" 
              placeholder="Título de la noticia" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)} 
              required 
            />
            <textarea 
              placeholder="Contenido o resumen" 
              value={summary} 
              onChange={(e) => setSummary(e.target.value)} 
              required 
            />
            <button type="submit" className="btn-publish">Publicar Ahora</button>
          </form>
        </section>

        <section className="admin-list-section">
          <h2>Noticias Publicadas</h2>
          <div className="admin-news-list">
            {news.map((item) => (
              <div key={item.id} className="admin-news-item glass">
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.date}</p>
                </div>
                <button onClick={() => handleDeleteNews(item.id)} className="btn-delete">Eliminar</button>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Admin;
