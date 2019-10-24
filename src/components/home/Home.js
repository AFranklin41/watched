import React, { Component } from "react";
import { Parallax } from "react-parallax";
import "./Home.css";

// import ShowCard from "../show/ShowCard";

class Home extends Component {
	state = {
		movies: []
	};

	componentDidMount() {}

	render() {
		return (
			<Parallax
				// blur={10}
				bgImage={require("./parallax.jpeg")}
				bgImageAlt="the cat"
				strength={200}
			>
				<style>
					@import
					url('https://fonts.googleapis.com/css?family=Sunflower:300&display=swap');
				</style>
				<h1 className="watched-header">Watched</h1>
				<h4 className="watched-sub-header">What is Watched?</h4>
				<p className="watched-description">
					Watched is an app designed to help you keep track of the media you
					care about.
				</p>
				<p className="watched-description-2">
					Create a list of TV shows or Movies so you'll never forget where you
					left off.
				</p>

				<div style={{ height: "100vh" }} />
			</Parallax>
		);
	}
}

export default Home;
