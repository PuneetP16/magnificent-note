import React from "react";
import { useState } from "react";
import { useNote } from "../../contexts";
import "./NoteLabel.css";

export const NoteLabel = () => {
	const { noteDispatch } = useNote();
	const [noteLabel, setNoteLabel] = useState("");

	const noteLabelHandler = (e) => {
		console.log(e.target.name, e.target.value);
		setNoteLabel(e.target.value.toLowerCase());
	};

	const setNoteLabelHandler = (e) => {
		e.preventDefault();
		console.log(noteLabel);
		noteDispatch({
			type: "SET_LABEL",
			payload: noteLabel,
		});
		setNoteLabel("");
	};

	return (
		<form onSubmit={setNoteLabelHandler} className="note_label__form">
			<input
				autoFocus
				type="text"
				name="label"
				value={noteLabel}
				placeholder="Add Label.."
				onChange={noteLabelHandler}
				className="input note_label__input"
			/>
		</form>
	);
};
