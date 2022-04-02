import { useNote } from "../../contexts";
import { bxIcons } from "../../data/icons";
import "./NoteListing.css";
import { useAxios } from "../../customHooks";
import { ColorPalette } from "../ColorPalette/ColorPalette";
import { MdiRestore } from "../../data/Icon";

export const NoteListing = ({ list, isPinSection, isTrash, isArchive }) => {
	const {
		updateNote,
		deleteNote,
		restoreNote,
		archiveNote,
		deleteArchivedNote,
		setIsEditable,
		noteDispatch,
		setBodyText,
	} = useNote();
	const { axiosRequest } = useAxios();

	const setColor = (e, note) => {
		const tagName = e.target.tagName;
		if (tagName === "LI") {
			let selectedClass = e.target.className;
			note.noteColor = selectedClass;
			updateNote(axiosRequest, note);
		}
	};

	const archiveToggleFromNoteList = (note) => {
		archiveNote(axiosRequest, note, isArchive);
	};

	const deleteToggleFromList = (note) => {
		if (isArchive) {
			deleteArchivedNote(axiosRequest, note);
		} else {
			isTrash
				? restoreNote(axiosRequest, note)
				: deleteNote(axiosRequest, note);
		}
	};

	const togglePinFromNoteList = (note) => {
		note.isPinned = !note.isPinned;
		updateNote(axiosRequest, note);
	};

	const editNote = (note) => {
		setIsEditable(true);
		noteDispatch({ type: "EDITABLE", payload: note });
		setBodyText(note.body);
	};

	return list.map((note, i) => {
		const { _id, title, body, noteColor, dateCreated } = note;

		const toggleArchiveBtn = isArchive ? bxIcons.archiveOut : bxIcons.archiveIn;
		const toggleTrashBtn = isTrash ? <MdiRestore /> : bxIcons.trashAlt;
		const togglePinBtn = isPinSection ? bxIcons.pinned : bxIcons.pin;

		return (
			<li key={_id} className={`note ${noteColor} note--displayed `}>
				<button
					onClick={() => togglePinFromNoteList(note)}
					className="btn_note__cta btn__pin_it"
				>
					{togglePinBtn}
				</button>
				<div className="note__body">
					<div className="note__title">{title}</div>
					<div
						className="note__content"
						dangerouslySetInnerHTML={{ __html: body }}
					/>
				</div>
				<div className="note__footer">
					<div className="note__created_date">Date: {dateCreated}</div>
					<div className="note__cta">
						{isTrash || isArchive ? null : (
							<ColorPalette onClickSetColor={(e) => setColor(e, note)} />
						)}
						<button className="btn_note__cta btn__label">
							{bxIcons.label}
						</button>
						{isTrash ? null : (
							<button
								onClick={() => archiveToggleFromNoteList(note)}
								className="btn_note__cta btn__archive_in"
							>
								{toggleArchiveBtn}
							</button>
						)}
						<button
							onClick={() => deleteToggleFromList(note)}
							className="btn_note__cta btn__trash_alt"
						>
							{toggleTrashBtn}
						</button>

						{isTrash || isArchive ? null : (
							<button
								onClick={() => editNote(note)}
								className="btn_note__cta btn__trash_alt"
							>
								{bxIcons.edit}
							</button>
						)}
					</div>
				</div>
			</li>
		);
	});
};
