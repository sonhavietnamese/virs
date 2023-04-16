import { MapSchema, Schema, type } from '@colyseus/schema'

export type Vector3 = {
  x: number
  y: number
  z: number
}

export type Vector4 = {
  x: number
  y: number
  z: number
  w: number
}

export type Part = {
  hair: string
  upper: string
  lower: string
  shoe: string
}

export class Position extends Schema implements Vector3 {
  @type('number') x: number
  @type('number') y: number
  @type('number') z: number

  constructor(position: Vector3) {
    super()
    this.x = position.x
    this.y = position.y
    this.z = position.z
  }

  set(position: { x: number; y: number; z: number }) {
    this.x = position.x
    this.y = position.y
    this.z = position.z
  }
}

export class Quaternion extends Schema implements Vector4 {
  @type('number') x: number
  @type('number') y: number
  @type('number') z: number
  @type('number') w: number

  constructor(rotation: Vector4) {
    super()
    this.x = rotation.x
    this.y = rotation.y
    this.z = rotation.z
    this.w = rotation.w
  }

  set(rotation: { x: number; y: number; z: number; w: number }) {
    this.x = rotation.x
    this.y = rotation.y
    this.z = rotation.z
    this.w = rotation.w
  }
}

export class CharacterConfig extends Schema implements Part {
  @type('string') hair: string
  @type('string') upper: string
  @type('string') lower: string
  @type('string') shoe: string

  constructor(part: { hair: string; upper: string; lower: string; shoe: string }) {
    super()
    this.hair = part.hair
    this.upper = part.upper
    this.lower = part.lower
    this.shoe = part.shoe
  }

  set(part: { hair: string; upper: string; lower: string; shoe: string }) {
    this.hair = part.hair
    this.upper = part.upper
    this.lower = part.lower
    this.shoe = part.shoe
  }
}

export class Player extends Schema {
  @type('string') id: string
  @type(Position) position: Position
  @type(Quaternion) quaternion: Quaternion
  @type(CharacterConfig) characterConfig: CharacterConfig
  @type('string') action: string
  @type('number') placeholderForChange = 0
  @type('string') peerID: string

  constructor(
    id: string,
    position: Vector3,
    quaternion: Vector4,
    peerID: string,
    characterConfig: Part
  ) {
    super()
    this.id = id
    this.position = new Position(position)
    this.quaternion = new Quaternion(quaternion)
    this.action = 'idle.000'
    this.peerID = peerID
    this.characterConfig = new CharacterConfig(characterConfig)
  }
}

export class WorldState extends Schema {
  @type({ map: Player })
  players = new MapSchema<Player>()
}
