export interface IGatewaySessionManager {
  getUserSocket(id: string): any
  setUserSocket(id: string, socket: any): void
  removeUserSocket(id: string): void
  getSockets(): Map<string, any>
}

const initRooms = {
  '1': {
    name: 'Frontend',
    users: [],
    messages: []
  },
  '2': {
    name: 'Backend',
    users: [],
    messages: []
  },
  '3': {
    name: 'Devops',
    users: [],
    messages: []
  },
  '4': {
    name: 'UI/UX Design',
    users: [],
    messages: []
  }
}

export class GatewaySessionManager implements IGatewaySessionManager {
  private readonly sessions: Map<string, any> = new Map()
  private readonly rooms: Map<string, any> = new Map(Object.entries(initRooms))

  setRoom(id: string, data: any) {
    return this.rooms.set(id, data)
  }

  getRooms(): Map<string, any> {
    return this.rooms
  }

  getRoom(id: string) {
    return this.rooms.get(id)
  }

  getUserSocket(id: string) {
    return this.sessions.get(id)
  }

  setUserSocket(id: string, socket: any): void {
    this.sessions.set(id, socket)
  }

  removeUserSocket(id: string): void {
    this.sessions.delete(id)
  }

  getSockets(): Map<string, any> {
    return this.sessions
  }
}