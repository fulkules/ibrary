module.exports = {
    addExcite: (req, res) => {
        const db = req.app.get('db');
        const { id } = req.session.user;
        // console.log(req.body)
        const { u_id, name } = req.body;

        db.excite.add_excite({ u_id, name }).then(resp => {
            // console.log(resp)
            res.status(200).send(resp)
        }).catch(err => {
            console.log(err)
            res.status(500).send(err)
        })
    },

    getExcites: (req, res) => {
        const db = req.app.get('db');

        db.excite.get_all_excites().then(resp => {
            res.status(200).send(resp)
        }).catch(err => {
            console.log(err)
            res.status(500).send(err)
        })
    },

    updateExcite: (req, res) => {
        const db = req.app.get('db');
        const { id } = req.params;
        const { name } = req.body;

        db.excite.update_excite({ id, name }).then(resp => {
            res.status(200).send(resp)
        }).catch(err => {
            console.log(err)
            res.status(500).send(err)
        })
    },

    deleteExcite: (req, res) => {
        const db = req.app.get('db');
        const { id } = req.params;

        db.excite.delete_excite({ id }).then(resp => {
            res.status(200).send(resp)
        }).catch(err => {
            console.log(err)
            res.status(500).send(err)
        })
    }
}