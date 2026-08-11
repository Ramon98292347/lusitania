import OpenAI from 'openai'
import { acomodacoes } from '../src/data/accommodations'

export async function answerHotelChat(question: string) {
  const apiKey = process.env.OPENAI_API_KEY
  const model = process.env.OPENAI_MODEL || 'gpt-4o-mini'

  if (!apiKey) {
    throw new Error('OPENAI_API_KEY not configured')
  }

  const client = new OpenAI({ apiKey })

  const response = await client.responses.create({
    model,
    instructions: buildAssistantInstructions(),
    input: `Pergunta do hóspede: ${question}\n\nDocumentos da pousada:\n${buildKnowledgeDocuments()}`,
  })

  return (
    response.output_text?.trim() ||
    'Nao encontrei essa informacao nos documentos da pousada. Para confirmar, fale com a recepcao pelo WhatsApp.'
  )
}

function buildAssistantInstructions() {
  return [
    'Você é a atendente virtual da Pousada Lusitânia.',
    'Responda somente com base nos documentos fornecidos na mensagem.',
    'Nunca invente fatos, preços, regras, horários, disponibilidade ou detalhes que não estejam nos documentos.',
    'Se a informação não estiver nos documentos, diga claramente que não encontrou essa informação nos documentos da pousada e oriente o hóspede a falar com a recepção no WhatsApp.',
    'Você pode responder de forma educada a cumprimentos e agradecimentos, mesmo quando não exigem informação factual.',
    'Você também pode responder perguntas simples de dia a dia sobre data e hora atual, usando somente o contexto atual fornecido na mensagem.',
    'Mantenha respostas curtas, acolhedoras e fáceis de ler no celular.',
    'Quando existir um link relevante nos documentos, inclua o link puro em uma linha separada.',
  ].join(' ')
}

function buildKnowledgeDocuments() {
  const now = new Date()
  const currentDate = new Intl.DateTimeFormat('pt-BR', {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    timeZone: 'America/Sao_Paulo',
  }).format(now)
  const currentTime = new Intl.DateTimeFormat('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: 'America/Sao_Paulo',
  }).format(now)

  return [
    `Data atual em Sao Paulo: ${currentDate}`,
    `Hora atual em Sao Paulo: ${currentTime}`,
    `Site oficial: ${process.env.VITE_URL_SITE || 'https://www.pousadalusitania.com.br/'}`,
    `Tour 360: ${process.env.VITE_URL_TOUR_360 || 'https://pousadalusitania.com.br/tour/'}`,
    `Pagina de acomodacoes: ${process.env.VITE_URL_ACOMODACOES || 'https://www.pousadalusitania.com.br/acomodacoes.php'}`,
    `Galeria: ${process.env.VITE_URL_GALERIA || 'https://www.pousadalusitania.com.br/galeria.php#galeria'}`,
    `Reservas: ${process.env.VITE_URL_RESERVAS || 'https://sbreserva.silbeck.com.br/pousadalusitania/pt-br/'}`,
    `Como chegar: ${process.env.VITE_URL_MAPS || 'https://maps.app.goo.gl/CAsW67UawfFypt19A'}`,
    `WhatsApp da recepcao: ${process.env.VITE_URL_WHATSAPP || 'https://wa.me/5527998552997'}`,
    `Wi-Fi rede: ${process.env.VITE_WIFI_REDE || 'Lusitania'}`,
    `Wi-Fi senha: ${process.env.VITE_WIFI_SENHA || '@lusitania'}`,
    `Cafe da manha: ${process.env.VITE_CAFE_DA_MANHA || '07:30 as 10:00'}`,
    `Sala de TV: ${process.env.VITE_HORARIO_SALA_TV || '08:00 as 23:00'}`,
    `Piscina: ${process.env.VITE_HORARIO_PISCINA || '08:00 as 23:00'}`,
    `Sala de Jogos: ${process.env.VITE_HORARIO_SALA_JOGOS || '08:00 as 23:00'}`,
    `Area da Piscina: ${process.env.VITE_HORARIO_AREA_PISCINA || '08:00 as 23:00'}`,
    `Sauna: ${process.env.VITE_HORARIO_SAUNA || '17:30 as 20:00'}`,
    `Arrumacao: deixar a chave na recepcao ate as ${process.env.VITE_ARRUMACAO_LIMITE || '14h'}`,
    `Check-out: ate as ${process.env.VITE_CHECKOUT || '12h'}`,
    `Check-out estendido: ${process.env.VITE_CHECKOUT_ESTENDIDO_VALOR || 'R$ 45,00 por hora'}`,
    `Regra check-out estendido: ${process.env.VITE_CHECKOUT_ESTENDIDO_REGRA || 'Apos 16h, sera cobrado o valor de uma diaria adicional.'}`,
    `Telefone da recepcao: ${process.env.VITE_RECEPCAO_TELEFONE || '(27) 99855-2997'}`,
    `Horario da recepcao: ${process.env.VITE_RECEPCAO_ATENDIMENTO || '07:00 as 22:00'}`,
    'Acomodacoes:',
    ...acomodacoes.map((item) =>
      [
        `- ${item.nome} (${item.tipo})`,
        `  Descricao: ${item.descricaoCurta}`,
        `  Capacidade: ${item.capacidade}`,
        `  Comodidades: ${item.comodidades.join(', ')}`,
        `  Fonte: ${item.fonte}`,
        `  Reserva: ${item.reserva}`,
      ].join('\n'),
    ),
  ].join('\n')
}
