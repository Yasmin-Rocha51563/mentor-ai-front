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
export async function enviarRespostasAvaliacao(area, respostas) {
  try {
    const response = await fetch("http://localhost:3000/trilhas/avaliacao/responder", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        area: area,         // A string com o nome da área (ex: "Python")
        respostas: respostas // O objeto com as respostas do aluno
      }),
    });

    if (!response.ok) {
      // Isto vai nos ajudar a ver o erro real no F12 do navegador caso o backend barre
      const erroTexto = await response.text();
      throw new Error(`Erro no servidor: ${response.status} - ${erroTexto}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Erro em enviarRespostasAvaliacao:", error);
    throw error;
  }
}