import { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';

const WhatsAppButton = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent(
      "Olá! Vim através do site e gostaria de mais informações sobre os serviços de marketing digital da MOV. Podemos conversar?"
    );
    const phoneNumber = "19981134193";
    const whatsappUrl = `https://wa.me/55${phoneNumber}?text=${message}`;
    
    window.open(whatsappUrl, '_blank');
  };

  return (
    <>
      {/* Floating WhatsApp Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <div className="relative">
          {/* Expanded Message */}
          {isExpanded && (
            <div className="absolute bottom-16 right-0 w-72 bg-card/95 backdrop-blur-sm border border-border/50 rounded-2xl p-4 mb-2 shadow-lg animate-fade-in">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="font-semibold text-foreground text-sm">MOV Marketing</h4>
                  <p className="text-xs text-muted-foreground">Online agora</p>
                </div>
                <button
                  onClick={() => setIsExpanded(false)}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              
              <p className="text-sm text-muted-foreground mb-4">
                Olá! 👋 Como podemos ajudar você a transformar sua marca hoje?
              </p>
              
              <button
                onClick={handleWhatsAppClick}
                className="w-full bg-green-600 hover:bg-green-700 text-white text-sm font-medium py-2 px-4 rounded-xl transition-colors duration-200"
              >
                Iniciar Conversa
              </button>
            </div>
          )}

          {/* Main Button */}
          <button
            onClick={() => {
              if (isExpanded) {
                handleWhatsAppClick();
              } else {
                setIsExpanded(true);
              }
            }}
            onMouseEnter={() => !isExpanded && setIsExpanded(true)}
            className="group relative flex items-center justify-center w-14 h-14 bg-green-600 hover:bg-green-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 animate-float"
          >
            <MessageCircle className="w-6 h-6 transition-transform duration-300 group-hover:rotate-12" />
          </button>
        </div>
      </div>

      {/* Click Outside to Close */}
      {isExpanded && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsExpanded(false)}
        />
      )}
    </>
  );
};

export default WhatsAppButton;