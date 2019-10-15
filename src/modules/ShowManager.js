import apiKey from "./ApiKey";
const remoteURL = `http://localhost:5002`;
// console.log(remoteURL);

export default {
	getUserShowList(userId) {
		return fetch(`${remoteURL}/userShows?userId=${userId}&_expand=show`).then(res => res.json());
	},
	getNewMovies() {
		return fetch(
			`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}`
		).then(result => result.json());
	}
};
