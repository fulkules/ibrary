module.exports = {
    addGoal: (req, res) => {
        const db = req.app.get('db');
        const { id } = req.session.user;
        // console.log(req.body)
        const { name, date } = req.body;

        db.goal.add_goal({ u_id: id, name, date }).then(resp => {
            // console.log(resp)
            res.status(200).send(resp)
        }).catch(err => {
            console.log(err)
            res.status(500).send(err)
        })
    },

    getGoals: (req, res) => {
        const db = req.app.get('db');
        const { id } = req.session.user;

        db.goal.get_all_goals({ id }).then(resp => {
            console.log(resp)
            res.status(200).send(resp)
        }).catch(err => {
            console.log(err)
            res.status(500).send(err)
        })
    },

    updateGoal: (req, res) => {
        const db = req.app.get('db');
        const { id } = req.params;
        const { name, date } = req.body;

        db.goal.update_goal({ id, name, date }).then(resp => {
            res.status(200).send(resp)
        }).catch(err => {
            console.log(err)
            res.status(500).send(err)
        })
    },

    deleteGoal: (req, res) => {
        const db = req.app.get('db');
        const { id } = req.params;

        db.goal.delete_goal({ id }).then(resp => {
            res.status(200).send(resp)
        }).catch(err => {
            console.log(err)
            res.status(500).send(err)
        })
    }
}