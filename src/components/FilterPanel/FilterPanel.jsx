import { useFilter, useNote } from "../../contexts";
import "./FilterPanel.css";

export const FilterPanel = () => {
	const {
		sortByDate,
		byPriority,
		filterDispatch,
		selectedLabel,
	} = useFilter();
	const { noteState } = useNote();
	const { labelsList } = noteState;
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
			<section className="fitler_type__wrapper">
				<h3 className="h6 filter__head">Date</h3>

				<select
					onChange={dispatchSortByDate}
					className="select select--sort_by"
					value={sortByDate}
				>
					{sortOptionsDate.map((option, index) => (
						<option key={index} className="option input_box">
							{option}
						</option>
					))}
				</select>
			</section>
			{/* filterBy */}
			<section className="fitler_type__wrapper">
				<h3 className="h6 filter__head">Priority</h3>
				<select
					onChange={dispatchByPriority}
					className="select select--filter_by"
					value={byPriority}
				>
					{filterOptionsPriority.map((option, index) => (
						<option key={index} className="option input_box">
							{option}
						</option>
					))}
				</select>
			</section>
			<section className="fitler_type__wrapper">
				<h3 className="h6 filter__head">Labels</h3>
				<select
					onChange={dispatchByLabel}
					value={selectedLabel}
					className="select select--filter_by"
				>
					{filterOptionsLabel.map((option, index) => (
						<option key={index} className="option input_box">
							{option}
						</option>
					))}
				</select>
			</section>
			{/* select label */}
		</form>
	);
};
