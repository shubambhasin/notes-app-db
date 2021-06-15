 const mongoose = require('mongoose')
const { Schema, model } = mongoose

const NoteSchema = new Schema({

  userId: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  }   
 notes: [
    {
      title: {

      },
      tags: {
        
      }
      content: {

      }
    }
  ]


 
})

const Note = new model('note', NotesSchema)

module.exports = { Note }
 
