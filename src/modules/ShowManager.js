import apiKey from "./ApiKey";
import axios from "axios";
const remoteURL = `http://localhost:5002`;

export default {
	getUserShowList(userId) {
		return fetch(`${remoteURL}/userShows?userId=${userId}&_expand=show`).then(
			res => res.json()
		);
	},
	getNewShows() {
		return fetch(
			`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}`
		).then(result => result.json());
	},
	searchShows(searchQuery) {
		return axios.get(
			`https://api.themoviedb.org/3/search/tv?api_key=${apiKey}&query=${searchQuery}&language=en-US&page=1`
		);
	},
	getShowDetails(id) {
		return axios.get(`https://api.themoviedb.org/3/tv/${id}?api_key=${apiKey}`);
	},
	post(newShow) {
		return fetch(`${remoteURL}/userShows`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(newShow)
		}).then(data => data.json());
	}
};
