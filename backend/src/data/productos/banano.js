module.exports = {
  slug: 'banano',
  nombre: 'Banano',
  icono: '🍌',
  descripcion: 'Fruto tropical climatérico; madura rápido y es sensible al frío.',
  version: 1,

  vidaUtilHoras: 4,
  densidadKgM3: 300,
  toleranciaFisica: 0.3,

  sensibilidadTermica: { optimaMin: 13, optimaMax: 14.5, criticaMin: 10, criticaMax: 30 },
  sensibilidadHumedad: { optimaMax: 92, criticaMax: 100 },
  lluviaCriticaMmH: 15,
  variacionAltitudCriticaM: 800,

  pesosDeterioro: {
    tiempo: 0.35,
    temperatura: 0.35,
    humedad: 0.20,
    lluvia: 0,
    carretera: 0.10,
    altitud: 0,
  },

  requiereRefrigeracion: true,

  fuentes: ['Migrado de bananaDeteriorationRisk.js (U2, pre-refactor)'],
  notas: 'Perfil de ejemplo del sistema multiproducto.',
};