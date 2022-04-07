import { bxIcons } from "../../../../data/icons";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useFilter } from "../../../../contexts";
import "./SearchBox.css";

export const SearchBoxMobile = () => {
	const { pathname } = useLocation();
	const visibility = (() =>
		pathname === "/login" || pathname === "/signup" || pathname === "/"
			? "invisible"
			: "")();
	const { filterDispatch, initialFilterState } = useFilter();

	const [query, setQuery] = useState("");
	const navigate = useNavigate();

	const onChangeSearchHandler = (e) => {
		setQuery(e.target.value);
	};

	useEffect(() => {
		if (query) {
			filterDispatch({ type: "SEARCH", payload: query });
		} else {
			filterDispatch({ type: "RESET", payload: initialFilterState });
		}
	}, [query]);

	const passQuery = (e) => {
		e.preventDefault();
		if (query) {
			navigate(`/home/search?query=${query}`);
			setQuery("");
		} else {
			navigate("/home");
			setQuery("");
		}
	};

	return (
		<form
			onSubmit={passQuery}
			className={`${visibility} search_on_mobile`}
			method="get"
		>
			<input
				type="search"
				className="input_box"
				placeholder="Search for items"
				required
				value={query}
				onChange={onChangeSearchHandler}
			/>

			<button
				type="submit"
				onClick={passQuery}
				className="btn btn--primary btn--icon"
			>
				{bxIcons.searchAlt2}
			</button>
		</form>
	);
};
