module.exports = {
    addSubGoal: (req, res) => {
        const db = req.app.get('db');
        const { g_id, name, complete } = req.body;
        //console.log(req.body)

        db.sub_goal.add_sub_goal({g_id, name, complete}).then(resp => {
            // console.log(resp)
            res.status(200).send(resp)
        }).catch(err => {
            console.log(err)
            res.status(500).send(err)
        })
    },

    getSubGoals: (req, res) => {
        const db = req.app.get('db');

        db.sub_goal.get_sub_goals().then(resp => {
            // console.log(resp)
            res.status(200).send(resp)
        }).catch(err => {
            console.log(err)
            res.status(500).send(err)
        })
    },

    updateSubGoal: (req, res) => {
        const db = req.app.get('db');
        const { name, complete } = req.body;
        const { id } = req.params;

        db.sub_goal.update_sub_goal({ id, name, complete }).then(resp => {
            // console.log(resp)
            res.status(200).send(resp)
        }).catch(err => {
            console.log(err)
            res.status(500).send(err)
        })
    },

    deleteSubGoal: (req, res) => {
        const db = req.app.get('db');
        const { id } = req.params;
        
        db.sub_goal.delete_sub_goal({ id }).then(resp => {
            res.status(200).send(resp)
        }).catch(err => {
            console.log(err)
            res.status(500).send(err)
        })
    }
}