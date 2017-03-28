import React from 'react'
//import IssueForm from './issueForm.js'
import STORE from '../store.js'
import ACTIONS from '../actions.js'
import moment from 'moment'
import LoadingComponent from './loadingAnim.js'


console.log(STORE.data.someData)
var TasksPage = React.createClass({

	componentWillMount: function() {

		ACTIONS.fetchAllTasks()

		STORE.on('dataUpdated', () => {

			this.setState(STORE.data)

		})
	},

	getInitialState: function() {

		return STORE.data

	},

	_handleSubmit: function(eventObj) {

		
		eventObj.preventDefault()
		// prevent the submit event from making its own request
		var formEl = eventObj.target
		var taskData = {
			name: formEl.taskName.value,
			description: formEl.taskDescription.value,
			status: "do"
		}
		if (this._validate(taskData)) {
			// do something
		}
		formEl.reset()

		ACTIONS.addTask(taskData)

	},

	_validate: function(data) {
		// give specific alerts if anything is missing or bad.

		// return true or false back into _handleSubmit()
	},

	render: function(){

		return(

			<div className = "tasksPage">
			
				<form onSubmit={this._handleSubmit} className='taskForm' >
		 			<input name="taskName" type="text" placeholder="name of task" />
		 			<textarea rows="5" cols="20" name="taskDescription" placeholder="enter a description for your task"></textarea>
		 			<button className = "submitBttn" type="submit">submit task</button>
	 			</form>

				<div className = "tasksContainer">

					<ToDoTasks 

					tasks = {this.state.taskCollection.models}

					/>

					<DoneTasks 

					tasks = {this.state.taskCollection.models}

					/>

				</div>

			</div>)

	}

})


var DoneTasks = React.createClass({

	makeTasks: function(tasks){

		var tasksArray = []

		for(var i = 0; i < tasks.length; i++){

			var taskAttributes = tasks[i].attributes

			if(taskAttributes.status === "done"){


				tasksArray.push(<SingleDoneTask task = {tasks[i]}/>)

			}	

		}
		
		return tasksArray

	},

	render: function(){

		console.log(this.props.tasks)
		
		return(<div className = "doneTasksContainer">
			<h3>completed tasks</h3>
			{this.makeTasks(this.props.tasks)}

		</div>)

	}

})

var ToDoTasks = React.createClass({

	makeTasks: function(tasks){

		var tasksArray = []

		for(var i = 0; i < tasks.length; i++){

			var taskAttributes = tasks[i].attributes

			if(taskAttributes.status === "do"){

				tasksArray.push(<SingleDoTask task = {tasks[i]}/>)

			}	

		}
		
		return tasksArray

	},

	render: function(){

		console.log(this.props.tasks)

		
		return(<div className = "toDoTasksContainer">
			<h3>incomplete</h3>
			{this.makeTasks(this.props.tasks)}

		</div>)

	}

})

var SingleDoTask = React.createClass({
	
	_addToDone: function(evt){
		evt.preventDefault()
		ACTIONS.updateTask(this.props.task, 'done')

	},

	render: function(){

		var taskAttributes = this.props.task.attributes

		var checkedStatus = ""
	
		return(

			<div className = "singleDoTask">

				<h3 className = "taskTitle">{taskAttributes.name}</h3>

				<h4 className = "taskDescription">{taskAttributes.description}</h4>

				<p className = "taskDate">{String(moment(taskAttributes.createdAt, ["MM-DD-YYYY", moment.ISO_8601, 'hh']))}</p>

				<button onClick = {this._addToDone} type="checkbox" id="cbox1" value="checkbox" checked={checkedStatus}> complete task </button>

			</div>

		)
	}
})

var SingleDoneTask = React.createClass({

	_addToDo: function(evt){
		evt.preventDefault()
		ACTIONS.updateTask(this.props.task, 'do')

	},

	_deleteTask: function(){

		ACTIONS.deleteTaskModel(this.props.task)

	},

	render: function(){

		var taskAttributes = this.props.task.attributes

		var checkedStatus = ""

		if(taskAttributes.status === "done"){

			checkedStatus = "checked"

		}

		else{

			checkedStatus = false

		}
	
		return(

			<div className = "singleDoneTask">

				<h3 className = "taskTitle">{taskAttributes.name}</h3>

				<h4 className = "taskDescription">{taskAttributes.description}</h4>

				<p className = "taskDate">{String(moment(taskAttributes.createdAt, ["MM-DD-YYYY", moment.ISO_8601, 'hh']))}</p>

				<button onClick={this._addToDo}type="button" id="renew">renew</button>
				<button onClick={this._deleteTask} type="button" id="remove">remove</button>

			</div>
		)
	}
})

export default TasksPage