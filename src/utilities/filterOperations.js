import { getFormattedDate } from "./getFormattedDate";

export const sortItByDate = (notesList, sortByDate) => {
	const data = [...notesList];

	const ascending = (a, b) => {
		const previousTime = getFormattedDate(a.dateCreated).getTime();
		const nextTime = getFormattedDate(b.dateCreated).getTime();
		return previousTime - nextTime;
	};

	const descending = (a, b) => {
		const previousTime = getFormattedDate(a.dateCreated).getTime();
		const nextTime = getFormattedDate(b.dateCreated).getTime();
		return nextTime - previousTime;
	};

	return data.sort(sortByDate === "Newest First" ? descending : ascending);
};

export const filterByPriority = (filteredList, byPriority) => {
	if (byPriority === "All") {
		return filteredList;
	}
	return filteredList.filter((note) => note.priority === byPriority);
};

export const filterByLabel = (filteredList, selectedLabel) => {
	if (selectedLabel === "All") {
		return filteredList;
	}
	return filteredList.filter((note) => note.labels.includes(selectedLabel));
};

export const getSearchedNotes = (filteredList, query) => {
	if (!query) return filteredList;
	query = query.toLowerCase();
	return filteredList.filter(
		(note) =>
			note.title.toLowerCase().includes(query) ||
			note.body.toLowerCase().includes(query) ||
			note.labels.toString().toLowerCase().includes(query)
	);
};
