import React, { Component } from "react";
import _ from "lodash";
import MovieListTable from "./MovieListTable";
import MovieManager from "../../modules/MovieManager";
import { Button, Table, Icon } from "semantic-ui-react";

class MovieList extends Component {
	//define what this component needs to render
	state = {
		movies: [],
		column: null,
		direction: null,
		loadingStatus: false
	};

	handleSort = clickedColumn => () => {
		const { column, movies, direction } = this.state;

		if (column !== clickedColumn) {
			this.setState({
				column: clickedColumn,
				movies: _.sortBy(movies, [clickedColumn]),
				direction: "ascending"
			});

			return;
		}

		this.setState({
			data: movies.reverse(),
			direction: direction === "ascending" ? "descending" : "ascending"
		});
	};

	deleteMovie = movieId => {
		const userId = parseInt(sessionStorage.getItem("credentials"));
		MovieManager.get(movieId).then(movie => {
			MovieManager.delete(movie.id).then(() => {
				MovieManager.getUserMovieList(userId).then(movies => {
					this.setState({
						movies: movies
					});
				});
			});
		});
	};

	editMovie = movieId => {
		const userId = parseInt(sessionStorage.getItem("credentials"));
		MovieManager.get(movieId).then(movie => {
			MovieManager.edit(movie.id).then(() => {
				MovieManager.getUserMovieList(userId).then(movies => {
					this.setState({
						movies: movies
					});
				});
			});
		});
	};

	componentDidMount() {
		const userId = parseInt(sessionStorage.getItem("credentials"));
		MovieManager.getUserMovieList(userId).then(movies => {
			this.setState({
				movies: movies
			});
		});
	}

	render() {
		const { column, direction } = this.state;

		return (
			<>
				<section className="section-content">
					<Button
						onClick={() => {
							this.props.history.push("/movies/new");
						}}
					>
						<Icon name="add" />
						Add Movie
					</Button>
					<br />
				</section>
				<Table sortable celled structured>
					<Table.Header>
						<Table.Row>
							<Table.HeaderCell>Image</Table.HeaderCell>
							<Table.HeaderCell
								sorted={column === "showTitle" ? direction : null}
								onClick={this.handleSort("showTitle")}
							>
								Title
							</Table.HeaderCell>
							<Table.HeaderCell
								sorted={column === "dateWatched" ? direction : null}
								onClick={this.handleSort("dateWatched")}
							>
								Date Watched
							</Table.HeaderCell>
							<Table.HeaderCell>Timestamp</Table.HeaderCell>
							<Table.HeaderCell
								sorted={column === "status" ? direction : null}
								onClick={this.handleSort("status")}
							>
								Completed
							</Table.HeaderCell>
						</Table.Row>
					</Table.Header>
					<Table.Body>
						{this.state.movies.map(singleMovie => (
							<MovieListTable
								deleteMovieProp={this.deleteMovie}
								key={singleMovie.id}
								movieProp={singleMovie}
								{...this.props}
							/>
						))}
					</Table.Body>
				</Table>
			</>
		);
	}
}

export default MovieList;
