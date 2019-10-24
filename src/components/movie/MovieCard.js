import React, { Component } from "react";
import { Card, Image } from "semantic-ui-react";
import MovieAddModal from "./MovieAddModal";
import "./MovieCard.css";
import MovieReelImage from "./moviereelpng.png";
class MovieCard extends Component {
	render() {
		return (
			<>
				<Card key={this.props.movieProp.id}>
					<Card.Content>
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
						<Card.Header className="card-header">
							{this.props.movieProp.original_title}
						</Card.Header>

						{this.props.movieProp.release_date &&
						this.props.movieProp.release_date.length > 1 ? (
							<Card.Meta>
								<span className="date">
									{this.props.movieProp.release_date.split("-")[0]}
								</span>
							</Card.Meta>
						) : (
							!null
						)}
						{this.props.match.path === "/movies/new" ? (
							<MovieAddModal {...this.props} />
						) : (
							!null
						)}
					</Card.Content>
				</Card>
			</>
		);
	}
}

export default MovieCard;
