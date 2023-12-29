import NoteContext from "./noteContext.js"
import { useState } from "react";


const NoteState = (props) => {
    const host = "http://localhost:5000";
    const NotesInitial = []
    const [Notes, setNotes] = useState(NotesInitial);

    //Fetch all Notes
    const fetchNotes = async () => {
        const response = await fetch(`${host}/api/notes/fetchNotes`, {
            method: "GET",
            headers: {
                'Content-Type': "application/json",
                'auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU0ZDEyZGM1MjlmYjIyMTIzOTZjZWZjIn0sImlhdCI6MTY5OTU0OTkxNn0.bsDvYjcqRwqJLZGVdBl-9TTfl6HN8bYFV6MwbkAYAac"
            }
        })
        const json = await response.json();
        console.log(json);
        setNotes(json);
    }

    //Add Notes
    const addNotes = async (title, description, tag) => {
        const response = await fetch(`${host}/api/notes/addNotes`, {
            method: "POST",
            headers: {
                'Content-Type': "application/json",
                'auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU0ZDEyZGM1MjlmYjIyMTIzOTZjZWZjIn0sImlhdCI6MTY5OTU0OTkxNn0.bsDvYjcqRwqJLZGVdBl-9TTfl6HN8bYFV6MwbkAYAac"
            },
            body: JSON.stringify({ title, description, tag })
        })
        // console.log("Adding a new Note")
        const Note = {
            "_id": "654d1376529fb2212396cf01",
            "user": "654d12dc529fb2212396cefc",
            "title": title,
            "description": description,
            "tag": tag,
            "date": "2023-11-09T17:14:30.260Z",
            "__v": 0
        }
        setNotes(Notes.concat(Note));
    }



    //Delete Notes

    const deleteNotes = async (id) => {
        const response = await fetch(`${host}/api/notes/deleteNotes/${id}`, {
            method: "DELETE",
            headers: {
                'Content-Type': "application/json",
                'auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU0ZDEyZGM1MjlmYjIyMTIzOTZjZWZjIn0sImlhdCI6MTY5OTU0OTkxNn0.bsDvYjcqRwqJLZGVdBl-9TTfl6HN8bYFV6MwbkAYAac"
            }
        })
        const json = await response.json();
        console.log(json);
        console.log(`Deleting node with id ${id}`);
        setNotes(Notes.filter((Note) => {
            return id !== Note._id;
        }))
    }

    //Edit Notes
    const editNotes = async (id, title, description, tag) => {
        const response = await fetch(`${host}/api/notes/updateNotes/${id}`, {
            method: "POST",
            headers: {
                'Content-Type': "application/json",
                'auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU0ZDEyZGM1MjlmYjIyMTIzOTZjZWZjIn0sImlhdCI6MTY5OTU0OTkxNn0.bsDvYjcqRwqJLZGVdBl-9TTfl6HN8bYFV6MwbkAYAac"
            },
            body: JSON.stringify({ title, description, tag })
        })
        const json = await response.json();

        for (let index = 0; index < Notes.length; index++) {
            const element = Notes[index];
            if (element._id === id) {
                element.title = title;
                element.description = description;
                element.tag = tag;
            }
        }
    }

    return (
        <NoteContext.Provider value={{ Notes, setNotes, addNotes, deleteNotes, fetchNotes }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;