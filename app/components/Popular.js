var React = require('react');
var api = require('../utils/api');
var PropTypes = require('prop-types');


function RepoGrid(props) {
	return (
		<ul className='popular-list'>
			{ props.repos.map((repo, index) => {
				return <li key={repo.name} className='popular-item'>
					<div className='popular-rank'>#{index + 1}</div>
					<ul>
						<li>
							<img className='avatar' src= {repo.owner.avatar_url}/>
						</li>
						<li>
							<a href={repo.html_url}> {repo.name} </a>
						</li>
						<li>
							@{repo.owner.login}
						</li>
						<li>
							{repo.stargazers_count} stars
						</li>
					</ul>
				</li>

			})}
		</ul>
	)
}

RepoGrid.propTypes = {
	repos: PropTypes.array.isRequired
};


function SelectLanguage(props) {
	var languages = ['All', 'Javascript', 'Java', 'Ruby', 'Css', 'Python', 'Scala'];
	return (
			<ul className='languages'>
				{languages.map((lang) => {
					return <li 
						style={ lang === props.selectedLanguage ? {color: '#d0021b'} : null }
					 	onClick={props.updateLanguage.bind(null, lang)} key={lang}> 
					 	{lang} 
					 </li>;
				})}
			</ul>
		)
}



SelectLanguage.propTypes = {
	selectedLanguage: PropTypes.string.isRequired,
	updateLanguage: PropTypes.func.isRequired
};

class Popular extends React.Component {
	constructor(props) {
		super(props);
		this.state= {
			'selectedLanguage': 'All',
			'repos': null
		};
		this.updateLanguage = this.updateLanguage.bind(this);
	}
	componentDidMount() {
		this.updateLanguage(this.state.selectedLanguage);
	}
	updateLanguage(lang) {
		this.state.repos = null;
		this.setState(() => {
			return {'selectedLanguage': lang};
		});

		api.fetchPopularRepos(lang).then((data) => {
			this.setState(() => {
				return {
					'repos': data
				}
			});
		});
	}
	render() {
		return (
			<div>
				<SelectLanguage selectedLanguage={this.state.selectedLanguage} updateLanguage={this.updateLanguage}/>
				{!this.state.repos ? <p>Loading</p> : <RepoGrid repos={this.state.repos} />}

			</div>
		);
	}
}
module.exports = Popular;