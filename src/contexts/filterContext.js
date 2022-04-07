import { useContext, createContext, useReducer, useEffect } from "react";

const FilterContext = createContext();

export const useFilter = () => useContext(FilterContext);

const filterReducer = (
	{ sortByDate, category, byPriority, selectedLabel, search },
	{ type, payload }
) => {
	switch (type) {
		case "SORT_BY_DATE":
			sortByDate = payload;
			return {
				sortByDate,
				byPriority,
				category,
				selectedLabel,
				search,
			};

		case "BY_PRIORITY":
			byPriority = payload;
			return {
				sortByDate,
				byPriority,
				category,
				selectedLabel,
				search,
			};

		case "BY_LABEL":
			selectedLabel = payload;
			return {
				sortByDate,
				byPriority,
				category,
				selectedLabel,
				search,
			};

		case "SEARCH":
			search = payload;
			return {
				sortByDate,
				byPriority,
				category,
				selectedLabel,
				search,
			};

		case "RESET":
			return { ...payload };

		default:
			return {
				sortByDate,
				byPriority,
				category,
				selectedLabel,
				search,
			};
	}
};

export const FilterProvider = ({ children }) => {
	const initialFilterState = {
		sortByDate: "Newest First",
		byPriority: "All",
		selectedLabel: "All",
		search: "",
	};

	const [filterState, filterDispatch] = useReducer(
		filterReducer,
		initialFilterState
	);

	const { sortByDate, category, byPriority, selectedLabel, search } =
		filterState;

	const value = {
		filterDispatch,
		sortByDate,
		category,
		selectedLabel,
		byPriority,
		initialFilterState,
		search,
	};

	useEffect(() => {
		filterDispatch({
			type: "SORT_BY_DATE",
			payload: sortByDate,
		});
	}, [filterDispatch, sortByDate]);

	return (
		<FilterContext.Provider value={value}>{children}</FilterContext.Provider>
	);
};
