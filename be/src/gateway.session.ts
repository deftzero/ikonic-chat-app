
export interface IGatewaySessionManager {
  getUserSocket(id: string): any
  setUserSocket(id: string, socket: any): void
  removeUserSocket(id: string): void
  getSockets(): Map<string, any>
}

export class GatewaySessionManager implements IGatewaySessionManager {
  private readonly sessions: Map<string, any> = new Map()

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