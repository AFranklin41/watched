import React, { Component } from "react";
import { Link } from "react-router-dom";

class ShowCard extends Component {
	render() {
		return (
			<div className="card">
				<div className="card-content">
					<h3>
						Name:{" "}
						<span className="card-showname">{this.props.showProp.name}</span>
					</h3>

					<p>{this.props.showProp.title}</p>

					<Link to={`/shows/${this.props.showProp.id}`}>
						<button>Details</button>
					</Link>

					<button
						type="button"
						onClick={() => {
							this.props.history.push(`/shows/${this.props.showProp.id}/edit`);
						}}
					>
						Edit
					</button>
				</div>
			</div>
		);
	}
}

export default ShowCard;
