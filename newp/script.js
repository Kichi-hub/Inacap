// 1. Función para calcular el promedio
function calcularPromedioPonderado(notas, porcentajes) {
    let suma = 0;
    for (let i = 0; i < notas.length; i++) {
        suma += notas[i] * (porcentajes[i] / 100);
    }
    return suma; 
}

// 2. Capturamos el botón y el div de resultado (Esto responde a tu duda)
const btn = document.getElementById("btnCalcular");
const resultado = document.getElementById("resultado");

// 3. Evento de clic
btn.addEventListener("click", function() {
    
    //Creamos los arrays con los valores de los inputs
    const notas = [
        parseFloat(document.getElementById("nota1").value),
        parseFloat(document.getElementById("nota2").value),
        parseFloat(document.getElementById("nota3").value),
        parseFloat(document.getElementById("nota4").value)
    ];

    const porcentajes = [
        parseFloat(document.getElementById("porc1").value),
        parseFloat(document.getElementById("porc2").value),
        parseFloat(document.getElementById("porc3").value),
        parseFloat(document.getElementById("porc4").value)
    ];

    // --- VALIDACIONES ---

    // ¿Hay algún campo vacío o que no sea número?
    if (notas.some(isNaN) || porcentajes.some(isNaN)) {
        resultado.textContent = "Debes completar todos los campos con números.";
        return;
    }

    // ¿Las notas están en el rango correcto?
    if (notas.some(n => n < 1 || n > 7)) {
        resultado.textContent = "Las notas deben estar entre 1.0 y 7.0.";
        return;
    }

    // ¿Los porcentajes son válidos?
    if (porcentajes.some(p => p < 0 || p > 100)) {
        resultado.textContent = "Error: Los porcentajes deben estar entre 0 y 100.";
        return;
    }

    // ¿Suman 100%?
    const sumaTotalPrc = porcentajes.reduce((a, b) => a + b, 0);
    if (Math.abs(sumaTotalPrc - 100) > 0.01) {
        resultado.textContent = `Los porcentajes deben sumar 100% (actual: ${sumaTotalPrc}%).`;
        return;
    }

    // --- CÁLCULO Y RESULTADO ---

    const promedioFinal = calcularPromedioPonderado(notas, porcentajes);
    const estado = promedioFinal >= 4.0 ? "Aprobado" : "Reprobado";
    
    resultado.textContent = `Promedio: ${promedioFinal.toFixed(1)} — ${estado}`;
});