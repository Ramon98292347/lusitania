import { links } from '../config/links'
import { scheduleItems, siteConfig } from '../config/site'
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
- Wi-Fi: rede ${siteConfig.wifi.rede}, senha ${siteConfig.wifi.senha}.
- Café da manhã: ${siteConfig.horarios.cafeDaManha}.
- Sala de TV: ${siteConfig.horarios.salaTv}.
- Piscina: ${siteConfig.horarios.piscina}.
- Sala de Jogos: ${siteConfig.horarios.salaJogos}.
- Área da Piscina: ${siteConfig.horarios.areaPiscina}.
- Sauna: ${siteConfig.horarios.sauna}.
- Arrumação: o hóspede deve deixar a chave na recepção até as ${siteConfig.arrumacao.limite}.
- Check-out: até as ${siteConfig.checkout.horario}.
- Check-out estendido: ${siteConfig.checkout.valorEstendido}; ${siteConfig.checkout.regraEstendido}, sujeito à disponibilidade.
- Recepção: WhatsApp ${siteConfig.recepcao.telefone}, atendimento das ${siteConfig.recepcao.atendimento}.
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
  const wantsAccommodation =
    exactHasAny(text, [
      'acomodacao',
      'acomodacoes',
      'quarto',
      'quartos',
      'chale',
      'chales',
      'apartamento',
      'apartamentos',
      'suite',
      'casal',
      'romantico',
      'hidromassagem',
      'banheira',
      'hidro',
      'lareira',
      '4 pessoas',
      'familia',
      'familias',
      'acompanhante',
      'acompanhantes',
      'luxo',
      'standard',
      'jasmin',
      'master',
      'madeira',
    ]) ||
    fuzzyHasAny(text, [
      'acomodacoe',
      'acomodaçao',
      'apartameto',
      'idromasagem',
      'larera',
    ])
  const wantsReservation =
    exactHasAny(text, ['reserva', 'reservar', 'diaria', 'diarias']) ||
    fuzzyHasAny(text, ['reseva', 'resrva', 'resreva'])

  if (!text.trim()) {
    return 'Pode me mandar sua dúvida. Posso ajudar com Wi‑Fi, horários, acomodações, reservas e contato da recepção.'
  }

  if (exactHasAny(text, ['wifi', 'wi fi', 'internet', 'senha']) || fuzzyHasAny(text, ['wfi'])) {
    return `O Wi‑Fi da pousada é:\nRede: ${siteConfig.wifi.rede}\nSenha: ${siteConfig.wifi.senha}`
  }

  if (
    exactHasAny(text, ['cafe', 'cafe da manha', 'almoco', 'jantar', 'horario', 'horarios']) ||
    fuzzyHasAny(text, ['horaro', 'horarois'])
  ) {
    return `Horários principais:\n${scheduleItems.map((item) => `${item.label}: ${item.time}`).join('\n')}`
  }

  if (wantsReservation && wantsAccommodation) {
    return getAccommodationReply(text, true)
  }

  if (wantsAccommodation) {
    return getAccommodationReply(text, false)
  }

  if (wantsReservation) {
    return `Você pode fazer sua reserva por aqui:\n${links.reservas}\n\nSe quiser, também posso te indicar a acomodação mais adequada para casal, família ou com hidromassagem.`
  }

  if (exactHasAny(text, ['piscina', 'sauna', 'lazer']) || fuzzyHasAny(text, ['pisina', 'sana'])) {
    return `Lazer da pousada:\nPiscina: ${siteConfig.horarios.piscina}\nSauna: ${siteConfig.horarios.sauna}\nSe precisar, a recepção pode orientar durante a estadia.`
  }

  if (exactHasAny(text, ['arrumacao', 'limpeza', 'arrumar quarto', 'faxina']) || fuzzyHasAny(text, ['arumacao'])) {
    return `Se desejar arrumação, deixe a chave na recepção até as ${siteConfig.arrumacao.limite}. A equipe realiza a limpeza conforme disponibilidade no mesmo dia.`
  }

  if (exactHasAny(text, ['checkout', 'check out', 'saida']) || fuzzyHasAny(text, ['chekout', 'checkoute', 'sayda'])) {
    if (exactHasAny(text, ['estendido', 'late', 'tarde']) || fuzzyHasAny(text, ['estentido'])) {
      return `O check-out estendido custa ${siteConfig.checkout.valorEstendido}. ${siteConfig.checkout.regraEstendido} É importante confirmar disponibilidade com a recepção.`
    }

    return `O check-out padrão é até as ${siteConfig.checkout.horario}. Se quiser check-out estendido, posso te explicar como funciona.`
  }

  if (
    exactHasAny(text, ['whatsapp', 'recepcao', 'telefone', 'contato', 'atendimento']) ||
    fuzzyHasAny(text, ['recepicao', 'recepsao', 'watsap'])
  ) {
    return `Você pode falar com a recepção pelo WhatsApp: ${siteConfig.recepcao.telefone}.\nAtendimento todos os dias das ${siteConfig.recepcao.atendimento}.\nLink direto: ${links.whatsapp}`
  }

  if (exactHasAny(text, ['como chegar', 'endereco', 'localizacao', 'mapa', 'maps', 'chegar']) || fuzzyHasAny(text, ['localisacao'])) {
    return `Aqui está o link de como chegar:\n${links.maps}`
  }

  if (exactHasAny(text, ['galeria', 'fotos', 'foto']) || fuzzyHasAny(text, ['galerya', 'fotto'])) {
    return `Você pode ver mais fotos da pousada aqui:\n${links.galeria}`
  }

  if (exactHasAny(text, ['hidromassagem', 'banheira', 'hidro']) || fuzzyHasAny(text, ['idromasagem'])) {
    return 'A acomodação com hidromassagem é o CHALÉ MASTER. Ele é exclusivo para casal e também conta com sala ampla com lareira, ar-condicionado e varanda.'
  }

  if (exactHasAny(text, ['lareira']) || fuzzyHasAny(text, ['larera'])) {
    return 'Temos opções com lareira, como CHALÉ MADEIRA, CHALÉ JASMIN e CHALÉ MASTER. Se quiser, eu posso te indicar a melhor opção para casal ou para até 4 pessoas.'
  }

  if (exactHasAny(text, ['casal', 'romantico'])) {
    return 'Para casal, as opções mais indicadas são:\n- AP. LUXO (Sem Varanda)\n- CHALÉ JASMIN\n- CHALÉ MASTER\n\nSe quiser algo mais romântico, o CHALÉ MASTER é o destaque por ter hidromassagem.'
  }

  if (exactHasAny(text, ['4 pessoas', 'familia', 'familias', 'acompanhante', 'acompanhantes'])) {
    return 'Para até 4 pessoas, as opções são:\n- AP. LUXO\n- CHALÉ MADEIRA\n\nAmbos permitem casal com acompanhantes, com taxa extra para acompanhante.'
  }

  return `Posso te ajudar com horários, Wi‑Fi, acomodações, reservas, check-out e contato da recepção.\n\nSe preferir atendimento humano, fale com a recepção no WhatsApp:\n${links.whatsapp}`
}

