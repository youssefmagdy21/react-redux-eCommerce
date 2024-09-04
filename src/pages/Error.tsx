import { Link, useRouteError, isRouteErrorResponse } from "react-router-dom";
import { Container } from "react-bootstrap";

const Error = () => {
	// to access the error thrown by react router
	const error = useRouteError();
	let errorStatus: number;
	let errorStatusText: string;

	if (isRouteErrorResponse(error)) {
		// in case of an error thrown by react router dom automatically or using throw new Response
		errorStatus = error.status;
		errorStatusText = error.statusText;
	} else {
		// in case of an unknown error to react router dom
		errorStatus = 404;
		errorStatusText = "Page Not Found";
	}

	return (
		<Container className="notFound">
			<h1>{errorStatus}</h1>
			<p>{errorStatusText}</p>
			<Link to="/" replace={true}>
				Looks like you've got a little of the route! <br />
				How about going back to safety?
			</Link>
		</Container>
	);
};

export default Error;
