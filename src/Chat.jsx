import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown"; 
import ButtonWithIcon from "./components/ButtonWithIcon.jsx";
import { Send, RefreshCw, ChevronLeft, ChevronRight } from "lucide-react";
import Sidebar from "./components/Sidebar.jsx";
import Header from "./components/Header.jsx";
import { useNavigate } from "react-router-dom";
import "./Chat.css"; 

export default function Chat() {
  const [texto, setTexto] = useState("");
  const [mensagens, setMensagens] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  //pega id do usuario logado pra buscar o historico correto
  const userId = localStorage.getItem('userId') || 1;

  //exibição do histórico de conversas ao carregar a tela
  useEffect(() => {
    async function carregarHistorico() {
      try {
        const response = await fetch(`http://localhost:3000/chat/historico?userId=${userId}`);
        if (response.ok) {
          const dados = await response.json();
          const msgMapeadas = [];
          dados.forEach(item => {
            msgMapeadas.push({ texto: item.pergunta, tipo: "enviado" });
            msgMapeadas.push({ texto: item.resposta, tipo: "recebida" });
          });
          setMensagens(msgMapeadas);
        }
      } catch (error) {
        console.error("Erro ao carregar histórico de conversas:", error);
      }
    }
    carregarHistorico();
  }, [userId]);

  async function enviarMensagem(mensagemPredefinida = null) {
    const pergunta = (typeof mensagemPredefinida === 'string' ? mensagemPredefinida : texto).trim();
    if (!pergunta) return;

    setMensagens((prev) => [
      ...prev,
      { texto: pergunta, tipo: "enviado" },
    ]);

    if (typeof mensagemPredefinida !== 'string') {
      setTexto("");
    }
    setLoading(true);

    try {
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
      console.log("ESTRUTURA REAL DOS DADOS DO BACK-END:", dados);

      if (!response.ok) {
        throw new Error(dados.mensagem || dados.error || 'Erro na requisição');
      }

      let textoFinal = "";

      try {
        const dadosIA = JSON.parse(dados.resposta);
        const textoPrincipal = dadosIA.resposta || dadosIA.response || "";
        const listaBruta = dadosIA.sugestoes_de_perguntas || dadosIA.suggestions_de_perguntas;
        
        let listaSugestoes = "";
        if (Array.isArray(listaBruta)) {
          listaSugestoes = "\n\n### 🤔 Sugestões de perguntas:\n" + 
            listaBruta.map(sugestao => `* ${sugestao}`).join("\n");
        }
        
        textoFinal = textoPrincipal + listaSugestoes;
      } catch (e) {
        textoFinal = typeof dados.resposta === 'string' ? dados.resposta : JSON.stringify(dados);
      }

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

  const limparConversa = () => {
    setMensagens([]); 
  };  

  return (
    <div className="chatPageLayout">
      <Sidebar />
      
      <main className="chatMainContent">
        <Header />
        
        <div className="chatDashboardArea">
          
          <div className="chatWindowCard">
            <div className="chatWindowCardHeader">
              <div className="chatWindowBackBtn" onClick={() => navigate('/home')}>
                <ChevronLeft size={24} className="chatBackIcon" />
                <span>MentorIA</span>
              </div>
              <ButtonWithIcon 
                onClick={limparConversa} 
                variant="danger"
                title="Nova Conversa"
                icon={<RefreshCw size={14} />}
                style={{ padding: '6px 12px', fontSize: '12px' }}
              />
            </div>
            
            <div className="chatHistoryScroll">
              {mensagens.map((mensagem, index) => {
                const isUser = mensagem.tipo === "enviado";
                return (
                  <div 
                    key={index} 
                    className={`chatMsgRow ${isUser ? "chatMsgUser" : "chatMsgAI"}`}
                  >
                    {!isUser && (
                      <div className="chatMsgAvatar aiAvatar">
                        <div className="avatarRing">🤖</div>
                      </div>
                    )}
                    
                    <div className="chatMsgBubble">
                      <ReactMarkdown>
                        {typeof mensagem.texto === 'string' ? mensagem.texto.replaceAll('\\n', '\n') : mensagem.texto}
                      </ReactMarkdown>
                    </div>
                    
                    {isUser && (
                      <div className="chatMsgAvatar userAvatar">
                        <div className="avatarRing">J</div>
                      </div>
                    )}
                  </div>
                );
              })}
              {loading && (
                <div className="chatMsgRow chatMsgAI">
                  <div className="chatMsgAvatar aiAvatar">
                    <div className="avatarRing thinking">🤖</div>
                  </div>
                  <div className="chatMsgBubble thinkingMsg">
                    <span>MentorIA está pensando...</span>
                  </div>
                </div>
              )}
            </div>
            
            <div className="chatInputAreaRow">
              <div className="chatPillInputWrapper">
                <input 
                  value={texto} 
                  onChange={(e) => setTexto(e.target.value)} 
                  placeholder="Digite aqui..." 
                  onKeyDown={(e) => e.key === 'Enter' && enviarMensagem()} 
                />
                <button onClick={() => enviarMensagem()} disabled={loading} className="chatInnerSendBtn">
                  <Send size={16} />
                </button>
              </div>
              
              <button 
                onClick={() => enviarMensagem()} 
                disabled={loading} 
                className="chatOrangeSendBtn"
              >
                Enviar
              </button>
            </div>
          </div>
          
          <div className="chatBottomShortcutButtons">
            <ButtonWithIcon 
              onClick={() => enviarMensagem("O que estudar hoje?")}
              title="O que estudar hoje?" 
              icon={<ChevronRight size={18} />} 
              variant="primary"
            />
            <ButtonWithIcon 
              onClick={() => enviarMensagem("Como está meu progresso?")}
              title="Revisar meu progresso" 
              icon={<ChevronRight size={18} />} 
              variant="primary"
            />
            <ButtonWithIcon 
              onClick={() => enviarMensagem("Gostaria de fazer mais perguntas.")}
              title="Perguntar mais" 
              icon={<ChevronRight size={18} />} 
              variant="primary"
            />
          </div>
          
        </div>
      </main>
    </div>
  );
}