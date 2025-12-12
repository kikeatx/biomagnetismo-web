const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.post("/enviar-cita", async (req, res) => {
    try {
        const { nombre, correo, fecha, hora } = req.body;

        if (!nombre || !correo || !fecha || !hora) {
            return res.send("Faltan datos.");
        }

        let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
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
            from: "Agenda Biomagnetismo <biomagnetiterapia@gmail.com>",
            to: "biomagnetiterapia@gmail.com",
            subject: "Nueva cita agendada",
            text: mensaje
        });

        res.send("Cita enviada correctamente. Nos pondremos en contacto.");
    
    } catch (error) {
        console.error("ERROR EN EL ENVÍO:", error);
        res.send("Error al enviar el correo: " + error.message);
    }
});

app.listen(3000, () => {
    console.log("Servidor funcionando en http://localhost:3000");
});