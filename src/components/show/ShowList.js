import React, { Component } from "react";
import _ from "lodash";
import ShowListTable from "./ShowListTable";
import ShowManager from "../../modules/ShowManager";
import { Button, Table, Icon } from "semantic-ui-react";

class ShowList extends Component {
	//define what this component needs to render
	state = {
		shows: [],
		column: null,
		direction: null,
		loadingStatus: false,
		showTitle: "",
		posterPath: "",
		airDate: "",
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
		modalOpen: false
	};
	handleSort = clickedColumn => () => {
		const { column, shows, direction } = this.state;

		if (column !== clickedColumn) {
			this.setState({
				column: clickedColumn,
				shows: _.sortBy(shows, [clickedColumn]),
				direction: "ascending"
			});

			return;
		}

		this.setState({
			data: shows.reverse(),
			direction: direction === "ascending" ? "descending" : "ascending"
		});
	};

	deleteShow = showId => {
		const userId = parseInt(sessionStorage.getItem("credentials"));
		ShowManager.get(showId).then(show => {
			ShowManager.delete(show.id).then(() => {
				ShowManager.getUserShowList(userId).then(shows => {
					this.setState({
						shows: shows
					});
				});
			});
		});
	};

	componentDidMount() {
		const userId = parseInt(sessionStorage.getItem("credentials"));

		ShowManager.getUserShowList(userId).then(shows => {
			this.setState({
				shows: shows
			});
		});
	}

	refreshList = () => {
		const userId = parseInt(sessionStorage.getItem("credentials"));

		ShowManager.getUserShowList(userId).then(shows => {
			this.setState({
				shows: shows
			});
		});
	};

	render() {
		const { column, direction } = this.state;

		return (
			<>
				<section className="section-content">
					<Button
						onClick={() => {
							this.props.history.push("/shows/new");
						}}
					>
						<Icon name="add" />
						Add Show
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
							<Table.HeaderCell>S. Progress</Table.HeaderCell>
							<Table.HeaderCell>E. Progress</Table.HeaderCell>
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
						{this.state.shows.map(singleShow => (
							<ShowListTable
								refreshListProp={this.refreshList}
								updateShowProp={this.updateShow}
								deleteShowProp={this.deleteShow}
								key={singleShow.id}
								showProp={singleShow}
								{...this.props}
							/>
						))}
					</Table.Body>
				</Table>
			</>
		);
	}
}

export default ShowList;
