import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { answerHotelChat } from './server/chatService.ts'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  Object.assign(process.env, env)

  return {
    plugins: [
      react(),
      {
        name: 'local-chat-api',
        configureServer(server) {
          server.middlewares.use('/api/chat', async (req: any, res: any) => {
            if (req.method !== 'POST') {
              res.statusCode = 405
              res.setHeader('Content-Type', 'application/json')
              res.end(JSON.stringify({ error: 'Method not allowed' }))
              return
            }

            let body = ''
            req.on('data', (chunk: Buffer | string) => {
              body += chunk
            })

            req.on('end', async () => {
              try {
                const payload = JSON.parse(body || '{}')
                const question = typeof payload?.message === 'string' ? payload.message.trim() : ''

                if (!question) {
                  res.statusCode = 400
                  res.setHeader('Content-Type', 'application/json')
                  res.end(JSON.stringify({ error: 'Message is required' }))
                  return
                }

                const message = await answerHotelChat(question)
                res.statusCode = 200
                res.setHeader('Content-Type', 'application/json')
                res.end(JSON.stringify({ message }))
              } catch (error) {
                console.error('Local chat api error', error)
                res.statusCode = 500
                res.setHeader('Content-Type', 'application/json')
                res.end(
                  JSON.stringify({
                    message:
                      'Nao consegui consultar os documentos agora. Para ajuda imediata, fale com a recepcao pelo WhatsApp.',
                  }),
                )
              }
            })
          })
        },
      },
    ],
  }
})
