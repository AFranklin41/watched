import { Route } from "react-router-dom";
import React, { Component } from "react";
import Home from "./home/Home";
import Callback from "./auth/Callback";
import auth0client from "./auth/Auth";
import ShowList from "./show/ShowList";
import ShowCard from "./show/ShowCard";
import ShowAdd from "./show/ShowAdd";
import ShowAddModal from "./show/ShowAddModal";
import MovieList from "./movie/MovieList";
import MovieAdd from "./movie/MovieAdd";

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
					exact
					path="/shows"
					render={props => {
						return <ShowList {...props} />;
					}}
				/>
				<Route
					exact
					path="/shows/new"
					render={props => {
						return <ShowAdd {...props} />;
					}}
				/>
				<Route
					exact
					path="/movies"
					render={props => {
						return <MovieList {...props} />;
					}}
				/>
				<Route
					exact
					path="/movies/new"
					render={props => {
						return <MovieAdd {...props} />;
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
				 */}
			</React.Fragment>
		);
	}
}

export default ApplicationViews;
