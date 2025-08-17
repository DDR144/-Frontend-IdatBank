import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

function Home() {
  const [cuentas, setCuentas] = useState([]);
  const navigate = useNavigate();
  const usuario = JSON.parse(localStorage.getItem("usuario"));

  useEffect(() => {
    if (!usuario) return;
    const fetchCuentas = async () => {
      try {
        const response = await api.get(`/cuentas/${usuario.id}`);
        setCuentas(response.data);
      } catch (error) {
        console.error("Error al obtener las cuentas:", error);
      }
    };
    fetchCuentas();
  }, [usuario]);

  const handleTransferir = () => {
    navigate("/transferir");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 p-4">
      <div className="max-w-6xl mx-auto pt-8">
        {/* Header con saludo */}
        <div className="mb-8">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
            <h1 className="text-3xl font-bold text-white mb-2">
              Hola, {usuario?.nombre || "Usuario"}
            </h1>
            <p className="text-blue-100 text-lg">
              Gestiona tus finanzas de manera inteligente
            </p>
          </div>
        </div>

        {/* Grid principal */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {/* Sección de cuentas */}
          <div className="lg:col-span-2">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
              <div className="w-2 h-6 bg-gradient-to-b from-blue-400 to-blue-600 rounded-full mr-3"></div>
              Mis Cuentas
            </h2>

            <div className="grid gap-4">
              {cuentas.map((cuenta, index) => (
                <div
                  key={cuenta.id}
                  className="group bg-white/95 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] border border-white/20"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <div
                          className={`w-3 h-3 rounded-full mr-3 ${
                            index === 0
                              ? "bg-emerald-500"
                              : index === 1
                              ? "bg-blue-500"
                              : "bg-purple-500"
                          }`}
                        ></div>
                        <h3 className="text-lg font-semibold text-gray-800">
                          Cuenta {cuenta.tipo}
                        </h3>
                      </div>
                      <p className="text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                        S/ {cuenta.saldo.toFixed(2)}
                      </p>
                    </div>
                    <div
                      className={`w-12 h-12 rounded-lg ${
                        index === 0
                          ? "bg-emerald-100"
                          : index === 1
                          ? "bg-blue-100"
                          : "bg-purple-100"
                      } flex items-center justify-center group-hover:scale-110 transition-transform`}
                    >
                      <div
                        className={`w-6 h-6 rounded ${
                          index === 0
                            ? "bg-emerald-500"
                            : index === 1
                            ? "bg-blue-500"
                            : "bg-purple-500"
                        }`}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Panel lateral de acciones */}
          <div className="lg:col-span-1">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
              <div className="w-2 h-6 bg-gradient-to-b from-emerald-400 to-emerald-600 rounded-full mr-3"></div>
              Acciones Rápidas
            </h2>

            <div className="space-y-4">
              {/* Botón principal de transferir */}
              <button
                onClick={handleTransferir}
                className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white py-4 px-6 rounded-xl text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center space-x-2"
              >
                <span>Transferir Dinero</span>
              </button>

              {/* Tarjetas de información adicional */}
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
                <h3 className="text-white font-semibold mb-2">Resumen</h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-blue-100">Total de cuentas:</span>
                    <span className="text-white font-medium">
                      {cuentas.length}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-blue-100">Saldo total:</span>
                    <span className="text-white font-medium">
                      S/.{" "}
                      {cuentas
                        .reduce((total, cuenta) => total + cuenta.saldo, 0)
                        .toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Estado de la cuenta */}
              <div className="bg-gradient-to-r from-blue-500/20 to-indigo-500/20 backdrop-blur-md rounded-xl p-4 border border-blue-400/30">
                <div className="flex items-center space-x-2 mb-2">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                  <span className="text-white text-sm font-medium">
                    Estado de la cuenta
                  </span>
                </div>
                <p className="text-emerald-200 text-sm">
                  Todas las cuentas activas
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer informativo */}
        <div className="bg-white/5 backdrop-blur-md rounded-xl p-4 border border-white/10">
          <div className="flex items-center justify-center space-x-2 text-blue-100">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
              <path d="M12 .75a8.25 8.25 0 0 0-4.135 15.39c.686.398 1.115 1.008 1.134 1.623a.75.75 0 0 0 .577.706c.352.083.71.148 1.074.195.323.041.6-.218.6-.544v-4.661a6.714 6.714 0 0 1-.937-.171.75.75 0 1 1 .374-1.453 5.261 5.261 0 0 0 2.626 0 .75.75 0 1 1 .374 1.452 6.712 6.712 0 0 1-.937.172v4.66c0 .327.277.586.6.545.364-.047.722-.112 1.074-.195a.75.75 0 0 0 .577-.706c.02-.615.448-1.225 1.134-1.623A8.25 8.25 0 0 0 12 .75Z" />
              <path
                fillRule="evenodd"
                d="M9.013 19.9a.75.75 0 0 1 .877-.597 11.319 11.319 0 0 0 4.22 0 .75.75 0 1 1 .28 1.473 12.819 12.819 0 0 1-4.78 0 .75.75 0 0 1-.597-.876ZM9.754 22.344a.75.75 0 0 1 .824-.668 13.682 13.682 0 0 0 2.844 0 .75.75 0 1 1 .156 1.492 15.156 15.156 0 0 1-3.156 0 .75.75 0 0 1-.668-.824Z"
                clipRule="evenodd"
              />
            </svg>
            <p className="text-center text-blue-100 text-sm">
              Tip: Mantén tus finanzas organizadas revisando tus movimientos
              regularmente
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
