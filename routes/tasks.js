const express = require('express');
const router = express.Router();
const Task = require('../models/tasks')
const User = require('../models/users')


//Add a new task
router.post('/add', (req, res) => {
    const taskName =req.body.name 
    const taskDescription = req.body.description
    const taskPriority = req.body.priority
    const authToken = req.body.token;

    User.findOne({ token: authToken })
    .then(user => {
      if(user){
        const newTask = new Task({
          title: taskName,
          description: taskDescription,
          priority: taskPriority,
          owner: user._id  // Initialisation du champ "owner"
          })
          newTask.save().then(task => {
              res.json({result: true, task: task})
          })
    }
    else{
      res.json({result: false})
    }
    })
})

router.get('/:token', (req, res) => {
    // Récupération du jeton d'authentification
    const authToken = req.params.token;

    User.findOne({ token: authToken })
        .then(user => {
            Task.find({ owner: user._id })
                .populate('owner')
                .then(tasks => {
                    res.json(tasks);
                })
                .catch(err => {
                    res.status(500).json({ error: err.message });
                });
        })
        .catch(err => {
            res.status(500).json({ error: err.message });
        });
});

router.post('/delete', (req, res) => {
    const taskId = req.body.id
    Task.findByIdAndRemove(taskId).
    then((task) => {
        res.json({result: true, task})
    })
})

router.put("/updatename/:id", (req, res) => {
    // Récupération de l'ID de la tâche à mettre à jour
    const taskId = req.params.id;
    // Récupération des nouvelles valeurs pour les champs à mettre à jour
    const name = req.body.name
    // Logique de mise à jour de la tâche dans la base de données
    // utilisez mongoose ou une autre librairie pour update la tâche avec l'id et le nouveau nom
    Task.findByIdAndUpdate(taskId, { $set: { title: name }}, {new: true})
    .then(data => {
      res.json({result: true})
    })
    .catch(error => {
      res.json({result: false})
    });
});


router.put("/updatedescription/:id", (req, res) => {
  // Récupération de l'ID de la tâche à mettre à jour
  const taskId = req.params.id;
  // Récupération des nouvelles valeurs pour les champs à mettre à jour
  const description = req.body.description;
  // Logique de mise à jour de la tâche dans la base de données
  // utilisez mongoose ou une autre librairie pour update la tâche avec l'id et le nouveau nom
  Task.findByIdAndUpdate(taskId, { $set: { description: description }}, {new: true})
  .then(data => {
    res.json({result: true})
  })
  .catch(error => {
    res.json({result: false})
  });
});    

router.put("/updatepriority/:id", (req, res) => {
      // Récupération de l'ID de la tâche à mettre à jour
      const taskId = req.params.id;
      // Récupération des nouvelles valeurs pour les champs à mettre à jour
      const priority = req.body.priority
      // Logique de mise à jour de la tâche dans la base de données
      // utilisez mongoose ou une autre librairie pour update la tâche avec l'id et le nouveau nom
      Task.findByIdAndUpdate(taskId, { $set: { priority: priority }}, {new: true})
      .then(data => {
        res.json({result: true})
      })
      .catch(error => {
        res.json({result: false})
      });
  });


module.exports = router;
