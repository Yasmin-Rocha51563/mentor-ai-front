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
      console.error("Erro vindo do servidor:", textoErro);
      throw new Error("Erro na resposta do servidor ao gerar prova.");
    }
    
    return await resposta.json(); 
  } catch (erro) {
    console.error("Erro detalhado ao obter avaliação:", erro);
    throw erro;
  }
}

export async function enviarRespostasAvaliacao(dadosRespostas){
  try {
    const resposta = await fetch("http:localhost:3000/trilhas/avaliacao/responder", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dadosRespostas),
    });
    if (!resposta.ok) {
      throw new Error("Erro na resposta do servidor ao corrigir avaliação");
    }
    return await resposta.json();
  } catch (erro) {
    console.error("Erro ao enviar respostas:", erro);
    throw erro;
  }
}