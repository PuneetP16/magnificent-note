import "./CTA.css";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { ThemeToggle } from "../../ThemeToggle/ThemeToggle";
import { useAuth } from "../../../../contexts";
import { bxIcons } from "../../../../data/icons";

export const CTA = () => {
	const { isAuth, toggleAuth } = useAuth();

	const { pathname } = useLocation();

	const onClickHandler = () => {
		if (isAuth) {
			localStorage.removeItem("noteToken");
			toggleAuth();
		}
	};

	const isLandingPage = (() => pathname === "/")();
	const isLoginPage = (() => pathname === "/login")();
	const getBtnName = (() =>
		isAuth ? "Logout" : pathname === "/login" ? "Sign Up" : "Login")();
	const getBtnIcon = (() =>
		isAuth ? bxIcons.logout : isLoginPage ? bxIcons.userPlus : bxIcons.login)();
	const getLinkPath = (() =>
		isAuth ? "/" : pathname === "/login" ? "/signup" : "/login")();

	return (
		<div className="header__nav_btns">
			{isLandingPage ? null : (
				<Link
					onClick={onClickHandler}
					className="btn btn--primary btn--icon"
					to={getLinkPath}
				>
					{getBtnName}
					{getBtnIcon}
				</Link>
			)}

			<ThemeToggle />
		</div>
	);
};
