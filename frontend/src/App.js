import React, { useEffect, useMemo, useState } from 'react';
import Header from './components/Header';
import MapSelector from './components/MapSelector';
import RouteResults from './components/RouteResults';
import FincaForm from './components/FincaForm';
import PlantaForm from './components/PlantaForm';
import { listarFincas, listarPlantas, evaluarRutas, evaluarRutasPorIds } from './api/api';
import { indexarRutasPorCriterio } from './utils/criterios';

const TABS = {
  EVALUAR: 'evaluar',
  FINCAS: 'fincas',
  PLANTAS: 'plantas',
};

export default function App() {
  const [tabActiva, setTabActiva] = useState(TABS.EVALUAR);

  const [origen, setOrigen] = useState(null);
  const [destino, setDestino] = useState(null);

  const [fincas, setFincas] = useState([]);
  const [plantas, setPlantas] = useState([]);
  const [fincaSeleccionada, setFincaSeleccionada] = useState('');
  const [plantaSeleccionada, setPlantaSeleccionada] = useState('');

  const [resultado, setResultado] = useState(null);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);
  const [rutaSeleccionadaId, setRutaSeleccionadaId] = useState(null);
  const [criterioActivo, setCriterioActivo] = useState('ecologico');

  const rutasPorCriterio = useMemo(() => indexarRutasPorCriterio(resultado), [resultado]);

  useEffect(() => {
    cargarListas();
  }, []);

  const cargarListas = async () => {
    try {
      const [f, p] = await Promise.all([listarFincas(), listarPlantas()]);
      setFincas(f);
      setPlantas(p);
    } catch (e) {
      console.warn('No se pudieron cargar fincas/plantas (¿backend/BD activo?):', e.message);
    }
  };

  const handleSeleccionMapa = ({ origen: o, destino: d }) => {
    setOrigen(o);
    setDestino(d);
    setResultado(null);
    setRutaSeleccionadaId(null);
    setCriterioActivo('ecologico');
  };

  const handleSeleccionarRuta = (rutaId) => {
    setRutaSeleccionadaId(rutaId);
    setCriterioActivo(null); // selección manual (clic en mapa o tabla): ningún criterio predefinido activo
  };

  const handleSeleccionarCriterio = (criterioKey) => {
    const ganadora = rutasPorCriterio.get(criterioKey);
    if (!ganadora) return;

    setRutaSeleccionadaId(ganadora.id);
    setCriterioActivo(criterioKey);
  };

  const handleEvaluarPorMapa = async () => {
    if (!origen || !destino) {
      setError('Selecciona un origen y un destino en el mapa (o ingresa coordenadas manualmente).');
      return;
    }
    setError(null);
    setCargando(true);
    setResultado(null);
    try {
      const data = await evaluarRutas(origen, destino);
      setResultado(data);
      setRutaSeleccionadaId(data?.rutaRecomendada?.id ?? null);
      setCriterioActivo('ecologico');
    } catch (e) {
      setError('Error evaluando rutas: ' + (e.response?.data?.mensaje || e.message));
    } finally {
      setCargando(false);
    }
  };

  const handleEvaluarPorFincaPlanta = async () => {
    if (!fincaSeleccionada || !plantaSeleccionada) {
      setError('Selecciona una finca y una planta registradas.');
      return;
    }
    setError(null);
    setCargando(true);
    setResultado(null);
    try {
      const data = await evaluarRutasPorIds(fincaSeleccionada, plantaSeleccionada);
      setResultado(data);
      setRutaSeleccionadaId(data?.rutaRecomendada?.id ?? null);
      setCriterioActivo('ecologico');
    } catch (e) {
      setError('Error evaluando rutas: ' + (e.response?.data?.mensaje || e.message));
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="app-container">
      <Header />

      <div className="tabs">
        <div
          className={`tab ${tabActiva === TABS.EVALUAR ? 'active' : ''}`}
          onClick={() => setTabActiva(TABS.EVALUAR)}
        >
          🗺️ Evaluar ruta
        </div>
        <div
          className={`tab ${tabActiva === TABS.FINCAS ? 'active' : ''}`}
          onClick={() => setTabActiva(TABS.FINCAS)}
        >
          🏡 Fincas
        </div>
        <div
          className={`tab ${tabActiva === TABS.PLANTAS ? 'active' : ''}`}
          onClick={() => setTabActiva(TABS.PLANTAS)}
        >
          🏭 Plantas
        </div>
      </div>

      {tabActiva === TABS.EVALUAR && (
        <>
          <div className="card">
            <h2>Opción 1: Seleccionar en el mapa</h2>
            <MapSelector
              origen={origen}
              destino={destino}
              onSeleccionar={handleSeleccionMapa}
              rutas={resultado?.rutasEvaluadas || []}
              rutaRecomendadaId={resultado?.rutaRecomendada?.id ?? null}
              rutaSeleccionadaId={rutaSeleccionadaId}
              onSeleccionarRuta={handleSeleccionarRuta}
            />
            <div style={{ marginTop: 12 }}>
              <p>
                Origen: {origen ? `${origen.lat.toFixed(5)}, ${origen.lng.toFixed(5)}` : 'no seleccionado'}
                {'  |  '}
                Destino: {destino ? `${destino.lat.toFixed(5)}, ${destino.lng.toFixed(5)}` : 'no seleccionado'}
              </p>
              <button onClick={handleEvaluarPorMapa} disabled={cargando}>
                {cargando ? 'Calculando ruta ecológica...' : 'Calcular ruta más ecológica'}
              </button>
            </div>
          </div>

          <div className="card">
            <h2>Opción 2: Usar finca y planta registradas</h2>
            <div className="grid-2">
              <div>
                <label>Finca de origen</label>
                <select value={fincaSeleccionada} onChange={(e) => setFincaSeleccionada(e.target.value)}>
                  <option value="">-- Selecciona una finca --</option>
                  {fincas.map((f) => (
                    <option key={f._id} value={f._id}>
                      {f.nombre}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label>Planta de destino</label>
                <select value={plantaSeleccionada} onChange={(e) => setPlantaSeleccionada(e.target.value)}>
                  <option value="">-- Selecciona una planta --</option>
                  {plantas.map((p) => (
                    <option key={p._id} value={p._id}>
                      {p.nombre}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <button onClick={handleEvaluarPorFincaPlanta} disabled={cargando}>
              {cargando ? 'Calculando ruta ecológica...' : 'Calcular ruta más ecológica'}
            </button>
          </div>

          {error && (
            <div className="card" style={{ background: '#fdecea', color: '#b03a2e' }}>
              {error}
            </div>
          )}

          <RouteResults
            resultado={resultado}
            rutaSeleccionadaId={rutaSeleccionadaId}
            onSeleccionarRuta={handleSeleccionarRuta}
            criterioActivo={criterioActivo}
            onSeleccionarCriterio={handleSeleccionarCriterio}
          />
        </>
      )}

      {tabActiva === TABS.FINCAS && (
        <FincaForm
          puntoSeleccionado={origen}
          onCreada={(nueva) => setFincas((prev) => [nueva, ...prev])}
        />
      )}

      {tabActiva === TABS.PLANTAS && (
        <PlantaForm
          puntoSeleccionado={destino}
          onCreada={(nueva) => setPlantas((prev) => [nueva, ...prev])}
        />
      )}
    </div>
  );
}
