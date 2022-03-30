import "./CTA.css";
import { Link } from "react-router-dom";
import { ThemeToggle } from "../../ThemeToggle/ThemeToggle";

export const CTA = () => {
	return (
		<div className="header__nav_btns">
			<Link className="btn btn--primary btn--icon" to="/">
				Login
				<i className="bx bx-log-in"></i>
			</Link>
			<ThemeToggle />
		</div>
	);
};
