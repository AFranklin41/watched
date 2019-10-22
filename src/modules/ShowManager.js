import apiKey from "./ApiKey";
import axios from "axios";
const remoteURL = `http://localhost:5002`;

export default {
	getUserShowList(userId) {
		return fetch(`${remoteURL}/userMedia?userId=${userId}&movie=false`).then(
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

	checkUserShowList(userId, showTitle) {
		return fetch(
			`${remoteURL}/userMedia?userId=${userId}&showTitle=${showTitle}&movie=false`
		).then(res => res.json());
	},

	post(newShow) {
		return fetch(`${remoteURL}/userMedia`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(newShow)
		}).then(data => data.json());
	},
	get(id) {
		return fetch(`${remoteURL}/userMedia/${id}`).then(result => result.json());
	},
	delete(id) {
		return fetch(`${remoteURL}/userMedia/${id}`, {
			method: "DELETE"
		}).then(result => result.json());
	},
	update(editedShow) {
		return fetch(`${remoteURL}/userMedia/${editedShow.id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(editedShow)
		}).then(data => data.json());
	}
};
