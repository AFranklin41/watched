import React, { PureComponent, Component } from "react";
import { PieChart, Pie, Legend, Tooltip, Cell } from "recharts";
import ShowManager from "../modules/ShowManager";
import MovieManager from "../modules/MovieManager";
import { Header } from "semantic-ui-react";
import "./Charts.css";

export default class Charts extends PureComponent {
	state = {
		shows: [],
		movies: [],
		showGraphData: [],
		movieGraphData: []
	};

	componentDidMount() {
		const userId = parseInt(sessionStorage.getItem("credentials"));
		ShowManager.getUserShowList(userId).then(shows => {
			this.setState({
				shows: shows
			});
			this.getStatus();
		});
		MovieManager.getUserMovieList(userId).then(movies => {
			this.setState({
				movies: movies
			});
			this.getStatus();
		});
	}

	getStatus = () => {
		//save movie and show arrays to variables
		const shows = this.state.shows;
		const movies = this.state.movies;

		//create counters for completed shows and movies
		let completedShows = 0;
		let completedMovies = 0;

		//create counters for incomplete shows and movies
		let incompleteShows = 0;
		let incompleteMovies = 0;

		//loop through show array to find the total number of completed and incomplete shows
		for (let i = 0; i < shows.length; i++) {
			if (shows[i].status === "Completed") {
				completedShows += 1;
			} else {
				incompleteShows += 1;
			}
		}
		//loop through movie array to find the total number of completed and incomplete movies

		for (let i = 0; i < movies.length; i++) {
			if (movies[i].status === "Completed") {
				completedMovies += 1;
			} else {
				incompleteMovies += 1;
			}
		}

		// save show counters to a variable so we can put them in state
		const showGraphData = [
			{ name: "Completed", value: completedShows },
			{ name: "Incomplete", value: incompleteShows }
		];

		// save movie counters to a variable so we can put them in state
		const movieGraphData = [
			{ name: "Completed", value: completedMovies },
			{ name: "Incomplete", value: incompleteMovies }
		];

		//set our counters to our empty array in state
		this.setState({
			showGraphData: showGraphData,
			movieGraphData: movieGraphData
		});

		//AVERAGES, WIP
		let valuesArray = [];

		for (let i = 0; i < movieGraphData.length; i++) {
			valuesArray.push(movieGraphData[i].value);
		}
		console.log(valuesArray);

		let sum,
			avg = 0;

		if (valuesArray.length) {
			sum = valuesArray.reduce(function(a, b) {
				return a + b;
			});
			avg = sum / valuesArray.length;
		}
		console.log(sum, avg);
	};

	render() {
		//variable for the colors in our pie charts
		const colors = ["#3471eb", "#ebbd34"];

		return (
			<div id="pie-chart-container">
				<Header>Show Completion</Header>
				<PieChart id="show-status-pie-chart" width={400} height={400}>
					<Pie
						dataKey="value"
						isAnimationActive={false}
						data={this.state.showGraphData}
						cx={200}
						cy={200}
						outerRadius={80}
						label
					>
						{this.state.movieGraphData.map((entry, index) => (
							<Cell fill={colors[index]} />
						))}
					</Pie>
					<Tooltip />
				</PieChart>
				<Header>Movie Completion</Header>
				<PieChart id="movie-status-pie-chart" width={400} height={400}>
					<Pie
						dataKey="value"
						isAnimationActive={false}
						data={this.state.movieGraphData}
						cx={200}
						cy={200}
						outerRadius={80}
						label
					>
						{this.state.movieGraphData.map((entry, index) => (
							<Cell fill={colors[index]} />
						))}
					</Pie>
					<Tooltip />
				</PieChart>
			</div>
		);
	}
}
