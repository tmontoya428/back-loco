const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const InfoUser = require('../models/InfoUser');
const Code = require('../models/Code');
const Attempt = require('../models/Attempt');

const router = express.Router();

// Registro
router.post('/register', async (req, res) => {
    const { email, password, ...info } = req.body;

    try {
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ msg: 'Usuario ya registrado' });

        user = new User({ email, password: bcrypt.hashSync(password, 10) });
        await user.save();

        const userInfo = new InfoUser({ ...info, userId: user._id });
        await userInfo.save();

        res.status(200).json({ msg: 'Usuario registrado' });
    } catch (error) {
        res.status(500).json({ msg: 'Error en el servidor' });
    }
});

// Login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ msg: 'Credenciales incorrectas' });

        const isMatch = bcrypt.compareSync(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: 'Credenciales incorrectas' });

        const token = jwt.sign({ userId: user._id, role: user.role }, 'secretkey');
        
        // Aquí devuelves el token y el rol en la respuesta
        res.json({ token, role: user.role });
    } catch (error) {
        res.status(500).json({ msg: 'Error en el servidor' });
    }
});

/*
// Registro de Código
router.post('/register-code', async (req, res) => {
    const { qrCode } = req.body;
    const userId = req.userId;

    try {
        let code = await Code.findOne({ qrCode });
        if (!code) return res.status(400).json({ msg: 'Código inválido' });

        if (code.status !== 'free') return res.status(400).json({ msg: 'Código ya registrado' });

        code.status = 'claimed';
        code.claimedBy = userId;
        code.claimedAt = new Date();
        await code.save();

        const attempt = new Attempt({ userId, qrCode });
        await attempt.save();

        res.json({ msg: `¡Ganaste! Premio: ${code.prize}` });
    } catch (error) {
        res.status(500).json({ msg: 'Error en el servidor' });
    }
});*/
// Registro de Código
router.post('/register-code', async (req, res) => {
    const { qrCode } = req.body;
    const userId = req.userId;

    // Verificar si el código está en el rango válido de 000 a 999
    if (!/^\d{3}$/.test(qrCode)) {
        return res.status(400).json({ msg: 'Código inválido' });
    }

    try {

        // Registrar el intento en la colección Attempt
        const newAttempt = new Attempt({ userId, qrCode });
        await newAttempt.save();
        
        // Buscar el código en la base de datos
        let code = await Code.findOne({ codigo: qrCode });
        
        // Si el código no se encuentra, enviar el mensaje de "no ganaste"
        if (!code) return res.status(200).json({ msg: 'No ganaste, sigue intentando' });

        // Verificar si el código ya fue reclamado
        if (code.estado !== 'libre') return res.status(400).json({ msg: 'Código ya registrado' });

        // Actualizar el estado del código a 'reclamado', y registrar la fecha y hora actuales
        code.estado = 'reclamado';
        code.fecha = new Date().toLocaleDateString('es-ES');
        code.hora = new Date().toLocaleTimeString('es-ES');
        await code.save();

        // Enviar la respuesta con el premio del código
        res.json({ msg: `¡Ganaste! Premio: ${code.premio}` });
    } catch (error) {
        res.status(500).json({ msg: 'Error en el servidor' });
    }
});

module.exports = router;