function getAccommodationReply(text: string, includeReservation = false) {
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
    return formatAccommodation(foundByName, includeReservation)
  }

  if (exactHasAny(text, ['hidromassagem', 'banheira']) || fuzzyHasAny(text, ['idromasagem'])) {
    const master = acomodacoes.find((item) => item.slug === 'chale-master')
    return master ? formatAccommodation(master, includeReservation) : fallbackAcomodacoes(includeReservation)
  }

  if (exactHasAny(text, ['casal'])) {
    const casal = acomodacoes.filter((item) => normalize(item.capacidade).includes('casal') && !normalize(item.capacidade).includes('4 pessoas'))
    return `Para casal, as opções são:\n${casal.map((item) => `- ${item.nome}: ${item.descricaoCurta}`).join('\n')}${includeReservation ? `\n\nReserva: ${links.reservas}` : ''}`
  }

  if (exactHasAny(text, ['4 pessoas', 'familia', 'acompanhante', 'acompanhantes'])) {
    const familia = acomodacoes.filter((item) => normalize(item.capacidade).includes('4 pessoas'))
    return `Para até 4 pessoas, eu indicaria:\n${familia.map((item) => `- ${item.nome}: ${item.descricaoCurta}`).join('\n')}${includeReservation ? `\n\nReserva: ${links.reservas}` : ''}`
  }

  return fallbackAcomodacoes(includeReservation)
}

function fallbackAcomodacoes(includeReservation = false) {
  return `Temos estas acomodações:\n${acomodacoes.map((item) => `- ${item.nome} (${item.tipo})`).join('\n')}\n\nVeja detalhes em: ${links.acomodações}${includeReservation ? `\nReserva direta: ${links.reservas}` : ''}`
}

function formatAccommodation(item: (typeof acomodacoes)[number], includeReservation = false) {
  return `${item.nome} (${item.tipo})\n${item.descricaoCurta}\nCapacidade: ${item.capacidade}\nComodidades: ${item.comodidades.slice(0, 4).join(', ')}.${includeReservation ? `\nReserva: ${item.reserva}` : ''}`
}

function exactHasAny(text: string, terms: string[]) {
  return terms.some((term) => text.includes(normalize(term)))
}

function fuzzyHasAny(text: string, terms: string[]) {
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
  if (a[0] !== b[0]) return false
  if (Math.abs(a.length - b.length) > 2) return false

  const distance = levenshtein(a, b)
  const maxDistance = b.length <= 5 ? 1 : 2

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
