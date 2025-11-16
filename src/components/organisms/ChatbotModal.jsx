import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, User, Loader2, MessageCircle } from 'lucide-react';
import { Button, Input } from '@atoms';
import { chatbotService } from '@services';
import { authService } from '@services';

/**
 * ChatbotModal Component
 * Modal con interfaz de chat para interactuar con el chatbot
 */
const ChatbotModal = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Obtener ID del cliente del usuario autenticado
  const getClienteId = () => {
    const user = authService.getCurrentUser();
    // Si el usuario tiene id_cliente, usarlo; si no, usar id_usuario
    return user?.id_cliente || user?.id_usuario || null;
  };

  // Scroll automático al final
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Enviar mensaje de bienvenida al abrir
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          type: 'bot',
          content: '¡Hola! 👋 Soy tu asistente virtual del cine. ¿En qué puedo ayudarte hoy?',
          timestamp: new Date(),
        },
      ]);
    }
  }, [isOpen]);

  // Focus en input al abrir
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 300);
    }
  }, [isOpen]);

  // Enviar mensaje
  const handleSendMessage = async (e) => {
    e.preventDefault();
    
    if (!inputValue.trim() || isLoading) return;

    const userMessage = inputValue.trim();
    setInputValue('');
    
    // Agregar mensaje del usuario
    const newUserMessage = {
      type: 'user',
      content: userMessage,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, newUserMessage]);
    setIsLoading(true);

    try {
      const id_cliente = getClienteId();
      const response = await chatbotService.enviarMensaje(userMessage, id_cliente);

      if (response.success && response.data) {
        const botResponse = {
          type: 'bot',
          content: response.data.respuesta?.mensaje || 'Lo siento, no pude procesar tu mensaje.',
          data: response.data.respuesta,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, botResponse]);
      }
    } catch (error) {
      const errorMessage = {
        type: 'bot',
        content: 'Lo siento, ocurrió un error al procesar tu mensaje. Por favor, intenta de nuevo.',
        isError: true,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  // Renderizar contenido del mensaje del bot
  const renderBotMessage = (message) => {
    if (message.isError) {
      return (
        <div className="text-error text-sm">{message.content}</div>
      );
    }

    // Si hay datos adicionales, renderizar contenido enriquecido
    if (message.data) {
      const { tipo, peliculas, funciones_disponibles, recomendaciones, acciones } = message.data;

      return (
        <div className="space-y-3">
          <div className="text-sm text-neutral-700">{message.content}</div>
          
          {/* Recomendaciones de películas */}
          {recomendaciones && recomendaciones.length > 0 && (
            <div className="space-y-2">
              {recomendaciones.slice(0, 3).map((pelicula, idx) => (
                <div
                  key={idx}
                  className="p-3 bg-neutral-50 rounded-lg border border-neutral-200"
                >
                  <div className="font-semibold text-sm text-neutral-900">
                    {pelicula.titulo}
                  </div>
                  {pelicula.genero && (
                    <div className="text-xs text-neutral-600 mt-1">
                      {pelicula.genero}
                    </div>
                  )}
                  {pelicula.proximas_funciones && pelicula.proximas_funciones.length > 0 && (
                    <div className="text-xs text-neutral-500 mt-2">
                      Horarios: {pelicula.proximas_funciones
                        .map((f) => `${f.hora}`)
                        .join(', ')}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Funciones disponibles */}
          {funciones_disponibles && funciones_disponibles.length > 0 && (
            <div className="space-y-2">
              {funciones_disponibles.slice(0, 5).map((funcion, idx) => (
                <div
                  key={idx}
                  className="p-3 bg-primary/5 rounded-lg border border-primary/20 cursor-pointer hover:bg-primary/10 transition-colors"
                >
                  <div className="text-sm font-medium text-neutral-900">
                    {funcion.fecha} a las {funcion.hora}
                  </div>
                  <div className="text-xs text-neutral-600 mt-1">
                    Sala {funcion.sala?.nombre} ({funcion.sala?.tipo}) - ${funcion.precio}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Acciones sugeridas */}
          {acciones && acciones.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {acciones.map((accion, idx) => (
                <button
                  key={idx}
                  onClick={() => setInputValue(accion.texto)}
                  className="px-3 py-1.5 text-xs bg-primary/10 text-primary rounded-full hover:bg-primary/20 transition-colors"
                >
                  {accion.texto}
                </button>
              ))}
            </div>
          )}

          {/* Opciones sugeridas */}
          {message.data.opciones && (
            <div className="flex flex-wrap gap-2 mt-3">
              {message.data.opciones.map((opcion, idx) => (
                <button
                  key={idx}
                  onClick={() => setInputValue(opcion)}
                  className="px-3 py-1.5 text-xs bg-neutral-100 text-neutral-700 rounded-full hover:bg-neutral-200 transition-colors"
                >
                  {opcion}
                </button>
              ))}
            </div>
          )}
        </div>
      );
    }

    return <div className="text-sm text-neutral-700">{message.content}</div>;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-end p-4 pointer-events-none">
          {/* Backdrop - Solo visible en móvil, transparente en desktop */}
          <motion.div
            className="absolute inset-0 bg-neutral-900/50 backdrop-blur-sm md:bg-transparent"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Modal */}
          <motion.div
            className="relative w-full max-w-md h-[600px] bg-white rounded-t-2xl rounded-b-lg shadow-2xl flex flex-col pointer-events-auto"
            initial={{ opacity: 0, y: 100, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.95 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-neutral-200 bg-gradient-to-r from-primary to-primary/80">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/20 rounded-full">
                  <Bot className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">CineChat</h3>
                  <p className="text-white/80 text-xs">En línea</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-white/80 hover:text-white hover:bg-white/20 rounded-lg transition-colors"
                aria-label="Cerrar chat"
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-neutral-50">
              {messages.map((message, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-3 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {message.type === 'bot' && (
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <Bot className="h-4 w-4 text-primary" />
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                      message.type === 'user'
                        ? 'bg-primary text-white'
                        : 'bg-white text-neutral-900 shadow-sm border border-neutral-200'
                    }`}
                  >
                    {message.type === 'user' ? (
                      <div className="text-sm">{message.content}</div>
                    ) : (
                      renderBotMessage(message)
                    )}
                  </div>
                  {message.type === 'user' && (
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <User className="h-4 w-4 text-primary" />
                    </div>
                  )}
                </motion.div>
              ))}

              {isLoading && (
                <div className="flex gap-3 justify-start">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <Bot className="h-4 w-4 text-primary" />
                  </div>
                  <div className="bg-white rounded-2xl px-4 py-2 shadow-sm border border-neutral-200">
                    <Loader2 className="h-4 w-4 text-primary animate-spin" />
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleSendMessage} className="p-4 border-t border-neutral-200 bg-white">
              <div className="flex gap-2">
                <Input
                  ref={inputRef}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Escribe tu mensaje..."
                  disabled={isLoading}
                  className="flex-1"
                />
                <Button
                  type="submit"
                  disabled={!inputValue.trim() || isLoading}
                  variant="primary"
                  className="px-4"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ChatbotModal;

