import React, { useState } from 'react';

export default function QuizAvaliacao({ dadosProva, onFinalizarProva, onVoltar }) {
    const [respostasAluno, setRespostasAluno] = useState({});
    const [carregando, setCarregando] = useState(false);

    const questoes = dadosProva?.avaliacao?.questoes || dadosProva?.questoes || [];
    const areaTrilha = dadosProva?.area || dadosProva?.avaliacao?.area || "";

    const handleVoltarClick = () => {
        if (onVoltar) {
            onVoltar();
        } else {
            onFinalizarProva({ area: areaTrilha, respostas: {} });
        }
    };

    const handleSelecionarAlternativa = (questaoIndex, alternativa) => {
        setRespostasAluno({
            ...respostasAluno,
            [questaoIndex]: alternativa
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (Object.keys(respostasAluno).length < questoes.length) {
            alert("Por favor, responda todas as questões antes de enviar!");
            return;
        }

        setCarregando(true);
        try {
            await onFinalizarProva({
                area: areaTrilha,
                respostas: respostasAluno
            });
            alert("Avaliação enviada com sucesso!");
        } catch (error) {
            console.error(error);
            alert("Erro ao enviar respostas para o servidor.");
        } finally {
            setCarregando(false);
        }
    };

    return (
        <div style={{ padding: '20px', maxWidth: '700px', margin: '0 auto', fontFamily: 'sans-serif', textAlign: 'left' }}>
            
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                <button type="button" onClick={handleVoltarClick} style={{ padding: '5px 10px', cursor: 'pointer' }}>
                    ← Voltar
                </button>
            </div>

            <h2 style={{ textAlign: 'center', color: '#0056b3' }}>Avaliação Diagnóstica: {areaTrilha}</h2>
            <p style={{ textAlign: 'center', color: '#666' }}>Responda as questões abaixo com atenção.</p>

            <form onSubmit={handleSubmit}>
                {questoes.map((questao, index) => (
                    <div key={index} style={{ backgroundColor: '#f8f9fa', padding: '20px', borderRadius: '8px', marginBottom: '20px', borderLeft: '5px solid #0056b3' }}>
                        
                        <p style={{ fontWeight: 'bold', fontSize: '16px' }}>
                            {index + 1}. {questao.pergunta || questao.enunciado}
                        </p>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            {questao.alternativas.map((alternativa, altIndex) => {
                                const letra = alternativa.trim().toUpperCase().startsWith('A') ? 'A' :
                                              alternativa.trim().toUpperCase().startsWith('B') ? 'B' :
                                              alternativa.trim().toUpperCase().startsWith('C') ? 'C' :
                                              alternativa.trim().toUpperCase().startsWith('D') ? 'D' :
                                              String.fromCharCode(65 + altIndex);

                                const estaMarcado = respostasAluno[index] === letra;

                                return (
                                    <label key={altIndex} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px', cursor: 'pointer', borderRadius: '4px', backgroundColor: estaMarcado ? '#e2e6ea' : 'transparent' }}>
                                        <input
                                            type="radio"
                                            name={`questao-${index}`}
                                            value={letra}
                                            checked={estaMarcado}
                                            onChange={() => handleSelecionarAlternativa(index, letra)}
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
                    disabled={carregando}
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
                        cursor: carregando ? 'not-allowed' : 'pointer',
                        marginTop: '30px'
                    }}
                >
                    {carregando ? "Enviando para Correção..." : "Enviar Respostas para Correção"}
                </button>
            </form>
        </div>
    );
}