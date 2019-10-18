import React, { Component } from "react";
import { Card, Image, Button } from "semantic-ui-react";
import ShowAddModal from "./ShowAddModal";
import ShowManager from "../../modules/ShowManager";
import "./ShowCard.css";
import { thisExpression } from "@babel/types";

class ShowCard extends Component {
	state = {
		showTitle: "",
		alreadyExists: false
	};

	checkUserShowList = () => {
		ShowManager.getShowDetails(this.props.showProp.id).then(({ data }) => {
			this.setState({
				showTitle: data.original_name
			});
			ShowManager.checkUserShowList(
				parseInt(sessionStorage.getItem("credentials")),
				this.state.showTitle
			).then(parsedResponse => {
				if (parsedResponse.length === 0) {
					this.setState({
						alreadyExists: false
					});
				} else {
					this.setState({
						alreadyExists: true
					});
				}
			});
		});
	};

	render() {
		this.checkUserShowList();
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
						{this.props.match.path === "/shows/new" &&
						this.state.alreadyExists === false ? (
							<ShowAddModal {...this.props} />
						) : (
							// <ShowRemoveModal {...this.props} />
							<Button>A delete button</Button>
						)}
					</Card.Content>
				</Card>
			</>
		);
	}
}

export default ShowCard;
