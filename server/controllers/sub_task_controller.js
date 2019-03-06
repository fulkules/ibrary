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

        db.sub_task.get_sub_tasks().then(resp => {
            // console.log(resp)
            res.status(200).send(resp)
        }).catch(err => {
            console.log(err)
            res.status(500).send(err)
        })
    },

    updateSubTask: (req, res) => {
        const db = req.app.get('db');
        const { name, complete } = req.body;
        const { id } = req.params;

        db.sub_task.update_sub_task({ id, name, complete }).then(resp => {
            // console.log(resp)
            res.status(200).send(resp)
        }).catch(err => {
            console.log(err)
            res.status(500).send(err)
        })
    },

    deleteSubTask: (req, res) => {
        const db = req.app.get('db');
        const { id } = req.params;
        
        db.sub_task.delete_sub_task({ id }).then(resp => {
            res.status(200).send(resp)
        }).catch(err => {
            console.log(err)
            res.status(500).send(err)
        })
    }
}