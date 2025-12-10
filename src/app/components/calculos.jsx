
"use client";
import { useState } from "react";
{/* Para renderizar en la UI*/}
export default function CalculadordePrestamos() {
  const [monto, setMonto] = useState("");
  const [interes, setInteres] = useState("");
  const [plazo, setPlazo] = useState("");

  const [cuota, setCuota] = useState(0);
  const [totalapagar, setTotalapagar] = useState(0);
  const [totalinteres, setTotalinteres] = useState(0);

{/*Constante para mostrar los resultados usando useState*/}
  const resultadosprestamo = () => {
    const resultados = calcularcuota(monto, interes, plazo);
    setCuota(resultados.cuota);
    setTotalapagar(resultados.totalapagar);
    setTotalinteres(resultados.totalinteres);
    setAmortizacion(resultados.Amortizacion);
  };

  return (
    <div className="container">
      <h1>Calculadora de Préstamos</h1>
      <div>
        <label>Monto: </label>
        <input type="number" value={monto} onChange={(e) => setMonto(e.target.value)} />
      </div>
      <div>
        <label>Interés anual (%): </label>
        <input type="number" value={interes} onChange={(e) => setInteres(e.target.value)} />
      </div>
      <div>
        <label>Plazo (meses): </label>
        <input type="number" value={plazo} onChange={(e) => setPlazo(e.target.value)} />
      </div>
      <button onClick={resultadosprestamo}>Calcular</button>
      <div className="resultados">
        <p>Cuota mensual: ${cuota}</p>
        <p>Total a pagar: ${totalapagar}</p>
        <p>Total interés: ${totalinteres}</p>
      </div>
      
    </div>
  );
}
{/* Estructura de control para mostrar 0  outputs en caso de que no haya nada en los inputs */}
export const calcularcuota = (monto, interes, plazo) => {
  if (!monto || !interes || !plazo)
    return { totalapagar: 0, totalinteres: 0, cuota: 0, Amortizacion: [] };
{/* Conversion para hacer uso de los numeros decimales*/}
  const montoNum = parseFloat(monto)
  const interesNum = parseFloat(interes) / 100 / 12;
  const plazoNum = parseInt(plazo);

{/* Constante para calcular la cuota mensual */}
  const cuota_mensual =
    (montoNum * (interesNum * Math.pow(1 + interesNum, plazoNum))) /
    (Math.pow(1 + interesNum, plazoNum) - 1);

{/* Constante para calcular el total a pagar */}
  const totalapagar = cuota_mensual * plazoNum;
{/* Constante para calcular el total de los intereses */}
  const totalinteres = totalapagar - montoNum;

{/* Constante para calcular la cuota mensual */}
  let saldo=montoNum;
  let Amortizacion=[];
  {/* Estructura de control para calcular las cantidades de filas que se van a generar dependiendo del plazo */}

  for (let i = 1; i <= plazoNum; i++) {
    const interes_mensual = saldo * interesNum;
    const capital_adeudado = cuota_mensual - interes_mensual;
    saldo -= capital_adeudado;

{/* Metodo para agregar las columnas y que los resultados se muestren en decimal */}
    Amortizacion.push({
      mes: i,
      cuota: cuota_mensual.toFixed(2), 
      interes: interes_mensual.toFixed(2),
      capital: capital_adeudado.toFixed(2),
      saldo: saldo.toFixed(2),
    });
  }

  return {
    cuota: cuota_mensual.toFixed(2),
    totalapagar: totalapagar.toFixed(2),
    totalinteres: totalinteres.toFixed(2),
    
  };
  };

