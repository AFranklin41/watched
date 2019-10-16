import { Route } from "react-router-dom";
import React, { Component } from "react";
import Home from "./home/Home";
import Callback from "./auth/Callback";
import auth0client from "./auth/Auth";
import ShowList from "./show/ShowList";
import ShowCard from "./show/ShowCard";

class ApplicationViews extends Component {
	render() {
		return (
			<React.Fragment>
				<Route
					path="/home"
					render={props => {
						return <Home {...props} />;
					}}
				/>
				<Route
					path="/shows"
					render={props => {
						return <ShowCard {...props} />;
					}}
				/>
				{/* <Route
					path="/home"
					render={props => {
						if (auth0client.isAuthenticated()) {
							return <Home {...props} />;
						} else {
							auth0client.signIn();
							return null;
						}
					}}
				/>

				<Route
					exact
					path="/callback"
					render={props => {
						return <Callback {...props} />;
					}}
				/>

				<Route
					exact
					path="/shows"
					render={props => {
						if (auth0client.isAuthenticated()) {
							return <ShowList {...props} />;
						} else {
							auth0client.signIn();
							return null;
						}
					}}
				/>
				<Route
					path="/shows/new"
					render={props => {
						if (auth0client.isAuthenticated()) {
							return <ShowCard {...props} />;
						} else {
							auth0client.signIn();
							return null;
						}
					}}
				/> */}
			</React.Fragment>
		);
	}
}

export default ApplicationViews;
