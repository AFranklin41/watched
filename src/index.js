import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import Watched from "./components/Watched";


ReactDOM.render(
	<Router>
		<Watched />
	</Router>,
	document.getElementById("root")
);
