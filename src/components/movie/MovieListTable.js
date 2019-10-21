import React, { Component } from "react";
import { Table, Icon, Header, Image } from "semantic-ui-react";

class MovieListTable extends Component {
	render() {
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
					<Table.Cell>{this.props.movieProp.movieTitle}</Table.Cell>
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
