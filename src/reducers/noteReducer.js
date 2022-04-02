export const noteReducer = (noteState, action) => {
	let { noteObj, noteList, trashList, archiveList } = noteState;
	let { type, payload } = action;

	switch (type) {
		case "INPUT_CHANGE":
			noteObj = { ...noteObj, ...payload };
			return { noteObj, noteList, trashList, archiveList };

		case "COLOR":
			noteObj = { ...noteObj, noteColor: payload };
			return { noteObj, noteList, trashList, archiveList };

		case "SAVE":
			noteList = [...payload];
			return { noteObj, noteList, trashList, archiveList };

		case "RESET":
			noteObj = { ...payload };
			return { noteObj, noteList, trashList, archiveList };

		case "UPDATE":
			noteList = [...payload];
			return { noteObj, noteList, trashList, archiveList };

		case "DELETE":
			noteList = [...payload];
			trashList = [...trashList, action.note];
			return { noteObj, noteList, trashList, archiveList };

		case "RESTORE":
			noteList = [...payload];
			trashList = trashList.filter((note) => note._id !== action.note._id);
			return { noteObj, noteList, trashList, archiveList };

		case "ARCHIVE":
			archiveList = [...payload];
			noteList = [...action.notes];
			return { noteObj, noteList, trashList, archiveList };

		case "DELETE_FROM_ARCHIVE":
			archiveList = [...payload];
			return { noteObj, noteList, trashList, archiveList };

		case "EDITABLE":
			noteObj = { ...payload };
			return { noteObj, noteList, trashList, archiveList };

		default:
			return noteState;
	}
};
