import React, { Component } from "react";
import { Card, Image, Grid } from "semantic-ui-react";
import ShowAddModal from "./ShowAddModal";
import "./ShowListCard.css";

class ShowCard extends Component {
	render() {
		return (
			<>
				<Card key={this.props.showProp.id} className="show-cards">
					<Card.Content>
						<Image
							size="small"
							centered
							raised
							src={`https://image.tmdb.org/t/p/original/${this.props.showProp.posterPath}`}
						/>

						<Card.Header size="small" className="card-header">
							{this.props.showProp.showTitle}
						</Card.Header>

						<Card.Meta>
							<span className="date">
								{this.props.showProp.airDate.split("-")[0]}
							</span>
						</Card.Meta>
                        <Card.Description>
                            <p>{this.props.showProp.dateWatched}</p>
                        </Card.Description>

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
