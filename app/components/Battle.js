
var React = require('react');
var PropTypes = require('prop-types');

function PlayerPreview(props) {

	return (

		<div className='column'>
			<img src={props.avatar} className='avatar'/>
			<h3> @{props.username}</h3>
			<h3>{props.player}</h3>
		</div>
	);
}

PlayerPreview.propTypes = {
	avatar: PropTypes.string.isRequired,
	username: PropTypes.string.isRequired,
	player: PropTypes.string.isRequired
}

class PlayerInput extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			username: ''
		}

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(event) {
		var value = event.target.value;
		this.setState(() => {
			return {
				username: value			
			}
		});
	}

	handleSubmit(event) {
		event.preventDefault();
		this.props.onSubmit.call(null, this.props.id, this.state.username)

	}
	render() {

		return (
			<form className='column' onSubmit={this.handleSubmit}>
				<label className='header' htmlFor='username'>
					{this.props.label}
				</label>
				<input id='username' type='text' value={this.state.username} onChange={this.handleChange}/>
				<button type='submit' disabled={!this.state.username}>Submit</button>
			</form>
		)
	}
}

PlayerInput.propTypes = {
	id: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	onSubmit: PropTypes.func.isRequired
}

class Battle extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			playerOneName:'',
			playerTwoName:'',
			playerOneImage:'',
			playerTwoImage:''
		};

		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(id, username) {
		this.setState(function() {
			var newState = {};
			newState[id + 'Name'] = username;
			newState[id + 'Image'] = 'https://github.com/'+username+'.png?size=200';
			return newState;
		});
	}
	render() {
		var playerOneName = this.state.playerOneName;
		var playerTwoName = this.state.playerTwoName;
		return (
			<div>
				<div className='row'>
					{!playerOneName && <PlayerInput id='playerOne' label='player One' onSubmit={this.handleSubmit}/>}
					{!playerTwoName && <PlayerInput id='playerTwo' label='player Two' onSubmit={this.handleSubmit}/>}
				</div>
				<div className='row'>
					{playerOneName && <PlayerPreview player='playerOne' avatar={this.state.playerOneImage} username={this.state.playerOneName}/>}
					{playerTwoName && <PlayerPreview player='playerTwo' avatar={this.state.playerTwoImage} username={this.state.playerTwoName}/>}
				</div>
			</div>
		)
	}
}





module.exports = Battle;