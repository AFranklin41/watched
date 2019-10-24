import React, { Component } from "react";
import MovieManager from "../../modules/MovieManager";
import MovieCard from "./MovieCard";
import { Input } from "semantic-ui-react";

class MovieAdd extends Component {
	state = {
		query: "",
		results: [],
		loadingStatus: false
	};

	handleInputChange = e => {
		this.setState(
			{
				query: e.target.value
			},
			() => {
				if (this.state.query && this.state.query.length > 1) {
					if (this.state.query.length % 2 === 0) {
						this.searchMovies();
					}
				} else if (!this.state.query) {
				}
			}
		);
	};

	searchMovies = () => {
		MovieManager.searchMovies(this.state.query).then(({ data }) => {
			this.setState({
				results: data.results
			});
		});
	};

	render() {
		return (
			<>
				<form className="movieSearch">
					<Input
						fluid
						icon="search"
						placeholder="Search..."
						onChange={this.handleInputChange.bind(this)}
					/>
				</form>
				{this.state.results.map(singleMovie => (
					<>
						<MovieCard
							key={singleMovie.id}
							movieProp={singleMovie}
							getMovieDetailsProp={this.getMovieDetails}
							{...this.props}
						/>
					</>
				))}
			</>
		);
	}
}

export default MovieAdd;
