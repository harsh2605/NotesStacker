import React, { useContext,useEffect } from 'react'
import contextValue from "../context/Notes/noteContext";
import Notesitem from "./Notesitem"
import Addnotes from './Addnotes';
const Notes = () => {
    const context = useContext(contextValue);
    const { Notes,fetchNotes } = context;
    useEffect(() => {
      fetchNotes();
    }, [])
    
    return (
        <>
            <Addnotes />
            <div className='row my-3'>

                <h2>Your Notes</h2>
                {Notes.map((Note) => {
                    return <Notesitem key={Note.id} Note={Note} />
                })}
            </div>
        </>
    )
}

export default Notes