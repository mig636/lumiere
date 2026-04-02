import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Scissors, 
  Sparkles, 
  Palette, 
  Flower2, 
  Wand2, 
  Eye, 
  Instagram, 
  Facebook, 
  Phone, 
  MapPin, 
  Clock, 
  Menu, 
  X, 
  ChevronRight,
  Star,
  ShoppingBag,
  Trash2,
  Plus,
  Minus
} from 'lucide-react';
import { SERVICES, Service } from './types';

const IconMap: Record<string, any> = {
  Scissors,
  Sparkles,
  Palette,
  Flower2,
  Wand2,
  Eye
};

interface CartItem extends Service {
  quantity: number;
}

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const addToCart = (service: Service) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === service.id);
      if (existing) {
        return prev.map(item => 
          item.id === service.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...service, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const cartTotal = cart.reduce((acc, item) => {
    const price = parseFloat(item.price?.replace('R$ ', '').replace(',', '.') || '0');
    return acc + (price * item.quantity);
  }, 0);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    }
  };

  return (
    <div className="min-h-screen bg-cream selection:bg-rosegold/30">
      {/* Navigation */}
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-6 py-4 ${
          isScrolled ? 'bg-white/80 backdrop-blur-md shadow-sm' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2"
          >
            <span className="text-2xl font-serif font-bold tracking-widest text-gradient-rosegold">LUMIÈRE</span>
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {['Início', 'Serviços', 'Sobre', 'Contato'].map((item, i) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="text-sm font-medium uppercase tracking-widest hover:text-rosegold transition-colors relative group"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-rosegold transition-all duration-300 group-hover:w-full" />
              </motion.a>
            ))}
            
            <motion.button 
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-onyx hover:text-rosegold transition-colors"
            >
              <ShoppingBag className="w-6 h-6" />
              {cart.length > 0 && (
                <span className="absolute top-0 right-0 w-5 h-5 bg-rosegold text-white text-[10px] font-bold flex items-center justify-center rounded-full border-2 border-white">
                  {cart.reduce((acc, item) => acc + item.quantity, 0)}
                </span>
              )}
            </motion.button>

            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-2 bg-rosegold text-white text-xs font-bold uppercase tracking-widest rounded-full shadow-lg shadow-rosegold/20 hover:bg-rosegold-dark transition-all"
            >
              Agendar Agora
            </motion.button>
          </div>

          {/* Mobile Toggle */}
          <div className="flex items-center gap-4 md:hidden">
            <motion.button 
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-onyx"
            >
              <ShoppingBag className="w-6 h-6" />
              {cart.length > 0 && (
                <span className="absolute top-0 right-0 w-4 h-4 bg-rosegold text-white text-[8px] font-bold flex items-center justify-center rounded-full">
                  {cart.reduce((acc, item) => acc + item.quantity, 0)}
                </span>
              )}
            </motion.button>
            <motion.button 
              whileTap={{ scale: 0.9 }}
              className="text-onyx p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X /> : <Menu />}
            </motion.button>
          </div>
        </div>
      </nav>

      {/* Shopping Cart Drawer */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60]"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-white z-[70] shadow-2xl flex flex-col"
            >
              <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                <h2 className="text-xl font-serif font-bold">Seu Carrinho</h2>
                <button 
                  onClick={() => setIsCartOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center opacity-40">
                    <ShoppingBag className="w-16 h-16 mb-4" />
                    <p className="font-serif italic">Seu carrinho está vazio</p>
                  </div>
                ) : (
                  cart.map((item) => (
                    <div key={item.id} className="flex gap-4 group">
                      <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0">
                        <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between mb-1">
                          <h4 className="font-serif font-bold">{item.title}</h4>
                          <button 
                            onClick={() => removeFromCart(item.id)}
                            className="text-gray-400 hover:text-red-500 transition-colors p-2 -m-2"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <p className="text-rosegold font-medium text-sm mb-3">{item.price}</p>
                        <div className="flex items-center gap-3">
                          <div className="flex items-center border border-gray-200 rounded-full px-1 py-1">
                            <button 
                              onClick={() => updateQuantity(item.id, -1)}
                              className="p-3 hover:text-rosegold transition-colors"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-6 text-center text-xs font-bold">{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.id, 1)}
                              className="p-3 hover:text-rosegold transition-colors"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {cart.length > 0 && (
                <div className="p-6 border-t border-gray-100 bg-cream/30">
                  <div className="flex justify-between mb-6">
                    <span className="text-gray-500 uppercase tracking-widest text-xs font-bold">Total Estimado</span>
                    <span className="text-2xl font-serif font-bold text-gradient-rosegold">
                      R$ {cartTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                  <button className="w-full py-4 bg-rosegold text-white font-bold uppercase tracking-widest rounded-full shadow-xl shadow-rosegold/20 hover:bg-rosegold-dark transition-all">
                    Finalizar Agendamento
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className="fixed inset-0 z-40 bg-white flex flex-col items-center justify-center gap-8"
          >
            {['Início', 'Serviços', 'Sobre', 'Contato'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-2xl font-serif tracking-widest hover:text-rosegold"
              >
                {item}
              </a>
            ))}
            <button className="px-8 py-3 bg-rosegold text-white text-sm font-bold uppercase tracking-widest rounded-full">
              Agendar Agora
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section id="início" className="relative h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&q=80&w=1920" 
            alt="Beauty Salon Interior"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-linear-to-r from-white via-white/40 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-2xl"
          >
            <span className="inline-block text-rosegold font-medium uppercase tracking-[0.3em] mb-4">
              Bem-vinda ao Lumière
            </span>
            <h1 className="text-6xl md:text-8xl font-serif leading-tight mb-6">
              Sua beleza em <br />
              <span className="italic text-gradient-rosegold">Alta Definição</span>
            </h1>
            <p className="text-lg text-onyx/70 mb-10 max-w-lg leading-relaxed">
              Experiências exclusivas de beleza e bem-estar em um ambiente projetado para o seu relaxamento e transformação.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#serviços" className="px-8 py-4 bg-rosegold text-white font-bold uppercase tracking-widest rounded-full shadow-xl shadow-rosegold/30 hover:bg-rosegold-dark transition-all flex items-center gap-2 group">
                Ver Serviços
                <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>
              <button className="px-8 py-4 border border-rosegold text-rosegold font-bold uppercase tracking-widest rounded-full hover:bg-rosegold/5 transition-all">
                Nossa História
              </button>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50"
        >
          <span className="text-[10px] uppercase tracking-[0.2em]">Scroll</span>
          <div className="w-px h-12 bg-rosegold" />
        </motion.div>
      </section>

      {/* Services Section */}
      <section id="serviços" className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <motion.span 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-rosegold font-medium uppercase tracking-[0.3em] block mb-2"
            >
              Excelência em cada detalhe
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-serif mb-6"
            >
              Nossos Serviços Exclusivos
            </motion.h2>
            <div className="w-20 h-1 bg-rosegold mx-auto mb-8" />
          </div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {SERVICES.map((service) => {
              const Icon = IconMap[service.icon];
              return (
                <motion.div
                  key={service.id}
                  variants={itemVariants}
                  whileTap={{ scale: 0.98 }}
                  className="group bg-cream rounded-2xl overflow-hidden card-hover border border-rosegold/10 flex flex-col cursor-pointer"
                >
                  <div className="relative h-64 overflow-hidden">
                    <img 
                      src={service.image} 
                      alt={service.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover-scale"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-rosegold/10 group-hover:bg-transparent transition-colors duration-500" />
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg">
                      <Icon className="w-5 h-5 text-rosegold" />
                    </div>
                  </div>
                  <div className="p-8 flex-1 flex flex-col">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-2xl font-serif group-hover:text-rosegold transition-colors">
                        {service.title}
                      </h3>
                      <span className="text-rosegold font-bold text-sm">{service.price}</span>
                    </div>
                    <p className="text-onyx/60 text-sm leading-relaxed mb-8 flex-1">
                      {service.description}
                    </p>
                    <motion.button 
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(service);
                      }}
                      className="w-full py-4 bg-white border border-rosegold text-rosegold text-xs font-bold uppercase tracking-widest rounded-full hover:bg-rosegold hover:text-white transition-all flex items-center justify-center gap-2 shadow-sm"
                    >
                      <Plus className="w-4 h-4" />
                      Adicionar ao Carrinho
                    </motion.button>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="sobre" className="py-24 px-6 bg-cream overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&q=80&w=800" 
                alt="Stylist at work"
                className="w-full aspect-4/5 object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -top-10 -left-10 w-64 h-64 bg-rosegold/10 rounded-full blur-3xl -z-0" />
            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-rosegold/10 rounded-full blur-3xl -z-0" />
            
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              className="absolute -bottom-8 -left-8 bg-white p-8 rounded-2xl shadow-xl z-20 max-w-[200px]"
            >
              <div className="flex gap-1 mb-2">
                {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-4 h-4 fill-rosegold text-rosegold" />)}
              </div>
              <p className="text-sm font-medium italic">"O melhor salão que já frequentei. Atendimento impecável!"</p>
              <p className="text-[10px] uppercase tracking-widest mt-4 text-rosegold font-bold">— Maria Silva</p>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-rosegold font-medium uppercase tracking-[0.3em] block mb-2">
              Nossa Essência
            </span>
            <h2 className="text-4xl md:text-5xl font-serif mb-8 leading-tight">
              Onde a Arte encontra a <br />
              <span className="italic text-gradient-rosegold">Sofisticação</span>
            </h2>
            <p className="text-lg text-onyx/70 mb-8 leading-relaxed">
              Fundado em 2015, o Lumière nasceu com o propósito de redefinir o conceito de beleza. Não entregamos apenas serviços, mas momentos de autocuidado que elevam a autoestima.
            </p>
            <div className="space-y-6 mb-10">
              {[
                { title: 'Profissionais Renomados', desc: 'Equipe constantemente atualizada com as tendências internacionais.' },
                { title: 'Produtos Premium', desc: 'Utilizamos apenas as melhores marcas do mercado mundial.' },
                { title: 'Ambiente Exclusivo', desc: 'Privacidade e conforto em cada etapa do seu atendimento.' }
              ].map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-rosegold/10 flex items-center justify-center shrink-0">
                    <div className="w-2 h-2 rounded-full bg-rosegold" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm uppercase tracking-widest mb-1">{item.title}</h4>
                    <p className="text-sm text-onyx/60">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="px-8 py-4 bg-rosegold text-white font-bold uppercase tracking-widest rounded-full shadow-lg shadow-rosegold/20 hover:bg-rosegold-dark transition-all">
              Conheça Nossa Equipe
            </button>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="max-w-5xl mx-auto bg-rosegold-gradient rounded-[3rem] p-12 md:p-20 text-center text-white relative overflow-hidden shadow-2xl shadow-rosegold/40"
        >
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
            <div className="absolute top-0 left-0 w-64 h-64 border-4 border-white rounded-full -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-96 h-96 border-4 border-white rounded-full translate-x-1/3 translate-y-1/3" />
          </div>
          
          <div className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-serif mb-8">Pronta para brilhar?</h2>
            <p className="text-lg md:text-xl text-white/80 mb-12 max-w-2xl mx-auto">
              Reserve seu horário agora e descubra por que somos a escolha número um das mulheres mais exigentes.
            </p>
            <button className="px-10 py-5 bg-white text-rosegold font-bold uppercase tracking-[0.2em] rounded-full shadow-xl hover:bg-cream transition-all transform hover:scale-105 active:scale-95">
              Agendar Experiência
            </button>
          </div>
        </motion.div>
      </section>

      {/* Contact & Footer */}
      <footer id="contato" className="bg-onyx text-white pt-24 pb-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
            <div className="col-span-1 lg:col-span-1">
              <span className="text-3xl font-serif font-bold tracking-widest text-rosegold block mb-6">LUMIÈRE</span>
              <p className="text-white/50 text-sm leading-relaxed mb-8">
                Sua beleza é nossa maior inspiração. Venha viver uma experiência única de cuidado e sofisticação.
              </p>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-rosegold hover:border-rosegold transition-all">
                  <Instagram className="w-4 h-4" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-rosegold hover:border-rosegold transition-all">
                  <Facebook className="w-4 h-4" />
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-[0.3em] text-rosegold mb-8">Contato</h4>
              <ul className="space-y-6">
                <li className="flex items-start gap-4 group">
                  <Phone className="w-5 h-5 text-rosegold shrink-0" />
                  <span className="text-sm text-white/70 group-hover:text-white transition-colors">(11) 99999-8888</span>
                </li>
                <li className="flex items-start gap-4 group">
                  <MapPin className="w-5 h-5 text-rosegold shrink-0" />
                  <span className="text-sm text-white/70 group-hover:text-white transition-colors">
                    Av. Paulista, 1000 - Jardins<br />São Paulo, SP
                  </span>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-[0.3em] text-rosegold mb-8">Horários</h4>
              <ul className="space-y-6">
                <li className="flex items-start gap-4">
                  <Clock className="w-5 h-5 text-rosegold shrink-0" />
                  <div className="text-sm text-white/70">
                    <p className="mb-1"><span className="text-white font-medium">Ter — Sex:</span> 09h às 20h</p>
                    <p><span className="text-white font-medium">Sábado:</span> 09h às 18h</p>
                  </div>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-[0.3em] text-rosegold mb-8">Newsletter</h4>
              <p className="text-sm text-white/50 mb-6">Receba dicas de beleza e ofertas exclusivas.</p>
              <div className="relative">
                <input 
                  type="email" 
                  placeholder="Seu melhor e-mail"
                  className="w-full bg-white/5 border border-white/10 rounded-full py-3 px-6 text-sm focus:outline-none focus:border-rosegold transition-colors"
                />
                <button className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-rosegold rounded-full flex items-center justify-center hover:bg-rosegold-dark transition-colors">
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-[10px] uppercase tracking-widest text-white/30">
              © 2026 Lumière Salão de Beleza. Todos os direitos reservados.
            </p>
            <div className="flex gap-8">
              <a href="#" className="text-[10px] uppercase tracking-widest text-white/30 hover:text-rosegold transition-colors">Privacidade</a>
              <a href="#" className="text-[10px] uppercase tracking-widest text-white/30 hover:text-rosegold transition-colors">Termos</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
