import { links } from '../config/links'
import { acomodacoes } from './accommodations'

export type ChatMessage = {
  id: string
  role: 'assistant' | 'user'
  text: string
}

export const assistantSystemPrompt = `Você é a atendente virtual da Pousada Lusitânia.

Objetivo:
- Responder dúvidas de hóspedes com simpatia, clareza e segurança.
- Priorizar informações oficiais da pousada.
- Quando houver link útil, compartilhar o link.
- Nunca inventar preços, políticas ou horários fora da base.
- Se a pergunta não estiver coberta pela base, orientar o hóspede a falar com a recepção no WhatsApp.

Tom:
- Acolhedor, educado, objetivo e prestativo.
- Respostas curtas, fáceis de ler no celular.

Contexto principal:
- Wi-Fi: rede Lusitania, senha @lusitania.
- Café da manhã: 07:30 às 10:00.
- Sala de TV: 08:00 às 23:00.
- Piscina: 08:00 às 23:00.
- Sala de Jogos: 08:00 às 23:00.
- Área da Piscina: 08:00 às 23:00.
- Sauna: 17:30 às 20:00.
- Arrumação: o hóspede deve deixar a chave na recepção até as 14h.
- Check-out: até as 12h.
- Check-out estendido: R$ 45,00 por hora; após 16h cobra-se uma diária adicional, sujeito à disponibilidade.
- Recepção: WhatsApp (27) 99855-2997, atendimento das 07:00 às 22:00.
- Reservas: ${links.reservas}
- Acomodações: ${links.acomodações}
- Galeria: ${links.galeria}
- Como chegar: ${links.maps}`

export const chatSuggestions = [
  'Qual é a senha do Wi‑Fi?',
  'Que horas é o café da manhã?',
  'Quais acomodações são para casal?',
  'Qual chalé tem hidromassagem?',
  'Como faço minha reserva?',
]

const initialText =
  'Olá! Sou a atendente virtual da Pousada Lusitânia. Posso te ajudar com horários, Wi‑Fi, acomodações, reservas, check-out e contato da recepção.'

export function createInitialChatMessages(): ChatMessage[] {
  return [
    {
      id: crypto.randomUUID(),
      role: 'assistant',
      text: initialText,
    },
  ]
}

export function getAssistantReply(question: string): string {
  const text = normalize(question)

  if (!text.trim()) {
    return 'Pode me mandar sua dúvida. Posso ajudar com Wi‑Fi, horários, acomodações, reservas e contato da recepção.'
  }

  if (hasAny(text, ['wifi', 'wi fi', 'internet', 'senha', 'wfi', 'interneti'])) {
    return 'O Wi‑Fi da pousada é:\nRede: Lusitania\nSenha: @lusitania'
  }

  if (hasAny(text, ['cafe', 'cafe da manha', 'almoco', 'jantar', 'horario', 'horarios', 'horaro', 'horarois'])) {
    return 'Horários principais:\nCafé da manhã: 07:30 às 10:00\nSala de TV: 08:00 às 23:00\nPiscina: 08:00 às 23:00\nSala de Jogos: 08:00 às 23:00\nSauna: 17:30 às 20:00'
  }

  if (hasAny(text, ['piscina', 'sauna', 'lazer', 'pisina', 'sana'])) {
    return 'Lazer da pousada:\nPiscina: 08:00 às 23:00\nSauna: 17:30 às 20:00\nSe precisar, a recepção pode orientar durante a estadia.'
  }

  if (hasAny(text, ['arrumacao', 'limpeza', 'arrumar quarto', 'faxina', 'arumacao', 'arrumaçao'])) {
    return 'Se desejar arrumação, deixe a chave na recepção até as 14h. A equipe realiza a limpeza conforme disponibilidade no mesmo dia.'
  }

  if (hasAny(text, ['checkout', 'check out', 'saida', 'chekout', 'checkoute', 'sayda'])) {
    if (hasAny(text, ['estendido', 'late', 'tarde', 'estentido'])) {
      return 'O check-out estendido custa R$ 45,00 por hora. A partir das 16h, é cobrado o valor de uma diária adicional. É importante confirmar disponibilidade com a recepção.'
    }

    return 'O check-out padrão é até as 12h. Se quiser check-out estendido, posso te explicar como funciona.'
  }

  if (hasAny(text, ['whatsapp', 'recepcao', 'telefone', 'contato', 'atendimento', 'recepicao', 'recepsao', 'watsap'])) {
    return `Você pode falar com a recepção pelo WhatsApp: (27) 99855-2997.\nAtendimento todos os dias das 07:00 às 22:00.\nLink direto: ${links.whatsapp}`
  }

  if (hasAny(text, ['reserva', 'reservar', 'diaria', 'diarias', 'reseva', 'resrva', 'resreva'])) {
    return `Você pode fazer sua reserva por aqui:\n${links.reservas}\n\nSe quiser, também posso te indicar a acomodação mais adequada para casal, família ou com hidromassagem.`
  }

  if (hasAny(text, ['como chegar', 'endereco', 'localizacao', 'mapa', 'maps', 'chegar', 'localisaçao'])) {
    return `Aqui está o link de como chegar:\n${links.maps}`
  }

  if (hasAny(text, ['galeria', 'fotos', 'foto', 'galerya', 'fotto'])) {
    return `Você pode ver mais fotos da pousada aqui:\n${links.galeria}`
  }

  if (hasAny(text, ['acomodacao', 'acomodacoes', 'quarto', 'quartos', 'chale', 'chales', 'apartamento', 'apartamentos', 'suite', 'acomodaçao', 'acomodacoe', 'chalé', 'apartameto'])) {
    return getAccommodationReply(text)
  }

  if (hasAny(text, ['hidromassagem', 'banheira', 'hidro', 'idromasagem'])) {
    return 'A acomodação com hidromassagem é o CHALÉ MASTER. Ele é exclusivo para casal e também conta com sala ampla com lareira, ar-condicionado e varanda.'
  }

  if (hasAny(text, ['lareira', 'larera'])) {
    return 'Temos opções com lareira, como CHALÉ MADEIRA, CHALÉ JASMIN e CHALÉ MASTER. Se quiser, eu posso te indicar a melhor opção para casal ou para até 4 pessoas.'
  }

  if (hasAny(text, ['casal', 'romantico'])) {
    return 'Para casal, as opções mais indicadas são:\n- AP. LUXO (Sem Varanda)\n- CHALÉ JASMIN\n- CHALÉ MASTER\n\nSe quiser algo mais romântico, o CHALÉ MASTER é o destaque por ter hidromassagem.'
  }

  if (hasAny(text, ['4 pessoas', 'familia', 'familias', 'acompanhante', 'acompanhantes'])) {
    return 'Para até 4 pessoas, as opções são:\n- AP. LUXO\n- CHALÉ MADEIRA\n\nAmbos permitem casal com acompanhantes, com taxa extra para acompanhante.'
  }

  return `Posso te ajudar com horários, Wi‑Fi, acomodações, reservas, check-out e contato da recepção.\n\nSe preferir atendimento humano, fale com a recepção no WhatsApp:\n${links.whatsapp}`
}

