const env = import.meta.env

export const siteConfig = {
  wifi: {
    rede: env.VITE_WIFI_REDE || 'Lusitania',
    senha: env.VITE_WIFI_SENHA || '@lusitania',
  },
  horarios: {
    cafeDaManha: env.VITE_CAFE_DA_MANHA || '07:30 as 10:00',
    salaTv: env.VITE_HORARIO_SALA_TV || '08:00 as 23:00',
    piscina: env.VITE_HORARIO_PISCINA || '08:00 as 23:00',
    salaJogos: env.VITE_HORARIO_SALA_JOGOS || '08:00 as 23:00',
    areaPiscina: env.VITE_HORARIO_AREA_PISCINA || '08:00 as 23:00',
    sauna: env.VITE_HORARIO_SAUNA || '17:30 as 20:00',
  },
  arrumacao: {
    limite: env.VITE_ARRUMACAO_LIMITE || '14h',
  },
  checkout: {
    horario: env.VITE_CHECKOUT || '12h',
    valorEstendido: env.VITE_CHECKOUT_ESTENDIDO_VALOR || 'R$ 45,00 por hora',
    regraEstendido:
      env.VITE_CHECKOUT_ESTENDIDO_REGRA || 'Apos 16h, sera cobrado o valor de uma diaria adicional.',
  },
  recepcao: {
    telefone: env.VITE_RECEPCAO_TELEFONE || '(27) 99855-2997',
    atendimento: env.VITE_RECEPCAO_ATENDIMENTO || '07:00 as 22:00',
  },
}

export const scheduleItems = [
  { label: 'Cafe da manha', time: siteConfig.horarios.cafeDaManha },
  { label: 'Sala de TV', time: siteConfig.horarios.salaTv },
  { label: 'Piscina', time: siteConfig.horarios.piscina },
  { label: 'Sala de Jogos', time: siteConfig.horarios.salaJogos },
  { label: 'Area da Piscina', time: siteConfig.horarios.areaPiscina },
  { label: 'Sauna', time: siteConfig.horarios.sauna },
] as const
