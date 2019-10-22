import React, { Component } from "react";
import { Table, Icon, Header, Image } from "semantic-ui-react";
import "./MovieListTable.css";
class MovieListTable extends Component {
	render() {
		// console.log(this.props.movieProp.id);
		return (
			<>
				<Table.Row>
					<Table.Cell>
						<Header as="h4" image>
							<Image
								src={`https://image.tmdb.org/t/p/original/${this.props.movieProp.posterPath}`}
								size="huge"
							/>
						</Header>
					</Table.Cell>
					<Table.Cell verticalAlign="middle">
						{this.props.movieProp.movieTitle}
						<div id="edit-delete-container">
							<Icon
								name="edit"
								link
								onClick={() => {
									this.props.editMovieProp(this.props.movieProp.id);
								}}
							/>
							<Icon
								name="delete"
								link
								onClick={() => {
									this.props.deleteMovieProp(this.props.movieProp.id);
								}}
							/>
						</div>
					</Table.Cell>
					<Table.Cell>{this.props.movieProp.dateWatched}</Table.Cell>
					<Table.Cell textAlign="right">
						{this.props.movieProp.timestamp}
					</Table.Cell>
					<Table.Cell textAlign="center">
						{this.props.movieProp.status === "Completed" ? (
							<Icon color="green" name="checkmark" size="large" />
						) : (
							<Icon color="red" name="x" size="large" />
						)}
					</Table.Cell>
				</Table.Row>
			</>
		);
	}
}

export default MovieListTable;
