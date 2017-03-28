import React from 'react'
import ReactDOM from 'react-dom'
import Backbone from 'backbone'


var LoadingComponent = React.createClass({

	render: function(){
		return <div><img className = 'loading' src='/images/cube.gif' /></div>

	}

})

export default LoadingComponent