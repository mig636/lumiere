import { useState, useEffect } from 'react';
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
  Star,
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  Monitor,
  Folder,
  X,
  Square,
  HelpCircle,
  AlertCircle,
  CheckCircle2,
  Info,
} from 'lucide-react';
import { SERVICES, Service } from './types';

const IconMap: Record<string, any> = {
  Scissors,
  Sparkles,
  Palette,
  Flower2,
  Wand2,
  Eye,
};

interface CartItem extends Service {
  quantity: number;
}

// Win2K Window chrome wrapper
function WinWindow({
  title,
  icon,
  children,
  className = '',
  onClose,
  style,
  id,
}: {
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  onClose?: () => void;
  style?: React.CSSProperties;
  id?: string;
}) {
  return (
    <div className="win-window" style={style} id={id}>
      {/* Title bar */}
      <div className="win-titlebar">
        <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
          {icon && <span style={{ display: 'flex', alignItems: 'center' }}>{icon}</span>}
          <span style={{ fontSize: 11, fontWeight: 'bold', letterSpacing: 0 }}>{title}</span>
        </div>
        <div style={{ display: 'flex', gap: 2 }}>
          <button className="win-ctrl-btn" title="Minimizar">_</button>
          <button className="win-ctrl-btn" title="Maximizar"><Square style={{ width: 8, height: 8 }} /></button>
          <button className="win-ctrl-btn close" onClick={onClose} title="Fechar">
            <X style={{ width: 9, height: 9 }} />
          </button>
        </div>
      </div>
      <div className={className}>{children}</div>
    </div>
  );
}

// Win2K standard button
function WinBtn({
  children,
  onClick,
  className = '',
  isDefault = false,
  style,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  isDefault?: boolean;
  style?: React.CSSProperties;
}) {
  return (
    <button
      className={`win-btn ${isDefault ? 'win-btn-default' : ''} ${className}`}
      onClick={onClick}
      style={style}
    >
      {children}
    </button>
  );
}

// Taskbar clock
function TaskbarClock() {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);
  return (
    <div
      className="win-status-panel"
      style={{ fontSize: 11, padding: '2px 8px', marginLeft: 'auto', whiteSpace: 'nowrap' }}
    >
      {time.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
    </div>
  );
}

