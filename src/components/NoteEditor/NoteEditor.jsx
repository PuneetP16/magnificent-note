import { useNote } from "../../contexts";
import { IcRoundAddCircleOutline } from "../../data/Icon";
import { bxIcons } from "../../data/icons";
import { ResizableTextArea } from "../UI/Input/ResizableTextArea";
import "./NoteEditor.css";
import { useState } from "react";
import { Alert } from "../UI/Alert/Alert";
import { useAxios } from "../../customHooks";

export const NoteEditor = () => {
	const { noteState, noteDispatch, inititalNoteObj, palette, addToNoteList } =
		useNote();
	const { noteObj } = noteState;
	const { noteColor, dateCreated } = noteObj;

	const { axiosRequest } = useAxios();
	const [isPaletteVisible, setIsPaletteVisible] = useState(false);

	const [alert, setAlert] = useState({
		visibility: false,
		text: "",
		type: "",
	});

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

	const setColor = (e) => {
		const tagName = e.target.tagName;
		if (tagName === "LI") {
			let selectedClass = e.target.className;

			noteDispatch({
				type: "COLOR",
				payload: selectedClass,
			});
		}
	};

	const inputChangeHandler = (e) => {
		let key = e.target.name;
		let value = e.target.value;
		noteDispatch({
			type: "INPUT_CHANGE",
			payload: { key, value },
		});
	};

	const saveNote = () => {
		if (noteObj.title === "" && noteObj.body === "") {
			setAlert({
				visibility: true,
				text: "Enter text before saving the note",
				type: "alert--danger",
			});
		} else {
			addToNoteList(axiosRequest, noteObj);

			noteDispatch({
				type: "RESET",
				payload: inititalNoteObj,
			});
		}
	};

	return (
		<>
			<Alert alert={alert} setAlert={setAlert} />
			<div
				onClick={(e) => removeModalHandler(e)}
				className={`note ${noteColor} `}
			>
				<button className="btn_note__cta btn__pin_it">{bxIcons.pin}</button>
				<div className="note__body">
					<form className="note__form">
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
							required
						/>
					</form>
				</div>
				<div className="note__footer">
					<div className="note__created_date">Date: {dateCreated}</div>
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

						<button className="btn_note__cta btn__label">
							{bxIcons.label}
						</button>
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
		</>
	);
};
