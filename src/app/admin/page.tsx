"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';

type Servico = {
  id: number;
  nome: string;
  preco: number;
};

export default function AdminPage() {
  const [aba, setAba] = useState<string>('dashboard');
  const [agendamentos, setAgendamentos] = useState<any[]>([]);
  const [servicos, setServicos] = useState<Servico[]>([
    { id: 1, nome: 'Corte Clássico', preco: 35 },
    { id: 2, nome: 'Corte + Barba', preco: 55 },
    { id: 3, nome: 'Barba Design', preco: 30 },
    { id: 4, nome: 'Corte Premium', preco: 50 },
    { id: 5, nome: 'Higiene Facial', preco: 40 },
    { id: 6, nome: 'Pacote Completo', preco: 80 }
  ]);
  const [novoServico, setNovoServico] = useState({ nome: '', preco: '' });
  const [editando, setEditando] = useState<number | null>(null);

  useEffect(() => {
    carregarAgendamentos();
  }, []);

  const carregarAgendamentos = async () => {
    try {
      const response = await fetch('/api/agendamentos');
      const data = await response.json();
      setAgendamentos(data || []);
    } catch (error) {
      console.log('Sem API ainda');
    }
  };

  const adicionarServico = () => {
    if (novoServico.nome && novoServico.preco) {
      const novoId = Math.max(...servicos.map(s => s.id), 0) + 1;
      setServicos([...servicos, { id: novoId, nome: novoServico.nome, preco: parseFloat(novoServico.preco) }]);
      setNovoServico({ nome: '', preco: '' });
    }
  };

  const deletarServico = (id: number) => {
    if (confirm('Deletar este serviço?')) {
      setServicos(servicos.filter(s => s.id !== id));
    }
  };

  const salvarEdicao = (id: number, nome: string, preco: number) => {
    setServicos(servicos.map(s => s.id === id ? { ...s, nome, preco } : s));
    setEditando(null);
  };

  const totalReceita = agendamentos.reduce((acc, a) => acc + (servicos.find(s => s.nome === a.servico)?.preco || 0), 0);
  const clientesUnicos = new Set(agendamentos.map(a => a.nome)).size;

  const menuItems = [
    { id: 'dashboard', icon: '📊', label: 'Dashboard' },
    { id: 'servicos', icon: '✂️', label: 'Serviços' }
  ];

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f0f2f5' }}>
      {/* SIDEBAR */}
      <aside style={{
        width: '250px',
        background: 'linear-gradient(135deg,#0a2342 0%,#1a3d5c 100%)',
        color: 'white',
        padding: '2rem 0',
        position: 'fixed',
        height: '100vh',
        overflowY: 'auto'
      }}>
        <Link href="/" style={{
          display: 'block',
          textAlign: 'center',
          fontSize: '1.5rem',
          fontWeight: 900,
          marginBottom: '2rem',
          textDecoration: 'none',
          color: '#ffd700'
        }}>BARBA&CIA</Link>

        <nav>
          {menuItems.map(item => (
            <button
              key={item.id}
              onClick={() => setAba(item.id)}
              style={{
                width: '100%',
                padding: '1rem',
                background: aba === item.id ? '#ffd700' : 'transparent',
                color: aba === item.id ? '#0a2342' : 'white',
                border: 'none',
                cursor: 'pointer',
                fontSize: '1rem',
                fontWeight: aba === item.id ? 700 : 500,
                textAlign: 'left'
              }}
            >
              {item.icon} {item.label}
            </button>
          ))}
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <main style={{
        marginLeft: '250px',
        flex: 1,
        padding: '2rem'
      }}>
        <header style={{
          background: 'white',
          padding: '1.5rem',
          borderRadius: '10px',
          marginBottom: '2rem',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <h1 style={{ color: '#0a2342', margin: 0 }}>
            {aba === 'dashboard' && '📊 Dashboard'}
            {aba === 'servicos' && '✂️ Gerenciador de Serviços'}
          </h1>
          <Link href="/" style={{
            background: '#0a2342',
            color: 'white',
            padding: '0.7rem 1.5rem',
            borderRadius: '5px',
            textDecoration: 'none',
            fontWeight: 600
          }}>← Voltar</Link>
        </header>

        {/* DASHBOARD */}
        {aba === 'dashboard' && (
          <div>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit,minmax(250px,1fr))',
              gap: '1.5rem',
              marginBottom: '2rem'
            }}>
              <div style={{
                background: 'white',
                padding: '2rem',
                borderRadius: '10px',
                boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
              }}>
                <div style={{ fontSize: '2.5rem', fontWeight: 900, color: '#0a2342' }}>
                  {agendamentos.length}
                </div>
                <div style={{ color: '#666', marginTop: '0.5rem' }}>
                  Total de Agendamentos
                </div>
              </div>

              <div style={{
                background: 'white',
                padding: '2rem',
                borderRadius: '10px',
                boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
              }}>
                <div style={{ fontSize: '2.5rem', fontWeight: 900, color: '#ffd700' }}>
                  R$ {totalReceita.toFixed(2)}
                </div>
                <div style={{ color: '#666', marginTop: '0.5rem' }}>
                  Receita Total
                </div>
              </div>

              <div style={{
                background: 'white',
                padding: '2rem',
                borderRadius: '10px',
                boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
              }}>
                <div style={{ fontSize: '2.5rem', fontWeight: 900, color: '#25d366' }}>
                  {clientesUnicos}
                </div>
                <div style={{ color: '#666', marginTop: '0.5rem' }}>
                  Clientes Únicos
                </div>
              </div>
            </div>

            <div style={{
              background: 'white',
              padding: '2rem',
              borderRadius: '10px',
              boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
            }}>
              <h2 style={{ color: '#0a2342', marginTop: 0 }}>Serviços Disponíveis</h2>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit,minmin(200px,1fr))',
                gap: '1rem'
              }}>
                {servicos.map(servico => (
                  <div key={servico.id} style={{
                    background: '#f8f9fa',
                    padding: '1rem',
                    borderRadius: '8px',
                    border: '1px solid #ddd'
                  }}>
                    <div style={{ fontWeight: 600, color: '#0a2342' }}>
                      {servico.nome}
                    </div>
                    <div style={{ color: '#ffd700', fontWeight: 700, marginTop: '0.5rem' }}>
                      R$ {servico.preco.toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* SERVIÇOS */}
        {aba === 'servicos' && (
          <div>
            <div style={{
              background: 'white',
              padding: '2rem',
              borderRadius: '10px',
              marginBottom: '2rem',
              boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
            }}>
              <h2 style={{ color: '#0a2342', marginTop: 0 }}>Adicionar Novo Serviço</h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto', gap: '1rem' }}>
                <input
                  type="text"
                  placeholder="Nome do serviço"
                  value={novoServico.nome}
                  onChange={(e) => setNovoServico({ ...novoServico, nome: e.target.value })}
                  style={{
                    padding: '0.7rem',
                    borderRadius: '5px',
                    border: '2px solid #ddd',
                    fontSize: '1rem'
                  }}
                />
                <input
                  type="number"
                  placeholder="Preço (R$)"
                  value={novoServico.preco}
                  onChange={(e) => setNovoServico({ ...novoServico, preco: e.target.value })}
                  style={{
                    padding: '0.7rem',
                    borderRadius: '5px',
                    border: '2px solid #ddd',
                    fontSize: '1rem'
                  }}
                />
                <button
                  onClick={adicionarServico}
                  style={{
                    padding: '0.7rem 1.5rem',
                    background: '#0a2342',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    fontWeight: 600,
                    fontSize: '1rem'
                  }}
                >
                  ➕ Adicionar
                </button>
              </div>
            </div>

            <div style={{
              background: 'white',
              borderRadius: '10px',
              overflow: 'hidden',
              boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
            }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: '#0a2342', color: 'white' }}>
                    <th style={{ padding: '1rem', textAlign: 'left' }}>Serviço</th>
                    <th style={{ padding: '1rem', textAlign: 'left' }}>Preço</th>
                    <th style={{ padding: '1rem', textAlign: 'center' }}>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {servicos.map((servico) => (
                    <tr key={servico.id} style={{ borderBottom: '1px solid #eee' }}>
                      <td style={{ padding: '1rem' }}>
                        {editando === servico.id ? (
                          <input
                            type="text"
                            defaultValue={servico.nome}
                            onBlur={(e) => salvarEdicao(servico.id, e.target.value, servico.preco)}
                            style={{
                              padding: '0.5rem',
                              borderRadius: '5px',
                              border: '2px solid #ffd700',
                              width: '100%'
                            }}
                            autoFocus
                          />
                        ) : (
                          servico.nome
                        )}
                      </td>
                      <td style={{ padding: '1rem' }}>
                        {editando === servico.id ? (
                          <input
                            type="number"
                            defaultValue={servico.preco}
                            onBlur={(e) => salvarEdicao(servico.id, servico.nome, parseFloat(e.target.value))}
                            style={{
                              padding: '0.5rem',
                              borderRadius: '5px',
                              border: '2px solid #ffd700',
                              width: '100%'
                            }}
                            autoFocus
                          />
                        ) : (
                          `R$ ${servico.preco.toFixed(2)}`
                        )}
                      </td>
                      <td style={{ padding: '1rem', textAlign: 'center' }}>
                        <button
                          onClick={() => setEditando(servico.id)}
                          style={{
                            marginRight: '0.5rem',
                            padding: '0.5rem 1rem',
                            background: '#0a2342',
                            color: 'white',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer'
                          }}
                        >
                          ✏️ Editar
                        </button>
                        <button
                          onClick={() => deletarServico(servico.id)}
                          style={{
                            padding: '0.5rem 1rem',
                            background: '#dc3545',
                            color: 'white',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer'
                          }}
                        >
                          🗑️ Deletar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}