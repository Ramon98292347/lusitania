import {
  AlarmClockCheck,
  Clock3,
  Flame,
  Gamepad2,
  Headset,
  Sparkles,
  Wifi,
  Waves,
} from 'lucide-react'
import type { ComponentType } from 'react'

export type GuideItem = {
  id: string
  title: string
  subtitle: string
  summary: string
  detail: string[]
  icon: ComponentType<{ size?: number; strokeWidth?: number }>
}

export const quickItems: GuideItem[] = [
  {
    id: 'horarios',
    title: 'Horarios',
    subtitle: 'Funcionamento',
    summary: 'Cafe da manha\n07:30 as 10:00',
    icon: Clock3,
    detail: [
      'Cafe da manha|07:30 as 10:00',
      'Sala de TV|08:00 as 23:00',
      'Piscina|08:00 as 23:00',
      'Sala de Jogos|08:00 as 23:00',
      'Area da Piscina|08:00 as 23:00',
      'Sauna|17:30 as 20:00',
    ],
  },
  {
    id: 'wifi',
    title: 'Wi-Fi',
    subtitle: 'Rede e senha',
    summary: 'Rede Lusitania',
    icon: Wifi,
    detail: ['Rede Wi-Fi: Lusitania', 'Senha: @lusitania'],
  },
  {
    id: 'lazer',
    title: 'Piscina e Sauna',
    subtitle: 'Lazer',
    summary: 'Uso livre\n08:00 as 23:00',
    icon: Waves,
    detail: [
      'Piscina|08:00 as 23:00',
      'Sauna|17:30 as 20:00',
      'Toalhas disponiveis na recepcao',
      'Apos o uso, devolver as toalhas na recepcao',
    ],
  },
  {
    id: 'jogos',
    title: 'Sala de Jogos',
    subtitle: 'Diversao',
    summary: '08:00 as 23:00',
    icon: Gamepad2,
    detail: ['Sala de Jogos|08:00 as 23:00', 'Ambiente sujeito a lotacao.'],
  },
  {
    id: 'arrumacao',
    title: 'Arrumacao',
    subtitle: 'Apartamento',
    summary: 'Deixe a chave\nate as 14h',
    icon: Sparkles,
    detail: [
      'Caso deseje a limpeza, deixe a chave na recepcao ate as 14h.',
      'A equipe realiza a arrumacao no mesmo dia, conforme disponibilidade.',
    ],
  },
  {
    id: 'lareira',
    title: 'Lareira',
    subtitle: 'Orientacoes',
    summary: 'Uso seguro',
    icon: Flame,
    detail: [
      'A recepcao pode acender a lareira ate as 22h.',
      'Tambem disponibilizamos kit com alcool e fosforos.',
      'Nao deixe a lareira acesa ao sair ou durante o sono.',
    ],
  },
  {
    id: 'checkout',
    title: 'Check-out',
    subtitle: 'Saida',
    summary: 'Ate as 12h',
    icon: AlarmClockCheck,
    detail: [
      'Horario padrao: ate as 12h.',
      'Organize sua saida com antecedencia para mais comodidade.',
    ],
  },
  {
    id: 'checkout-estendido',
    title: 'Check-out Estendido',
    subtitle: 'Mais tempo',
    summary: 'R$ 45,00\npor hora',
    icon: AlarmClockCheck,
    detail: [
      'Taxa de R$ 45,00 por hora.',
      'A partir das 16h, sera cobrado o valor de uma diaria adicional.',
      'Consulte a recepcao para disponibilidade.',
    ],
  },
  {
    id: 'recepcao',
    title: 'Falar com a Recepcao',
    subtitle: 'Estamos a disposicao',
    summary: 'Atendimento\ndiario',
    icon: Headset,
    detail: [
      'WhatsApp: (27) 99855-2997',
      'Atendimento todos os dias das 07:00 as 22:00.',
    ],
  },
]
