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

	const togglePalette = () => {
		setIsPaletteVisible((v) => !v);
	};

	const handleClick = (e) => {
		togglePalette(e);
		onClickSetColor(e);
	};

	const hoverHandler = () => {
		setIsPaletteVisible((v) => !v);
	};

	return (
		<button
			onMouseEnter={hoverHandler}
			onMouseLeave={hoverHandler}
			className="btn_note__cta btn__palette"
		>
			{bxIcons.palette}
			{isPaletteVisible ? (
				<div className="note__palette_wrapper">
					<ul className="note__palette">
						{palette.map((c) => {
							return (
								<li
									key={c.color}
									onClick={handleClick}
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
