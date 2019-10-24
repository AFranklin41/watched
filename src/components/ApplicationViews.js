import { Route, Redirect } from "react-router-dom";
import React, { Component } from "react";
import Home from "./home/Home";
import Callback from "./auth/Callback";
import auth0client from "./auth/Auth";
import ShowList from "./show/ShowList";
import ShowAdd from "./show/ShowAdd";
import MovieList from "./movie/MovieList";
import MovieAdd from "./movie/MovieAdd";

class ApplicationViews extends Component {
	render() {
		return (
			<React.Fragment>
				{/* <Route
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
				/> */}
				<Route
					exact
					path="/"
					render={props => {
						return <Home {...props} />;
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
							return <Redirect to="/" />;
						}
					}}
				/>

				<Route
					exact
					path="/shows/new"
					render={props => {
						if (auth0client.isAuthenticated()) {
							return <ShowAdd {...props} />;
						} else {
							return <Redirect to="/" />;
						}
					}}
				/>

				<Route
					exact
					path="/movies"
					render={props => {
						if (auth0client.isAuthenticated()) {
							return <MovieList {...props} />;
						} else {
							return <Redirect to="/" />;
						}
					}}
				/>

				<Route
					exact
					path="/movies/new"
					render={props => {
						if (auth0client.isAuthenticated()) {
							return <MovieAdd {...props} />;
						} else {
							return <Redirect to="/" />;
						}
					}}
				/>
			</React.Fragment>
		);
	}
}

export default ApplicationViews;
