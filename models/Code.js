/*const mongoose = require('mongoose');

const CodeSchema = new mongoose.Schema({
    qrCode: { type: String, unique: true },
    prize: Number, // 10000, 50000, 1000000
    status: { type: String, default: 'libre' }, // 'free' o 'claimed'
    claimedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    claimedAt: Date
});

module.exports = mongoose.model('Code', CodeSchema);*/

const mongoose = require('mongoose');

const CodeSchema = new mongoose.Schema({
  codigo: { type: String, required: true },  // Mantén el campo único si es necesario
  premio: { type: Number, required: true },
  estado: { type: String, default: 'libre' },// 'free' o 'claimed'
  fecha: { type: String, default: '' },
  hora: { type: String, default: '' }
});

module.exports = mongoose.model('Code', CodeSchema);

