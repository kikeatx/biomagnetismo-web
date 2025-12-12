document.getElementById("formCita").addEventListener("submit", async function (e) {
    e.preventDefault();

    const datos = {
        nombre: document.getElementById("nombre").value,
        correo: document.getElementById("correo").value,
        fecha: document.getElementById("fecha").value,
        hora: document.getElementById("hora").value,
    };

    const respuesta = await fetch("http://localhost:3000/enviar-cita", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datos),
    });

    const texto = await respuesta.text();
    document.getElementById("respuesta").innerText = texto;
});
