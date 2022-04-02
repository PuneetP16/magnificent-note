import React from "react";
import { NoteListing, NoteListWrapper } from "../../components";
import { useNote } from "../../contexts";
import "./Trash.css";

export const Trash = () => {
	const { noteState } = useNote();

	const { trashList } = noteState;
	return (
		<section className="note_lisiting_section">
			<h3>Trashed Notes</h3>
			<NoteListWrapper>
				{trashList?.length > 0 ? (
					<NoteListing list={trashList} isTrash="true" />
				) : null}
			</NoteListWrapper>
		</section>
	);
};
