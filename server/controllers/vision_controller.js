module.exports = {
    addVision: (req, res) => {
        const db = req.app.get('db');
        const { id } = req.session.user;

    },
    
    getVisions: (req, res) => {
        const db = req.app.get('db');
        const { id } = req.session.user;
    },
    
    deleteVision: (req, res) => {
        const db = req.app.get('db');
        const { id } = req.params;
    }
}