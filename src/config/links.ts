const env = import.meta.env

export const links = {
  site: env.VITE_URL_SITE || 'https://www.pousadalusitania.com.br/',
  tour: env.VITE_URL_TOUR_360 || 'https://pousadalusitania.com.br/tour/',
  acomodações: env.VITE_URL_ACOMODACOES || 'https://www.pousadalusitania.com.br/acomodacoes.php',
  galeria: env.VITE_URL_GALERIA || 'https://www.pousadalusitania.com.br/galeria.php#galeria',
  reservas: env.VITE_URL_RESERVAS || 'https://sbreserva.silbeck.com.br/pousadalusitania/pt-br/',
  maps: env.VITE_URL_MAPS || 'https://maps.app.goo.gl/CAsW67UawfFypt19A',
  whatsapp: env.VITE_URL_WHATSAPP || 'https://wa.me/5527998552997',
}
