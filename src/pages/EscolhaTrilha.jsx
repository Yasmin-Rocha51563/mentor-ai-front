import React, { useState } from 'react';
import { obterAvaliacao } from '../services/geminiService';

export default function EscolhaTrilha({ onProvaGerada }) {
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState('');

  const areas = [
    "Lógica de Programação",
    "Frontend",
    "Backend",
    "Banco de Dados",
    "UX/UI",
    "Multimídia"
  ];

  const handleEscolha = async (area) => {
    setCarregando(true);
    setErro('');
    try {
      const dadosProva = await obterAvaliacao(area);
      onProvaGerada(dadosProva);
    } catch (err) {
      setErro('Não foi possível gerar a avaliação. Tente novamente.');
      console.error(err);
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center', fontFamily: 'sans-serif' }}>
      {/* 🚀 CORRIGIDO: Cor adicionada diretamente no h2 e no p para dar contraste total */}
      <h2 style={{ color: '#0b2545', fontWeight: 'bold', margin: '0 0 10px 0' }}>
        Seja bem-vindo ao Mentor IA
      </h2>
      <p style={{ color: '#1e293b', fontSize: '16px', margin: '0 0 20px 0' }}>
        Escolha uma área de conhecimento para iniciar sua avaliação diagnóstica:
      </p>
      
      {erro && <p style={{ color: 'red' }}>{erro}</p>}
      
      {carregando ? (
        <div style={{ margin: '20px', fontSize: '18px', fontWeight: 'bold', color: '#0b2545' }}>
          🔄 O Gemini está gerando sua prova personalizada... Aguarde.
        </div>
      ) : (
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: '15px', 
          maxWidth: '800px', 
          margin: '30px auto' 
        }}>
          {areas.map((area) => (
            <button
              key={area}
              onClick={() => handleEscolha(area)}
              style={{
                padding: '20px',
                fontSize: '16px',
                cursor: 'pointer',
                backgroundColor: '#0056b3',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                transition: 'background 0.2s',
                fontWeight: 'bold'
              }}
              onMouseOver={(e) => e.target.style.backgroundColor = '#004085'}
              onMouseOut={(e) => e.target.style.backgroundColor = '#0056b3'}
            >
              {area}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}