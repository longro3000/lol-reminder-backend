import { Schema } from "mongoose";

export interface Note {
  condition: string;
  time: number;
  content: string;
}

export const NoteSchema = new Schema({
  condition: String,
  time: {
    type: Number,
    default: 0
  },
  content: {
    type: String,
    required: true
  }
});

export class NoteDTO {

}