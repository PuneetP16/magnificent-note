import { useContext, createContext, useReducer } from "react";
import { useState, useEffect } from "react";
import { noteReducer } from "../reducers";

const NoteContext = createContext();

export const useNote = () => useContext(NoteContext);

export const NoteProvider = ({ children }) => {
	// const currentDate = new Date().toLocaleDateString();

	function generateRandomDate() {
		return new Date(+new Date() - Math.floor(Math.random() * 10000000000));
	}

	// Just for review purpose generated random dates to show working of sort by date functionality

	const currentDate = new generateRandomDate().toLocaleDateString("en-IN");
	const currentDate2 = new generateRandomDate().toLocaleDateString("en-IN");
	const currentDate3 = new generateRandomDate().toLocaleDateString("en-IN");
	const currentDate4 = new generateRandomDate().toLocaleDateString("en-IN");
	const currentDate5 = new generateRandomDate().toLocaleDateString("en-IN");
	const currentDate6 = new generateRandomDate().toLocaleDateString("en-IN");
	const currentDate7 = new generateRandomDate().toLocaleDateString("en-IN");

	const inititalNoteObj = {
		title: "",
		noteColor: "note__blue",
		dateCreated: currentDate,
		isPinned: false,
		labels: [],
		priority: "Low Priority",
	};

	const initialNoteState = {
		noteList: [
			// Just for review purpose generated random notes to show working of sort and filter functionality

			{
				_id: 1,
				title: "1",
				noteColor: "note__blue",
				dateCreated: currentDate,
				isPinned: false,
				labels: ["study"],
				priority: "Low Priority",
			},
			{
				_id: 2,
				title: "2",
				noteColor: "note__red",
				dateCreated: currentDate2,
				isPinned: false,
				labels: ["game", "productivity", "study"],
				priority: "High Priority",
			},
			{
				_id: 3,
				title: "3",
				noteColor: "note__purple",
				dateCreated: currentDate3,
				isPinned: false,
				labels: ["game", "productivity", "badminton"],
				priority: "Low Priority",
			},
			{
				_id: 4,
				title: "4",
				noteColor: "note__red",
				dateCreated: currentDate4,
				isPinned: false,
				labels: ["game", "study", "chess"],
				priority: "High Priority",
			},
			{
				_id: 5,
				title: "5",
				noteColor: "note__green",
				dateCreated: currentDate5,
				isPinned: false,
				labels: ["cricket", "game", "study"],
				priority: "High Priority",
			},
			{
				_id: 6,
				title: "6",
				noteColor: "note__yellow",
				dateCreated: currentDate6,
				isPinned: false,
				labels: ["game", "chess", "badminton"],
				priority: "Low Priority",
			},
			{
				_id: 7,
				title: "7",
				noteColor: "note__cyan",
				dateCreated: currentDate7,
				isPinned: false,
				labels: ["game", "chess"],
				priority: "High Priority",
			},
		],
		trashList: [],
		archiveList: [],
		labelsList: ["All"],
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
			console.log("from addToNoteList access error", error);
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

	const { noteList } = noteState;

	useEffect(() => {
		noteDispatch({
			type: "SET_LABELS_LIST",
			payload: noteList,
		});
	}, [noteDispatch, noteList]);

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
