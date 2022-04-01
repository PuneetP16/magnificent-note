import { Link } from "react-router-dom";
import { useAuth } from "../../../../contexts";
import "./Content.css";

export const Content = () => {
	const { isAuth } = useAuth();

	const getBtnText = isAuth ? "Create New Note" : "Join Now";

	const getLinkPath = isAuth ? "/home" : "/signup";

	return (
		<section className="content_section">
			<div className="app_name h1">
				<span className="color--primary">Magnificent</span> Notes
			</div>
			<div className="app_tagline h4">
				Meet your modern
				<br />
				<span className="color--primary_dark"> Note Taking App</span>
			</div>
			<div className="app_decription h5">
				Manage your daily tasks and workflow in a modern way and boost your
				efficiency without any efforts
			</div>

			<Link to={getLinkPath}>
				<button className="btn btn--primary authbtn">{getBtnText}</button>
			</Link>
			<Link to="/login" className="authlink link_reset h6">
				{isAuth ? null : "Already have an account?"}
			</Link>
		</section>
	);
};
