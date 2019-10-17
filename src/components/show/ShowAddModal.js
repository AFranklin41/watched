// import react components
import React, { Component } from "react";
// import api manager
import ShowManager from "../../modules/ShowManager";
// import semantic ui components
import {
	Button,
	Header,
	Modal,
	Card,
	Icon,
	Image,
	Form,
	Checkbox,
	Label,
	Dropdown
} from "semantic-ui-react";
// import custom css changes
import "./ShowCard.css";

// create our new component that will show a modal
class ShowAddModal extends Component {
	// set state to all of the information we will need
	state = {
		title: "",
		dateWatched: "",
		season: "",
		episode: "",
		timestamp: "",
		showId: "",
		showInfo: "",
		loadingStatus: false
	};

	// function to handle form field changes in our modal
	handleChange = (e, { name, value }) => this.setState({ [name]: value });

	// fetching specific show details from our external api and set them to state
	getShowDetails = () => {
		ShowManager.getShowDetails(this.props.showProp.id).then(({ data }) => {
			this.setState({
				showInfo: data
			});
			console.log(this.state.showInfo.seasons);
		});
	};

	// function to add a new show to our list
	addShow = evt => {
		evt.preventDefault();
		if (this.state.title === "" || this.state.dateWatched === "") {
			window.alert("Please complete the form");
		} else {
			this.setState({ loadingStatus: true });
			// object for our show that will be added to the local json
			const newShow = {
				userId: parseInt(sessionStorage.getItem("credentials")),
				dateWatched: this.state.dateWatched,
				season: this.state.season,
				episode: this.state.episode,
				timestamp: this.state.timestamp,
				showId: this.state.showId,
				loadingStatus: false
			};
			// api call that will post to the json server and push us back to the add show list
			ShowManager.post(newShow).then(() => this.props.history.push("/new"));
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

		// const seasonOptions = this.state.showInfo.seasons.map(season => [season]);

		return (
			// adds a neat button below each show card that will call our modal
			<Card.Content extra>
				<Modal
					trigger={
						<Button className="modal-add-button" onClick={this.getShowDetails}>
							<Icon name="add" />
							Add to My List
						</Button>
					}
				>
					{/* header for our modal, show title */}
					<Modal.Header>{this.props.showProp.original_name}</Modal.Header>
					{/* poster for our modal */}
					<Modal.Content image>
						<Image
							wrapped
							size="medium"
							src={`https://image.tmdb.org/t/p/original/${this.props.showProp.poster_path}`}
						/>
						{/* this checks to see if an air date exists and then takes the full date and splits it to show only the year, for aesthetic purposes */}
						<Modal.Description>
							{this.props.showProp.first_air_date &&
							this.props.showProp.first_air_date.length > 1 ? (
								// display the year as a header
								<Header>
									<span className="date">
										{this.props.showProp.first_air_date.split("-")[0]}
									</span>
								</Header>
							) : (
								!null
							)}

							{/* a brief overview of the show pulled from the api */}
							<p>{this.props.showProp.overview}</p>

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
									/>
								</Form.Field>
								{/* form field for time stamping */}
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
								<Form.Group>
									<Form.Field>
										<label>Season: </label>
										<Dropdown
											name="season"
											placeholder="season"
											type="text"
											// options={seasonOptions}
										/>
									</Form.Field>
								</Form.Group>
								<Button type="submit">Submit</Button>
								<Button>Cancel</Button>
							</Form>
						</Modal.Description>
					</Modal.Content>
				</Modal>
			</Card.Content>
		);
		// : (
		// 	!null
		// );
	}
}

export default ShowAddModal;
