
var React = require('react');
var PropTypes = require('prop-types');
function PlayerPreview(props) {
	return (
		<div className='column'>
			<img src={props.avatar} className='avatar'/>
			<h3> @{props.username}</h3>
			<h3>{props.player}</h3>
			{props.children}
		</div>
	);
}

PlayerPreview.propTypes = {
	avatar: PropTypes.string.isRequired,
	username: PropTypes.string.isRequired,
	player: PropTypes.string.isRequired,
	onReset: PropTypes.func.isRequired
}


module.exports = PlayerPreview;