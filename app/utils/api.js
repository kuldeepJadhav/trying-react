var axios = require('axios');


var getProfile = (username) => {
	return axios.get('https://api.github.com/users/'+username).then((user) => {
		return user.data;
	});
};

var getRepos = (username) => {
	return axios.get('https://api.github.com/users/'+username+'/repos?perPage=50').then((user) => {
		return user.data;
	});
};

var getStarCount = (repos) => {
	return repos.reduce((count, repo) => {
		return count + repo.stargazers_count;
	}, 0);
};

var getUserData = (player) => {
	return axios.all([getProfile(player), getRepos(player)]).then((data) => {
		var profile = data[0];
		var repos = data[1];
		return {
			'profile': profile,
			'score': getStarCount(repos)
		}
	});
};

var sortPlayers = (players) => {
	return players.sort((a, b) => {
		return b.score - a.score;
	});
};
module.exports = {
	battle: (players) => {
		return axios.all(players.map(getUserData)).then(sortPlayers);
	},

	fetchPopularRepos: (language) => {
		var encodedUri = window.encodeURI('https://api.github.com/search/repositories?q=stars:>1+language:'+language+'&sort=stars&order=desc&type=Repositories');
		return axios.get(encodedUri).then(response => {
			return response.data.items;
		});
	}
}