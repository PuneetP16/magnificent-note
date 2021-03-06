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
		isAuth ? (
			<i className="bx bx-log-out"></i>
		) : isLoginPage ? (
			<i className="bx bx-user-plus"></i>
		) : (
			<i className="bx bx-log-in"></i>
		))();
	const getLinkPath = (() =>
		isAuth ? "/" : pathname === "/login" ? "/signup" : "/login")();

	return (
		<div className="header__nav_btns">
			{isLandingPage ? null : (
				<Link
					onClick={onClickHandler}
					className={`btn btn--primary btn--icon auth__btn ${
						isAuth ? "auth__btn--logout" : ""
					}`}
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
