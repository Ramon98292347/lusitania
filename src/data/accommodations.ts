export type Acomodacao = {
  slug: string
  nome: string
  tipo: 'Apartamento' | 'Chalé'
  descricaoCurta: string
  comodidades: string[]
  capacidade: string
  imagem: string | null
  imagemOriginal: string | null
  fonte: string
  reserva: string
}

export const acomodacoes: Acomodacao[] = [
  {
    slug: 'ap-luxo',
    nome: 'AP. LUXO',
    tipo: 'Apartamento',
    descricaoCurta: 'Apartamento para casal com possibilidade de acompanhantes.',
    comodidades: [
      'TV',
      'Frigobar',
      'Ventilador ou ar condicionado quente | frio',
      'Quarto arejado',
      'Acomoda até 4 pessoas (Casal + 02 acompanhante)',
      'Taxa extra cobrada para acompanhante.',
    ],
    capacidade: 'Até 4 pessoas (casal + 02 acompanhantes)',
    imagem: '/images/acomodacoes/ap-luxo.webp',
    imagemOriginal: 'https://www.pousadalusitania.com.br/images/001_44A9667_jpg_web.jpg',
    fonte: 'https://www.pousadalusitania.com.br/acomodacoes.php',
    reserva: 'https://sbreserva.silbeck.com.br/pousadalusitania/pt-br/',
  },
  {
    slug: 'ap-luxo-sem-varanda',
    nome: 'AP. LUXO (Sem Varanda)',
    tipo: 'Apartamento',
    descricaoCurta: 'Apartamento exclusivo para casal.',
    comodidades: ['TV', 'Frigobar', 'Ventilador', 'Acomoda somente casal', '01 unidade'],
    capacidade: 'Somente casal',
    imagem: null,
    imagemOriginal: null,
    fonte: 'https://www.pousadalusitania.com.br/acomodacoes.php',
    reserva: 'https://sbreserva.silbeck.com.br/pousadalusitania/pt-br/',
  },
  {
    slug: 'ap-standard',
    nome: 'AP. STANDARD',
    tipo: 'Apartamento',
    descricaoCurta: 'Apartamento térreo com pequena varanda.',
    comodidades: [
      'No andar térreo',
      'TV',
      'Frigobar',
      'Ventilador',
      'Pequena varanda',
      'Opção para casal ou até 03 pessoas (casal + 01 acompanhante)',
      'Até 3 pessoas',
      'Taxa extra cobrada para acompanhante.',
    ],
    capacidade: 'Até 3 pessoas (casal + 01 acompanhante)',
    imagem: '/images/acomodacoes/ap-standard.webp',
    imagemOriginal: 'https://www.pousadalusitania.com.br/images/_44A9914_jpg_web.jpg',
    fonte: 'https://www.pousadalusitania.com.br/acomodacoes.php',
    reserva: 'https://sbreserva.silbeck.com.br/pousadalusitania/pt-br/',
  },
  {
    slug: 'chale-madeira',
    nome: 'CHALÉ MADEIRA',
    tipo: 'Chalé',
    descricaoCurta: 'Chalé em madeira com sala, lareira e varanda.',
    comodidades: [
      'Estrutura inteira em madeira',
      'TV',
      'Frigobar',
      'Pequena sala com lareira',
      'Ar condicionado',
      'Varanda',
      'Acomodação confortável e acolhedora',
      'Acomoda até 04 pessoas (casal + 02 acompanhantes)',
      'Taxa extra cobrada para acompanhante.',
    ],
    capacidade: 'Até 4 pessoas (casal + 02 acompanhantes)',
    imagem: '/images/acomodacoes/chale-madeira.webp',
    imagemOriginal: 'https://www.pousadalusitania.com.br/images/001_44A0037_jpg_web.jpg',
    fonte: 'https://www.pousadalusitania.com.br/acomodacoes.php',
    reserva: 'https://sbreserva.silbeck.com.br/pousadalusitania/pt-br/',
  },
  {
    slug: 'chale-jasmin',
    nome: 'CHALÉ JASMIN',
    tipo: 'Chalé',
    descricaoCurta: 'Chalé exclusivo para casal, com lareira e deck para a mata.',
    comodidades: [
      'TV',
      'Frigobar',
      'Sala com lareira',
      'Ar condicionado',
      'Deck de madeira com vista para a mata',
      'Conforto',
      'Exclusivo para casal (02 pessoas)',
    ],
    capacidade: 'Exclusivo para casal (02 pessoas)',
    imagem: '/images/acomodacoes/chale-jasmin.webp',
    imagemOriginal: 'https://www.pousadalusitania.com.br/images/ap-jasmin-7.jpg',
    fonte: 'https://www.pousadalusitania.com.br/acomodacoes.php',
    reserva: 'https://sbreserva.silbeck.com.br/pousadalusitania/pt-br/',
  },
  {
    slug: 'chale-master',
    nome: 'CHALÉ MASTER',
    tipo: 'Chalé',
    descricaoCurta: 'Chalé espaçoso para casal com lareira e hidromassagem.',
    comodidades: [
      'Chalés espaçosos, bem decorados e arejados',
      'TV',
      'Frigobar',
      'Sala ampla com lareira',
      'Ar condicionado',
      'Banheira de hidromassagem (para casal)',
      'Varanda',
      'Acomodação exclusiva para casal.',
    ],
    capacidade: 'Exclusivo para casal',
    imagem: '/images/acomodacoes/chale-master.webp',
    imagemOriginal: 'https://www.pousadalusitania.com.br/images/_44A0111_jpg_web.jpg',
    fonte: 'https://www.pousadalusitania.com.br/acomodacoes.php',
    reserva: 'https://sbreserva.silbeck.com.br/pousadalusitania/pt-br/',
  },
]
