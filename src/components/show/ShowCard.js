import React, { Component } from "react";
import { Card, Image, Button } from "semantic-ui-react";
import ShowAddModal from "./ShowAddModal";
// import ShowManager from "../../modules/ShowManager";
import "./ShowCard.css";

class ShowCard extends Component {
	render() {
		return (
			<>
				<Card key={this.props.showProp.id}>
					<Card.Content>
						<Image
							src={`https://image.tmdb.org/t/p/original/${this.props.showProp.poster_path}`}
						/>
						<Card.Header className="card-header">
							{this.props.showProp.original_name}
						</Card.Header>

						{this.props.showProp.first_air_date &&
						this.props.showProp.first_air_date.length > 1 ? (
							<Card.Meta>
								<span className="date">
									{this.props.showProp.first_air_date.split("-")[0]}
								</span>
							</Card.Meta>
						) : (
							!null
						)}
						{this.props.match.path === "/shows/new" ? (
							<ShowAddModal {...this.props} />
						) : (
							!null
						)}
					</Card.Content>
				</Card>
			</>
		);
	}
}

export default ShowCard;
