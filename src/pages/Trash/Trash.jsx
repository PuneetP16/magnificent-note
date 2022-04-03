import React from "react";
import { NoteListing, NoteListWrapper } from "../../components";
import { useNote } from "../../contexts";
import { bxIcons } from "../../data/icons";
import "./Trash.css";

export const Trash = () => {
	const { noteState } = useNote();

	const { trashList } = noteState;
	return (
		<section className="note_lisiting_section">
			{trashList?.length > 0 ? (
				<>
					<h3>Trashed Notes</h3>
					<NoteListWrapper>
						<NoteListing list={trashList} isTrash="true" />
					</NoteListWrapper>
				</>
			) : (
				<div className="empty_list trash_list">{bxIcons.trashAlt}</div>
			)}
		</section>
	);
};
