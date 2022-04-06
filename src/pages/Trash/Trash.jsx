import React from "react";
import { NoteListing, NoteListWrapper } from "../../components";
import { useNote } from "../../contexts";
import { useDocumentTitle } from "../../customHooks";
import { bxIcons } from "../../data/icons";
import "./Trash.css";

export const Trash = () => {
	useDocumentTitle("Trash | MS");

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
				<div className="empty_list trash_list center">{bxIcons.trashAlt}</div>
			)}
		</section>
	);
};