function getAccommodationReply(text: string) {
  const foundByName = acomodacoes.find((item) => {
    const nome = normalize(item.nome)
    return (
      text.includes(nome) ||
      text.includes(normalize(item.slug)) ||
      (item.slug.includes('jasmin') && text.includes('jasmin')) ||
      (item.slug.includes('master') && text.includes('master')) ||
      (item.slug.includes('madeira') && text.includes('madeira')) ||
      (item.slug.includes('standard') && text.includes('standard')) ||
      (item.slug.includes('luxo') && text.includes('luxo'))
    )
  })

  if (foundByName) {
    return formatAccommodation(foundByName)
  }

  if (hasAny(text, ['hidromassagem', 'banheira'])) {
    const master = acomodacoes.find((item) => item.slug === 'chale-master')
    return master ? formatAccommodation(master) : fallbackAcomodacoes()
  }

  if (hasAny(text, ['casal'])) {
    const casal = acomodacoes.filter((item) => normalize(item.capacidade).includes('casal') && !normalize(item.capacidade).includes('4 pessoas'))
    return `Para casal, as opções são:\n${casal.map((item) => `- ${item.nome}: ${item.descricaoCurta}`).join('\n')}\n\nReserva: ${links.reservas}`
  }

  if (hasAny(text, ['4 pessoas', 'familia', 'acompanhante', 'acompanhantes'])) {
    const familia = acomodacoes.filter((item) => normalize(item.capacidade).includes('4 pessoas'))
    return `Para até 4 pessoas, eu indicaria:\n${familia.map((item) => `- ${item.nome}: ${item.descricaoCurta}`).join('\n')}\n\nReserva: ${links.reservas}`
  }

  return fallbackAcomodacoes()
}

function fallbackAcomodacoes() {
  return `Temos estas acomodações:\n${acomodacoes.map((item) => `- ${item.nome} (${item.tipo})`).join('\n')}\n\nVeja detalhes em: ${links.acomodações}\nReserva direta: ${links.reservas}`
}

function formatAccommodation(item: (typeof acomodacoes)[number]) {
  return `${item.nome} (${item.tipo})\n${item.descricaoCurta}\nCapacidade: ${item.capacidade}\nComodidades: ${item.comodidades.slice(0, 4).join(', ')}.\nReserva: ${item.reserva}`
}

function hasAny(text: string, terms: string[]) {
  return terms.some((term) => fuzzyIncludes(text, normalize(term)))
}

function normalize(value: string) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^\w\s-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function fuzzyIncludes(text: string, term: string) {
  if (!term) return false
  if (text.includes(term)) return true

  const textTokens = text.split(' ').filter(Boolean)
  const termTokens = term.split(' ').filter(Boolean)

  if (termTokens.length === 1) {
    return textTokens.some((token) => isCloseWord(token, termTokens[0]))
  }

  for (let index = 0; index <= textTokens.length - termTokens.length; index += 1) {
    const window = textTokens.slice(index, index + termTokens.length)
    const allClose = termTokens.every((termToken, termIndex) => isCloseWord(window[termIndex], termToken))
    if (allClose) return true
  }

  return false
}

function isCloseWord(a: string, b: string) {
  if (a === b) return true
  if (!a || !b) return false

  const distance = levenshtein(a, b)
  const maxDistance = b.length <= 4 ? 1 : 2

  return distance <= maxDistance
}

function levenshtein(a: string, b: string) {
  const rows = a.length + 1
  const cols = b.length + 1
  const matrix = Array.from({ length: rows }, () => Array<number>(cols).fill(0))

  for (let i = 0; i < rows; i += 1) matrix[i][0] = i
  for (let j = 0; j < cols; j += 1) matrix[0][j] = j

  for (let i = 1; i < rows; i += 1) {
    for (let j = 1; j < cols; j += 1) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1,
        matrix[i][j - 1] + 1,
        matrix[i - 1][j - 1] + cost,
      )
    }
  }

  return matrix[rows - 1][cols - 1]
}
