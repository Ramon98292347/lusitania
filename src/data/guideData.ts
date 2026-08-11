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
    title: 'Horários',
    subtitle: 'Funcionamento',
    summary: `Café da manhã\n${siteConfig.horarios.cafeDaManha}`,
    icon: Clock3,
    detail: [
      `Café da manhã|${siteConfig.horarios.cafeDaManha}`,
      `Sala de TV|${siteConfig.horarios.salaTv}`,
      `Piscina|${siteConfig.horarios.piscina}`,
      `Sala de Jogos|${siteConfig.horarios.salaJogos}`,
      `Área da Piscina|${siteConfig.horarios.areaPiscina}`,
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
      'Toalhas disponíveis na recepção',
      'Após o uso, devolver as toalhas na recepção',
    ],
  },
  {
    id: 'jogos',
    title: 'Sala de Jogos',
    subtitle: 'Diversão',
    summary: siteConfig.horarios.salaJogos,
    icon: Gamepad2,
    detail: [`Sala de Jogos|${siteConfig.horarios.salaJogos}`, 'Ambiente sujeito a lotação.'],
  },
  {
    id: 'arrumacao',
    title: 'Arrumação',
    subtitle: 'Apartamento',
    summary: `Deixe a chave\naté as ${siteConfig.arrumacao.limite}`,
    icon: Sparkles,
    detail: [
      `Caso deseje a limpeza, deixe a chave na recepção até as ${siteConfig.arrumacao.limite}.`,
      'A equipe realiza a arrumação no mesmo dia, conforme disponibilidade.',
    ],
  },
  {
    id: 'lareira',
    title: 'Lareira',
    subtitle: 'Orientações',
    summary: 'Uso seguro',
    icon: Flame,
    detail: [
      'A recepção pode acender a lareira até as 22h.',
      'Também disponibilizamos kit com álcool e fósforos.',
      'Não deixe a lareira acesa ao sair ou durante o sono.',
    ],
  },
  {
    id: 'checkout',
    title: 'Check-out',
    subtitle: 'Saída',
    summary: `Até as ${siteConfig.checkout.horario}`,
    icon: AlarmClockCheck,
    detail: [
      `Horário padrão: até as ${siteConfig.checkout.horario}.`,
      'Organize sua saída com antecedência para mais comodidade.',
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
      'Consulte a recepção para disponibilidade.',
    ],
  },
  {
    id: 'recepcao',
    title: 'Falar com a Recepção',
    subtitle: 'Estamos à disposição',
    summary: 'Atendimento\ndiário',
    icon: Headset,
    detail: [
      `WhatsApp: ${siteConfig.recepcao.telefone}`,
      `Atendimento todos os dias das ${siteConfig.recepcao.atendimento}.`,
    ],
  },
]
