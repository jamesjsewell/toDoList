import STORE from './store.js'
import {TaskModel} from './models/taskModel.js'

const ACTIONS = {

	addTask: function(taskData) {

		var newTask = new TaskModel(taskData) // creates a 
			// new instance of IssueModel, setting the issueData
			// from the form as its .attributes. this data (username, 
			// status, etc.) is what backbone will put into the body
			// of the post request when we use .save()

		newTask.save() // backbone will here submit a post request
			// on our behalf.
			.then(
				// .then can actually take two callbacks, one to 
					// handle a good response, and one to handle
					// an error.
				function(response) { // SUCCESS
				
					ACTIONS.fetchAllTasks()
				},
				function(err) { // FAILURE
					alert('problem saving your issue!')
					console.log(err)
				}
			)
	},

	updateTask: function(model, update) {

		model.set({
			status: update
		})

		model.save() // since the model is old, i.e. it already 
		// has an id, backbone will send a PUT request here instead 
		// of a POST request
		// AND, since the model has a urlRoot and an idAttribute,
		// backbone will anticipate our needs and stick the model's _id
		// onto the end of the url. 
			.done(function(resp) {
				console.log(resp)
				ACTIONS.fetchAllTasks()
			})
			.fail(function(err) {
				alert('couldn\'t register your task update')
				console.log(err)
			})
	},

	deleteTaskModel: function(model) {

		model.destroy()
			.done(ACTIONS.fetchAllTasks)
			.fail(
				function(err) {
					alert('problem deleting your model!')
					console.log(err)
				})
	},

	fetchAllTasks: function() {

		var taskColl = STORE.get('taskCollection')
		// backbone && jquery, on our behalf, will add a "GET" 
		// verb to the header of our request when we use 
		// .fetch()
		ACTIONS.loadingVis('visible')
		taskColl.fetch()
			.then(function() {
				STORE.set({
					taskCollection: taskColl
				})
				ACTIONS.loadingVis('hidden')
			})
	},

	loadingVis: function(visible){

		var loading = document.querySelector('.loading')
		loading.style.visibility = visible
	}
}

export default ACTIONS