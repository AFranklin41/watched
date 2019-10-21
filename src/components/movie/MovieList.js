import React, { Component } from "react";
import MovieCard from "./MovieCard";
import MovieManager from "../../modules/MovieManager";
import { Button } from "semantic-ui-react";

class MovieList extends Component {
	//define what this component needs to render
	state = {
		movies: [],
		loadingStatus: false
	};

	componentDidMount() {
		const userId = parseInt(sessionStorage.getItem("credentials"));
		console.log(userId);
		MovieManager.getUserMovieList(userId).then(movies => {
			console.log(movies);
			this.setState({
				movies: movies
			});
		});
	}

	render() {
		return (
			<>
				<section className="section-content">
					<Button
						onClick={() => {
							this.props.history.push("/movies/new");
						}}
					>
						Add Movie
					</Button>
					<br />
				</section>
				<div className="container-cards">
					{this.state.movies.map(singleMovie => (
						<MovieCard
							// deleteMovieProp={this.deleteMovie}
							key={singleMovie.id}
							movieProp={singleMovie}
							{...this.props}
						/>
					))}
				</div>
			</>
		);
	}
}

export default MovieList;
