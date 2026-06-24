import { useState } from "react";
import { perguntarGemini } from "./services/geminiService";
import ReactMarkdown from "react-markdown"; 
import "./Chat.css"; 

export default function Chat() {

  const [texto, setTexto] = useState("");
  const [mensagens, setMensagens] = useState([]);
  const [loading, setLoading] = useState(false);


async function enviarMensagem() {
    if (!texto.trim()) return;

    const pergunta = texto; 

    setMensagens((prev) => [
      ...prev,
      {
        texto: pergunta,
        tipo: "enviado",
      },
    ]);

    setTexto("");
    setLoading(true);

    try {
      const respostaIA = await perguntarGemini(pergunta);

      setMensagens((prev) => [
        ...prev,
        {
          texto: respostaIA,
          tipo: "recebida",
        },
      ]);
    } catch (erro) {
      console.error(erro);

      setMensagens((prev) => [
        ...prev,
        {
          texto: "Não consegui responder agora. Verifique se o seu backend está ligado na porta 3000!",
          tipo: "recebida",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }
 
  async function perguntaRapida(pergunta) {
    setLoading(true);

    setMensagens((prev) => [
      ...prev,
      {
        texto: pergunta,
        tipo: "enviado",
      },
    ]);

    try {
      const resposta = await perguntarGemini(pergunta);

      setMensagens((prev) => [
        ...prev,
        {
          texto: resposta,
          tipo: "recebida",
        },
      ]);
    } catch (erro) {
      console.error(erro);
    } finally {
      setLoading(false);
    }
  }


  return (
    <div className="containerChat">
      <div className="historico">
        {mensagens.map((mensagem, index) => (
          <div 
            key={index} 
            className={mensagem.tipo === "enviado" ? "enviada" : "recebida"}
          >
            <div className="mensagem">
              <ReactMarkdown>
                {mensagem.texto}
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
        />
        <button onClick={enviarMensagem} disabled={loading}>
          {loading ? "Carregando..." : "Enviar"}
        </button>
      </div>
    </div>
  );
}