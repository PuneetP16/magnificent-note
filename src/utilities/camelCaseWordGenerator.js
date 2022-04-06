export const camelCaseWordGenerator= (word) => {
	return `${word.split("")[0].toUpperCase()}${word
		.split("")
		.splice(1)
		.join("")}`;
}