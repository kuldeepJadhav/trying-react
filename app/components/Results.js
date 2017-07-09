
var React = require('react');
var queryString = require('query-string');
var api = require('../utils/api');
var PlayerPreview = require('./PlayerPreview');
class Results extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			winner: null,
			loser: null
		}
	}

	componentDidMount() {
		var self = this;
		var players = queryString.parse(this.props.location.search);
		api.battle([players.playerOneName, players.playerTwoName]).then((results) => {
			self.setState(() => {
				return {
					'winner': results[0],
					'loser': results[1]
				};
			});
		});
	}
	render() {
		return (
			<div className='row'>
				{this.state.winner && <PlayerPreview player='winner' avatar={this.state.winner.profile.avatar_url} username={this.state.winner.profile.login}> Score: {this.state.winner.score}</PlayerPreview>}
				{this.state.loser && <PlayerPreview player='loser' avatar={this.state.loser.profile.avatar_url} username={this.state.loser.profile.login}> Score: {this.state.loser.score}</PlayerPreview>}
			</div>
		)
	}
}


module.exports = Results;