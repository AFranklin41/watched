import apiKey from "./ApiKey";
import axios from "axios";
const remoteURL = `http://localhost:5002`;

export default {
	getUserMovieList(userId) {
		return fetch(`${remoteURL}/userMedia?userId=${userId}&movie=true`).then(
			res => res.json()
		);
	},
	getNewMovies() {
		return fetch(
			`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}`
		).then(result => result.json());
	},
	searchMovies(searchQuery) {
		return axios.get(
			`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchQuery}&language=en-US&page=1`
		);
	},
	getMovieDetails(id) {
		return axios.get(
			`https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`
		);
	},

	checkUserMovieList(userId, movieTitle) {
		return fetch(
			`${remoteURL}/userMedia?userId=${userId}&movieTitle=${movieTitle}&movie=true`
		).then(res => res.json());
	},

	post(newMovie) {
		return fetch(`${remoteURL}/userMedia`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(newMovie)
		}).then(data => data.json());
	},
	get(movieId) {
		return fetch(`${remoteURL}/userMedia/${movieId}`).then(
			result => result.json()
		);
	},
	delete(movieId) {
		return fetch(`${remoteURL}/userMedia/${movieId}`, {
			method: "DELETE"
		}).then(result => result.json());
	},
	update(editedMovie) {
		return fetch(`${remoteURL}/userMedia/${editedMovie.id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(editedMovie)
		}).then(data => data.json());
	}
};
