import { useContext, createContext, useReducer } from "react";
import { noteReducer } from "../reducers";

const NoteContext = createContext();

export const useNote = () => useContext(NoteContext);

export const NoteProvider = ({ children }) => {
	const palette = [
		{ color: "red", className: "note__red" },
		{ color: "blue", className: "note__blue" },
		{ color: "green", className: "note__green" },
		{ color: "yellow", className: "note__yellow" },
		{ color: "purple", className: "note__purple" },
		{ color: "cyan", className: "note__cyan" },
	];

	const current = new Date();
	const currentDate = `${current.getDate()}/${
		current.getMonth() + 1
	}/${current.getFullYear()}`;

	const inititalNoteObj = {
		title: "",
		body: "",
		noteColor: "note__blue",
		dateCreated: currentDate,
		isTrash: false,
		isPinned: false,
	};

	const initialNoteState = {
		noteList: [
			{
				title: "This is Title",
				body: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s ",
				noteColor: "note__blue",
				dateCreated: currentDate,
				_id: "7106fe2e-a8ca-40c6-a24f-6esldf",
			},
			{
				title: "This is Title",
				body: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s ",
				noteColor: "note__yellow",
				dateCreated: currentDate,
				_id: "7106fe2e-asdf8ca-40c6-a24f-6esldf",
			},
			{
				title: "This is Title",
				body: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s ",
				noteColor: "note__red",
				dateCreated: currentDate,
				_id: "7106fsdfe2e-a8ca-40c6-a24f-6esldf",
			},
			{
				title: "This is Title",
				body: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s ",
				noteColor: "note__cyan",
				dateCreated: currentDate,
				_id: "7106fe2e-asdsadff8ca-40c6-a24f-6esldf",
			},
			{
				title: "This is Title",
				body: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s ",
				noteColor: "note__purple",
				dateCreated: currentDate,
				_id: "7106fe2e-asddfsadff8ca-40c6-a24f-6esldf",
			},
		],
		noteObj: inititalNoteObj,
	};

	const [noteState, noteDispatch] = useReducer(noteReducer, initialNoteState);

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

	const value = {
		noteState,
		noteDispatch,
		inititalNoteObj,
		palette,
		addToNoteList,
		updateNote,
	};
	return <NoteContext.Provider value={value}>{children}</NoteContext.Provider>;
};
