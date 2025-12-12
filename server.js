const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

app.post("/enviar-cita", async (req, res) => {
    const { nombre, correo, fecha, hora } = req.body;

    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "TU_CORREO@gmail.com",
            pass: "TU_CONTRASEÑA_DE_APP"
        }
    });

    let mensaje = `
    Nueva cita agendada:

    Nombre: ${nombre}
    Email: ${correo}
    Fecha: ${fecha}
    Hora: ${hora}
    `;

    await transporter.sendMail({
        from: "Agenda Biomagnetismo",
        to: "TU_CORREO@gmail.com",
        subject: "Nueva cita agendada",
        text: mensaje
    });

    res.send("Cita enviada correctamente. Nos pondremos en contacto.");
});

app.listen(3000, () => {
    console.log("Servidor funcionando en http://localhost:3000");
});
