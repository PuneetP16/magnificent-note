export const noteReducer = (noteState, action) => {
	let { noteObj, noteList } = noteState;
	let { type, payload } = action;

	switch (type) {
		case "INPUT_CHANGE":
			const { key, value } = payload;
			noteObj = { ...noteObj, [key]: value };
			return { noteObj, noteList };

		case "COLOR":
			let { noteColor } = noteObj;
			noteColor = payload;
			noteObj = { ...noteObj, noteColor };
			return { noteObj, noteList };

		case "SAVE":
			noteList = [...payload];
			return { noteObj, noteList };

		case "RESET":
			noteObj = payload;
			return { noteObj, noteList };

		case "UPDATE":
			noteList = payload;
			return { noteObj, noteList };

		default:
			return noteState;
	}
};
