import React from "react";
import { useState } from "react";
import { bxIcons } from "../../data/icons";
import "./ColorPalette.css";

export const ColorPalette = ({ onClickSetColor }) => {
	const [isPaletteVisible, setIsPaletteVisible] = useState(false);

	const palette = [
		{ color: "red", className: "note__red" },
		{ color: "blue", className: "note__blue" },
		{ color: "green", className: "note__green" },
		{ color: "yellow", className: "note__yellow" },
		{ color: "purple", className: "note__purple" },
		{ color: "cyan", className: "note__cyan" },
	];

	const togglePalette = (e) => {
		const tagName = e.target.tagName;
		console.log(tagName, "palette");
		if (tagName === "LI") {
			setIsPaletteVisible(false);
		}

		if (tagName === "UL") {
			setIsPaletteVisible(true);
		}

		if (tagName === "I") {
			setIsPaletteVisible((v) => !v);
		}
	};

	const handleClick = (e) => {
		togglePalette(e);
		onClickSetColor(e);
	};

	return (
		<button onClick={handleClick} className="btn_note__cta btn__palette">
			{bxIcons.palette}
			{isPaletteVisible ? (
				<div className="note__palette_wrapper">
					<ul className="note__palette">
						{palette.map((c) => {
							return (
								<li
									key={c.color}
									onClick={togglePalette}
									className={c.className}
								></li>
							);
						})}
					</ul>
				</div>
			) : null}
		</button>
	);
};
