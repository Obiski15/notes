import { IRecentNote, IRecentNotes } from "@/types"

import { IdbService } from "./idb.service"

export interface INotes {
  id: string
  notes: IRecentNotes
}

export interface INote {
  id: string
  note: IRecentNote
}

export class RecentNoteService extends IdbService {
  constructor() {
    super("notes", "recentNotes")
  }

  async getNotes(id: string): Promise<INotes> {
    const notes = await (await this.getDb()).get(this.storeName, id)

    return notes ?? { notes: [] }
  }

  async addNote(data: INote) {
    const db = await this.getDb()

    const notes = await this.getNotes(data.id)

    if (!!notes.notes.length) {
      // filter out note to avoid duplicates
      const updated = notes.notes.filter(n => n._id !== data.note._id)

      // extract note from data and update notes
      const newNotes = [
        data.note,
        ...updated.slice(0, updated.length >= 3 ? -1 : updated.length),
      ]

      // replace note in db
      await db.put(this.storeName, { id: data.id, notes: newNotes })
    } else {
      await db.add(this.storeName, { id: data.id, notes: [data.note] })
    }

    return data.note._id
  }
}
