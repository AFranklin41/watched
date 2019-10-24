import React, { Component } from "react";
import { Card, Image } from "semantic-ui-react";
import ShowAddModal from "./ShowAddModal";
// import ShowManager from "../../modules/ShowManager";
import "./ShowCard.css";
import MovieReelImage from "./moviereelpng.png";

class ShowCard extends Component {
	render() {
		return (
			<>
				<Card key={this.props.showProp.id}>
					<Card.Content>
						{this.props.showProp.poster_path &&
						this.props.showProp.poster_path != null ? (
							<Image
								wrapped
								size="medium"
								src={`https://image.tmdb.org/t/p/original/${this.props.showProp.poster_path}`}
							/>
						) : (
							<Image wrapped size="medium" src={MovieReelImage} />
						)}
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
