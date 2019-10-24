// import react components
import React, { Component } from "react";
// import api manager
import MovieManager from "../../modules/MovieManager";
// import semantic ui components
import {
	Button,
	Header,
	Modal,
	Card,
	Icon,
	Image,
	Form,
	Dropdown
} from "semantic-ui-react";
// import custom css changes
import "./MovieCard.css";
import MovieReelImage from "./moviereelpng.png";

// create our new component that will show a modal
class MovieAddModal extends Component {
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
	handleClose = () =>
		this.setState({
			movieTitle: "",
			dateWatched: "",
			timestamp: "",
			movieId: "",
			movieInfo: "",
			status: "",
			alreadyExists: false,
			modalOpen: false,
			loadingStatus: false
		});

	// fetching specific show details from our external api and set them to state
	getMovieDetails = () => {
		MovieManager.getMovieDetails(this.props.movieProp.id).then(({ data }) => {
			// declare variable for storing individual season names for a dropdown later

			MovieManager.checkUserMovieList(
				parseInt(sessionStorage.getItem("credentials")),
				this.state.movieTitle
			).then(parsedResponse => {
				if (parsedResponse.length === 0) {
					this.setState({
						alreadyExists: false
					});
				} else {
					this.setState({
						alreadyExists: true
					});
				}
			});

			this.setState({
				movieTitle: data.original_title,
				posterPath: data.poster_path,
				airDate: data.release_date,
				movieInfo: data,
				movieId: data.id
			});
			console.log(this.state.movieInfo);
		});
	};

	// function to add a new show to our list
	addMovie = evt => {
		evt.preventDefault();

		{
			this.setState({ loadingStatus: true });
			// object for our show that will be added to the local json
			const newMovie = {
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
			// api call that will post to the json server and push us back to the add show list
			MovieManager.checkUserMovieList(
				newMovie.userId,
				newMovie.movieTitle
			).then(parsedResponse => {
				if (parsedResponse.length === 0) {
					MovieManager.post(newMovie);
					this.handleClose();
				} else {
					alert("This show is already on your list!");
				}
			});
		}
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
			// adds a neat button below each show card that will call our modal
			<Card.Content key={this.state.movieId} extra>
				<Modal
					trigger={
						<Button className="modal-add-button" onClick={this.handleOpen}>
							<Icon name="add" />
							Add to My List
						</Button>
					}
					onOpen={this.getMovieDetails}
					open={this.state.modalOpen}
					onClose={this.handleClose}
					closeIcon
				>
					{/* header for our modal, show title */}
					<Modal.Header>{this.props.movieProp.original_title}</Modal.Header>
					{/* poster for our modal */}
					<Modal.Content image>
						{this.props.movieProp.poster_path &&
						this.props.movieProp.poster_path != null ? (
							<Image
								wrapped
								size="medium"
								src={`https://image.tmdb.org/t/p/original/${this.props.movieProp.poster_path}`}
							/>
						) : (
							<Image wrapped size="medium" src={MovieReelImage} />
						)}
						{/* this checks to see if an air date exists and then takes the full date and splits it to show only the year, for aesthetic purposes */}
						<Modal.Description>
							{this.props.movieProp.release_date &&
							this.props.movieProp.release_date.length > 1 ? (
								// display the year as a header
								<Header>
									<span className="date">
										{this.props.movieProp.release_date.split("-")[0]}
									</span>
								</Header>
							) : (
								!null
							)}

							{/* a brief overview of the show, pulled from the api */}
							<p>{this.props.movieProp.overview}</p>

							{/* a form for entering the information we'll save to our local json */}
							<Form>
								{/* form field for date watched */}
								<Form.Field>
									<label>Date Watched</label>
									<Form.Input
										required
										name="dateWatched"
										placeholder="date"
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
											type="text"
											onChange={this.handleChange}
										/>
									</Form.Field>
								) : (
									!null
								)}
								{/* <Form.Group>
									{this.state.seasonNames && this.state.seasonNames.length > 0
										? [
												<Form.Field>
													<label>Season: </label>
													<Dropdown
														name="seasonProgress"
														placeholder="season"
														type="text"
														options={this.state.seasonNames}
														onChange={this.seasonHandleChange}
													/>
												</Form.Field>,
												<Form.Field>
													<label>Episode: </label>
													<Form.Input
														name="episodeProgress"
														type="text"
														onChange={this.handleChange}
													/>
													/ {this.state.seasonEpisodeCount}
												</Form.Field>
										  ]
										: !null}
								</Form.Group> */}
								<Button type="submit" color="green" onClick={this.addMovie}>
									<Icon name="add" /> Add
								</Button>

								<Button color="red" onClick={this.handleClose}>
									Cancel
								</Button>
							</Form>
						</Modal.Description>
					</Modal.Content>
				</Modal>
			</Card.Content>
		);
	}
}

export default MovieAddModal;
