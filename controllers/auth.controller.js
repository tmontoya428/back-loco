/*const getCode = async (req, res) => {
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
};*/