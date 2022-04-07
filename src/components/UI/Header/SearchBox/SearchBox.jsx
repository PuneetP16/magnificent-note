import { useLocation } from "react-router-dom";
import { bxIcons } from "../../../../data/icons";
import "./SearchBox.css";

export const SearchBox = () => {
	const { pathname } = useLocation();
	const visibility = (() =>
		pathname === "/login" || pathname === "/signup" ? "invisible" : "")();
	const onClickSearchHandler = (e) => e.preventDefault();
	return (
		<form className={`search_box ${visibility}`} method="get">
			<input
				type="text"
				className="input_box"
				placeholder="Search for items"
				required=""
			/>

			<button
				type="submit"
				onClick={onClickSearchHandler}
				className="btn btn--primary btn--icon"
			>
				{bxIcons.searchAlt2}
			</button>
		</form>
	);
};
