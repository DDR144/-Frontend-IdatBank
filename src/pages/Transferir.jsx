import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

function Transferir() {
  const navigate = useNavigate();
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const [cuentas, setCuentas] = useState([]);
  const [cuentaOrigenId, setCuentaOrigenId] = useState("");
  const [cuentaDestinoId, setCuentaDestinoId] = useState("");
  const [monto, setMonto] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCuentas = async () => {
      try {
        const response = await api.get(`/cuentas/${usuario.id}`);
        setCuentas(response.data);
      } catch (error) {
        console.error("Error al cargar cuentas:", error);
      }
    };
    fetchCuentas();
  }, [usuario.id]);

  const handleTransferencia = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await api.post("/transferencias", {
        cuentaOrigenId: parseInt(cuentaOrigenId),
        cuentaDestinoId: parseInt(cuentaDestinoId),
        monto: parseFloat(monto),
      });
      localStorage.setItem(
        "confirmacion",
        JSON.stringify({
          cuentaOrigenId,
          cuentaDestinoId,
          monto,
          fecha: response.data.fecha,
        })
      );
      navigate("/confirmar");
    } catch (err) {
      setError(err.response?.data || "Error en la transferencia.");
    }
  };

  const cuentaOrigen = cuentas.find((c) => c.id === parseInt(cuentaOrigenId));
  const montoNumerico = parseFloat(monto);
  const saldoInsuficiente = cuentaOrigen && montoNumerico > cuentaOrigen.saldo;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 p-4">
      <div className="max-w-4xl mx-auto pt-8">

        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate("/home")}
            className="inline-flex items-center text-blue-200 hover:text-white transition-colors mb-10 group"
          >
            <div className="w-5 h-5 mr-2 border-l-2 border-b-2 border-current transform rotate-45 group-hover:-translate-x-1 transition-transform"></div>
            Volver al inicio
          </button>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
            <h1 className="text-3xl font-bold text-white mb-2 flex items-center">
              <div className="w-8 h-8 bg-emerald-500 rounded-lg mr-4 flex items-center justify-center">
                <div className="w-4 h-4 border-2 border-white rounded transform rotate-45"></div>
              </div>
              Transferir Dinero
            </h1>
            <p className="text-blue-100">
              Transfiere dinero de forma segura entre cuentas
            </p>
          </div>
        </div>

        {/* Formulario principal */}
        <div className="grid lg:grid-cols-3 gap-6">

          {/* Formulario */}
          <div className="lg:col-span-2">
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-white/20">
              <form onSubmit={handleTransferencia} className="space-y-6">
                
                {/* Cuenta Origen */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    <div className="flex items-center">
                      <div className="w-2 h-6 bg-gradient-to-b from-blue-400 to-blue-600 rounded-full mr-3"></div>
                      Cuenta Origen
                    </div>
                  </label>
                  <div className="relative">
                    <select
                      value={cuentaOrigenId}
                      onChange={(e) => setCuentaOrigenId(e.target.value)}
                      required
                      className="w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white appearance-none text-gray-800"
                    >
                      <option value="">-- Selecciona tu cuenta --</option>
                      {cuentas.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.tipo} - S/ {c.saldo.toFixed(2)}
                        </option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <div className="w-5 h-5 text-gray-400 border-r-2 border-b-2 border-current transform rotate-45"></div>
                    </div>
                  </div>
                  {cuentaOrigen && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mt-2">
                      <p className="text-sm text-blue-700">
                        <span className="font-medium">Saldo disponible:</span>{" "}
                        S/ {cuentaOrigen.saldo.toFixed(2)}
                      </p>
                    </div>
                  )}
                </div>

                {/* Cuenta Destino */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    <div className="flex items-center">
                      <div className="w-2 h-6 bg-gradient-to-b from-emerald-400 to-emerald-600 rounded-full mr-3"></div>
                      Número de Cuenta Destino
                    </div>
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={cuentaDestinoId}
                      onChange={(e) => setCuentaDestinoId(e.target.value)}
                      required
                      placeholder="Ingresa el número de cuenta destino"
                      className="w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 bg-white text-gray-800"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-4">
                      <div className="w-5 h-5 bg-emerald-100 rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Monto */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    <div className="flex items-center">
                      <div className="w-2 h-6 bg-gradient-to-b from-purple-400 to-purple-600 rounded-full mr-3"></div>
                      Monto a Transferir
                    </div>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <span className="text-gray-500 font-medium">S/.</span>
                    </div>
                    <input
                      type="number"
                      step="0.01"
                      value={monto}
                      onChange={(e) => setMonto(e.target.value)}
                      required
                      placeholder="0.00"
                      className={`w-full p-4 pl-12 border-2 rounded-xl focus:outline-none focus:ring-2 transition-all duration-200 bg-white text-gray-800 ${
                        saldoInsuficiente
                          ? "border-red-300 focus:ring-red-500 focus:border-transparent"
                          : "border-gray-200 focus:ring-purple-500 focus:border-transparent"
                      }`}
                    />
                  </div>
                  {saldoInsuficiente && (
                    <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
                      <div className="flex">
                        <div className="w-5 h-5 text-red-500 mr-3 mt-0.5 flex items-center justify-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            class="size-6"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
                              clip-rule="evenodd"
                            />
                          </svg>
                        </div>
                        <p className="text-red-700 text-sm font-medium">
                          El monto excede el saldo disponible
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Error */}
                {error && (
                  <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
                    <div className="flex">
                      <div className="w-5 h-5 text-red-500 mr-3 mt-0.5 flex items-center justify-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          class="size-6"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
                            clip-rule="evenodd"
                          />
                        </svg>
                      </div>
                      <p className="text-red-700 text-sm font-medium">
                        {error}
                      </p>
                    </div>
                  </div>
                )}

                {/* Botón */}
                <button
                  type="submit"
                  disabled={saldoInsuficiente}
                  className={`w-full py-4 px-6 rounded-xl text-lg font-semibold shadow-lg transition-all duration-300 transform ${
                    saldoInsuficiente
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
                  }`}
                >
                  {saldoInsuficiente
                    ? "Saldo Insuficiente"
                    : "Realizar Transferencia"}
                </button>
              </form>
            </div>
          </div>

          {/* Panel lateral informativo */}
          <div className="lg:col-span-1 space-y-6">
            {/* Resumen de transferencia */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
              <h3 className="text-white font-semibold mb-4 flex items-center">
                <div className="w-2 h-6 bg-gradient-to-b from-yellow-400 to-yellow-600 rounded-full mr-3"></div>
                Resumen
              </h3>

              <div className="space-y-4">
                <div className="bg-white/5 rounded-lg p-3">
                  <p className="text-blue-100 text-sm mb-1">Cuenta origen</p>
                  <p className="text-white font-medium">
                    {cuentaOrigen ? `${cuentaOrigen.tipo}` : "No seleccionada"}
                  </p>
                </div>

                <div className="bg-white/5 rounded-lg p-3">
                  <p className="text-blue-100 text-sm mb-1">Cuenta destino</p>
                  <p className="text-white font-medium">
                    {cuentaDestinoId || "No ingresada"}
                  </p>
                </div>

                <div className="bg-white/5 rounded-lg p-3">
                  <p className="text-blue-100 text-sm mb-1">Monto</p>
                  <p className="text-white font-medium text-lg">
                    S/ {monto ? parseFloat(monto).toFixed(2) : "0.00"}
                  </p>
                </div>
              </div>
            </div>

            {/* Información de seguridad */}
            <div className="bg-gradient-to-r from-blue-500/20 to-indigo-500/20 backdrop-blur-md rounded-2xl p-6 border border-blue-400/30">
              <div className="flex items-center space-x-2 text-white">
                <svg
                  className="w-4 h-4 mb-2.5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <h3 className="font-semibold mb-3">
                  Transferencia Segura
                </h3>
              </div>
              <ul className="text-blue-100 text-sm space-y-2">
                <li className="flex items-start">
                  <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full mt-2 mr-2 flex-shrink-0"></div>
                  Todas las transferencias están encriptadas
                </li>
                <li className="flex items-start">
                  <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full mt-2 mr-2 flex-shrink-0"></div>
                  Verificación automática de saldo
                </li>
                <li className="flex items-start">
                  <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full mt-2 mr-2 flex-shrink-0"></div>
                  Confirmación antes de procesar
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Transferir;