import React from "react";

export const Filteritem = ({ dispatch, value, options }) => {
	return (
		<section className="fitler_type__wrapper">
			<h3 className="h6 filter__head">Date</h3>

			<select
				onChange={dispatch}
				className="select select--sort_by"
				value={value}
			>
				{options.map((option, index) => (
					<option key={index} className="option input_box">
						{option}
					</option>
				))}
			</select>
		</section>
	);
};
