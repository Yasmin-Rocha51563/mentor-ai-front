import React, { useState } from 'react';

export default function QuizAvaliacao({ dadosProva, onFinalizarProva }) {

  const [respostasAluno, setRespostasAluno] = useState({});

  const handleSelecionarAlternativa = (questaoIndex, alternativa) => {
    setRespostasAluno({
      ...respostasAluno,
      [questaoIndex]: alternativa
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (Object.keys(respostasAluno).length < dadosProva.questoes.length) {
      alert("Por favor, responda todas as questões antes de enviar!");
      return;
    }

    const dadosParaEnviar = {
      area: dadosProva.area,
      respostas: dadosProva.questoes.map((q, index) => ({
        questaoId: q.id || index + 1,
        alternativa: respostasAluno[index]
      }))
    };

    onFinalizarProva(dadosParaEnviar);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '700px', margin: '0 auto', fontFamily: 'sans-serif', textAlign: 'left' }}>
      <h2 style={{ textAlign: 'center', color: '#0056b3' }}>Avaliação Diagnóstica: {dadosProva.area}</h2>
      <p style={{ textAlign: 'center', color: '#666' }}>Responda as questões abaixo com atenção.</p>
      
      <form onSubmit={handleSubmit}>
        {dadosProva.questoes.map((questao, index) => (
          <div key={index} style={{ 
            backgroundColor: '#f8f9fa', 
            padding: '20px', 
            borderRadius: '8px', 
            marginBottom: '20px',
            borderLeft: '5px solid #0056b3'
          }}>
            <p style={{ fontWeight: 'bold', fontSize: '16px' }}>
              {index + 1}. {questao.pergunta || questao.enunciado}
            </p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {questao.alternativas.map((alternativa, altIndex) => {
              
                const letra = alternativa.trim().toUpperCase().startsWith('A)') ? 'A' :
                              alternativa.trim().toUpperCase().startsWith('B)') ? 'B' :
                              alternativa.trim().toUpperCase().startsWith('C)') ? 'C' :
                              alternativa.trim().toUpperCase().startsWith('D)') ? 'D' : 
                              String.fromCharCode(65 + altIndex); 

                return (
                  <label key={altIndex} style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '10px', 
                    cursor: 'pointer',
                    padding: '8px',
                    borderRadius: '4px',
                    backgroundColor: respostasAluno[index] === letra ? '#e2e6ea' : 'transparent'
                  }}>
                    <input
                      type="radio"
                      name={`questao-${index}`}
                      value={letra}
                      checked={respostasAluno[index] === letra}
                      onChange={() => handleSelecionarAlternativa(index, letra)}
                      style={{ cursor: 'pointer' }}
                    />
                    {alternativa}
                  </label>
                );
              })}
            </div>
          </div>
        ))}

        <button
          type="submit"
          style={{
            display: 'block',
            width: '100%',
            padding: '15px',
            fontSize: '18px',
            fontWeight: 'bold',
            color: 'white',
            backgroundColor: '#28a745',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            marginTop: '30px'
          }}
        >
          Enviar Respostas para Correção
        </button>
      </form>
    </div>
  );
}