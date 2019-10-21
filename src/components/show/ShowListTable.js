import React, { Component } from "react";
import { Table, Icon, Header, Image } from "semantic-ui-react";

class ShowCard extends Component {
	render() {
		return (
			<>
				<Table.Row>
					<Table.Cell>
						<Header as="h4" image>
							<Image
								src={`https://image.tmdb.org/t/p/original/${this.props.showProp.posterPath}`}
								size="huge"
							/>
						</Header>
					</Table.Cell>
					<Table.Cell>{this.props.showProp.showTitle}</Table.Cell>
					<Table.Cell>{this.props.showProp.dateWatched}</Table.Cell>
					<Table.Cell>{this.props.showProp.seasonProgress}</Table.Cell>
					<Table.Cell textAlign="right">
						{this.props.showProp.episodeProgress}
					</Table.Cell>
                    <Table.Cell textAlign="right">
						{this.props.showProp.timestamp}
					</Table.Cell>
					<Table.Cell textAlign="center">
						{this.props.showProp.status === "Completed" ? (
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

export default ShowCard;
