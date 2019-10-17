import React, { Component } from "react";
import ShowManager from "../../modules/ShowManager";
import ShowCard from "./ShowCard";
import { Input } from "semantic-ui-react";

class ShowAdd extends Component {
	state = {
		query: "",
		results: [],
		loadingStatus: false
	};

	handleInputChange = e => {
		this.setState(
			{
				query: e.target.value
			},
			() => {
				if (this.state.query && this.state.query.length > 1) {
					if (this.state.query.length % 2 === 0) {
						this.searchShows();
					}
				} else if (!this.state.query) {
				}
			}
		);
	};

	searchShows = () => {
		ShowManager.searchShows(this.state.query).then(({ data }) => {
			this.setState({
				results: data.results
			});
		});
	};

	render() {
		return (
			<>
				<form className="showSearch">
					<Input
						fluid
						icon="search"
						placeholder="Search..."
						// ref={input => (this.search = input)}
						onChange={this.handleInputChange.bind(this)}
					/>
				</form>
				{this.state.results.map(singleShow => (
					<>
						<ShowCard
							showProp={singleShow}
							getShowDetailsProp={this.getShowDetails}
							{...this.props}
						/>
					</>
				))}
			</>
		);
	}
}

export default ShowAdd;
