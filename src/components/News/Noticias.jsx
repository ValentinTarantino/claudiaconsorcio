import React, { useState, useEffect } from 'react';
import { db } from '../../firebase/config';
import { collection, getDocs, query, orderBy, addDoc, deleteDoc, doc } from 'firebase/firestore';
import { useAuth } from '../../context/AuthContext';
import { FaPlus, FaTrash, FaSignOutAlt, FaImage, FaChevronDown, FaChevronUp, FaUserCircle, FaTimes, FaSearchPlus, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import './Noticias.css';

const News = () => {
  const [newsItems, setNewsItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedNews, setSelectedNews] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showAuthPrompt, setShowAuthPrompt] = useState(false);
  const [fullScreenImageIndex, setFullScreenImageIndex] = useState(null);
  const [modalImageIndex, setModalImageIndex] = useState(0);
  const { user, loginWithGoogle, logout } = useAuth();

  // Paginación
  const [visibleCount, setVisibleCount] = useState(3);

  // New post state
  const [newTitle, setNewTitle] = useState('');
  const [newSummary, setNewSummary] = useState('');
  const [imagesBase64, setImagesBase64] = useState([]);
  const [publishing, setPublishing] = useState(false);

  const fetchNews = async () => {
    try {
      const q = query(collection(db, 'news'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const newsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setNewsItems(newsData);
    } catch (error) {
      console.error("Error fetching news: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  useEffect(() => {
    if (user) {
      closeModal();
    }
  }, [user]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    if (imagesBase64.length + files.length > 6) {
      alert("Por seguridad y rendimiento, el límite es de 6 fotos por noticia.");
      return;
    }

    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;
          const maxWidth = 700; 
          if (width > maxWidth) {
            height = (maxWidth * height) / width;
            width = maxWidth;
          }
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);
          const compressedBase64 = canvas.toDataURL('image/jpeg', 0.6);
          setImagesBase64(prev => [...prev, compressedBase64]);
        };
        img.src = event.target.result;
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImageFromUpload = (index) => {
    setImagesBase64(prev => prev.filter((_, i) => i !== index));
  };

  const handleReadMore = (item) => {
    setSelectedNews(item);
    setModalImageIndex(0);
  };

  const closeModal = () => {
    setSelectedNews(null);
    setShowAuthPrompt(false);
    setFullScreenImageIndex(null);
  };

  const handleAddNews = async (e) => {
    e.preventDefault();
    setPublishing(true);
    try {
      await addDoc(collection(db, 'news'), {
        title: newTitle,
        summary: newSummary,
        images: imagesBase64,
        date: new Date().toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' }),
        createdAt: new Date()
      });
      setNewTitle('');
      setNewSummary('');
      setImagesBase64([]);
      setShowAddForm(false);
      fetchNews();
      alert('Noticia publicada con éxito');
    } catch (error) {
      alert('Error al publicar: ' + error.message);
    } finally {
      setPublishing(false);
    }
  };

  const handleDeleteNews = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar esta noticia?')) {
      try {
        await deleteDoc(doc(db, 'news', id));
        closeModal();
        fetchNews();
      } catch (error) {
        alert('Error al eliminar: ' + error.message);
      }
    }
  };

  const handleLoadMoreClick = () => {
    if (!user) {
      setShowAuthPrompt(true);
    } else {
      setVisibleCount(prev => prev + 3);
    }
  };

  const showLess = () => {
    setVisibleCount(3);
    const element = document.getElementById('noticias');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const nextModalImage = () => {
    const images = selectedNews.images || [selectedNews.imageUrl];
    setModalImageIndex(prev => (prev + 1) % images.length);
  };

  const prevModalImage = () => {
    const images = selectedNews.images || [selectedNews.imageUrl];
    setModalImageIndex(prev => (prev - 1 + images.length) % images.length);
  };

  const nextFullScreenImage = (e) => {
    e.stopPropagation();
    const images = selectedNews.images || [selectedNews.imageUrl];
    setFullScreenImageIndex(prev => (prev + 1) % images.length);
  };

  const prevFullScreenImage = (e) => {
    e.stopPropagation();
    const images = selectedNews.images || [selectedNews.imageUrl];
    setFullScreenImageIndex(prev => (prev - 1 + images.length) % images.length);
  };

  if (loading) return null;

  const displayedNews = newsItems.slice(0, visibleCount);
  const hasMore = visibleCount < newsItems.length;

  return (
    <section id="noticias" className="section news">
      <div className="container">
        <div className="section-header-admin centered">
          <div className="title-group">
            <h2 className="section-title">Últimas Noticias</h2>
            {!user && (
              <button className="btn-login-header" onClick={loginWithGoogle}>
                <FaUserCircle /> Iniciar sesión para leer más
              </button>
            )}
          </div>
          
          {user && (
            <div className="admin-actions-top">
              {user.isAdmin && (
                <button className="btn-admin-action add" onClick={() => setShowAddForm(true)}>
                  <FaPlus /> Agregar Noticia
                </button>
              )}
              <button className="btn-admin-action logout" onClick={logout} title="Cerrar Sesión">
                <FaSignOutAlt /> Cerrar Sesión
              </button>
            </div>
          )}
        </div>

        {newsItems.length > 0 ? (
          <>
            <div className="news-grid">
              {displayedNews.map((item) => (
                <article key={item.id} className="news-card">
                  {(item.images && item.images.length > 0) ? (
                    <div className="news-card-image">
                      <img src={item.images[0]} alt={item.title} />
                      {item.images.length > 1 && (
                        <div className="image-count-badge">+{item.images.length - 1}</div>
                      )}
                    </div>
                  ) : item.imageUrl && (
                    <div className="news-card-image">
                      <img src={item.imageUrl} alt={item.title} />
                    </div>
                  )}
                  <div className="news-card-content">
                    <div className="news-date">{item.date}</div>
                    <h3 className="news-title">{item.title}</h3>
                    <p className="news-summary">{item.summary}</p>
                    <button className="news-link-btn" onClick={() => handleReadMore(item)}>Leer más</button>
                  </div>
                </article>
              ))}
            </div>

            <div className="load-more-container">
              {hasMore ? (
                <button className="btn-load-more" onClick={handleLoadMoreClick} title="Ver más noticias">
                  <span>Ver más noticias</span>
                  <FaChevronDown className="arrow-icon" />
                </button>
              ) : newsItems.length > 3 && (
                <button className="btn-load-more" onClick={showLess} title="Ver menos">
                  <span>Ver menos</span>
                  <FaChevronUp className="arrow-icon up" />
                </button>
              )}
            </div>
          </>
        ) : (
          <div className="no-news-message glass">
            <p>No hay noticias publicadas por el momento. ¡Vuelva pronto para más actualizaciones!</p>
          </div>
        )}
      </div>

      {/* Modal de Noticia Completa */}
      {(selectedNews || showAuthPrompt) && (
        <div className="news-modal-overlay" onClick={closeModal}>
          <div className="news-modal-content glass" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>×</button>
            
            {user && selectedNews ? (
              <div className="full-news">
                <div className="news-header-modal">
                  <span className="news-date">{selectedNews.date}</span>
                  {user.isAdmin && (
                    <button className="btn-delete-news" onClick={() => handleDeleteNews(selectedNews.id)} title="Eliminar Noticia">
                      <FaTrash />
                    </button>
                  )}
                </div>
                
                <h2>{selectedNews.title}</h2>

                {/* Carrusel Interno del Modal */}
                <div className="modal-carousel-container">
                  <div className="modal-image clickable" onClick={() => setFullScreenImageIndex(modalImageIndex)}>
                    <img 
                      src={selectedNews.images ? selectedNews.images[modalImageIndex] : selectedNews.imageUrl} 
                      alt={`${selectedNews.title} ${modalImageIndex + 1}`} 
                    />
                    <div className="zoom-hint"><FaSearchPlus /> Click para ampliar</div>
                  </div>
                  
                  {((selectedNews.images?.length > 1) || (!selectedNews.images && selectedNews.imageUrl)) && (selectedNews.images?.length > 1) && (
                    <>
                      <button className="modal-nav prev" onClick={prevModalImage}><FaChevronLeft /></button>
                      <button className="modal-nav next" onClick={nextModalImage}><FaChevronRight /></button>
                      <div className="modal-counter">
                        {modalImageIndex + 1} / {selectedNews.images.length}
                      </div>
                    </>
                  )}
                </div>

                <div className="news-content">
                  <p>{selectedNews.summary}</p>
                </div>
              </div>
            ) : (
              <div className="login-prompt">
                <h2>Contenido Exclusivo</h2>
                <p>Para ver todas las noticias y leer los detalles, por favor identifíquese.</p>
                <button className="btn-google-login" onClick={loginWithGoogle}>
                  <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" />
                  Continuar con Google
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Visor de Pantalla Completa (Lightbox) con Carrusel (Zoom simple) */}
      {fullScreenImageIndex !== null && selectedNews && (
        <div className="lightbox-overlay" onClick={() => setFullScreenImageIndex(null)}>
          <button className="lightbox-close" onClick={() => setFullScreenImageIndex(null)} title="Cerrar"><FaTimes /></button>
          
          {(selectedNews.images?.length > 1 || (!selectedNews.images && selectedNews.imageUrl)) && (selectedNews.images?.length > 1) && (
            <>
              <button className="lightbox-nav prev" onClick={prevFullScreenImage}><FaChevronLeft /></button>
              <button className="lightbox-nav next" onClick={nextFullScreenImage}><FaChevronRight /></button>
            </>
          )}

          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <img 
              src={selectedNews.images ? selectedNews.images[fullScreenImageIndex] : selectedNews.imageUrl} 
              alt="Pantalla completa" 
            />
            {selectedNews.images && (
              <div className="lightbox-counter">
                {fullScreenImageIndex + 1} / {selectedNews.images.length}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Modal de Formulario de Nueva Noticia (Solo Admin) */}
      {showAddForm && (
        <div className="news-modal-overlay" onClick={() => setShowAddForm(false)}>
          <div className="news-modal-content glass" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowAddForm(false)}>×</button>
            <div className="admin-form-container">
              <h2>Publicar Nueva Noticia</h2>
              <form onSubmit={handleAddNews} className="admin-news-form">
                <input 
                  type="text" 
                  placeholder="Título de la noticia" 
                  value={newTitle} 
                  onChange={(e) => setNewTitle(e.target.value)} 
                  required 
                />
                <textarea 
                  placeholder="Contenido completo de la noticia..." 
                  value={newSummary} 
                  onChange={(e) => setNewSummary(e.target.value)} 
                  required 
                />
                <div className="file-input-wrapper">
                  <label htmlFor="news-images" className="btn-file-label">
                    <FaImage /> {imagesBase64.length > 0 ? `${imagesBase64.length} imágenes seleccionadas` : 'Elegir Imágenes (hasta 6)'}
                  </label>
                  <input 
                    id="news-images"
                    type="file" 
                    accept="image/*"
                    multiple
                    onChange={handleImageChange}
                  />
                </div>
                {imagesBase64.length > 0 && (
                  <div className="upload-preview-grid">
                    {imagesBase64.map((img, idx) => (
                      <div key={idx} className="preview-item">
                        <img src={img} alt="preview" />
                        <button type="button" className="remove-preview" onClick={() => removeImageFromUpload(idx)}>
                          <FaTimes />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                <button type="submit" className="btn-publish-news" disabled={publishing}>
                  {publishing ? 'Publicando...' : 'Publicar Ahora'}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default News;
