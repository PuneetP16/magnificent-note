export const noteReducer = (noteState, action) => {
	let { noteObj, noteList, trashList, archiveList, labelsList } = noteState;
	let { type, payload } = action;

	const updateLabelsList = (...lists) => {
		const allList = Array.from(lists).flat();
		const flatLabelsList = allList
			.map((note) => note.labels)
			.flat()
			.concat(["All"]);
		const uniqueLabelsList = Array.from([...new Set(flatLabelsList)]);
		return uniqueLabelsList;
	};

	switch (type) {
		case "INPUT_CHANGE":
			noteObj = { ...noteObj, ...payload };
			return { noteObj, noteList, trashList, archiveList, labelsList };

		case "COLOR":
			noteObj = { ...noteObj, noteColor: payload };
			return { noteObj, noteList, trashList, archiveList, labelsList };

		case "SAVE":
			noteList = [...payload];
			return { noteObj, noteList, trashList, archiveList, labelsList };

		case "RESET":
			noteObj = { ...payload };
			return { noteObj, noteList, trashList, archiveList, labelsList };

		case "UPDATE":
			noteList = [...payload];
			return { noteObj, noteList, trashList, archiveList, labelsList };

		case "DELETE":
			noteList = [...payload];
			trashList = [...trashList, action.note];
			return { noteObj, noteList, trashList, archiveList, labelsList };

		case "RESTORE":
			noteList = [...payload];
			trashList = trashList.filter((note) => note._id !== action.note._id);
			return { noteObj, noteList, trashList, archiveList, labelsList };

		case "ARCHIVE":
			archiveList = [...payload];
			noteList = [...action.notes];
			return { noteObj, noteList, trashList, archiveList, labelsList };

		case "DELETE_FROM_ARCHIVE":
			archiveList = [...payload];
			return { noteObj, noteList, trashList, archiveList, labelsList };

		case "EDITABLE":
			noteObj = { ...payload };
			return { noteObj, noteList, trashList, archiveList, labelsList };

		case "SET_LABEL":
			let isLabelInLabels = noteObj.labels.includes(payload);

			noteObj = {
				...noteObj,
				labels: isLabelInLabels
					? [...noteObj.labels]
					: [...noteObj.labels, payload],
			};
			labelsList = Array.from([...new Set([...labelsList, payload])]);
			return { noteObj, noteList, trashList, archiveList, labelsList };

		case "REMOVE_LABEL":
			noteObj = {
				...noteObj,
				labels: [...noteObj.labels].filter((label) => label !== payload),
			};
			labelsList = updateLabelsList([...noteList, noteObj], archiveList);
			return { noteObj, noteList, trashList, archiveList, labelsList };

		case "SET_LABELS_LIST":
			labelsList = updateLabelsList(noteList, trashList, archiveList);
			return { noteObj, noteList, trashList, archiveList, labelsList };

		default:
			return noteState;
	}
};
