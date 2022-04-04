import "./FilterPanel.css";

export const FilterPanel = (labels) => {
	const sortOptionsDate = ["Newest First", "Newest Last"];

	const filterOptionsPriority = ["High Priority", "Low Priority"];

	const filterOptionsLabel = ["Label1", "Label2"];

	return (
		<form className="filter_panel">
			{/* sortBy */}
			<h3 className="h5 filter__head">Filters</h3>
			<section className="fitler_type__wrapper">
				<h3 className="h5 filter__head">Sort by Date</h3>
				<select
					onChange={() => console.log("")}
					className="select select--sort_by"
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
				<h3 className="h5 filter__head">Filter by Priority</h3>
				<select
					onChange={() => console.log("")}
					className="select select--filter_by"
				>
					{filterOptionsPriority.map((option, index) => (
						<option key={index} className="option input_box">
							{option}
						</option>
					))}
				</select>
			</section>

			<section className="fitler_type__wrapper">
				<h3 className="h5 filter__head">Filter by Label</h3>
				<select
					onChange={() => console.log("")}
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
