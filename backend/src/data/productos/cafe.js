module.exports = {
    //datos para el frontend (a futuro)
  slug: 'cafe',
  nombre: 'Pulpa de café',
  icono: '☕',
  descripcion: 'Residuo orgánico del despulpado del grano; fermenta pocas horas después de generarse.',

  vidaUtilHoras: 3, // horizonte critico en transito (antes: duracionMin / 180, en deteriorationRisk)
  densidadKgM3: 400, 
  toleranciaFisica: 0, // antes: carreteraNorm = factorRiesgoCarretera (sin tolerancia)

  sensibilidadTermica: { optimaMax: 15, criticaMax: 35 }, // antes: (T - 15) / 20, en deteriorationRisk
  sensibilidadHumedad: { optimaMax: 40, criticaMax: 100 }, // antes: (H - 40) / 60 en deterioration
  lluviaCriticaMmH: 15, // antes: lluviaMm / 15, de deteriorationRisk
  variacionAltitudCriticaM: 800, // antes: variacionAltitud / 800, de deteriorationRisk

    //pesos provenientes de deteriorationRisk, se usa para saber que tan mal llegaria el producto en x ruta
  pesosDeterioro: {
    tiempo: 0.3,
    temperatura: 0.2,
    humedad: 0.15,
    lluvia: 0.15,
    carretera: 0.1,
    altitud: 0.1,
  },
  // pesosOptimizacion: usaria los pesos globales de optimizacionService.js

  requiereRefrigeracion: false,

};