import { useNote } from "../../contexts";
import { IcRoundAddCircleOutline } from "../../data/Icon";
import { bxIcons } from "../../data/icons";
import "./NoteEditor.css";
import { useState } from "react";
import { Alert } from "../UI/Alert/Alert";
import { useAxios } from "../../customHooks";
import { ColorPalette, NoteLabel, NoteLabelItem } from "../index";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import "./quill.css";

export const NoteEditor = () => {
	const {
		noteState,
		noteDispatch,
		inititalNoteObj,
		addToNoteList,
		bodyText,
		setBodyText,
		updateNote,
		isEditable,
		setIsEditable,
	} = useNote();

	const { noteObj } = noteState;
	const { noteColor, dateCreated } = noteObj;
	const [showLabel, setShowLabel] = useState();
	const { axiosRequest } = useAxios();
	const [alert, setAlert] = useState({
		visibility: false,
		text: "",
		type: "",
	});
	const { labels } = noteObj;
	const noteInputHandler = (e) => {
		let key = e.target.name;
		let value = e.target.value;
		noteDispatch({
			type: "INPUT_CHANGE",
			payload: { [key]: value },
		});
	};

	const setColor = (e) => {
		const tagName = e.target.tagName;
		if (tagName === "LI") {
			let selectedClass = e.target.className;
			noteDispatch({
				type: "COLOR",
				payload: selectedClass,
			});
		}
	};

	const saveNote = () => {
		if (
			noteObj.title.trim() !== "" ||
			(bodyText !== "" && bodyText !== "<p><br></p>")
		) {
			isEditable
				? updateNote(axiosRequest, { ...noteObj, body: bodyText })
				: addToNoteList(axiosRequest, { ...noteObj, body: bodyText });

			noteDispatch({
				type: "RESET",
				payload: inititalNoteObj,
			});
			setBodyText("");
		} else {
			setAlert({
				visibility: true,
				text: "Enter text before saving the note",
				type: "alert--danger",
			});
		}
	};

	const cancelBtn = () => {
		noteDispatch({
			type: "RESET",
			payload: inititalNoteObj,
		});
		setIsEditable(false);
		setBodyText("");
	};

	const modules = {
		toolbar: [
			["bold", "italic", "underline", "strike"],
			[{ list: "ordered" }, { list: "bullet" }],
			["blockquote", "code-block"],
			["link", "image", "video"],
		],
	};

	return (
		<>
			<Alert alert={alert} setAlert={setAlert} />
			<div className={`note ${noteColor} `}>
				{isEditable ? (
					<button className="btn_note__cta btn__cross " onClick={cancelBtn}>
						{bxIcons.cross}
					</button>
				) : null}

				<div className="note__body">
					<form className="note__form">
						<input
							autoFocus
							value={noteObj.title}
							name="title"
							type="text"
							className="note__heading input"
							placeholder="Note Title.."
							onChange={noteInputHandler}
							required
						/>

						<ReactQuill
							modules={modules}
							value={bodyText}
							onChange={setBodyText}
							placeholder="Note Body"
							name="body"
							className="note__textarea"
						/>
					</form>
				</div>
				<div className="note__footer">
					<div className="note__created_date">Date: {dateCreated}</div>
					<div className="note__cta">
						<ColorPalette onClickSetColor={(e) => setColor(e)} />

						<button
							className="btn_note__cta btn__label"
							onMouseEnter={() => setShowLabel(true)}
							onMouseLeave={() => setShowLabel(false)}
						>
							{bxIcons.label}
						</button>
						{showLabel ? <NoteLabel /> : null}

						<button onClick={saveNote} className="btn_note__cta btn__trash_alt">
							<IcRoundAddCircleOutline />
						</button>
					</div>
				</div>
				{labels.length > 0 ? (
					<ul className="note__footer note__label_display">
						{labels.map((label, index) => {
							return (
								<NoteLabelItem label={label} key={index} closeBtn={true} />
							);
						})}
					</ul>
				) : null}
			</div>
		</>
	);
};
