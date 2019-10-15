import React, { Component } from "react";
import ShowManager from "../../modules/ShowManager";
// import ShowCard from "../show/ShowCard";

class Home extends Component {
	state = {
		movies: []
	};

	componentDidMount() {
		ShowManager.getNewMovies().then(parsedMovies => {
			this.setState({
				movies: parsedMovies.results
			});
		});
	}

	render() {
		return (
			<React.Fragment>
				<h1>Glorp!</h1>
				{this.state.movies.map(singleMovie => (
					<li key={singleMovie.id}>{singleMovie.title}</li>
				))}
			</React.Fragment>
		);
	}
}

export default Home;
