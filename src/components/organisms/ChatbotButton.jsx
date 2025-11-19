import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X } from 'lucide-react';
import ChatbotModal from './ChatbotModal';

/**
 * ChatbotButton Component
 * Burbuja flotante que abre el modal del chatbot al hacer clic
 */
const ChatbotButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Burbuja flotante */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 w-14 h-14 bg-gradient-to-r from-primary to-primary/80 text-white rounded-full shadow-lg hover:shadow-xl flex items-center justify-center transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-primary/50"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{
          type: 'spring',
          stiffness: 260,
          damping: 20,
        }}
        aria-label="Abrir asistente virtual"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="h-6 w-6" />
            </motion.div>
          ) : (
            <motion.div
              key="message"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <MessageCircle className="h-6 w-6" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Indicador de notificación (opcional) */}
        {!isOpen && (
          <motion.div
            className="absolute -top-1 -right-1 w-4 h-4 bg-error rounded-full border-2 border-white"
            initial={{ scale: 0 }}
            animate={{ scale: [0, 1.2, 1] }}
            transition={{
              delay: 1,
              duration: 0.3,
            }}
          />
        )}
      </motion.button>

      {/* Modal del chatbot */}
      <ChatbotModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};

export default ChatbotButton;




