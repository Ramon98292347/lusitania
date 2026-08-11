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
import { siteConfig } from '../config/site'

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
    summary: `Cafe da manha\n${siteConfig.horarios.cafeDaManha}`,
    icon: Clock3,
    detail: [
      `Cafe da manha|${siteConfig.horarios.cafeDaManha}`,
      `Sala de TV|${siteConfig.horarios.salaTv}`,
      `Piscina|${siteConfig.horarios.piscina}`,
      `Sala de Jogos|${siteConfig.horarios.salaJogos}`,
      `Area da Piscina|${siteConfig.horarios.areaPiscina}`,
      `Sauna|${siteConfig.horarios.sauna}`,
    ],
  },
  {
    id: 'wifi',
    title: 'Wi-Fi',
    subtitle: 'Rede e senha',
    summary: `Rede ${siteConfig.wifi.rede}`,
    icon: Wifi,
    detail: [`Rede Wi-Fi: ${siteConfig.wifi.rede}`, `Senha: ${siteConfig.wifi.senha}`],
  },
  {
    id: 'lazer',
    title: 'Piscina e Sauna',
    subtitle: 'Lazer',
    summary: `Uso livre\n${siteConfig.horarios.piscina}`,
    icon: Waves,
    detail: [
      `Piscina|${siteConfig.horarios.piscina}`,
      `Sauna|${siteConfig.horarios.sauna}`,
      'Toalhas disponiveis na recepcao',
      'Apos o uso, devolver as toalhas na recepcao',
    ],
  },
  {
    id: 'jogos',
    title: 'Sala de Jogos',
    subtitle: 'Diversao',
    summary: siteConfig.horarios.salaJogos,
    icon: Gamepad2,
    detail: [`Sala de Jogos|${siteConfig.horarios.salaJogos}`, 'Ambiente sujeito a lotacao.'],
  },
  {
    id: 'arrumacao',
    title: 'Arrumacao',
    subtitle: 'Apartamento',
    summary: `Deixe a chave\nate as ${siteConfig.arrumacao.limite}`,
    icon: Sparkles,
    detail: [
      `Caso deseje a limpeza, deixe a chave na recepcao ate as ${siteConfig.arrumacao.limite}.`,
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
    summary: `Ate as ${siteConfig.checkout.horario}`,
    icon: AlarmClockCheck,
    detail: [
      `Horario padrao: ate as ${siteConfig.checkout.horario}.`,
      'Organize sua saida com antecedencia para mais comodidade.',
    ],
  },
  {
    id: 'checkout-estendido',
    title: 'Check-out Estendido',
    subtitle: 'Mais tempo',
    summary: siteConfig.checkout.valorEstendido.replace(' por hora', '\npor hora'),
    icon: AlarmClockCheck,
    detail: [
      `Taxa de ${siteConfig.checkout.valorEstendido}.`,
      siteConfig.checkout.regraEstendido,
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
      `WhatsApp: ${siteConfig.recepcao.telefone}`,
      `Atendimento todos os dias das ${siteConfig.recepcao.atendimento}.`,
    ],
  },
]
