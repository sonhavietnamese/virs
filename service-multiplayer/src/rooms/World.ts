import { Dispatcher } from '@colyseus/command'
import { Client, Room } from 'colyseus'
import {
  PlayerActionCommand,
  PlayerChangePartCommand,
  PlayerCreateCommand,
  PlayerLeaveCommand,
  PlayerMoveCommand,
} from './commands/PlayerUpdateCommand'
import { MESSAGES } from './constants/Message'
import { CharacterConfig, WorldState } from './schema/WorldState'

export class World extends Room<WorldState> {
  dispatcher = new Dispatcher(this)
  peerID = ''

  async onCreate(options: any) {
    this.setState(new WorldState())
    if (options.peerID) this.peerID = options.peerID

    this.onMessage(MESSAGES.PLAYER.MOVE, (client, data) => {
      this.dispatcher.dispatch(new PlayerMoveCommand(), {
        sessionId: client.sessionId,
        data,
      })
    })

    this.onMessage(MESSAGES.PLAYER.ACTION, (client, data) => {
      this.dispatcher.dispatch(new PlayerActionCommand(), {
        sessionId: client.sessionId,
        action: data.action,
      })
    })

    this.onMessage(MESSAGES.PLAYER.CHANGE_PART, (client, data) => {
      this.dispatcher.dispatch(new PlayerChangePartCommand(), {
        sessionId: client.sessionId,
        characterConfig: data.characterConfig,
      })
    })
  }

  onJoin(client: Client, options?: any, auth?: any): void | Promise<any> {
    console.log(`--> ${client.sessionId} joined! peerId: ${options.peerID}`)

    this.dispatcher.dispatch(new PlayerCreateCommand(), {
      sessionId: client.sessionId,
      peerID: options.peerID || this.peerID,
      characterConfig: options.characterConfig,
    })
  }

  onLeave(client: Client, consented?: boolean): void | Promise<any> {
    console.log(`<-- ${client.sessionId} leave!`)
    this.dispatcher.dispatch(new PlayerLeaveCommand(), {
      sessionId: client.sessionId,
    })
  }

  onDispose(): void | Promise<any> {
    console.log('❌ Dispose World')
    this.dispatcher.stop()
  }
}
