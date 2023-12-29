import React,{useContext} from 'react'
import NotesContext from "../context/Notes/noteContext"

const Notesitem = (props) => {
  const Context=useContext(NotesContext);
  const { Note } = props;
  const {deleteNotes}=Context;
  return (
    <div className='col-md-3 my-3'>
      <div className="card">
        <img src="https://img.freepik.com/free-vector/person-writing-love-letter-flat-vector-illustration-pen-human-hand-person-sending-receiving-letter-correspondence-communication-relationship-friendship-concept_74855-24968.jpg?size=626&ext=jpg&ga=GA1.1.1880011253.1699833600&semt=ais" className="card-img-top" alt="..." />
        <div className="card-body">
          <div className="d-flex align-items-center my-3">
            <h5 className="card-title">{Note.title.toUpperCase()}</h5>
            <i className="fa-solid fa-trash fa-xl mx-4" onClick={()=>{deleteNotes(Note._id)}}></i>
            <i className="fa-solid fa-pen-to-square fa-xl"></i>
          </div>
          <p className="card-text">{Note.description.toLowerCase()}</p>
          {/* <a href="#" className="btn btn-danger">Delete</a> */}
        </div>
      </div>
    </div>
  )
}

export default Notesitem


// const image_con=[
//   {
//     "url":"https://shorturl.at/cNTY9"
//   },
//   {
//     "url":"https://shorturl.at/wFGM2"
//   },
//   {
//     "url":"https://shorturl.at/bfoqO"
//   },
//   {
//     "url":"https://shorturl.at/BHKP5"
//   },
//   {
//     "url":"https://shorturl.at/qxBX5"
//   }
// ]