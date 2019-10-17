import React, { Component } from "react";
import ShowCard from "./ShowCard";
import ShowManager from "../../modules/ShowManager";
import { Button } from "semantic-ui-react";

class ShowList extends Component {
	//define what this component needs to render
	state = {
		shows: [],
		loadingStatus: false
	};

	componentDidMount() {
		const userId = parseInt(sessionStorage.getItem("credentials"));
		console.log(userId);
		ShowManager.getUserShowList(userId).then(shows => {
			console.log(shows);
			this.setState({
				shows: shows
			});
		});
	}

	render() {
		return (
			<>
				<section className="section-content">
					<Button
						onClick={() => {
							this.props.history.push("/shows/new");
						}}
					>
						Add Show
					</Button>
					<br />
				</section>
				<div className="container-cards">
					{this.state.shows.map(singleShow => (
						<ShowCard
							// deleteShowProp={this.deleteShow}
							key={singleShow.id}
							showProp={singleShow}
							{...this.props}
						/>
					))}
				</div>
			</>
		);
	}
}

export default ShowList;
