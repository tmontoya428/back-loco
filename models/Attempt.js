const mongoose = require('mongoose');

const AttemptSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    qrCode: String,
    attemptAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Attempt', AttemptSchema);
