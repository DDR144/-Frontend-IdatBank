import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Confirmacion() {
  const [datos, setDatos] = useState(null);
  const [mostrarAnimacion, setMostrarAnimacion] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("confirmacion"));
    if (!data) {
      navigate("/");
    } else {
      setDatos(data);
      // Activar animación después de un delay
      setTimeout(() => setMostrarAnimacion(true), 300);
    }
  }, [navigate]);

  if (!datos) return null;

  const fechaFormateada = new Date(datos.fecha).toLocaleString("es-PE", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-green-100 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        {/* Contenedor principal con animación */}
        <div
          className={`transform transition-all duration-700 ${
            mostrarAnimacion
              ? "translate-y-0 opacity-100 scale-100"
              : "translate-y-8 opacity-0 scale-95"
          }`}
        >
          {/* Header con ícono de éxito animado */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-emerald-400 to-green-500 rounded-full shadow-2xl mb-6 relative">
              {/* Círculos de fondo animados */}
              <div className="absolute inset-0 bg-emerald-200 rounded-full animate-ping opacity-20"></div>
              <div className="absolute inset-2 bg-emerald-300 rounded-full animate-pulse opacity-30"></div>

              {/* Checkmark */}
              <svg
                className="w-12 h-12 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M5 13l4 4L19 7"
                  className={`transform transition-all duration-1000 delay-500 ${
                    mostrarAnimacion
                      ? "scale-100 opacity-100"
                      : "scale-0 opacity-0"
                  }`}
                />
              </svg>
            </div>

            <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-green-700 bg-clip-text text-transparent mb-2">
              ¡Transferencia Exitosa!
            </h1>
            <p className="text-gray-600 text-lg">
              Tu dinero ha sido transferido de forma segura
            </p>
          </div>

          {/* Card principal */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/50 overflow-hidden mb-6">
            {/* Banda superior decorativa */}
            <div className="h-2 bg-gradient-to-r from-emerald-400 via-green-500 to-teal-500"></div>

            <div className="p-8">
              {/* Detalles de la transferencia */}
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                {/* Columna izquierda */}
                <div className="space-y-6">
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
                    <div className="flex items-center mb-3">
                      <div className="w-3 h-8 bg-gradient-to-b from-blue-400 to-blue-600 rounded-full mr-4"></div>
                      <h3 className="text-lg font-semibold text-gray-800">
                        Origen
                      </h3>
                    </div>
                    <div className="bg-white rounded-lg p-4 shadow-sm">
                      <p className="text-gray-600 text-sm mb-1">
                        Cuenta de origen
                      </p>
                      <p className="text-2xl font-bold text-gray-800">
                        #{datos.cuentaOrigenId}
                      </p>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-2xl p-6 border border-emerald-100">
                    <div className="flex items-center mb-3">
                      <div className="w-3 h-8 bg-gradient-to-b from-emerald-400 to-emerald-600 rounded-full mr-4"></div>
                      <h3 className="text-lg font-semibold text-gray-800">
                        Destino
                      </h3>
                    </div>
                    <div className="bg-white rounded-lg p-4 shadow-sm">
                      <p className="text-gray-600 text-sm mb-1">
                        Cuenta de destino
                      </p>
                      <p className="text-2xl font-bold text-gray-800">
                        #{datos.cuentaDestinoId}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Columna derecha */}
                <div className="space-y-6">
                  <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-2xl p-6 border border-purple-100">
                    <div className="flex items-center mb-3">
                      <div className="w-3 h-8 bg-gradient-to-b from-purple-400 to-purple-600 rounded-full mr-4"></div>
                      <h3 className="text-lg font-semibold text-gray-800">
                        Monto
                      </h3>
                    </div>
                    <div className="bg-white rounded-lg p-4 shadow-sm">
                      <p className="text-gray-600 text-sm mb-1">
                        Cantidad transferida
                      </p>
                      <p className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                        S/ {parseFloat(datos.monto).toFixed(2)}
                      </p>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-2xl p-6 border border-orange-100">
                    <div className="flex items-center mb-3">
                      <div className="w-3 h-8 bg-gradient-to-b from-orange-400 to-orange-600 rounded-full mr-4"></div>
                      <h3 className="text-lg font-semibold text-gray-800">
                        Fecha
                      </h3>
                    </div>
                    <div className="bg-white rounded-lg p-4 shadow-sm">
                      <p className="text-gray-600 text-sm mb-1">Procesado el</p>
                      <p className="text-lg font-bold text-gray-800">
                        {fechaFormateada}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* ID de transacción */}
              <div className="bg-gray-50 rounded-2xl p-6 mb-8 border border-gray-200">
                <div className="text-center">
                  <p className="text-gray-600 text-sm mb-2">
                    ID de Transacción
                  </p>
                  <p className="text-lg font-mono font-bold text-gray-800 bg-white px-4 py-2 rounded-lg inline-block shadow-sm">
                    TXN-{Date.now().toString().slice(-8)}-
                    {Math.random().toString(36).substring(2, 4).toUpperCase()}
                  </p>
                </div>
              </div>

              {/* Información adicional */}
              <div className="bg-gradient-to-r from-emerald-500/10 to-green-500/10 rounded-2xl p-6 mb-8 border border-emerald-200/50">
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center mr-4 mt-0.5 flex-shrink-0">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  </div>
                  <div>
                    <div className="flex items-center space-x-1 text-emerald-800">
                      <svg
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        class="w-4.5 h-4.5 mb-2"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                          clip-rule="evenodd"
                        />
                      </svg>

                      <h3 className="font-semibold mb-2">
                        Transferencia Completada
                      </h3>
                    </div>
                    <p className="text-emerald-700 text-sm leading-relaxed">
                      Tu transferencia ha sido procesada exitosamente. Los
                      fondos están disponibles inmediatamente en la cuenta
                      destino.
                    </p>
                  </div>
                </div>
              </div>

              {/* Botones de acción */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => navigate("/home")}
                  className="flex-1 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white py-4 px-8 rounded-xl text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center space-x-2"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    />
                  </svg>
                  <span>Volver al Inicio</span>
                </button>

                <button
                  onClick={() => navigate("/transferir")}
                  className="flex-1 bg-white text-emerald-600 border-2 border-emerald-500 hover:bg-emerald-50 py-4 px-8 rounded-xl text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center space-x-2"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                    />
                  </svg>
                  <span>Nueva Transferencia</span>
                </button>
              </div>
            </div>
          </div>

          {/* Footer con mensaje de confianza */}
          <div className="text-center">
            <div className="inline-flex items-center bg-white/60 backdrop-blur-sm rounded-full px-6 py-3 border border-white/50">
              <div className="w-2 h-2 bg-emerald-500 rounded-full mr-3 animate-pulse"></div>
              <p className="text-gray-700 text-sm font-medium">
                Transferencia procesada de forma segura y encriptada
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Confirmacion;
