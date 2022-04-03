import { useState } from "react";
import { useNote } from "../../contexts";
import { bxIcons } from "../../data/icons";
import "./NoteLabelItem.css";

export const NoteLabelItem = ({ label, closeBtn }) => {
	const { noteDispatch } = useNote();
	const [showCloseBtn, setShowCloseBtn] = useState(false);

	const removeLabelBtn = (label) => {
		noteDispatch({
			type: "REMOVE_LABEL",
			payload: label,
		});
	};

	return (
		<li
			className="label__li"
			onMouseEnter={() => setShowCloseBtn(true)}
			onMouseLeave={() => setShowCloseBtn(false)}
		>
			<div className="label__item">{label}</div>
			{closeBtn ? (
				<button
					className={`label_btn__cross ${showCloseBtn ? "show_close_btn" : ""}`}
					onClick={() => removeLabelBtn(label)}
				>
					{bxIcons.cross}
				</button>
			) : null}
		</li>
	);
};
