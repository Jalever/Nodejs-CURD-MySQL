'user strict';
//var sql = require('./db.js');
import sql from "./db.js";

//Task object constructor
var Task = function(task){
    this.task = task.task;
    this.status = task.status;
    this.created_at = new Date();
};


Task.createTask = (newTask, callbackFn) => {    
        sql.query("INSERT INTO Tasks set ?", newTask, function (err, res) {
                
                if(err) {
                    console.log("error: ", err);
                    callbackFn(err, null);
                }

                else{
                    console.log("New Task ID - Arrow Function:", res.insertId);
                    callbackFn(null, res.insertId);
                }
            });           
};

Task.getTaskById = function(taskId, callback) {
        sql.query("Select task from Tasks where id = ? ", taskId, function (err, result) {             
                if(err) {
                    console.log("error: ", err);
                    callback(err, null);
                }
                else{
                    callback(null, result);
              
                }
            });   
};

// callback( err, task )
Task.getAllTask = function(callback) {
    sql.query("Select * from Tasks", function(err, result) {

        if(err) {
            callback(err, null);
        } else {
            callback(null, result);
        }
    });   
};

Task.updateById = function(id, task, result){
  sql.query("UPDATE Tasks SET task = ? WHERE id = ?", [task.task, id], function (err, res) {
          if(err) {
              console.log("error: ", err);
                result(null, err);
          }  else {   
             result(null, res);
          }
 }); 
};

Task.remove = function(id, result){
     sql.query("DELETE FROM Tasks WHERE id = ?", [id], function (err, res) {

                if(err) {
                    console.log("error: ", err);
                    result(null, err);
                }
                else{
		console.log("Delete Successfully!!!");
                 result(null, res);
                }
            }); 
};

module.exports= Task;
