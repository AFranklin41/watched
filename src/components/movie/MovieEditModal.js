// import react components
import React, { Component } from "react";
// import api manager
import MovieManager from "../../modules/MovieManager";
// import semantic ui components
import {
	Button,
	Header,
	Modal,
	Icon,
	Image,
	Form,
	Dropdown
} from "semantic-ui-react";
// import custom css changes
import "./MovieCard.css";

// create our new component that will movie a modal
class MovieEditModal extends Component {
	// set state to all of the information we will need
	state = {
		movieTitle: "",
		dateWatched: "",
		timestamp: "",
		movieId: "",
		movieInfo: "",
		status: "",
		alreadyExists: false,
		modalOpen: false,
		loadingStatus: false
	};

	// function to handle form field changes in our modal
	handleChange = (e, { name, value }) => this.setState({ [name]: value });

	// function to handle opening our modal
	handleOpen = () => this.setState({ modalOpen: true });

	// function to handle closing our modal
	handleClose = () => {
		this.setState({
            modalOpen: false,
            movieTitle: "",
            dateWatched: "",
            timestamp: "",
            movieId: "",
            movieInfo: "",
            status: "",
            alreadyExists: false,
            loadingStatus: false
		});
	};

	// fetching specific movie details from our external api and set them to state
	getMovieDetails = () => {
		MovieManager.getMovieDetails(this.props.movieProp.movieId).then(
			({ data }) => {
				// declare variable for storing individual season names for a dropdown later
				MovieManager.get(this.props.movieProp.id).then(movie => {
					this.setState({
						dateWatched: movie.dateWatched,
						timestamp: movie.timestamp,
						status: movie.status
					});
				});

				this.setState({
					movieTitle: data.original_title,
					posterPath: data.poster_path,
					airDate: data.release_date,
					movieInfo: data,
					movieId: data.id
				});
			}
		);
	};

	// function to add a new movie to our list
	updateMovie = () => {
		this.setState({
			loadingStatus: true
		});

		// object for our movie that will be added to the local json
		const updatedMovie = {
			id: this.props.movieProp.id,
			userId: parseInt(sessionStorage.getItem("credentials")),
			movieTitle: this.state.movieTitle,
			posterPath: this.state.posterPath,
			airDate: this.state.airDate,
			dateWatched: this.state.dateWatched,
			timestamp: this.state.timestamp,
			movieId: this.state.movieId,
			status: this.state.status,
			movie: true,
			loadingStatus: false
		};
		console.log(updatedMovie);
		// api call that will post to the json server and push us back to the add movie list
		MovieManager.update(updatedMovie)
			.then(() => this.props.refreshListProp())
			.then(() => this.handleClose());
	};

	render() {
		// options for our status drop down we'll use later
		const statusOptions = [
			{
				key: "Completed",
				text: "Completed",
				value: "Completed"
			},
			{
				key: "Watching",
				text: "Watching",
				value: "Watching"
			}
		];

		return (
			// adds a neat button below each movie card that will call our modal

			<Modal
				key={this.props.movieProp.movieId}
				trigger={<Icon link name="edit" onClick={this.handleOpen} />}
				onOpen={this.getMovieDetails}
				open={this.state.modalOpen}
				onClose={this.handleClose}
				closeIcon
			>
				{/* header for our modal, movie title */}
				<Modal.Header>
					{this.props.movieProp.movieTitle}{" "}
					{this.props.movieProp.airDate &&
					this.props.movieProp.airDate.length > 1 ? (
						// display the year as a header

						<span className="date">
							{this.props.movieProp.airDate.split("-")[0]}
						</span>
					) : (
						!null
					)}
				</Modal.Header>
				<Header>Edit:</Header>
				{/* poster for our modal */}
				<Modal.Content image>
					<Image
						wrapped
						size="medium"
						src={`https://image.tmdb.org/t/p/original/${this.props.movieProp.posterPath}`}
					/>
					{/* this checks to see if an air date exists and then takes the full date and splits it to movie only the year, for aesthetic purposes */}
					<Modal.Description>
						{/* a brief overview of the movie, pulled from the api */}

						{/* <p>{this.props.movieProp.overview}</p> */}

						{/* a form for entering the information we'll save to our local json */}
						<Form>
							{/* form field for date watched */}
							<Form.Field>
								<label>Date Watched</label>
								<Form.Input
									required
									name="dateWatched"
									placeholder={"date"}
									value={this.state.dateWatched}
									type="date"
									onChange={this.handleChange}
								/>
							</Form.Field>
							{/* form field for checking completion */}
							<Form.Field>
								<label>Status: </label>
								<Dropdown
									placeholder="status"
									name="status"
									value={this.state.status}
									selection
									options={statusOptions}
									onChange={this.handleChange}
								/>
							</Form.Field>
							{/* form field for time stamping */}
							{this.state.status === "Watching" ? (
								<Form.Field>
									<label>Timestamp</label>
									<Form.Input
										required
										name="timestamp"
										placeholder="timestamp"
										value={this.state.timestamp}
										type="text"
										onChange={this.handleChange}
									/>
								</Form.Field>
							) : (
								!null
							)}
							<Button
								type="submit"
								color="green"
								onClick={() => this.updateMovie(this.props.movieProp.id)}
							>
								<Icon name="plus" /> Update
							</Button>

							<Button color="red" onClick={this.handleClose}>
								Cancel
							</Button>
						</Form>
					</Modal.Description>
				</Modal.Content>
			</Modal>
		);
	}
}

export default MovieEditModal;
