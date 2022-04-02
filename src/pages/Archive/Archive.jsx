import React from "react";
import { NoteListing, NoteListWrapper } from "../../components";
import { useNote } from "../../contexts";
import "./Archive.css";

export const Archive = () => {
	const { noteState } = useNote();

	const { archiveList } = noteState;
	return (
		<section className="note_lisiting_section">
			<h3>Archived Notes</h3>
			<NoteListWrapper>
				{archiveList?.length > 0 ? (
					<NoteListing list={archiveList} isArchive="true" />
				) : null}
			</NoteListWrapper>
		</section>
	);
};
