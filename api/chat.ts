import { answerHotelChat } from '../server/chatService'

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  if (!process.env.OPENAI_API_KEY) {
    return res.status(500).json({ error: 'OPENAI_API_KEY not configured' })
  }

  if (!process.env.OPENAI_MODEL) {
    process.env.OPENAI_MODEL = 'gpt-4o-mini'
  }

  const question = typeof req.body?.message === 'string' ? req.body.message.trim() : ''

  if (!question) {
    return res.status(400).json({ error: 'Message is required' })
  }

  try {
    const message = await answerHotelChat(question)
    return res.status(200).json({ message })
  } catch (error) {
    console.error('OpenAI chat error', error)

    return res.status(500).json({
      message: 'Nao consegui consultar os documentos agora. Por favor, fale com a recepcao pelo WhatsApp para receber ajuda.',
    })
  }
}
