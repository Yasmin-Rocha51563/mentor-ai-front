export async function perguntarGemini(pergunta) {
  try {
    const resposta = await fetch("http://localhost:3000/chat/perguntar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ pergunta }), 
    });

    if (!resposta.ok) {
      throw new Error("Erro na resposta do servidor.");
    }

    const dados = await resposta.json();
    
    return dados.resposta; 
  } catch (erro) {
    console.error("Erro ao conectar no backend:", erro);
    throw erro;
  }
}
////
export async function obterAvaliacao(area) {
  try {
    const resposta = await fetch("http://localhost:3000/trilhas/avaliacao", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      
      body: JSON.stringify({ area: area }), 
    });
    
    if (!resposta.ok) {   
      const textoErro = await resposta.text();
      throw new Error(`Erro no servidor: ${resposta.status} - ${textoErro}`);
    }
    
    const dados = await resposta.json();
    return dados;
  } catch (error) {
    console.error("Erro em obterAvaliacao:", error.message);
    throw new Error("Erro na resposta do servidor ao gerar prova.");
  }
}

export async function enviarRespostasAvaliacao(avaliacaoId, respostasAluno, questoes){
  try {
    const dadosParaEnviar = {
      avaliacaoId: avaliacaoId,
      respostas: questoes.map((q, index) => ({
        questaoId: q.id || index + 1,
        alternativa: respostasAluno[index]
      }))
    };
    
    const resposta = await fetch("http:localhost:3000/trilhas/avaliacao/responder", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(dadosParaEnviar),
    });

    if (!resposta.ok) {
      const textoErro = await resposta.text();
      throw new Error(`Erro do servidor: ${textoErro}`);
    }
    return await resposta.json();
  } catch (error) {
    console.error("Erro ao enviar respostas:", error);
    throw error;
  }
}

