import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Menu } from "semantic-ui-react";

import auth0Client from "../auth/Auth";

class NavBar extends Component {
	state = {
		loggedIn: false
	};

	// handleItemClick = (e, { name }) => this.setState({ activeItem: name });
	handleItemClick = (e, { name }) => this.props.history.push(`/${name}`);

	signOut = () => {
		auth0Client.signOut();
		sessionStorage.clear();
		this.props.history.replace("/");
	};

	componentDidMount() {
		debugger;
		console.log("it mounted!")
		if (auth0Client.isAuthenticated()) {
			this.setState({
				loggedIn: true
			});
		}
	}

	render() {
		const { activeItem } = this.state;
		return (
			<>
				<Menu>
					<Menu.Item
						name=""
						active={activeItem === ""}
						onClick={this.handleItemClick}
					>
						Home
					</Menu.Item>

					<Menu.Item
						name="shows"
						active={activeItem === "shows"}
						onClick={this.handleItemClick}
					>
						My Shows
					</Menu.Item>

					<Menu.Item
						name="movies"
						active={activeItem === "movies"}
						onClick={this.handleItemClick}
					>
						My Movies
					</Menu.Item>
					<Menu.Item
						name="stats"
						active={activeItem === "stats"}
						onClick={this.handleItemClick}
					>
						Statistics
					</Menu.Item>
					<Menu.Menu position="right">
						{!this.state.loggedIn ? (
							<Menu.Item
								name="signIn"
								active={activeItem === "signIn"}
								onClick={auth0Client.signIn}
							>
								Sign In
							</Menu.Item>
						) : (
							[
								<Menu.Item
									key="2"
									name="signOut"
									active={activeItem === "signOut"}
									onClick={this.signOut}
								>
									Sign Out
								</Menu.Item>
							]
						)}
					</Menu.Menu>
				</Menu>
			</>
		);
	}
}

export default withRouter(NavBar);