// Desktop Taskbar
function Taskbar({
  activeWindow,
  setActiveWindow,
  cartCount,
  onCartOpen,
}: {
  activeWindow: string;
  setActiveWindow: (s: string) => void;
  cartCount: number;
  onCartOpen: () => void;
}) {
  const items = [
    { id: 'inicio', label: 'Lumière - Início' },
    { id: 'servicos', label: 'Serviços' },
    { id: 'sobre', label: 'Sobre Nós' },
    { id: 'contato', label: 'Contato' },
  ];

  return (
    <div
      className="win-taskbar"
      style={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 1000 }}
    >
      {/* Start button */}
      <button className="win-start-btn">
        <Monitor style={{ width: 14, height: 14 }} />
        <span>Iniciar</span>
      </button>

      {/* Divider */}
      <div style={{ width: 1, height: 20, borderLeft: '1px solid #808080', borderRight: '1px solid #FFFFFF', margin: '0 2px' }} />

      {/* Window buttons */}
      {items.map((item) => (
        <button
          key={item.id}
          onClick={() => {
            setActiveWindow(item.id);
            const el = document.getElementById(item.id);
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          style={{
            minWidth: 120,
            height: 22,
            background: activeWindow === item.id ? '#B8B4AC' : '#D4D0C8',
            borderTop: activeWindow === item.id ? '1px solid #808080' : '1px solid #FFFFFF',
            borderLeft: activeWindow === item.id ? '1px solid #808080' : '1px solid #FFFFFF',
            borderRight: activeWindow === item.id ? '1px solid #FFFFFF' : '1px solid #808080',
            borderBottom: activeWindow === item.id ? '1px solid #FFFFFF' : '1px solid #808080',
            fontSize: 11,
            cursor: 'pointer',
            textAlign: 'left',
            padding: '0 6px',
            fontWeight: activeWindow === item.id ? 'bold' : 'normal',
            display: 'flex',
            alignItems: 'center',
            gap: 4,
          }}
        >
          <Folder style={{ width: 12, height: 12, color: '#F0C040' }} />
          {item.label}
        </button>
      ))}

      {/* Cart button */}
      <button
        onClick={onCartOpen}
        style={{
          height: 22,
          background: '#D4D0C8',
          borderTop: '1px solid #FFFFFF',
          borderLeft: '1px solid #FFFFFF',
          borderRight: '1px solid #808080',
          borderBottom: '1px solid #808080',
          fontSize: 11,
          cursor: 'pointer',
          padding: '0 8px',
          display: 'flex',
          alignItems: 'center',
          gap: 4,
        }}
      >
        <ShoppingBag style={{ width: 12, height: 12 }} />
        Carrinho {cartCount > 0 && `(${cartCount})`}
      </button>

      {/* System tray */}
      <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center' }}>
        <div style={{ width: 1, height: 20, borderLeft: '1px solid #808080', borderRight: '1px solid #FFFFFF', margin: '0 2px' }} />
        <TaskbarClock />
      </div>
    </div>
  );
}

export default function App() {
  const [activeWindow, setActiveWindow] = useState('inicio');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [activeTab, setActiveTab] = useState(0);
  const [showDialog, setShowDialog] = useState(false);
  const [dialogMsg, setDialogMsg] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveWindow(e.target.id || 'inicio');
        });
      },
      { threshold: 0.3 }
    );
    ['inicio', 'servicos', 'sobre', 'contato'].forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const addToCart = (service: Service) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === service.id);
      if (existing) return prev.map((i) => (i.id === service.id ? { ...i, quantity: i.quantity + 1 } : i));
      return [...prev, { ...service, quantity: 1 }];
    });
    setDialogMsg(`"${service.title}" foi adicionado ao carrinho!`);
    setShowDialog(true);
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((i) => i.id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart((prev) =>
      prev.map((i) =>
        i.id === id ? { ...i, quantity: Math.max(1, i.quantity + delta) } : i
      )
    );
  };

  const cartTotal = cart.reduce((acc, item) => {
    const price = parseFloat(item.price?.replace('R$ ', '').replace(',', '.') || '0');
    return acc + price * item.quantity;
  }, 0);

  const cartCount = cart.reduce((acc, i) => acc + i.quantity, 0);

  const aboutTabs = [
    {
      label: 'Geral',
      content: (
        <div style={{ padding: 16 }}>
          <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
            <div style={{ flexShrink: 0 }}>
              <img
                src="https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&q=80&w=120"
                alt="Salon"
                style={{ width: 80, height: 80, objectFit: 'cover', border: '2px inset #808080' }}
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <div style={{ fontWeight: 'bold', fontSize: 13, marginBottom: 4 }}>LUMIÈRE Salão de Beleza</div>
              <div style={{ fontSize: 11, color: '#444', lineHeight: 1.6 }}>
                Fundado em 2015, o Lumière redefiniu o conceito de beleza em São Paulo.
                Nossa equipe de profissionais renomados usa produtos premium para oferecer
                experiências exclusivas de cuidado e sofisticação.
              </div>
            </div>
          </div>
          <hr className="win-separator" style={{ margin: '12px 0' }} />
          {[
            { label: 'Profissionais Renomados', desc: 'Equipe atualizada com tendências internacionais.' },
            { label: 'Produtos Premium', desc: 'Melhores marcas do mercado mundial.' },
            { label: 'Ambiente Exclusivo', desc: 'Privacidade e conforto em cada atendimento.' },
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'flex-start', marginBottom: 8 }}>
              <CheckCircle2 style={{ width: 14, height: 14, color: '#008080', flexShrink: 0, marginTop: 1 }} />
              <div>
                <strong style={{ fontSize: 11 }}>{item.label}</strong>
                <div style={{ fontSize: 11, color: '#555' }}>{item.desc}</div>
              </div>
            </div>
          ))}
        </div>
      ),
    },
    {
      label: 'Avaliações',
      content: (
        <div style={{ padding: 16 }}>
          <div className="win-groupbox" style={{ marginTop: 0 }}>
            <div className="win-groupbox-label">Depoimentos de Clientes</div>
            {[
              { name: 'Maria Silva', text: 'O melhor salão que já frequentei. Atendimento impecável!' },
              { name: 'Ana Rodrigues', text: 'Profissionais incríveis, resultado perfeito sempre.' },
              { name: 'Carla Mendes', text: 'Ambiente maravilhoso e produtos de altíssima qualidade.' },
            ].map((r, i) => (
              <div
                key={i}
                style={{
                  marginBottom: 10,
                  paddingBottom: 10,
                  borderBottom: i < 2 ? '1px solid #C0C0C0' : 'none',
                }}
              >
                <div style={{ display: 'flex', gap: 4, marginBottom: 3 }}>
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} style={{ width: 10, height: 10, fill: '#FFD700', color: '#FFD700' }} />
                  ))}
                </div>
                <div style={{ fontSize: 11, fontStyle: 'italic', marginBottom: 2 }}>"{r.text}"</div>
                <div style={{ fontSize: 10, color: '#0A246A', fontWeight: 'bold' }}>— {r.name}</div>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      label: 'Localização',
      content: (
        <div style={{ padding: 16 }}>
          <div className="win-groupbox" style={{ marginTop: 0 }}>
            <div className="win-groupbox-label">Informações de Contato</div>
            <div style={{ marginBottom: 8, display: 'flex', gap: 8, alignItems: 'center' }}>
              <MapPin style={{ width: 13, height: 13, color: '#0A246A', flexShrink: 0 }} />
              <span style={{ fontSize: 11 }}>Av. Paulista, 1000 - Jardins, São Paulo, SP</span>
            </div>
            <div style={{ marginBottom: 8, display: 'flex', gap: 8, alignItems: 'center' }}>
              <Phone style={{ width: 13, height: 13, color: '#0A246A', flexShrink: 0 }} />
              <span style={{ fontSize: 11 }}>(11) 99999-8888</span>
            </div>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <Clock style={{ width: 13, height: 13, color: '#0A246A', flexShrink: 0 }} />
              <span style={{ fontSize: 11 }}>Ter–Sex: 09h às 20h &nbsp;|&nbsp; Sábado: 09h às 18h</span>
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAYAAABytg0kAAAAF0lEQVQI12NgYGD4z8BQDwAAAP//AwAI/AL+hc2rNAAAAABJRU5ErkJggg==") #008080',
        paddingBottom: 34,
        paddingTop: 8,
        fontFamily: '"Tahoma", "MS Sans Serif", Arial, sans-serif',
      }}
    >
      {/* Desktop Icons - top left */}
      <div style={{ position: 'fixed', top: 8, left: 8, zIndex: 900, display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div className="win-desktop-icon">
          <Monitor style={{ width: 32, height: 32, filter: 'drop-shadow(1px 1px 1px #000)' }} />
          <span className="win-icon-label">Lumière</span>
        </div>
        <div className="win-desktop-icon">
          <Folder style={{ width: 32, height: 32, color: '#F0C040', filter: 'drop-shadow(1px 1px 1px #000)' }} />
          <span className="win-icon-label">Serviços</span>
        </div>
        <div className="win-desktop-icon">
          <ShoppingBag style={{ width: 32, height: 32, filter: 'drop-shadow(1px 1px 1px #000)' }} onClick={() => setIsCartOpen(true)} />
          <span className="win-icon-label">Carrinho</span>
        </div>
      </div>

      {/* Marquee info bar at top */}
      <div
        style={{
          background: '#000080',
          color: '#FFFF00',
          fontSize: 11,
          padding: '2px 0',
          overflow: 'hidden',
          marginLeft: 88,
          marginRight: 0,
          marginBottom: 8,
        }}
      >
        <div className="win-marquee">
          ★ BEM-VINDA AO LUMIÈRE ★ Sua beleza em Alta Definição ★ Agende já: (11) 99999-8888 ★ Av. Paulista, 1000 - Jardins, São Paulo ★ Ter–Sex: 09h às 20h | Sáb: 09h às 18h ★
        </div>
      </div>

      <main style={{ marginLeft: 88, padding: '0 8px', display: 'flex', flexDirection: 'column', gap: 12 }}>

        {/* =================== HERO / INÍCIO =================== */}
        <section id="inicio">
          <WinWindow
            title="Lumière Salão de Beleza - Bem-vinda!"
            icon={<Monitor style={{ width: 12, height: 12 }} />}
            id="inicio-win"
          >
            {/* Menu bar */}
            <div className="win-menubar">
              {['Arquivo', 'Editar', 'Exibir', 'Serviços', 'Favoritos', 'Ajuda'].map((m) => (
                <div key={m} className="win-menu-item">{m}</div>
              ))}
            </div>

            {/* Toolbar */}
            <div
              style={{
                background: '#D4D0C8',
                borderBottom: '1px solid #808080',
                padding: '3px 4px',
                display: 'flex',
                gap: 2,
                alignItems: 'center',
              }}
            >
              {['Voltar', 'Avançar', 'Parar', 'Atualizar', 'Início'].map((t, i) => (
                <button key={t} className="win-toolbtn" style={{ width: 'auto', padding: '2px 6px', fontSize: 10 }}>
                  {t}
                </button>
              ))}
              <div style={{ width: 1, height: 18, borderLeft: '1px solid #808080', borderRight: '1px solid #FFFFFF', margin: '0 4px' }} />
              <span style={{ fontSize: 10, marginRight: 4 }}>Endereço:</span>
              <div className="win-sunken" style={{ flex: 1, padding: '1px 4px', fontSize: 11 }}>
                http://www.lumiere.com.br/
              </div>
              <button className="win-btn" style={{ fontSize: 10, minWidth: 40, marginLeft: 4, padding: '1px 8px' }}>
                Ir
              </button>
            </div>

            {/* Hero content */}
            <div style={{ display: 'flex', gap: 0, minHeight: 340 }}>
              {/* Left pane */}
              <div
                style={{
                  width: 180,
                  background: '#ECE9D8',
                  borderRight: '2px solid #808080',
                  padding: 12,
                  flexShrink: 0,
                }}
              >
                <div style={{ fontWeight: 'bold', fontSize: 11, marginBottom: 8, color: '#0A246A' }}>
                  Tarefas Comuns
                </div>
                {[
                  { icon: <Scissors style={{ width: 13, height: 13 }} />, label: 'Agendar Horário' },
                  { icon: <ShoppingBag style={{ width: 13, height: 13 }} />, label: 'Ver Carrinho' },
                  { icon: <Folder style={{ width: 13, height: 13 }} />, label: 'Nossos Serviços' },
                  { icon: <HelpCircle style={{ width: 13, height: 13 }} />, label: 'Fale Conosco' },
                ].map((item, i) => (
                  <div
                    key={i}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 6,
                      padding: '4px 6px',
                      fontSize: 11,
                      color: '#0A246A',
                      cursor: 'pointer',
                      marginBottom: 2,
                    }}
                    onMouseOver={(e) => {
                      (e.currentTarget as HTMLDivElement).style.background = '#D4D0C8';
                    }}
                    onMouseOut={(e) => {
                      (e.currentTarget as HTMLDivElement).style.background = 'transparent';
                    }}
                  >
                    {item.icon}
                    <span style={{ textDecoration: 'underline' }}>{item.label}</span>
                  </div>
                ))}

                <hr className="win-separator" />

                <div style={{ fontWeight: 'bold', fontSize: 11, marginBottom: 8, color: '#0A246A' }}>
                  Outros Lugares
                </div>
                {['Instagram', 'Facebook', 'WhatsApp'].map((s, i) => (
                  <div
                    key={i}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 6,
                      padding: '3px 6px',
                      fontSize: 11,
                      color: '#0A246A',
                      cursor: 'pointer',
                    }}
                  >
                    {s === 'Instagram' ? <Instagram style={{ width: 12, height: 12 }} /> : s === 'Facebook' ? <Facebook style={{ width: 12, height: 12 }} /> : <Phone style={{ width: 12, height: 12 }} />}
                    <span style={{ textDecoration: 'underline' }}>{s}</span>
                  </div>
                ))}

                <hr className="win-separator" />

                <div style={{ fontWeight: 'bold', fontSize: 11, marginBottom: 6, color: '#0A246A' }}>Detalhes</div>
                <div
                  className="win-sunken"
                  style={{ padding: 6, fontSize: 10, color: '#333', lineHeight: 1.5 }}
                >
                  <div><strong>Tipo:</strong> Salão de Beleza</div>
                  <div><strong>Fundação:</strong> 2015</div>
                  <div><strong>Localização:</strong> São Paulo</div>
                  <div style={{ marginTop: 4, color: '#008080' }}>
                    ★★★★★ (127 avaliações)
                  </div>
                </div>
              </div>

              {/* Right content pane */}
              <div style={{ flex: 1, background: '#FFFFFF', padding: 24, overflow: 'auto' }}>
                <div style={{ display: 'flex', gap: 20, alignItems: 'center', marginBottom: 20 }}>
                  <div>
                    <div
                      style={{
                        fontSize: 28,
                        fontWeight: 'bold',
                        color: '#0A246A',
                        lineHeight: 1.2,
                        marginBottom: 6,
                        textShadow: '1px 1px 0 #A6CAF0',
                      }}
                    >
                      LUMIÈRE
                    </div>
                    <div style={{ fontSize: 14, color: '#008080', fontStyle: 'italic', marginBottom: 10 }}>
                      Sua beleza em Alta Definição
                    </div>
                    <div style={{ fontSize: 11, color: '#333', lineHeight: 1.7, maxWidth: 480, marginBottom: 16 }}>
                      Bem-vinda ao Lumière! Experiências exclusivas de beleza e bem-estar em um
                      ambiente projetado para o seu relaxamento e transformação. Desde 2015
                      redefinindo os padrões de sofisticação em São Paulo.
                    </div>
                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                      <WinBtn
                        isDefault
                        onClick={() => {
                          document.getElementById('servicos')?.scrollIntoView({ behavior: 'smooth' });
                        }}
                      >
                        Ver Serviços
                      </WinBtn>
                      <WinBtn onClick={() => document.getElementById('sobre')?.scrollIntoView({ behavior: 'smooth' })}>
                        Nossa História
                      </WinBtn>
                      <WinBtn onClick={() => setIsCartOpen(true)}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                          <ShoppingBag style={{ width: 11, height: 11 }} />
                          Carrinho {cartCount > 0 ? `(${cartCount})` : ''}
                        </span>
                      </WinBtn>
                    </div>
                  </div>
                  <div style={{ flexShrink: 0 }}>
                    <img
                      src="https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&q=80&w=300"
                      alt="Beauty Salon Interior"
                      referrerPolicy="no-referrer"
                      style={{
                        width: 220,
                        height: 160,
                        objectFit: 'cover',
                        border: '2px inset #808080',
                      }}
                    />
                  </div>
                </div>

                {/* Info panels */}
                <div style={{ display: 'flex', gap: 8 }}>
                  {[
                    { icon: <Scissors style={{ width: 16, height: 16, color: '#0A246A' }} />, title: '6 Serviços', desc: 'Tratamentos exclusivos para você' },
                    { icon: <Star style={{ width: 16, height: 16, color: '#FFD700', fill: '#FFD700' }} />, title: '5.0 Estrelas', desc: '127 avaliações verificadas' },
                    { icon: <Clock style={{ width: 16, height: 16, color: '#0A246A' }} />, title: 'Ter–Sáb', desc: 'Aberto de 09h às 20h' },
                  ].map((card, i) => (
                    <div
                      key={i}
                      className="win-raised"
                      style={{ flex: 1, padding: 10, display: 'flex', gap: 8, alignItems: 'flex-start' }}
                    >
                      {card.icon}
                      <div>
                        <div style={{ fontSize: 11, fontWeight: 'bold' }}>{card.title}</div>
                        <div style={{ fontSize: 10, color: '#555' }}>{card.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Status bar */}
            <div className="win-statusbar">
              <div className="win-status-panel">Pronto</div>
              <div className="win-status-panel">Lumière Salão de Beleza</div>
              <div className="win-status-panel" style={{ marginLeft: 'auto' }}>
                <AlertCircle style={{ width: 11, height: 11, display: 'inline', marginRight: 3 }} />
                Zona: Internet local
              </div>
            </div>
          </WinWindow>
        </section>

        {/* =================== SERVICES =================== */}
        <section id="servicos">
          <WinWindow
            title="Nossos Serviços Exclusivos - Lumière"
            icon={<Folder style={{ width: 12, height: 12, color: '#F0C040' }} />}
          >
            {/* Toolbar */}
            <div className="win-menubar">
              {['Arquivo', 'Exibir', 'Ordenar por', 'Ajuda'].map((m) => (
                <div key={m} className="win-menu-item">{m}</div>
              ))}
            </div>
            <div
              style={{
                background: '#D4D0C8',
                padding: '4px 8px',
                borderBottom: '1px solid #808080',
                fontSize: 10,
                color: '#333',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
              }}
            >
              <span>Exibindo 6 itens</span>
              <span style={{ color: '#808080' }}>|</span>
              <span style={{ color: '#0A246A', textDecoration: 'underline', cursor: 'pointer' }}>Excelência em cada detalhe</span>
            </div>

            {/* Services grid */}
            <div
              style={{
                background: '#FFFFFF',
                padding: 12,
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: 10,
              }}
            >
              {SERVICES.map((service) => {
                const Icon = IconMap[service.icon];
                const inCart = cart.find((i) => i.id === service.id);
                return (
                  <div
                    key={service.id}
                    className="win-raised"
                    style={{ padding: 0, overflow: 'hidden', cursor: 'default' }}
                  >
                    {/* Service image */}
                    <div style={{ position: 'relative' }}>
                      <img
                        src={service.image}
                        alt={service.title}
                        referrerPolicy="no-referrer"
                        style={{
                          width: '100%',
                          height: 120,
                          objectFit: 'cover',
                          display: 'block',
                          borderBottom: '1px solid #808080',
                        }}
                      />
                      <div
                        style={{
                          position: 'absolute',
                          top: 4,
                          right: 4,
                          background: '#D4D0C8',
                          border: '1px solid #808080',
                          padding: '2px 4px',
                          fontSize: 10,
                          fontWeight: 'bold',
                          color: '#0A246A',
                        }}
                      >
                        {service.price}
                      </div>
                      {inCart && (
                        <div
                          style={{
                            position: 'absolute',
                            top: 4,
                            left: 4,
                            background: '#008080',
                            color: '#FFFFFF',
                            fontSize: 9,
                            padding: '2px 4px',
                            fontWeight: 'bold',
                          }}
                        >
                          NO CARRINHO
                        </div>
                      )}
                    </div>
                    <div style={{ padding: '8px 10px' }}>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 5,
                          marginBottom: 4,
                        }}
                      >
                        <Icon style={{ width: 13, height: 13, color: '#0A246A', flexShrink: 0 }} />
                        <span style={{ fontWeight: 'bold', fontSize: 12 }}>{service.title}</span>
                      </div>
                      <div
                        style={{
                          fontSize: 10,
                          color: '#555',
                          lineHeight: 1.5,
                          marginBottom: 8,
                          minHeight: 36,
                        }}
                      >
                        {service.description}
                      </div>
                      <WinBtn
                        onClick={() => addToCart(service)}
                        style={{ width: '100%', fontSize: 10, padding: '3px 0' }}
                        isDefault={!inCart}
                      >
                        <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4 }}>
                          <Plus style={{ width: 10, height: 10 }} />
                          {inCart ? 'Adicionar Mais' : 'Adicionar ao Carrinho'}
                        </span>
                      </WinBtn>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="win-statusbar">
              <div className="win-status-panel">6 itens</div>
              <div className="win-status-panel">
                {cartCount > 0 ? `${cartCount} item(s) no carrinho` : 'Carrinho vazio'}
              </div>
            </div>
          </WinWindow>
        </section>

        {/* =================== ABOUT =================== */}
        <section id="sobre">
          <WinWindow
            title="Sobre Nós - Propriedades"
            icon={<Info style={{ width: 12, height: 12 }} />}
          >
            <div style={{ padding: 12 }}>
              {/* Tab strip */}
              <div style={{ display: 'flex', borderBottom: '1px solid #808080', marginBottom: -1 }}>
                {aboutTabs.map((tab, i) => (
                  <div
                    key={tab.label}
                    className={`win-tab ${activeTab === i ? 'active' : ''}`}
                    onClick={() => setActiveTab(i)}
                  >
                    {tab.label}
                  </div>
                ))}
              </div>
              {/* Tab content */}
              <div
                className="win-sunken"
                style={{
                  background: '#FFFFFF',
                  minHeight: 260,
                  border: '1px solid #808080',
                  borderTop: '1px solid #DFDFDF',
                }}
              >
                {aboutTabs[activeTab].content}
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 12 }}>
                <WinBtn isDefault onClick={() => document.getElementById('servicos')?.scrollIntoView({ behavior: 'smooth' })}>
                  Ver Serviços
                </WinBtn>
                <WinBtn>Cancelar</WinBtn>
                <WinBtn>Aplicar</WinBtn>
              </div>
            </div>
          </WinWindow>
        </section>

        {/* =================== CTA =================== */}
        <WinWindow
          title="Agendar Experiência - Lumière"
          icon={<Scissors style={{ width: 12, height: 12 }} />}
        >
          <div
            style={{
              background: 'linear-gradient(to right, #0A246A, #1C3D8C)',
              padding: 24,
              textAlign: 'center',
            }}
          >
            <div style={{ color: '#FFFFFF', fontSize: 22, fontWeight: 'bold', marginBottom: 8 }}>
              Pronta para brilhar?
            </div>
            <div style={{ color: '#A6CAF0', fontSize: 12, marginBottom: 16, maxWidth: 500, margin: '0 auto 16px' }}>
              Reserve seu horário agora e descubra por que somos a escolha número um das mulheres mais exigentes.
            </div>
            <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
              <WinBtn style={{ background: '#D4D0C8' }} isDefault>
                Agendar Experiência
              </WinBtn>
              <WinBtn style={{ background: '#D4D0C8' }}>
                Ligar Agora
              </WinBtn>
            </div>
          </div>
        </WinWindow>

        {/* =================== CONTACT/FOOTER =================== */}
        <section id="contato">
          <WinWindow
            title="Contato e Informações - Lumière"
            icon={<Phone style={{ width: 12, height: 12 }} />}
          >
            <div style={{ padding: 12, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
              {/* Contact */}
              <div className="win-groupbox">
                <div className="win-groupbox-label">Contato</div>
                <div style={{ display: 'flex', gap: 6, marginBottom: 8, alignItems: 'flex-start' }}>
                  <Phone style={{ width: 13, height: 13, color: '#0A246A', flexShrink: 0, marginTop: 1 }} />
                  <div>
                    <div style={{ fontWeight: 'bold', fontSize: 10, marginBottom: 1 }}>Telefone</div>
                    <div style={{ fontSize: 11 }}>(11) 99999-8888</div>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 6, marginBottom: 8, alignItems: 'flex-start' }}>
                  <MapPin style={{ width: 13, height: 13, color: '#0A246A', flexShrink: 0, marginTop: 1 }} />
                  <div>
                    <div style={{ fontWeight: 'bold', fontSize: 10, marginBottom: 1 }}>Endereço</div>
                    <div style={{ fontSize: 11 }}>Av. Paulista, 1000 - Jardins<br />São Paulo, SP</div>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 6 }}>
                  {[<Instagram style={{ width: 14, height: 14 }} />, <Facebook style={{ width: 14, height: 14 }} />].map((icon, i) => (
                    <button key={i} className="win-raised" style={{ padding: 4, cursor: 'pointer', color: '#0A246A' }}>
                      {icon}
                    </button>
                  ))}
                </div>
              </div>

              {/* Hours */}
              <div className="win-groupbox">
                <div className="win-groupbox-label">Horários de Funcionamento</div>
                <div style={{ display: 'flex', gap: 6, alignItems: 'flex-start' }}>
                  <Clock style={{ width: 13, height: 13, color: '#0A246A', flexShrink: 0, marginTop: 2 }} />
                  <div style={{ fontSize: 11, lineHeight: 1.7 }}>
                    <div><strong>Terça – Sexta:</strong> 09h às 20h</div>
                    <div><strong>Sábado:</strong> 09h às 18h</div>
                    <div style={{ color: '#C0392B', marginTop: 4 }}><strong>Dom – Seg:</strong> Fechado</div>
                  </div>
                </div>
                <hr className="win-separator" />
                <div style={{ fontSize: 10, color: '#555' }}>
                  Agendamento online disponível 24h/dia.
                </div>
              </div>

              {/* Newsletter */}
              <div className="win-groupbox">
                <div className="win-groupbox-label">Newsletter</div>
                <div style={{ fontSize: 11, color: '#333', marginBottom: 8 }}>
                  Receba dicas de beleza e ofertas exclusivas no seu e-mail.
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 8 }}>
                  <label style={{ fontSize: 11, whiteSpace: 'nowrap' }}>E-mail:</label>
                  <input
                    type="email"
                    className="win-input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="seu@email.com"
                    style={{ flex: 1, fontSize: 11 }}
                  />
                </div>
                <WinBtn
                  onClick={() => {
                    if (email) {
                      setDialogMsg(`E-mail "${email}" cadastrado com sucesso!`);
                      setShowDialog(true);
                      setEmail('');
                    }
                  }}
                  isDefault
                  style={{ width: '100%', fontSize: 11 }}
                >
                  Inscrever
                </WinBtn>
              </div>
            </div>

            <div
              style={{
                background: '#D4D0C8',
                borderTop: '1px solid #808080',
                padding: '6px 12px',
                fontSize: 10,
                color: '#555',
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <span>© 2026 Lumière Salão de Beleza. Todos os direitos reservados.</span>
              <div style={{ display: 'flex', gap: 12 }}>
                <a href="#" style={{ color: '#0A246A', textDecoration: 'underline', fontSize: 10 }}>Privacidade</a>
                <a href="#" style={{ color: '#0A246A', textDecoration: 'underline', fontSize: 10 }}>Termos</a>
              </div>
            </div>
          </WinWindow>
        </section>
      </main>

      {/* =================== CART DIALOG =================== */}
      {isCartOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.3)',
            zIndex: 2000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsCartOpen(false);
          }}
        >
          <div
            className="win-window"
            style={{ width: 480, maxHeight: '80vh', display: 'flex', flexDirection: 'column' }}
          >
            <div className="win-titlebar">
              <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                <ShoppingBag style={{ width: 12, height: 12 }} />
                <span style={{ fontWeight: 'bold', fontSize: 11 }}>Seu Carrinho - Lumière</span>
              </div>
              <div style={{ display: 'flex', gap: 2 }}>
                <button className="win-ctrl-btn">_</button>
                <button className="win-ctrl-btn"><Square style={{ width: 8, height: 8 }} /></button>
                <button className="win-ctrl-btn close" onClick={() => setIsCartOpen(false)}>
                  <X style={{ width: 9, height: 9 }} />
                </button>
              </div>
            </div>

            {/* Cart menu */}
            <div className="win-menubar">
              {['Arquivo', 'Editar', 'Ajuda'].map((m) => (
                <div key={m} className="win-menu-item">{m}</div>
              ))}
            </div>

            {/* Cart items */}
            <div
              className="win-scroll"
              style={{ flex: 1, overflowY: 'auto', padding: 12, background: '#FFFFFF', minHeight: 120 }}
            >
              {cart.length === 0 ? (
                <div
                  style={{
                    textAlign: 'center',
                    padding: 32,
                    color: '#808080',
                    fontSize: 11,
                  }}
                >
                  <ShoppingBag style={{ width: 32, height: 32, margin: '0 auto 8px', opacity: 0.4 }} />
                  <div>Seu carrinho está vazio</div>
                  <div style={{ fontSize: 10, marginTop: 4 }}>
                    Adicione serviços para agendá-los.
                  </div>
                </div>
              ) : (
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 11 }}>
                  <thead>
                    <tr style={{ background: '#0A246A', color: '#FFFFFF' }}>
                      <th style={{ padding: '4px 8px', textAlign: 'left', fontWeight: 'bold' }}>Serviço</th>
                      <th style={{ padding: '4px 8px', textAlign: 'right', fontWeight: 'bold' }}>Preço</th>
                      <th style={{ padding: '4px 8px', textAlign: 'center', fontWeight: 'bold' }}>Qtd</th>
                      <th style={{ padding: '4px 8px', textAlign: 'right', fontWeight: 'bold' }}>Total</th>
                      <th style={{ padding: '4px 8px', width: 24 }} />
                    </tr>
                  </thead>
                  <tbody>
                    {cart.map((item, i) => {
                      const price = parseFloat(item.price?.replace('R$ ', '').replace(',', '.') || '0');
                      return (
                        <tr
                          key={item.id}
                          style={{ background: i % 2 === 0 ? '#FFFFFF' : '#F5F3EE' }}
                        >
                          <td style={{ padding: '4px 8px', fontWeight: 'bold' }}>{item.title}</td>
                          <td style={{ padding: '4px 8px', textAlign: 'right', color: '#0A246A' }}>{item.price}</td>
                          <td style={{ padding: '4px 8px', textAlign: 'center' }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4 }}>
                              <button
                                className="win-btn"
                                onClick={() => updateQuantity(item.id, -1)}
                                style={{ minWidth: 20, padding: '1px 4px', fontSize: 10 }}
                              >
                                <Minus style={{ width: 8, height: 8 }} />
                              </button>
                              <span style={{ width: 20, textAlign: 'center', fontWeight: 'bold' }}>{item.quantity}</span>
                              <button
                                className="win-btn"
                                onClick={() => updateQuantity(item.id, 1)}
                                style={{ minWidth: 20, padding: '1px 4px', fontSize: 10 }}
                              >
                                <Plus style={{ width: 8, height: 8 }} />
                              </button>
                            </div>
                          </td>
                          <td style={{ padding: '4px 8px', textAlign: 'right', fontWeight: 'bold' }}>
                            R$ {(price * item.quantity).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                          </td>
                          <td style={{ padding: '4px 8px' }}>
                            <button
                              className="win-btn"
                              onClick={() => removeFromCart(item.id)}
                              style={{ minWidth: 20, padding: '1px 4px', fontSize: 10, color: '#C0392B' }}
                            >
                              <Trash2 style={{ width: 9, height: 9 }} />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}
            </div>

            {/* Cart footer */}
            {cart.length > 0 && (
              <div
                style={{
                  padding: '8px 12px',
                  background: '#D4D0C8',
                  borderTop: '1px solid #808080',
                }}
              >
                <div
                  className="win-sunken"
                  style={{
                    background: '#FFFFFF',
                    padding: '4px 8px',
                    fontSize: 12,
                    fontWeight: 'bold',
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: 8,
                  }}
                >
                  <span>Total Estimado:</span>
                  <span style={{ color: '#0A246A' }}>
                    R$ {cartTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </span>
                </div>
                <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
                  <WinBtn
                    isDefault
                    onClick={() => {
                      setDialogMsg('Agendamento enviado com sucesso! Em breve entraremos em contato.');
                      setShowDialog(true);
                      setIsCartOpen(false);
                      setCart([]);
                    }}
                  >
                    Finalizar Agendamento
                  </WinBtn>
                  <WinBtn onClick={() => setIsCartOpen(false)}>Cancelar</WinBtn>
                </div>
              </div>
            )}

            {cart.length === 0 && (
              <div
                style={{
                  padding: '8px 12px',
                  background: '#D4D0C8',
                  borderTop: '1px solid #808080',
                  display: 'flex',
                  justifyContent: 'flex-end',
                }}
              >
                <WinBtn onClick={() => setIsCartOpen(false)}>Fechar</WinBtn>
              </div>
            )}
          </div>
        </div>
      )}

      {/* =================== MESSAGE DIALOG =================== */}
      {showDialog && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.3)',
            zIndex: 3000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div className="win-window" style={{ width: 360 }}>
            <div className="win-titlebar">
              <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                <AlertCircle style={{ width: 12, height: 12 }} />
                <span style={{ fontWeight: 'bold', fontSize: 11 }}>Lumière</span>
              </div>
              <button className="win-ctrl-btn close" onClick={() => setShowDialog(false)}>
                <X style={{ width: 9, height: 9 }} />
              </button>
            </div>
            <div style={{ padding: 20, background: '#D4D0C8' }}>
              <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start', marginBottom: 20 }}>
                <CheckCircle2
                  style={{ width: 32, height: 32, color: '#008080', flexShrink: 0 }}
                />
                <div>
                  <div style={{ fontWeight: 'bold', fontSize: 12, marginBottom: 4 }}>Operação concluída</div>
                  <div style={{ fontSize: 11, lineHeight: 1.5 }}>{dialogMsg}</div>
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <WinBtn isDefault onClick={() => setShowDialog(false)} style={{ minWidth: 80 }}>
                  OK
                </WinBtn>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Taskbar */}
      <Taskbar
        activeWindow={activeWindow}
        setActiveWindow={setActiveWindow}
        cartCount={cartCount}
        onCartOpen={() => setIsCartOpen(true)}
      />
    </div>
  );
}
