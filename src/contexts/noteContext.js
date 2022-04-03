import { useContext, createContext, useReducer } from "react";
import { useState } from "react";
import { noteReducer } from "../reducers";

const NoteContext = createContext();

export const useNote = () => useContext(NoteContext);

export const NoteProvider = ({ children }) => {
	const currentDate = new Date().toLocaleDateString();

	const inititalNoteObj = {
		title: "",
		noteColor: "note__blue",
		dateCreated: currentDate,
		isPinned: false,
		labels: [],
	};

	const initialNoteState = {
		noteList: [],
		trashList: [],
		archiveList: [],
		noteObj: inititalNoteObj,
	};

	const [isEditable, setIsEditable] = useState(false);

	const [bodyText, setBodyText] = useState("");

	const [noteState, noteDispatch] = useReducer(noteReducer, initialNoteState);

	// Note services Start

	const addToNoteList = async (axiosRequest, note) => {
		try {
			const addToNoteListURL = "/api/notes";
			const { output } = await axiosRequest({
				method: "POST",
				url: addToNoteListURL,
				resKey: "notes",
				data: { note: note },
			});
			noteDispatch({ type: "SAVE", payload: output });
		} catch (error) {
			console.log("from addToNoteList", error);
		}
	};

	const updateNote = async (axiosRequest, note) => {
		const { _id } = note;
		try {
			const updateNoteURL = `/api/notes/${_id}`;
			const { output } = await axiosRequest({
				method: "POST",
				url: updateNoteURL,
				resKey: "notes",
				data: { note: note },
			});

			noteDispatch({ type: "UPDATE", payload: output });
		} catch (error) {
			console.log("from addToNoteList", error);
		}
	};

	const deleteNote = async (axiosRequest, note) => {
		const { _id } = note;
		try {
			const deleteNoteURL = `/api/notes/${_id}`;
			const { output } = await axiosRequest({
				method: "DELETE",
				url: deleteNoteURL,
				resKey: "notes",
				data: { note: note },
			});

			noteDispatch({ type: "DELETE", payload: output, note: note });
		} catch (error) {
			console.log("from addToNoteList", error);
		}
	};

	const restoreNote = async (axiosRequest, note) => {
		try {
			const addToNoteListURL = "/api/notes";
			const { output } = await axiosRequest({
				method: "POST",
				url: addToNoteListURL,
				resKey: "notes",
				data: { note: note },
			});

			noteDispatch({ type: "RESTORE", payload: output, note: note });
		} catch (error) {
			console.log("from addToNoteList", error);
		}
	};

	const archiveNote = async (axiosRequest, note, isArchive) => {
		try {
			const archiveNoteListURL = `/api/notes/archives/${note._id}`;
			const archiveRestoreNoteListURL = `/api/archives/restore/${note._id}`;
			const URL = isArchive ? archiveRestoreNoteListURL : archiveNoteListURL;
			const { output, response } = await axiosRequest({
				method: "POST",
				url: URL,
				resKey: "archives",
				data: { note: note },
			});
			const { notes } = response;
			console.log({ response });

			noteDispatch({ type: "ARCHIVE", payload: output, notes: notes });
		} catch (error) {
			console.log("from addToNoteList", error);
		}
	};

	const deleteArchivedNote = async (axiosRequest, note) => {
		const { _id } = note;
		try {
			const deleteArchiveNoteURL = `/api/archives/delete/${_id}`;
			const { output } = await axiosRequest({
				method: "DELETE",
				url: deleteArchiveNoteURL,
				resKey: "archives",
				data: { note: note },
			});

			noteDispatch({
				type: "DELETE_FROM_ARCHIVE",
				payload: output,
				note: note,
			});
		} catch (error) {
			console.log("from addToNoteList", error);
		}
	};

	// Note services END

	const value = {
		noteState,
		noteDispatch,
		inititalNoteObj,
		addToNoteList,
		updateNote,
		deleteNote,
		restoreNote,
		archiveNote,
		deleteArchivedNote,
		bodyText,
		setBodyText,
		isEditable,
		setIsEditable,
	};
	return <NoteContext.Provider value={value}>{children}</NoteContext.Provider>;
};
