import "./NoteListing.css";
import { useNote } from "../../contexts";
import { bxIcons } from "../../data/icons";
import { useAxios } from "../../customHooks";
import { MdiRestore } from "../../data/Icon";
import { useLocation } from "react-router-dom";
import { Note } from "../Note/Note";

export const NoteListing = ({ list, isPinSection }) => {
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

	const { pathname } = useLocation();
	const isTrashPage = pathname === "/trash";
	const isArchivePage = pathname === "/archive";

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
		archiveNote(axiosRequest, note, isArchivePage);
	};

	const deleteToggleFromList = (note) => {
		if (isArchivePage) {
			deleteArchivedNote(axiosRequest, note);
		} else {
			isTrashPage
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

	const toggleArchiveBtn = isArchivePage
		? bxIcons.archiveOut
		: bxIcons.archiveIn;
	const toggleTrashBtn = isTrashPage ? <MdiRestore /> : bxIcons.trashAlt;
	const togglePinBtn = isPinSection ? bxIcons.pinned : bxIcons.pin;

	return list.map((note, i) => {
		return (
			<Note
				key={note._id}
				togglePinFromNoteList={togglePinFromNoteList}
				note={note}
				togglePinBtn={togglePinBtn}
				setColor={setColor}
				archiveToggleFromNoteList={archiveToggleFromNoteList}
				toggleArchiveBtn={toggleArchiveBtn}
				deleteToggleFromList={deleteToggleFromList}
				toggleTrashBtn={toggleTrashBtn}
				editNote={editNote}
			/>
		);
	});
};
