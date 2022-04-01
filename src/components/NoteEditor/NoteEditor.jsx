import { useState } from "react";
import { IcRoundAddCircleOutline } from "../../data/Icon";
import { bxIcons } from "../../data/icons";
import { ResizableTextArea } from "../UI/Input/ResizableTextArea";
import "./NoteEditor.css";

export const NoteEditor = ({ isPaletteVisible }) => {
	const [noteColor, setNoteColor] = useState("note__blue");

	const emptyNoteObj = {
		title: "",
		body: "",
	};
	const [noteObj, setNoteObj] = useState(emptyNoteObj);
	const palette = [
		{ color: "red", className: "note__red" },
		{ color: "blue", className: "note__blue" },
		{ color: "green", className: "note__green" },
		{ color: "yellow", className: "note__yellow" },
		{ color: "purple", className: "note__purple" },
		{ color: "cyan", className: "note__cyan" },
	];

	const setColor = (e) => {
		const tagName = e.target.tagName;
		if (tagName === "LI") {
			let selectedClass = e.target.className;
			setNoteColor(selectedClass);
		}
	};

	const inputChangeHandler = (e) => {
		let key = e.target.name;
		let value = e.target.value;
		setNoteObj((note) => ({ ...note, [key]: value }));
	};

	const saveNote = () => {
		console.log(noteObj);
		setNoteObj(emptyNoteObj);
	};

	const onSubmitHandler = (e) => {
		// Will update in Next PR
		console.log("clicked");
	};

	return (
		<div className={`note ${noteColor} `}>
			<button className="btn_note__cta btn__pin_it">{bxIcons.pin}</button>
			<div className="note__body">
				<form onSubmit={onSubmitHandler} className="note__form">
					<input
						value={noteObj.title}
						name="title"
						type="text"
						className="note__heading input"
						placeholder="Note Title.."
						onChange={inputChangeHandler}
						required
					/>
					<ResizableTextArea
						placeholder="Note Body"
						rows="2"
						className="note__textarea"
						name="body"
						onChange={inputChangeHandler}
						value={noteObj.body}
					/>
				</form>
			</div>
			<div className="note__footer">
				<div className="note__created_date">Created on 31/03/2022</div>
				<div className="note__cta">
					<button onClick={setColor} className="btn_note__cta btn__palette">
						{bxIcons.palette}
						{isPaletteVisible ? (
							<div className="note__palette_wrapper">
								<ul className="note__palette">
									{palette.map((c) => {
										return <li key={c.color} className={c.className}></li>;
									})}
								</ul>
							</div>
						) : null}
					</button>

					<button className="btn_note__cta btn__label">{bxIcons.label}</button>
					<button className="btn_note__cta btn__archive_in">
						{bxIcons.archiveIn}
					</button>
					<button className="btn_note__cta btn__trash_alt">
						{bxIcons.trashAlt}
					</button>
					<button onClick={saveNote} className="btn_note__cta btn__trash_alt">
						<IcRoundAddCircleOutline />
					</button>
				</div>
			</div>
		</div>
	);
};
