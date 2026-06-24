import React, { useState } from 'react';
import EscolhaTrilha from './EscolhaTrilha';
import QuizAvaliacao from './QuizAvaliacao';
import { enviarRespostasAvaliacao } from '../services/geminiService';

export default function Trilhas() {
  const [telaAtual, setTelaAtual] = useState('escolha');
  const [provaGerada, setProvaGerada] = useState(null);
  const [corrigindo, setCorrigindo] = useState(false);
  const [resultadoTrilha, setResultadoTrilha] = useState(null);
  const [erro, setErro] = useState('');
 
  const handleProvaGerada = (dadosDaProva) => {
    setProvaGerada(dadosDaProva);
    setTelaAtual('quiz');
  };

  const handleFinalizarProva = async (dadosDoQuiz) => {
    setCorrigindo(true);
    setErro('');
    try {

      const respostaFinal = await enviarRespostasAvaliacao({
        area: dadosDoQuiz.area,
        respostas: dadosDoQuiz.respostas
      });
      
      // guarda o retorno do Sequelize (Trilha, avaliação e planos criados)
      setResultadoTrilha(respostaFinal);
      setTelaAtual('resultado');
    } catch (err) {
      setErro('Ocorreu um erro ao corrigir sua prova. Tente enviar novamente.');
      console.error(err);
    } finally {
      setCorrigindo(false);
    }
  };

  return (
    <div className="trilhas-container" style={{ fontFamily: 'sans-serif', padding: '20px' }}>
      {erro && <p style={{ color: 'red', textAlign: 'center' }}>{erro}</p>}

    
      {corrigindo && (
        <div style={{ textAlign: 'center', margin: '40px auto', fontSize: '18px', fontWeight: 'bold' }}>
          🔄 O Mentor AI e o Gemini estão avaliando suas respostas...<br />
          Calculando sua nota e gravando sua trilha de estudos no banco de dados!
        </div>
      )}

      {/* Botões de escolha da Área */}
      {!corrigindo && telaAtual === 'escolha' && (
        <EscolhaTrilha onProvaGerada={handleProvaGerada} />
      )}

      {/* Formulário com as 10 questões criadas pela IA */}
      {!corrigindo && telaAtual === 'quiz' && provaGerada && (
        <QuizAvaliacao 
          dadosProva={provaGerada} 
          onFinalizarProva={handleFinalizarProva} 
        />
      )}

      {/* Exibição dos resultados vindos do Banco de Dados via Sequelize */}
      {!corrigindo && telaAtual === 'resultado' && resultadoTrilha && (
        <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ color: '#28a745' }}>🎉 Avaliação Concluída!</h2>
          
          <p style={{ fontSize: '18px' }}>
            Sua Pontuação: <strong>{resultadoTrilha.avaliacao?.pontuacao} / 10</strong>
          </p>
          <p style={{ fontSize: '18px' }}>
            Seu Nível Identificado: <span style={{ color: '#0056b3', fontWeight: 'bold' }}>{resultadoTrilha.avaliacao?.nivelAtual}</span>
          </p>

          <div style={{ backgroundColor: '#f1f3f5', padding: '15px', borderRadius: '8px', marginTop: '20px', textAlign: 'left' }}>
            <h3 style={{ marginTop: 0 }}>📚 Plano de Ensino Criado:</h3>
            <p style={{ fontSize: '16px', color: '#333' }}>
              <strong>Trilha:</strong> {resultadoTrilha.trilha?.nome} ({resultadoTrilha.trilha?.nivelObjetivo})
            </p>
            
            <ul style={{ paddingLeft: '20px' }}>
              {resultadoTrilha.planos?.map((plano, i) => (
                <li key={i} style={{ marginBottom: '10px' }}>
                  <strong>{plano.titulo}</strong>: {plano.descricao} <br />
                  <small style={{ color: '#666' }}>Tempo sugerido: {plano.tempoEstimado} | Ordem: {plano.ordem}</small>
                </li>
              ))}
            </ul>
          </div>

          <button 
            onClick={() => setTelaAtual('escolha')} 
            style={{ 
              marginTop: '20px', 
              padding: '12px 25px', 
              cursor: 'pointer', 
              backgroundColor: '#0056b3', 
              color: 'white', 
              border: 'none', 
              borderRadius: '5px',
              fontWeight: 'bold'
            }}
          >
            Criar Nova Trilha
          </button>
        </div>
      )}
    </div>
  );
}