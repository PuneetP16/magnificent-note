import { Link } from "react-router-dom";
import "./Landing.css";
import hero from "../../data/image/hero.svg";
import { useDocumentTitle } from "../../customHooks";
import { ThemeToggle } from "../../components";
import { useAuth } from "../../contexts";
export const Landing = () => {
	useDocumentTitle("Landing | MS");

	const { isAuth } = useAuth();

	const getBtnText = (() => (isAuth ? "Create New Note" : "Join Now"))();

	const getLinkPath = (() => (isAuth ? "/home" : "/signup"))();

	return (
		<div className="landing_page main">
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
			<section className="hero_section">
				<img className="hero_img" src={hero} alt="hero" />
			</section>
			<div className="theme_Btn">
				<ThemeToggle />
			</div>
		</div>
	);
};
