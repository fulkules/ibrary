module.exports = {
    addSubTask: (req, res) => {
        const db = req.app.get('db');
        const { t_id, name, complete } = req.body;
        //console.log(req.body)

        db.sub_task.add_sub_task({t_id, name, complete}).then(resp => {
            // console.log(resp)
            res.status(200).send(resp)
        }).catch(err => {
            console.log(err)
            res.status(500).send(err)
        })
    },

    getSubTasks: (req, res) => {
        const db = req.app.get('db');
        const { name, complete } = req.body;

        db.sub_task.get_sub_tasks({ name, complete }).then(resp => {
            // console.log(resp)
            res.status(200).send(resp)
        }).catch(err => {
            console.log(err)
            res.status(500).send(err)
        })
    }
}