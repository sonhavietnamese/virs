import { Command } from '@colyseus/command'
import { World } from '../World'
import { CharacterConfig, Part, Player, Vector3, Vector4 } from '../schema/WorldState'

export class PlayerCreateCommand extends Command<
  World,
  {
    sessionId: string
    peerID: string
    characterConfig: Part
  }
> {
  execute(payload: this['payload']) {
    const x = 0
    const y = 0
    const z = 0
    this.state.players.set(
      payload.sessionId,
      new Player(payload.sessionId, { x, y, z }, { x: 0, y: 0, z: 0, w: 0 }, payload.peerID, {
        hair: payload.characterConfig.hair,
        upper: payload.characterConfig.upper,
        lower: payload.characterConfig.lower,
        shoe: payload.characterConfig.shoe,
      })
    )
  }
}

export class PlayerLeaveCommand extends Command<
  World,
  {
    sessionId: string
  }
> {
  execute(payload: this['payload']) {
    this.state.players.delete(payload.sessionId)
  }
}

export class PlayerMoveCommand extends Command<
  World,
  {
    sessionId: string
    data: {
      position: Vector3
      quaternion: Vector4
    }
  }
> {
  execute(payload: this['payload']) {
    const player = this.state.players.get(payload.sessionId)
    player.position.set(payload.data.position)
    player.quaternion.set(payload.data.quaternion)
    player.placeholderForChange += 0.00001
  }
}

export class PlayerChangePartCommand extends Command<
  World,
  {
    sessionId: string
    characterConfig: Part
  }
> {
  execute(payload: this['payload']) {
    const player = this.state.players.get(payload.sessionId)
    player.characterConfig.set(payload.characterConfig)
    player.placeholderForChange += 0.00001
  }
}

export class PlayerActionCommand extends Command<
  World,
  {
    sessionId: string
    action: string
  }
> {
  execute(payload: this['payload']) {
    const player = this.state.players.get(payload.sessionId)
    player.action = payload.action
  }
}
