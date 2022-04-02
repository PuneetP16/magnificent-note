// import { useState } from "react";

export const ResizableTextArea = ({
	placeholder,
	rows,
	className,
	name,
	value,
	onChange,
}) => {
	// commented for development purpose
	// const [textareaheight, setTextareaheight] = useState(Number(rows));

	// const handleChange = (event) => {
	// 	onChange();
	// 	const height = event.target.scrollHeight;
	// 	const rowHeight = 18;
	// 	const txtRows = Math.ceil(height / rowHeight) - 2;
	// 	console.log(txtRows, textareaheight);
	// 	if (txtRows > textareaheight) {
	// 		setTextareaheight((r) => r + 1);
	// 	}
	// };

	return (
		<div>
			<textarea
				// rows={textareaheight}
				onChange={onChange}
				placeholder={placeholder}
				className={className}
				name={name}
				value={value}
			></textarea>
		</div>
	);
};
