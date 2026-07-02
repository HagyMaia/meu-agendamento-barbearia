"use client";
import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <header style={{
        background: 'linear-gradient(135deg,#0a2342 0%,#1a3d5c 100%)',
        color: 'white',
        padding: '1rem 2rem',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap'
        }}>
          <div style={{
            fontSize: '1.8rem',
            fontWeight: 900,
            letterSpacing: '2px',
            background: 'linear-gradient(135deg,#ffd700 0%,#ffed4e 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>BARBA&CIA</div>
          <nav style={{
            display: 'flex',
            gap: '1.5rem',
            alignItems: 'center',
            flexWrap: 'wrap'
          }}>
            <a href="#servicos" style={{ color: 'white', textDecoration: 'none', fontWeight: 500 }}>Serviços</a>
            <a href="#galeria" style={{ color: 'white', textDecoration: 'none', fontWeight: 500 }}>Galeria</a>
            <a href="#avaliacoes" style={{ color: 'white', textDecoration: 'none', fontWeight: 500 }}>Avaliações</a>
            <a href="#contato" style={{ color: 'white', textDecoration: 'none', fontWeight: 500 }}>Contato</a>
            <Link href="/admin" style={{
              background: '#ffd700',
              color: '#0a2342',
              padding: '0.5rem 1rem',
              borderRadius: '5px',
              fontWeight: 600,
              textDecoration: 'none'
            }}>Admin</Link>
          </nav>
        </div>
      </header>

      <section style={{
        background: 'linear-gradient(135deg,#0a2342 0%,#1a3d5c 50%,#0a2342 100%)',
        color: 'white',
        padding: '100px 2rem',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          maxWidth: '800px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 1
        }}>
          <h1 style={{
            fontSize: 'clamp(2rem,5vw,3.5rem)',
            marginBottom: '1rem',
            fontWeight: 900,
            lineHeight: 1.2
          }}>
            Seu corte,<br />
            <span style={{
              background: 'linear-gradient(135deg,#ffd700 0%,#ffed4e 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>no seu horário.</span>
          </h1>
          <p style={{
            fontSize: 'clamp(1rem,2.5vw,1.3rem)',
            marginBottom: '2rem',
            color: '#e0e0e0'
          }}>Agende seu horário em nossa barbearia de forma rápida, simples e online.</p>
          <Link href="/agendamento">
            <button style={{
              background: 'linear-gradient(135deg,#ffd700 0%,#ffed4e 100%)',
              color: '#0a2342',
              padding: '1rem 2.5rem',
              fontSize: '1.1rem',
              fontWeight: 700,
              border: 'none',
              borderRadius: '50px',
              cursor: 'pointer',
              boxShadow: '0 5px 20px rgba(255,215,0,0.3)'
            }}>Agendar Agora</button>
          </Link>
        </div>
      </section>

      <section id="servicos" style={{ padding: '80px 2rem', background: '#f8f9fa' }}>
        <h2 style={{
          textAlign: 'center',
          fontSize: 'clamp(1.8rem,4vw,2.5rem)',
          marginBottom: '3rem',
          color: '#0a2342',
          fontWeight: 900
        }}>Nossos Serviços</h2>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))',
          gap: '2rem'
        }}>
          {[
            { icon: '✂️', title: 'Corte Clássico', desc: 'Corte tradicional com acabamento impecável.', price: 'R$ 35,00' },
            { icon: '🧔', title: 'Corte + Barba', desc: 'Combo completo com design de barba profissional.', price: 'R$ 55,00' },
            { icon: '💈', title: 'Barba Design', desc: 'Design personalizado com modelagem perfeita.', price: 'R$ 30,00' },
            { icon: '💇', title: 'Corte Premium', desc: 'Técnicas avançadas com produtos importados.', price: 'R$ 50,00' },
            { icon: '🧴', title: 'Higiene Facial', desc: 'Limpeza profunda com produtos específicos.', price: 'R$ 40,00' },
            { icon: '✨', title: 'Pacote Completo', desc: 'Corte + Barba + Higiene Facial em um combo.', price: 'R$ 80,00' }
          ].map((service, index) => (
            <div key={index} style={{
              background: 'white',
              padding: '2rem',
              borderRadius: '15px',
              boxShadow: '0 5px 20px rgba(0,0,0,0.1)',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>{service.icon}</div>
              <h3 style={{ color: '#0a2342', marginBottom: '1rem', fontSize: '1.5rem' }}>{service.title}</h3>
              <p style={{ color: '#666', marginBottom: '1.5rem' }}>{service.desc}</p>
              <span style={{
                background: 'linear-gradient(135deg,#ffd700 0%,#ffed4e 100%)',
                color: '#0a2342',
                padding: '0.5rem 1.5rem',
                borderRadius: '50px',
                fontWeight: 700,
                display: 'inline-block'
              }}>{service.price}</span>
            </div>
          ))}
        </div>
      </section>

      <section id="galeria" style={{ padding: '80px 2rem', background: 'white' }}>
        <h2 style={{
          textAlign: 'center',
          fontSize: 'clamp(1.8rem,4vw,2.5rem)',
          marginBottom: '3rem',
          color: '#0a2342',
          fontWeight: 900
        }}>Galeria de Trabalhos</h2>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))',
          gap: '2rem'
        }}>
          {[
            { src: 'https://loremflickr.com/400/400/barber,haircut,professional', text: 'Corte Premium' },
            { src: 'https://loremflickr.com/400/400/barber,beard,design', text: 'Design de Barba' },
            { src: 'https://loremflickr.com/400/400/barber,fade,haircut', text: 'Fade Moderno' }
          ].map((item, index) => (
            <div key={index} style={{
              position: 'relative',
              overflow: 'hidden',
              borderRadius: '15px',
              boxShadow: '0 5px 20px rgba(0,0,0,0.1)',
              aspectRatio: '1'
            }}>
              <img src={item.src} alt={item.text} style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }} />
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'rgba(10,35,66,0.7)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '1.3rem',
                fontWeight: 700,
                opacity: 0,
                transition: 'opacity 0.3s'
              }} onMouseEnter={(e) => e.currentTarget.style.opacity = '1'} onMouseLeave={(e) => e.currentTarget.style.opacity = '0'}>
                {item.text}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="avaliacoes" style={{
        padding: '80px 2rem',
        background: 'linear-gradient(135deg,#0a2342 0%,#1a3d5c 100%)',
        color: 'white'
      }}>
        <h2 style={{
          textAlign: 'center',
          fontSize: 'clamp(1.8rem,4vw,2.5rem)',
          marginBottom: '3rem',
          fontWeight: 900
        }}>Avaliações de Clientes</h2>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))',
          gap: '2rem'
        }}>
          {[
            { stars: '⭐⭐⭐⭐⭐', text: 'Excelente atendimento! O corte ficou perfeito.', name: 'João Silva' },
            { stars: '⭐⭐⭐⭐⭐', text: 'Ambiente limpo e profissionais competentes!', name: 'Carlos Mendes' },
            { stars: '⭐⭐⭐⭐⭐', text: 'Melhor barbearia de Manaus! Recomendo!', name: 'Diego Costa' },
            { stars: '⭐⭐⭐⭐⭐', text: 'Agendar online é muito prático e rápido!', name: 'Rafael Santos' },
            { stars: '⭐⭐⭐⭐⭐', text: 'Atendimento impecável do início ao fim!', name: 'Anderson Oliveira' },
            { stars: '⭐⭐⭐⭐⭐', text: 'Sistema de agendamento funciona perfeitamente!', name: 'Bruno Ferreira' }
          ].map((review, index) => (
            <div key={index} style={{
              background: 'rgba(255,255,255,0.1)',
              padding: '2rem',
              borderRadius: '15px',
              border: '1px solid rgba(255,215,0,0.3)'
            }}>
              <div style={{ color: '#ffd700', fontSize: '1.3rem', marginBottom: '1rem' }}>{review.stars}</div>
              <p style={{ marginBottom: '1rem', fontStyle: 'italic' }}>"{review.text}"</p>
              <span style={{ fontWeight: 700, color: '#ffd700' }}>- {review.name}</span>
            </div>
          ))}
        </div>
      </section>

      <footer id="contato" style={{
        background: '#0a2342',
        color: 'white',
        padding: '3rem 2rem',
        textAlign: 'center'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit,minmax(250px,1fr))',
          gap: '2rem',
          marginBottom: '2rem',
          textAlign: 'left'
        }}>
          <div>
            <h4 style={{ color: '#ffd700', marginBottom: '1rem', fontSize: '1.2rem' }}>📍 Localização</h4>
            <p>Av. Djalma Batista, 1234</p>
            <p>Chapada, Manaus - AM</p>
            <p>CEP: 69040-900</p>
          </div>
          <div>
            <h4 style={{ color: '#ffd700', marginBottom: '1rem', fontSize: '1.2rem' }}>📞 Contato</h4>
            <p>Tel: (92) 99999-9999</p>
            <p>WhatsApp: (92) 99999-9999</p>
            <p>Email: contato@barbaecia.com</p>
          </div>
          <div>
            <h4 style={{ color: '#ffd700', marginBottom: '1rem', fontSize: '1.2rem' }}>🕐 Horário</h4>
            <p>Segunda a Sexta: 08h às 19h</p>
            <p>Sábado: 08h às 17h</p>
            <p>Domingo: Fechado</p>
          </div>
        </div>
        <div style={{ borderTop: '1px solid rgba(255,215,0,0.3)', paddingTop: '2rem', color: '#999' }}>
          <p>© 2026 BARBA&CIA. Todos os direitos reservados.</p>
        </div>
      </footer>

      <a href="https://wa.me/5592999999999" target="_blank" rel="noopener noreferrer" style={{
        position: 'fixed',
        bottom: '30px',
        right: '30px',
        width: '60px',
        height: '60px',
        background: '#25d366',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontSize: '2rem',
        cursor: 'pointer',
        boxShadow: '0 5px 20px rgba(37,211,102,0.4)',
        zIndex: 50,
        textDecoration: 'none'
      }}>💬</a>
    </div>
  );
}