import React, { Component } from "react";

import { Card, Icon, Image, Button } from 'semantic-ui-react'

class ShowCard extends Component {
	render() {
		return (
			<>
				<Card>
					<Image src="https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fpeopledotcom.files.wordpress.com%2F2019%2F09%2Fgrizzly-bear.jpg&w=400&c=sc&poi=face&q=85" wrapped ui={false} />
					<Card.Content>
						<Card.Header>Matthew</Card.Header>
						<Card.Meta>
							<span className="date">Joined in 2015</span>
						</Card.Meta>
						<Card.Description>
							Matthew is a musician living in Nashville.
						</Card.Description>
					</Card.Content>
					<Card.Content extra>
						<a href="hi.com">
							<Icon name="user" />
							22 Friends
						</a>
					</Card.Content>
				</Card>
			</>
		);
	}
}

export default ShowCard;
