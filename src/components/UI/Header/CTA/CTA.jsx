import "./CTA.css";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { ThemeToggle } from "../../ThemeToggle/ThemeToggle";

export const CTA = () => {
	const { pathname } = useLocation();

	const isLandingPage = (() => pathname === "/")();
	const isLoginPage = (() => pathname === "/login")();
	const getBtnName = (() =>
		false ? "Logout" : pathname === "/login" ? "Sign Up" : "Login")();
	const getBtnIcon = (() =>
		false ? (
			<i className="bx bx-log-out"></i>
		) : isLoginPage ? (
			<i className="bx bx-user-plus"></i>
		) : (
			<i className="bx bx-log-in"></i>
		))();
	const getLinkPath = (() =>
		false ? "/" : pathname === "/login" ? "/signup" : "/login")();

	return (
		<div className="header__nav_btns">
			{isLandingPage ? null : (
				<Link className="btn btn--primary btn--icon" to={getLinkPath}>
					{getBtnName}
					{getBtnIcon}
				</Link>
			)}

			<ThemeToggle />
		</div>
	);
};
