'use strict';

var Task = require('../model/appModel.js');

exports.list_all_tasks = function(req, res) {
  Task.getAllTask(function(err, task) {

    if (err){
        res.send({
            status: "Error",
            payload: err
        });
        res.end();
    }

    res.send({
        status: "Success",
        payload: task
    });
    res.end();

  });
};



exports.create_a_task = function(req, res) {
    var new_task = new Task(req.body);

    //handles null error 
    if(!new_task.task || !new_task.status) {
            res.status(400).send({ error:true, message: 'Please provide task/status' });
    } else {
            Task.createTask(new_task, function(err, task) {
                if (err){
                     res.send(err);
                }
                
                //如果没有错误，则返回taskID和newTasks数据格式
                res.status(200)
                    .json({
                        "taskId": task,
                        "task": new_task
                    });
            });
    }
};


exports.read_a_task = function(req, res) {
  Task.getTaskById(req.params.taskId, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};


exports.update_a_task = function(req, res) {
  Task.updateById(req.params.taskId, new Task(req.body), function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};


exports.delete_a_task = function(req, res) {


  Task.remove( req.params.taskId, function(err, task) {
    if (err)
      res.send(err);
    res.json({ message: 'Task successfully deleted' });
  });
};
