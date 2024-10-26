/*const express = require('express');
const Code = require('../models/Code');
const InfoUser = require('../models/InfoUser');

const router = express.Router();

// Vista de ganadores
router.get('/winners', async (req, res) => {
    try {
        const codes = await Code.find({ status: 'claimed' }).populate('claimedBy');
        const winners = codes.map(code => ({
            date: code.claimedAt,
            user: code.claimedBy.name,
            city: code.claimedBy.city,
            phone: code.claimedBy.phone,
            qrCode: code.qrCode,
            prize: code.prize
        }));
        res.json(winners);
    } catch (error) {
        res.status(500).json({ msg: 'Error en el servidor' });
    }
});

module.exports = router;*/

const express = require('express'); 
const Code = require('../models/Code');
const InfoUser = require('../models/InfoUser');

const router = express.Router();

// Vista de ganadores
router.get('/winners', async (req, res) => {
    try {
        // Buscar los códigos donde el estado es un userId (usuario que reclamó)
        const codes = await Code.find({ estado: { $ne: 'libre' } });

        // Obtener la información de los usuarios ganadores
        const winners = await Promise.all(codes.map(async (code) => {
            const user = await InfoUser.findById(code.estado); // Buscar el usuario por su ID
            return {
                date: code.fecha,
                user: user ? user.nombre : 'Desconocido',
                city: user ? user.ciudad : 'Desconocido',
                phone: user ? user.telefono : 'Desconocido',
                qrCode: code.codigo,
                prize: code.premio
            };
        }));

        res.json(winners);
    } catch (error) {
        res.status(500).json({ msg: 'Error en el servidor' });
    }
});

module.exports = router;
