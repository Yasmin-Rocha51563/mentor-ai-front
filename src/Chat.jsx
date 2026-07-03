import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown"; 
import "./Chat.css"; 

export default function Chat() {
  const [texto, setTexto] = useState("");
  const [mensagens, setMensagens] = useState([]);
  const [loading, setLoading] = useState(false);

  //pega id do usuario logado pra buscar o historico correto
  const userId = localStorage.getItem('userId') || 1;

  //exibição do histórico de conversas ao carregar a tela
  useEffect(() => {
    async function carregarHistorico() {
      try {
        const response = await fetch(`http://localhost:3000/chat/historico?userId=${userId}`);
        if (response.ok) {
          const dados = await response.json();
          //mapeia o formato do banco pro formato visual do seu componente
          const mensagensFormatadas = dados.flatMap(msg => [
            { texto: msg.pergunta, tipo: "enviado" },
            { texto: msg.resposta, tipo: "recebida" }
          ]);
          setMensagens(mensagensFormatadas);
        }
      } catch (error) {
        console.error("Erro ao carregar o histórico do banco:", error);
      }
    }
    carregarHistorico();
  }, [userId]);

async function enviarMensagem() {
    if (!texto.trim()) return;

    const pergunta = texto; 

    setMensagens((prev) => [
      ...prev,
      { texto: pergunta, tipo: "enviado" },
    ]);

    setTexto("");
    setLoading(true);

    try {
      //envia pro backend real pra persistir no banco
      const response = await fetch("http://localhost:3000/chat/perguntar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          pergunta: pergunta,
          userId: userId
        })
      });

      const dados = await response.json();

      if (!response.ok) {
        throw new Error(dados.mensagem || dados.error || 'Erro na requisição');
      }

      //garante que pega o texto limpo se vier em .resposta ou em .message
      let textoFinal = "";
      if (dados.resposta) {
        textoFinal = typeof dados.resposta === 'object' ? (dados.resposta.message || dados.resposta.texto) : dados.resposta;
      } else if (dados.message) {
        textoFinal = dados.message;
      } else {
        textoFinal = JSON.stringify(dados);
      }

      //respostas geradas pela ia e atualização automática
      setMensagens((prev) => [
        ...prev,
        { texto: textoFinal, tipo: "recebida" },
      ]);

    } catch (erro) {
      console.error(erro);
      setMensagens((prev) => [
        ...prev,
        {
          texto: "Não consegui responder agora. Verifique se o seu backend está ligado na porta 3000 ou se o formato da resposta mudou!",
          tipo: "recebida",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }
 
  async function perguntaRapida(pergunta) {
    setTexto(pergunta);
  }


  const limparConversa = () => {
  setMensagens([]); 
};  


  return (
    <div className="containerChat">
      {/* botão de cova nonversa adicionado aqui */}
    <div className="chatHeader">
      <button onClick={limparConversa} className="btnLimpar">
        🔄 Nova Conversa (Limpar Tela)
      </button>
    </div>
      <div className="historico">
        {mensagens.map((mensagem, index) => (
          <div 
            key={index} 
            className={mensagem.tipo === "enviado" ? "enviada" : "recebida"}
          >
            <div className="mensagem">
              <ReactMarkdown>
  {typeof mensagem.texto === 'string' ? mensagem.texto.replaceAll('\\n', '\n') : mensagem.texto}
</ReactMarkdown>
            </div>
          </div>
        ))}
      </div>

      <div className="inputArea">
        <input 
          value={texto} 
          onChange={(e) => setTexto(e.target.value)} 
          placeholder="Digite sua mensagem..." 
          onKeyDown={(e) => e.key === 'Enter' && enviarMensagem()} 
        />
        <button onClick={enviarMensagem} disabled={loading}>
          {loading ? "Carregando..." : "Enviar"}
        </button>
      </div>
    </div>
  );
}