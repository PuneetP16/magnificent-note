import { useNote } from "../../contexts";
import { bxIcons } from "../../data/icons";
import "./NoteListing.css";
import { useAxios } from "../../customHooks";
import { ColorPalette } from "../ColorPalette/ColorPalette";
import { MdiRestore } from "../../data/Icon";

export const NoteListing = ({ noteList, isPinSection }) => {
	const { updateNote } = useNote();
	const { axiosRequest } = useAxios();
	const setColor = (e, note) => {
		const tagName = e.target.tagName;
		if (tagName === "LI") {
			let selectedClass = e.target.className;
			note.noteColor = selectedClass;

			updateNote(axiosRequest, note);
		}
	};

	const deleteToggleFromNoteList = (note) => {
		if (note.isPinned) {
			note.isPinned = false;
		}
		note.isTrash = !note.isTrash;
		updateNote(axiosRequest, note);
	};

	const togglePinFromNoteList = (note) => {
		note.isPinned = !note.isPinned;
		updateNote(axiosRequest, note);
	};

	// const removeModalHandler = (e) => {
	// 	const isPaletteIcon = e.target.className === "bx bx-palette";
	// 	const isPalette = e.target.className === "note__palette";

	// 	if (isPaletteIcon) {
	// 		setIsPaletteVisible((w) => !w);
	// 	}

	// 	if (isPaletteVisible) {
	// 		if (!isPalette) {
	// 			setIsPaletteVisible((w) => !w);
	// 		}
	// 		if (isPalette) {
	// 			setIsPaletteVisible(true);
	// 		}
	// 		if (isPaletteIcon) {
	// 			setIsPaletteVisible((w) => !w);
	// 		}
	// 	}
	// };

	return noteList.map((note, i) => {
		const { _id, title, body, noteColor, dateCreated } = note;
		const isInTrash = note.isTrash;
		const toggleAddorDeleteBtn = isInTrash ? <MdiRestore /> : bxIcons.trashAlt;
		const togglePinBtn = isPinSection ? bxIcons.pinned : bxIcons.pin;
		return (
			<li
				key={_id}
				// onClick={(e) => removeModalHandler(e, _id)}
				className={`note ${noteColor} note--displayed `}
			>
				<button
					onClick={() => togglePinFromNoteList(note)}
					className="btn_note__cta btn__pin_it"
				>
					{togglePinBtn}
				</button>
				<div className="note__body">
					<div className="note__title">{title}</div>
					<div className="note__content">{body}</div>
				</div>
				<div className="note__footer">
					<div className="note__created_date">Date: {dateCreated}</div>
					<div className="note__cta">
						<ColorPalette onClickSetColor={(e) => setColor(e, note)} />

						<button className="btn_note__cta btn__label">
							{bxIcons.label}
						</button>
						<button className="btn_note__cta btn__archive_in">
							{bxIcons.archiveIn}
						</button>
						<button
							onClick={() => deleteToggleFromNoteList(note)}
							className="btn_note__cta btn__trash_alt"
						>
							{toggleAddorDeleteBtn}
						</button>
						{/* <button onClick={saveNote} className="btn_note__cta btn__trash_alt">
							<IcRoundAddCircleOutline />
						</button> */}
					</div>
				</div>
			</li>
		);
	});
};
