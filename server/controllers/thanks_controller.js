module.exports = {
    addThank: (req, res) => {
        const db = req.app.get('db');
        const { id } = req.session.user;
        // console.log(req.body)
        const { name } = req.body;

        db.thanks.add_thank({ id, name }).then(resp => {
            // console.log(resp)
            res.status(200).send(resp)
        }).catch(err => {
            console.log(err)
            res.status(500).send(err)
        })
    },

    getThanks: (req, res) => {
        const db = req.app.get('db');
        const { id } = req.session.user;

        db.thanks.get_all_thanks({ id }).then(resp => {
            res.status(200).send(resp)
        }).catch(err => {
            console.log(err)
            res.status(500).send(err)
        })
    },

    updateThank: (req, res) => {
        const db = req.app.get('db');
        const { id } = req.params;
        const { name } = req.body;

        db.thanks.update_thank({ id, name }).then(resp => {
            res.status(200).send(resp)
        }).catch(err => {
            console.log(err)
            res.status(500).send(err)
        })
    },

    deleteThank: (req, res) => {
        const db = req.app.get('db');
        const { id } = req.params;

        db.thanks.delete_thank({ id }).then(resp => {
            res.status(200).send(resp)
        }).catch(err => {
            console.log(err)
            res.status(500).send(err)
        })
    }
}