export const getFormattedDate = (indianFormattedDate) => {
	const [day, month, year] = indianFormattedDate.split("/").map(Number);
	let usFormattedDate = `${month}/${day}/${year}`;
	usFormattedDate = new Date(usFormattedDate);
	return usFormattedDate;
};
