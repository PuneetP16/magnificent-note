import "./NoteListWrapper.css";

// Type of List: like Pinned, Wrapper Styles like spacing and etc,

export const NoteListWrapper = ({ children }) => {
	return <section className="note_list_wrapper"> {children} </section>;
};
