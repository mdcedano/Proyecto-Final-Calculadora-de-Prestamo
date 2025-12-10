
'use client';
import { useState } from "react";
import { FaCalendar, FaDollarSign } from "react-icons/fa";
import { FaChartLine } from "react-icons/fa";


  {/* Constante para hacer la conversion a la moneda de pesos dominicanos */}
export const RD = (value) =>{
    return Number(value).toLocaleString('es-DO', { style: 'currency', currency: 'DOP' });
  }

{/* Funcion de calcular cuota con los parametros monto, interes y plazo */}
const calcularcuota = (monto, interes, plazo) => {
  const montoNum = parseFloat(monto);
  const interesNum = parseFloat(interes) / 100 / 12;
  const plazoNum = parseInt(plazo);

  if (!montoNum || !interesNum || !plazoNum) return { totalapagar: 0, totalinteres: 0, totalpagado: 0 };

  const cuota = (montoNum * (interesNum * Math.pow(1 + interesNum, plazoNum))) / (Math.pow(1 + interesNum, plazoNum) - 1);
  const totalapagar = cuota * plazoNum;
  const totalinteres = totalapagar - montoNum;

  return { totalapagar: totalapagar.toFixed(2), totalinteres: totalinteres.toFixed(2), totalpagado: cuota.toFixed(2) };
};

