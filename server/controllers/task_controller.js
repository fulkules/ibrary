module.exports = {
    addTask: (req, res) => {
        const db = req.app.get('db');
        const { id } = req.session.user;
        // console.log(req.body)
        const { u_id, name, time, date } = req.body;

        db.task.add_task({u_id, name, time, date}).then(resp => {
            // console.log(resp)
            res.status(200).send(resp)
        }).catch(err => {
            console.log(err)
            res.status(500).send(err)
        })
    },

    getTasks: (req, res) => {
        const db = req.app.get('db');

        db.task.get_all_tasks().then(resp => {
            res.status(200).send(resp)
        }).catch(err => {
            console.log(err)
            res.status(500).send(err)
        })
    }
}