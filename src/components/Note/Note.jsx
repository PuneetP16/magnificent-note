import { useLocation } from "react-router-dom";
import { bxIcons } from "../../data/icons";
import { ColorPalette } from "../ColorPalette/ColorPalette";
import { NoteLabelItem } from "../NoteLabelItem/NoteLabelItem";
import "./Note.css";

export const Note = ({
	togglePinFromNoteList,
	note,
	togglePinBtn,
	setColor,
	archiveToggleFromNoteList,
	toggleArchiveBtn,
	deleteToggleFromList,
	toggleTrashBtn,
	editNote,
}) => {
	const { _id, title, body, noteColor, dateCreated, labels, priority } = note;

	const { pathname } = useLocation();
	const isLabelPage = pathname === "/label";
	const isHomePage = pathname === "/home";
	const isTrashPage = pathname === "/trash";
	const isArchivePage = pathname === "/archive";

	return (
		<li key={_id} className={`note ${noteColor} note--displayed `}>
			{isLabelPage || isTrashPage || isArchivePage ? null : (
				<button
					onClick={() => togglePinFromNoteList(note)}
					className="btn_note__cta btn__pin_it"
				>
					{togglePinBtn}
				</button>
			)}
			<div className="note__body">
				<div className="note__title">{title}</div>
				<div
					className="note__content"
					dangerouslySetInnerHTML={{ __html: body }}
				/>
			</div>
			{labels.length > 0 ? (
				<ul className="note__footer note__label_display note_listing__label">
					{labels.map((label, index) => {
						return <NoteLabelItem label={label} key={index} />;
					})}
				</ul>
			) : null}
			<div className="note__footer">
				<div className="note_props">
					<div className="note__created_date">Date: {dateCreated}</div>
					<div className="note__priority">{priority}</div>
				</div>
				{isLabelPage ? null : (
					<div className="note__cta">
						{isTrashPage || isArchivePage ? null : (
							<ColorPalette onClickSetColor={(e) => setColor(e, note)} />
						)}
						{isTrashPage || isArchivePage || isHomePage ? null : (
							<button className="btn_note__cta btn__label">
								{bxIcons.label}
							</button>
						)}
						{isTrashPage ? null : (
							<button
								onClick={() => archiveToggleFromNoteList(note)}
								className="btn_note__cta btn__archive_in"
							>
								{toggleArchiveBtn}
							</button>
						)}
						{isArchivePage ? null : (
							<button
								onClick={() => deleteToggleFromList(note)}
								className="btn_note__cta btn__trash_alt"
							>
								{toggleTrashBtn}
							</button>
						)}

						{isTrashPage || isArchivePage ? null : (
							<button
								onClick={() => {
									editNote(note);
									window.scroll(0, 0);
								}}
								className="btn_note__cta btn__trash_alt"
							>
								{bxIcons.edit}
							</button>
						)}
					</div>
				)}
			</div>
		</li>
	);
};
