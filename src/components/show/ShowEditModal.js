// import react components
import React, { Component } from "react";
// import api manager
import ShowManager from "../../modules/ShowManager";
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
import "./ShowCard.css";

// create our new component that will show a modal
class ShowEditModal extends Component {
	// set state to all of the information we will need
	state = {
		showTitle: "",
		dateWatched: "",
		seasonEpisodeCount: "",
		seasonProgress: "",
		episodeProgress: "",
		timestamp: "",
		showId: "",
		showInfo: "",
		seasons: [],
		seasonNames: [],
		status: "",
		alreadyExists: false,
		modalOpen: false,
		loadingStatus: false
	};

	// function to handle form field changes in our modal
	handleChange = (e, { name, value }) => this.setState({ [name]: value });

	// function to specifically handle changing seasons so we can get the total episode count after a season is selected
	seasonHandleChange = (e, { name, value }) => {
		console.log(this.state.seasons);
		this.setState({
			[name]: value,
			seasonEpisodeCount: this.state.seasons.find(
				singleSeason => singleSeason.name === value
			).episode_count
		});
	};

	// function to handle opening our modal
	handleOpen = () => this.setState({ modalOpen: true });

	// function to handle closing our modal
	handleClose = () => {
		this.setState({
			showTitle: "",
			dateWatched: "",
			seasonEpisodeCount: "",
			seasonProgress: "",
			episodeProgress: "",
			timestamp: "",
			showId: "",
			showInfo: "",
			seasons: [],
			seasonNames: [],
			status: "",
			alreadyExists: false,
			modalOpen: false,
			loadingStatus: false
		});
	};

	// fetching specific show details from our external api and set them to state
	getShowDetails = () => {
		ShowManager.getShowDetails(this.props.showProp.showId).then(({ data }) => {
			// declare variable for storing individual season names for a dropdown later
			ShowManager.get(this.props.showProp.id).then(show => {
				this.setState({
					dateWatched: show.dateWatched,
					seasonEpisodeCount: show.seasonEpisodeCount,
					seasonProgress: show.seasonProgress,
					episodeProgress: show.episodeProgress,
					timestamp: show.timestamp,
					status: show.status
				});
			});

			let seasonNames = [];

			// map through seasons to get their names
			data.seasons.map(singleSeason => {
				let singleSeasonObject = {
					key: singleSeason.name,
					text: singleSeason.name,
					value: singleSeason.name
				};

				seasonNames.push(singleSeasonObject);

				return seasonNames;
			});

			this.setState({
				showTitle: data.original_name,
				posterPath: data.poster_path,
				airDate: data.first_air_date,
				showInfo: data,
				showId: data.id,
				seasons: data.seasons,
				seasonNames: seasonNames
			});
			// console.log(this.state.showInfo);
		});
	};

	// function to add a new show to our list
	updateShow = () => {
		this.setState({
			loadingStatus: true
		});

		// object for our show that will be added to the local json
		const updatedShow = {
			id: this.props.showProp.id,
			userId: parseInt(sessionStorage.getItem("credentials")),
			showTitle: this.state.showTitle,
			posterPath: this.state.posterPath,
			airDate: this.state.airDate,
			dateWatched: this.state.dateWatched,
			seasonProgress: this.state.seasonProgress,
			episodeProgress: this.state.episodeProgress,
			timestamp: this.state.timestamp,
			showId: this.state.showId,
			status: this.state.status,
			movie: false,
			loadingStatus: false
		};
		console.log(updatedShow);
		// api call that will post to the json server and push us back to the add show list
		ShowManager.update(updatedShow)
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
			// adds a neat button below each show card that will call our modal

			<Modal
				key={this.props.showProp.showId}
				trigger={<Icon link name="edit" onClick={this.handleOpen} />}
				onOpen={this.getShowDetails}
				open={this.state.modalOpen}
				onClose={this.handleClose}
				closeIcon
			>
				{/* header for our modal, show title */}
				<Modal.Header>
					{this.props.showProp.showTitle}{" "}
					{this.props.showProp.airDate &&
					this.props.showProp.airDate.length > 1 ? (
						// display the year as a header

						<span className="date">
							{this.props.showProp.airDate.split("-")[0]}
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
						src={`https://image.tmdb.org/t/p/original/${this.props.showProp.posterPath}`}
					/>
					{/* this checks to see if an air date exists and then takes the full date and splits it to show only the year, for aesthetic purposes */}
					<Modal.Description>
						{/* a brief overview of the show, pulled from the api */}
						<p>{this.props.showProp.overview}</p>

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
							<Form.Group>
								{this.state.seasonNames && this.state.seasonNames.length > 0
									? [
											<Form.Field>
												<label>Season: </label>
												<Dropdown
													name="seasonProgress"
													placeholder="season"
													type="text"
													value={this.state.seasonProgress}
													options={this.state.seasonNames}
													onChange={this.seasonHandleChange}
												/>
											</Form.Field>,
											<Form.Field>
												<label>Episode: </label>
												<Form.Input
													name="episodeProgress"
													type="text"
													value={this.state.episodeProgress}
													onChange={this.handleChange}
												/>
												/ {this.state.seasonEpisodeCount}
											</Form.Field>
									  ]
									: !null}
							</Form.Group>
							<Button
								type="submit"
								color="green"
								onClick={() => this.updateShow(this.props.showProp.id)}
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

export default ShowEditModal;
