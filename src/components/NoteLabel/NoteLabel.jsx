import React from "react";
import { useState } from "react";
import { useNote } from "../../contexts";
import "./NoteLabel.css";

export const NoteLabel = ({ setShowLabel }) => {
	const { noteDispatch, noteState } = useNote();

	const {
		noteObj: { noteColor },
	} = noteState;

	const [noteLabel, setNoteLabel] = useState("");

	const noteLabelHandler = (e) => {
		setNoteLabel(e.target.value.toLowerCase());
	};

	const setNoteLabelHandler = (e) => {
		e.preventDefault();
		if (noteLabel.trim() === "") {
		} else {
			noteDispatch({
				type: "SET_LABEL",
				payload: noteLabel,
			});
			setNoteLabel("");
		}
	};

	return (
		<>
			<form
				onSubmit={setNoteLabelHandler}
				className={`note_label__form ${noteColor}`}
				onMouseEnter={() => setShowLabel(true)}
				onMouseLeave={() => setShowLabel(false)}
			>
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
		</>
	);
};
