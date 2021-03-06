import { useFilter, useNote } from "../../contexts";
import { bxIcons } from "../../data/icons";
import { Filteritem } from "../FilterItem/Filteritem";
import "./FilterPanel.css";
import "./FilterPanelMobile.css";

export const FilterPanel = () => {
	const {
		sortByDate,
		byPriority,
		filterDispatch,
		selectedLabel,
		initialFilterState,
	} = useFilter();

	const {
		noteState: { labelsList },
	} = useNote();

	const sortOptionsDate = ["Newest First", "Newest Last"];
	const filterOptionsPriority = [
		"All",
		"High Priority",
		"Medium Priority",
		"Low Priority",
	];

	const filterOptionsLabel =
		labelsList.length > 0 ? labelsList : ["Filter by label"];

	const dispatchSortByDate = (sortDateEvent) => {
		filterDispatch({
			type: "SORT_BY_DATE",
			payload: sortDateEvent.target.value,
		});
	};

	const dispatchByPriority = (priorityEvent) => {
		filterDispatch({
			type: "BY_PRIORITY",
			payload: priorityEvent.target.value,
		});
	};

	const dispatchByLabel = (labelEvent) => {
		filterDispatch({
			type: "BY_LABEL",
			payload: labelEvent.target.value,
		});
	};

	return (
		<form className="filter_panel">
			<section className="filter__header">
				<h3 className="h5 filter__head">
					<span>{bxIcons.filterAlt} </span>
					Filters
				</h3>
				<button
					onClick={(e) => {
						e.preventDefault();
						filterDispatch({ type: "RESET", payload: initialFilterState });
					}}
					className="filter--reset"
				>
					Clear All
				</button>
			</section>
			<Filteritem
				dispatch={dispatchSortByDate}
				value={sortByDate}
				options={sortOptionsDate}
				type="Date"
			/>
			<Filteritem
				dispatch={dispatchByPriority}
				value={byPriority}
				options={filterOptionsPriority}
				type="Priority"
			/>
			<Filteritem
				dispatch={dispatchByLabel}
				value={selectedLabel}
				options={filterOptionsLabel}
				type="Labels"
			/>
		</form>
	);
};
