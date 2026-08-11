import React, { useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import {
  Bell,
  BedDouble,
  CalendarDays,
  Bot,
  Check,
  ChevronDown,
  Clock3,
  ChevronLeft,
  ChevronRight,
  Copy,
  Headset,
  Images,
  Info,
  MapPinned,
  MessageCircle,
  Phone,
  Waves,
} from 'lucide-react'
import { links } from './config/links'
import { scheduleItems, siteConfig } from './config/site'
import { quickItems, type GuideItem } from './data/guideData'
import {
  chatSuggestions,
  createInitialChatMessages,
  getAssistantReply,
  type ChatResolution,
  type ChatMessage,
} from './data/chatKnowledge'
import './styles.css'

const photos = {
  logo: '/images/lusitania-sem-fundo-logo-clean.png',
  hero: '/images/hero-hotel.png',
  tour: '/images/vista-jardim.png',
  room: '/images/fachada-hotel.png',
  gallery: '/images/vista-jardim.png',
  reserves: '/images/fachada-wide.png',
  map: '/images/vista-jardim.png',
}

const cardsTop = quickItems.slice(0, 3)
const cardsBottom = quickItems.slice(3)

const bottomBenefits = [
  ['Conforto', 'Ambientes acolhedores'],
  ['Natureza', 'Ampla area verde em Pedra Azul'],
  ['Tranquilidade', 'Para descansar e aproveitar'],
  ['Hospitalidade', 'Atendimento com carinho'],
  ['Seguranca', 'Sua seguranca e nossa prioridade'],
  ['Experiencia', 'Momentos inesqueciveis'],
] as const

const notificationItems = [
  {
    id: 'wifi',
    title: 'Wi-Fi disponivel',
    description: 'Rede Lusitania pronta para conectar.',
    icon: Bell,
  },
  {
    id: 'checkout',
    title: 'Check-out ate 12h',
    description: 'Se precisar de check-out estendido, fale com a recepcao.',
    icon: Clock3,
  },
]

function App() {
  const [selected, setSelected] = useState<GuideItem | null>(null)
  const [copied, setCopied] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const [currentTime, setCurrentTime] = useState(() => formatCurrentTime())
  const [showChat, setShowChat] = useState(false)
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(() => createInitialChatMessages())
  const [chatInput, setChatInput] = useState('')
  const [chatBodyElement, setChatBodyElement] = useState<HTMLDivElement | null>(null)
  const [chatLoading, setChatLoading] = useState(false)

  useEffect(() => {
    const timer = window.setInterval(() => {
      setCurrentTime(formatCurrentTime())
    }, 1000)

    return () => window.clearInterval(timer)
  }, [])

  useEffect(() => {
    if (!showChat || !chatBodyElement) return

    chatBodyElement.scrollTo({
      top: chatBodyElement.scrollHeight,
      behavior: 'smooth',
    })
  }, [chatMessages, showChat, chatBodyElement])

  const open = (item: GuideItem) => {
    setCopied(false)
    setSelected(item)
    setShowNotifications(false)
  }

  const copyPassword = async () => {
    try {
      await navigator.clipboard.writeText(siteConfig.wifi.senha)
      setCopied(true)
    } catch {
      setCopied(false)
    }
  }

  const sendChatMessage = async (message: string) => {
    const trimmed = message.trim()
    if (!trimmed || chatLoading) return

    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: 'user',
      text: trimmed,
    }

    setChatMessages((current) => [...current, userMessage])
    setChatInput('')

    const resolution: ChatResolution = getAssistantReply(trimmed)

    if (resolution.kind === 'local') {
      const assistantMessage: ChatMessage = {
        id: crypto.randomUUID(),
        role: 'assistant',
        text: resolution.text,
      }

      setChatMessages((current) => [...current, assistantMessage])
      return
    }

    setChatLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: trimmed }),
      })

      const data = await response.json()

      const assistantMessage: ChatMessage = {
        id: crypto.randomUUID(),
        role: 'assistant',
        text:
          typeof data?.message === 'string' && data.message.trim()
            ? data.message
            : 'Nao encontrei essa informacao nos documentos da pousada. Para confirmar, fale com a recepcao pelo WhatsApp.',
      }

      setChatMessages((current) => [...current, assistantMessage])
    } catch {
      const assistantMessage: ChatMessage = {
        id: crypto.randomUUID(),
        role: 'assistant',
        text: 'Nao consegui consultar os documentos agora. Para ajuda imediata, fale com a recepcao pelo WhatsApp.',
      }

      setChatMessages((current) => [...current, assistantMessage])
    } finally {
      setChatLoading(false)
    }
  }

  return (
    <div className="page-shell">
      <main className="app-shell">
        <section
          className="hero"
          style={{
            backgroundImage: `linear-gradient(180deg, rgba(3, 28, 24, 0.06) 0%, rgba(3, 28, 24, 0.42) 38%, rgba(3, 28, 24, 0.88) 72%, rgba(3, 28, 24, 0.98) 100%), url(${photos.hero})`,
          }}
        >
          <div className="status-row">
            <span>{currentTime}</span>
            <button
              className="icon-button"
              aria-label="Avisos"
              type="button"
              onClick={() => setShowNotifications(true)}
            >
              <Bell size={20} />
            </button>
          </div>

          <div className="brand-block">
            <img className="brand-logo" src={photos.logo} alt="Pousada Lusitania" />
            <p className="guide-label">GUIA DO HOSPEDE</p>
            <div className="ornament" />
          </div>

          <div className="hero-copy">
            <h1>Seja bem-vindo!</h1>
            <p>Desejamos que sua estadia seja confortavel, tranquila e agradavel.</p>
            <div className="ornament small" />
            <h2>Como podemos ajudar?</h2>
          </div>
        </section>

        <section className="content-wrap">
          <div className="services-grid services-grid-top">
            {cardsTop.map((item) => (
              <ServiceCard key={item.id} item={item} onOpen={open} />
            ))}
          </div>

          <div className="services-grid services-grid-bottom">
            {cardsBottom.map((item) => (
              <ServiceCard key={item.id} item={item} onOpen={open} />
            ))}
          </div>
        </section>

        <section
          className="content-wrap tour-banner"
          style={{
            backgroundImage: `linear-gradient(90deg, rgba(5, 52, 43, 0.95) 0%, rgba(5, 52, 43, 0.9) 42%, rgba(5, 52, 43, 0.06) 100%), url(${photos.tour})`,
          }}
        >
          <div className="tour-copy">
            <h3>Conheca a Pousada</h3>
            <p>Explore nossos ambientes em uma experiencia imersiva 360°.</p>
            <a href={links.tour} target="_blank" rel="noreferrer" className="gold-button">
              Iniciar Tour 360°
              <ChevronRight size={16} />
            </a>
          </div>
          <div className="tour-badge">360°</div>
        </section>

        <section className="content-wrap nav-grid">
          <NavCard title="Acomodacoes" image={photos.room} href={links.acomodações} icon={<BedDouble size={18} />} />
          <NavCard title="Galeria" image={photos.gallery} href={links.galeria} icon={<Images size={18} />} />
          <NavCard title="Reservas" image={photos.reserves} href={links.reservas} icon={<CalendarDays size={18} />} />
          <NavCard title="Como Chegar" image={photos.map} href={links.maps} icon={<MapPinned size={18} />} />
        </section>

        <section className="content-wrap help-card">
          <button className="help-icon" onClick={() => open(quickItems.find((item) => item.id === 'recepcao')!)} aria-label="Abrir recepcao">
            <MessageCircle size={24} />
          </button>
          <div className="help-copy">
            <strong>Precisa de ajuda?</strong>
            <p>Nossa equipe esta a disposicao para ajudar voce.</p>
          </div>
          <a href={links.whatsapp} target="_blank" rel="noreferrer" className="help-action">
            WhatsApp
            <ChevronRight size={16} />
          </a>
        </section>
      </main>

      <button
        type="button"
        className="floating-chat-button"
        onClick={() => setShowChat(true)}
        aria-label="Abrir atendente virtual"
      >
        <span className="floating-chat-icon">
          <Bot size={22} />
        </span>
        <span className="floating-chat-copy">
          <strong>Atendente</strong>
          <small>Chat online</small>
        </span>
      </button>

      <section className="benefits-strip">
        {bottomBenefits.map(([title, text]) => (
          <div key={title} className="benefit">
            <span className="benefit-mark">✦</span>
            <div>
              <strong>{title}</strong>
              <p>{text}</p>
            </div>
          </div>
        ))}
      </section>

      {showNotifications && (
        <div className="modal-backdrop" onClick={() => setShowNotifications(false)}>
          <section className="notification-panel" onClick={(event) => event.stopPropagation()}>
            <header className="notification-header">
              <div>
                <p className="notification-eyebrow">Avisos</p>
                <h3>Notificacoes da hospedagem</h3>
              </div>
              <button
                className="back-button"
                onClick={() => setShowNotifications(false)}
                aria-label="Fechar avisos"
                type="button"
              >
                <ChevronLeft size={18} />
              </button>
            </header>
            <div className="notification-list">
              {notificationItems.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className="notification-item"
                  onClick={() => {
                    setShowNotifications(false)
                    const linkedItem = quickItems.find((entry) => entry.id === item.id)
                    if (linkedItem) {
                      open(linkedItem)
                    }
                  }}
                >
                  <span className="notification-icon">
                    <item.icon size={18} />
                  </span>
                  <span>
                    <strong>{item.title}</strong>
                    <small>{item.description}</small>
                  </span>
                  <ChevronRight size={16} />
                </button>
              ))}
            </div>
          </section>
        </div>
      )}

      {showChat && (
        <div className="modal-backdrop" onClick={() => setShowChat(false)}>
          <section className="chat-panel" onClick={(event) => event.stopPropagation()}>
            <header className="chat-header">
              <div className="chat-header-copy">
                <p className="notification-eyebrow">Atendente virtual</p>
                <h3>Lusitania Chat</h3>
                <span>Respostas sobre hospedagem, acomodações e reservas.</span>
              </div>
              <button className="back-button" onClick={() => setShowChat(false)} aria-label="Fechar chat" type="button">
                <ChevronDown size={18} />
              </button>
            </header>

            <div className="chat-messages" ref={setChatBodyElement}>
              {chatMessages.map((message) => (
                <article key={message.id} className={`chat-bubble chat-bubble-${message.role}`}>
                  {message.role === 'assistant' && (
                    <span className="chat-avatar">
                      <Bot size={16} />
                    </span>
                  )}
                  <div>
                    <strong>{message.role === 'assistant' ? 'Atendente' : 'Você'}</strong>
                    <ChatMessageBody text={message.text} />
                  </div>
                </article>
              ))}

              {chatLoading && (
                <article className="chat-bubble chat-bubble-assistant">
                  <span className="chat-avatar">
                    <Bot size={16} />
                  </span>
                  <div>
                    <strong>Atendente</strong>
                    <div className="chat-message-body">
                      <p>Consultando os documentos da pousada...</p>
                    </div>
                  </div>
                </article>
              )}
            </div>

            <div className="chat-suggestions">
              {chatSuggestions.map((suggestion) => (
                <button
                  key={suggestion}
                  type="button"
                  className="chat-chip"
                  onClick={() => void sendChatMessage(suggestion)}
                  disabled={chatLoading}
                >
                  {suggestion}
                </button>
              ))}
            </div>

            <form
              className="chat-form"
              onSubmit={(event) => {
                event.preventDefault()
                void sendChatMessage(chatInput)
              }}
            >
              <textarea
                className="chat-input"
                value={chatInput}
                onChange={(event) => setChatInput(event.target.value)}
                placeholder="Digite sua dúvida sobre a pousada..."
                rows={3}
                disabled={chatLoading}
              />
              <button type="submit" className="chat-send-button" disabled={chatLoading}>
                {chatLoading ? 'Consultando...' : 'Enviar'}
              </button>
            </form>
          </section>
        </div>
      )}

      {selected && (
        <div className="modal-backdrop" onClick={() => setSelected(null)}>
          <section className="detail-screen" onClick={(event) => event.stopPropagation()}>
            <header className="detail-header">
              <button className="back-button" onClick={() => setSelected(null)} aria-label="Voltar">
                <ChevronLeft size={18} />
              </button>
              <div>
                <h3>{selected.id === 'horarios' ? 'Horarios de Funcionamento' : selected.title}</h3>
                <div className="ornament" />
              </div>
            </header>

            {selected.id === 'horarios' && (
              <div className="detail-card-panel">
                {scheduleItems.map((item) => (
                  <div className="schedule-row" key={item.label}>
                    <span className="schedule-icon">
                      <selected.icon size={18} />
                    </span>
                    <b>{item.label}</b>
                    <span>{item.time}</span>
                  </div>
                ))}
                <div className="note-box">
                  <Info size={16} />
                  <p>Horarios sujeitos a alteracoes. Em caso de duvidas, fale com a recepcao.</p>
                </div>
              </div>
            )}

            {selected.id === 'wifi' && (
              <div className="wifi-panel">
                <span className="wifi-hero">
                  <selected.icon size={44} />
                </span>
                <p>Rede Wi-Fi</p>
                <h4>{siteConfig.wifi.rede}</h4>
                <p>Senha</p>
                <h5>{siteConfig.wifi.senha}</h5>
                <button className="copy-button" onClick={copyPassword}>
                  <Copy size={16} />
                  Copiar senha
                </button>
                {copied && (
                  <div className="success-box">
                    <Check size={16} />
                    <div>
                      <strong>Senha copiada!</strong>
                      <p>Agora e so conectar e aproveitar!</p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {selected.id === 'recepcao' && (
              <div className="contact-panel">
                <span className="contact-hero">
                  <Headset size={44} />
                </span>
                <p>Nossa equipe esta pronta para ajudar voce!</p>
                <a href={links.whatsapp} target="_blank" rel="noreferrer" className="whatsapp-button">
                  <MessageCircle size={18} />
                  Chamar no WhatsApp
                </a>
                <div className="phone-box">
                  <Phone size={18} />
                  <span>{siteConfig.recepcao.telefone}</span>
                </div>
                <div className="note-box soft">
                  <Info size={16} />
                  <p>{`Atendimento todos os dias das ${siteConfig.recepcao.atendimento}.`}</p>
                </div>
              </div>
            )}

            {!['horarios', 'wifi', 'recepcao'].includes(selected.id) && (
              <div className="detail-card-panel generic">
                <span className="generic-icon">
                  <selected.icon size={34} />
                </span>
                <div className="generic-copy">
                  <p className="generic-subtitle">{selected.subtitle}</p>
                  {selected.detail.map((line) => (
                    <p key={line}>{line}</p>
                  ))}
                </div>
              </div>
            )}
          </section>
        </div>
      )}
    </div>
  )
}

function formatCurrentTime() {
  return new Intl.DateTimeFormat('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(new Date())
}

function ServiceCard({
  item,
  onOpen,
}: {
  item: GuideItem
  onOpen: (item: GuideItem) => void
}) {
  return (
    <button className="service-card" onClick={() => onOpen(item)} type="button">
      <span className="service-icon">
        <item.icon size={30} strokeWidth={1.8} />
      </span>
      <div>
        <strong>{item.title}</strong>
        <small>{item.subtitle}</small>
      </div>
      <p>{item.summary}</p>
    </button>
  )
}

function NavCard({
  title,
  image,
  href,
  icon,
}: {
  title: string
  image: string
  href: string
  icon: React.ReactNode
}) {
  return (
    <a
      href={href}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel="noreferrer"
      className="nav-card"
      style={{
        backgroundImage: `linear-gradient(180deg, rgba(251, 247, 239, 0.95) 0%, rgba(251, 247, 239, 0.72) 48%, rgba(251, 247, 239, 0.08) 100%), url(${image})`,
      }}
    >
      <span className="nav-title">{title}</span>
      <span className="nav-thumb-icon">{icon}</span>
    </a>
  )
}

function ChatMessageBody({ text }: { text: string }) {
  const lines = text.split('\n').filter(Boolean)

  return (
    <div className="chat-message-body">
      {lines.map((line) => {
        const urlMatch = line.match(/https?:\/\/\S+/)

        if (urlMatch) {
          const url = urlMatch[0]
          return (
            <a key={`${line}-${url}`} href={url} target="_blank" rel="noreferrer" className="chat-link-button">
              {getChatLinkLabel(line)}
              <ChevronRight size={16} />
            </a>
          )
        }

        return <p key={line}>{line}</p>
      })}
    </div>
  )
}

function getChatLinkLabel(line: string) {
  const normalized = line.toLowerCase()

  if (normalized.includes('reserva')) return 'Fazer reserva'
  if (normalized.includes('acomoda')) return 'Ver acomodações'
  if (normalized.includes('galeria') || normalized.includes('foto')) return 'Ver galeria'
  if (normalized.includes('chegar') || normalized.includes('mapa')) return 'Abrir mapa'
  if (normalized.includes('whatsapp') || normalized.includes('recep')) return 'Chamar no WhatsApp'
  return 'Abrir link'
}

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
