import React from "react";
import { NoteListing, NoteListWrapper } from "../../components";
import "./Label.css";
import { useNote } from "../../contexts";
import { bxIcons } from "../../data/icons";
import { camelCaseWordGenerator } from "../../utilities";
import { useDocumentTitle } from "../../customHooks";

export const Label = () => {
	useDocumentTitle("Label | MS");

	const { noteState } = useNote();

	const { noteList, labelsList } = noteState;

	return (
		<div className="note_lisiting_section">
			<main className="note_lisiting_section">
				{labelsList.length > 1 ? (
					labelsList.map((label, index) => {
						const filteredLabelList = noteList.filter((note) =>
							note.labels.includes(label)
						);
						const camelCaseLabel = camelCaseWordGenerator(label);
						return (
							<section key={index} className="note_lisiting_section">
								{filteredLabelList?.length > 0 ? (
									<>
										<h3>{camelCaseLabel} Notes</h3>
										<NoteListWrapper>
											<NoteListing list={filteredLabelList} />
										</NoteListWrapper>
									</>
								) : null}
							</section>
						);
					})
				) : (
					<div className="empty_list trash_list center">{bxIcons.label}</div>
				)}
			</main>
		</div>
	);
};
