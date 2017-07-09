
var React = require('react');
var PropTypes = require('prop-types');
var Link = require('react-router-dom').Link;
var PlayerPreview = require('./PlayerPreview');


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
		this.onReset = this.onReset.bind(this);
	}

	handleSubmit(id, username) {
		this.setState(function() {
			var newState = {};
			newState[id + 'Name'] = username;
			newState[id + 'Image'] = 'https://github.com/'+username+'.png?size=200';
			return newState;
		});
	}

	onReset(id) {
		this.setState(function() {
			var newState = {};
			newState[id + 'Name'] = '';
			newState[id + 'Image'] = '';
			return newState;
		});
	}
	render() {
		var match = this.props.match;
		var playerOneName = this.state.playerOneName;
		var playerTwoName = this.state.playerTwoName;
		return (
			<div>
				<div className='row'>
					{!playerOneName && <PlayerInput id='playerOne' label='player One' onSubmit={this.handleSubmit}/>}
					{!playerTwoName && <PlayerInput id='playerTwo' label='player Two' onSubmit={this.handleSubmit}/>}
				</div>
				<div className='row'>
					{playerOneName && <PlayerPreview player='playerOne' onReset={this.onReset} avatar={this.state.playerOneImage} username={this.state.playerOneName}> <button onClick={this.onReset.bind(null, 'playerOne')}> Reset </button> </PlayerPreview>}
					{playerTwoName && <PlayerPreview player='playerTwo' onReset={this.onReset} avatar={this.state.playerTwoImage} username={this.state.playerTwoName}>  <button onClick={this.onReset.bind(null, 'playerTwo')}> Reset </button> </PlayerPreview>}
				</div>
				<div>
					{playerOneName && playerTwoName && <Link to ={
						{
							pathname:match.url + '/results',
							search: `?playerOneName=` + playerOneName + `&playerTwoName=` + playerTwoName
						}
					}className='button' >Battle</Link>}
				</div>
			</div>
		)
	}
}





module.exports = Battle;