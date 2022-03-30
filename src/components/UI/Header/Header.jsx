import { Link, useLocation } from "react-router-dom";
import { CTA, SearchBox } from "../../../components";
import "./Header.css";

export const Header = () => {
	const { pathname } = useLocation();
	return (
		<header className="header">
			<Link className="brand__text grid-center" to="/">
				Magnificent Notes
			</Link>
			{pathname === "/" ? null : <SearchBox />}
			<CTA />
		</header>
	);
};
