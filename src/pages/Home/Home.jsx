import React from "react";
import { Aside, NoteEditor, NoteListing } from "../../components";
import "./Home.css";
import { useState } from "react";

export const Home = () => {
	const [isPaletteVisible, setIsPaletteVisible] = useState(false);

	const removeModalHandler = (e) => {
		const isPaletteIcon = e.target.className === "bx bx-palette";
		const isPalette = e.target.className === "note__palette";

		if (isPaletteIcon) {
			setIsPaletteVisible((w) => !w);
		}

		if (isPaletteVisible) {
			if (!isPalette) {
				setIsPaletteVisible((w) => !w);
			}
			if (isPalette) {
				setIsPaletteVisible(true);
			}
			if (isPaletteIcon) {
				setIsPaletteVisible((w) => !w);
			}
		}
	};

	return (
		<div onClick={(e) => removeModalHandler(e)} className="home_page">
			<main className="main--home_page">
				<Aside />
				<section className="note_section">
					<div className="note_container">
						<div>Pinned</div>
						<NoteEditor
							isPaletteVisible={isPaletteVisible}
							setIsPaletteVisible={setIsPaletteVisible}
						/>
						<NoteListing />
					</div>
				</section>
			</main>
		</div>
	);
};
