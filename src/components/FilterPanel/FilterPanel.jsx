import { useFilter, useNote } from "../../contexts";
import { Filteritem } from "../FilterItem/Filteritem";
import "./FilterPanel.css";

export const FilterPanel = () => {
	const { sortByDate, byPriority, filterDispatch, selectedLabel } = useFilter();

	const {
		noteState: { labelsList },
	} = useNote();

	const sortOptionsDate = ["Newest First", "Newest Last"];

	const filterOptionsPriority = ["All", "High Priority", "Low Priority"];

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
			{/* sortBy */}
			<h3 className="h5 filter__head">Filters</h3>
			<Filteritem
				dispatch={dispatchSortByDate}
				value={sortByDate}
				options={sortOptionsDate}
			/>
			{/* filterBy */}
			<section className="fitler_type__wrapper">
				<Filteritem
					dispatch={dispatchByPriority}
					value={byPriority}
					options={filterOptionsPriority}
				/>
				{/* filterBy */}
			</section>
			<section className="fitler_type__wrapper">
				<Filteritem
					dispatch={dispatchByLabel}
					value={selectedLabel}
					options={filterOptionsLabel}
				/>
			</section>
		</form>
	);
};