export default function Home() {
  const [monto, setMonto] = useState("");
  const [interes, setInteres] = useState("");
  const [plazo, setPlazo] = useState("");
  const [totalapagar, setTotalapagar] = useState("");
  const [totalinteres, setTotalinteres] = useState(null);
  const [totalpagado, setTotalpagado] = useState(null);
  const [amortizacion, setAmortizacion] = useState(null);
{/* Funcion para mostrar los resultados del calculo  */}
  const handlecalcularcuota = () => {
    const resultados = calcularcuota(monto, interes, plazo);
    setTotalapagar(resultados.totalapagar);

    setTotalinteres(resultados.totalinteres);
    setTotalpagado(resultados.totalpagado);
  };
{/* Funcion para mostrar los resultados en la tabla de amortizacion */}
  const handleTablaAmortizacion = () => {
    setAmortizacion(!amortizacion);
  };
{/* HTML Y Tailwind para diseño de interfaz, gestionada con STICH */}
  return (
    <div className="bg-slate-50 dark:bg-slate-900 font-sans flex items-center justify-center min-h-screen p-4 sm:p-6">
      <div className="w-full max-w-4xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-800 dark:text-slate-100">Calculadora de Préstamos</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-2">Calcula tu cuota mensual y tabla de amortización</p>
        </header>
        <main className="space-y-6">
          <div className="bg-white dark:bg-slate-800 shadow-lg rounded-xl p-6 sm:p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              <div>
                <label className="flex items-center text-sm font-medium text-slate-600 dark:text-slate-300 mb-2">
                  <FaDollarSign size={20} className="text-green-500 mr-2" />
                  Monto del Préstamo
                </label>
                <input className="w-full border bg-slate-50 dark:bg-slate-700 border-slate-200 dark:border-slate-600 rounded-lg px-3 py-2 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none [&::-webkit-inner-spin-button]:hidden [&::-webkit-outer-spin-button]:hidden" type="number"  value={monto} onChange={(e) => setMonto(Number(e.target.value))} />
                <p className="text-xs text-slate-400 dark:text-slate-500 mt-1.5 ml-1 ">RD$500,000.00</p>
              </div>
              <div>
                <label className="flex items-center text-sm font-medium text-slate-600 dark:text-slate-300 mb-2">
                  <FaChartLine size={20} className="text-blue-500 mr-2" />
                  Tasa Anual (%)
                </label>
                <input className="w-full border bg-slate-50 dark:bg-slate-700 border-slate-200 dark:border-slate-600 rounded-lg px-3 py-2 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none [&::-webkit-inner-spin-button]:hidden [&::-webkit-outer-spin-button]:hidden" type="number" value={interes} onChange={(e) => setInteres(Number(e.target.value))} />
                <p className="text-xs text-slate-400 dark:text-slate-500 mt-1.5 ml-1">12% mensual</p>
              </div>
              <div>
                <label className="flex items-center text-sm font-medium text-slate-600 dark:text-slate-300 mb-2">
                  <FaCalendar size={20} className="text-blue-500 mr-2" />
                  Plazo (meses)
                </label>
                <input className="w-full border bg-slate-50 dark:bg-slate-700 border-slate-200 dark:border-slate-600 rounded-lg px-3 py-2 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none [&::-webkit-inner-spin-button]:hidden [&::-webkit-outer-spin-button]:hidden" type="number" value={plazo} onChange={(e) => setPlazo(Number(e.target.value))} />
                <p className="text-xs text-slate-400 dark:text-slate-500 mt-1.5 ml-1"> 24 meses</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-green-500 text-white rounded-xl p-5 shadow-lg flex flex-col justify-between">
              <p className="text-sm font-medium opacity-90">Cuota Mensual</p>
              <p className="text-3xl font-bold mt-2">{totalpagado ? `${RD(totalpagado)}` : ""}</p>
            </div>
            <div className="bg-blue-600 text-white rounded-xl p-5 shadow-lg flex flex-col justify-between">
              <p className="text-sm font-medium opacity-90">Total a Pagar</p>
              <p className="text-3xl font-bold mt-2">{totalapagar ? `${RD(totalapagar)}` : ""}</p>
            </div>
            <div className="bg-purple-600 text-white rounded-xl p-5 shadow-lg flex flex-col justify-between">
              <p className="text-sm font-medium opacity-90">Total Intereses</p>
              <p className="text-3xl font-bold mt-2">{totalinteres ? `${RD(totalinteres)}` : ""}</p>
            </div>
          </div>

          <button onClick={handlecalcularcuota} className="w-auto mx-auto block bg-gray-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-lg shadow-md transition-colors duration-300">
            Calcular Cuota
          </button>

          <button onClick={handleTablaAmortizacion} className="w-auto mx-auto block bg-gray-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-lg shadow-md transition-colors duration-300">
            Tabla de Amortizacion
          </button>

          {amortizacion && totalapagar && (
            <div className="bg-white dark:bg-slate-800 shadow-lg rounded-xl p-6 sm:p-8 overflow-x-auto">
              <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-4 ml-70">Tabla de Amortización</h2>
              <table className="w-full text-sm text-slate-600 dark:text-slate-300">
                <thead className="bg-slate-200 dark:bg-slate-700">
                  <tr>
                    <th className="px-4 py-2 text-left">Mes</th>
                    <th className="px-4 py-2 text-right">Cuota</th>
                    <th className="px-4 py-2 text-right">Interés</th>
                    <th className="px-4 py-2 text-right">Capital</th>
                    <th className="px-4 py-2 text-right">Saldo</th>
                  </tr>
                </thead>
                <tbody>
                  {(() => {
                    const montoNum = parseFloat(monto);
                    const interesNum = parseFloat(interes) / 100 / 12;
                    const plazoNum = parseInt(plazo);
                    const cuota = (montoNum * (interesNum * Math.pow(1 + interesNum, plazoNum))) / (Math.pow(1 + interesNum, plazoNum) - 1);
                    let saldo = montoNum;
                    const filas = [];

                    for (let i = 1; i <= plazoNum; i++) {
                      const interesMes = saldo * interesNum;
                      const capitalMes = cuota - interesMes;
                      saldo -= capitalMes;
                      filas.push({
                        mes: i,
                        cuota,
                        interesMes,
                        capitalMes,
                        saldo: Math.max(0, saldo)
                      });
                    }
                    {/* renderizado con .map para recorrer el array anterior filas.push */}
                    return filas;
                  })().map((fila, index) => (
                    <tr key={fila.mes} className={`border-b dark:border-slate-600 ${index % 2 === 0 ? 'bg-slate-50 dark:bg-slate-700' : 'bg-white dark:bg-slate-800'}`}>
                      <td className="px-4 py-2">{fila.mes}</td>
                      <td className="px-4 py-2 text-right">{RD(fila.cuota.toFixed(2))}</td>
                      <td className="px-4 py-2 text-right text-red-400">{RD(fila.interesMes.toFixed(2))}</td>
                      <td className="px-4 py-2 text-right text-green-400">{RD(fila.capitalMes.toFixed(2))}</td>
                      <td className="px-4 py-2 text-right font-bold">{RD(fila.saldo.toFixed(2))}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <footer className="text-center pt-4">
            <p className="text-xs text-slate-500 dark:text-slate-400">Esta calculadora usa el sistema de cuotas fijas (Sistema Francés)</p>
          </footer>
        </main>
      </div>
    </div>
  );
}
