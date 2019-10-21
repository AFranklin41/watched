import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import NavBar from "./nav/NavBar";
import ApplicationViews from "./ApplicationViews";
import auth0Client from "./auth/Auth";
import "semantic-ui-css/semantic.min.css";

class Watched extends Component {
	// async componentDidMount() {

	// 	if (this.props.location.pathname === "/callback") return;
	// 	try {
	// 		await auth0Client.handleAuthentication()
	// 		this.forceUpdate();
	// 	} catch (err) {
	// 		console.log(err)
	// 		// if (err.error !== "login_required") console.log(err.error);
	// 	}
	// }

	render() {
		// const userId = sessionStorage.getItem("credentials");
		return (
			<>
				<NavBar {...this.props} />
				<ApplicationViews />
			</>
		);
	}
}

export default withRouter(Watched);
