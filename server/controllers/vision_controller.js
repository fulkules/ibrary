module.exports = {
    addVision: (req, res) => {
        const db = req.app.get('db');
        const { id } = req.session.user;
        const { type, text, img } = req.body;

        db.vision.add_vision({ u_id: id, type, text, img }).then(resp => {
            res.status(200).send(resp)
        }).catch(err => {
            console.log(err)
            res.status(500).send(err)
        })
    },
    
    getVisions: (req, res) => {
        const db = req.app.get('db');
        const { id } = req.session.user;
        
        db.vision.get_visions({ id }).then(resp => {
            console.log(resp)
            res.status(200).send(resp)
        }).catch(err => {
            console.log(err)
            res.status(500).send(err)
        })
    },
    
    deleteVision: (req, res) => {
        const db = req.app.get('db');
        const { id } = req.params;

        db.vision.delete_vision({ id }).then(resp => {
            res.status(200).send(resp)
        }).catch(err => {
            console.log(err)
            res.status(500).send(err)
        })
    }
}