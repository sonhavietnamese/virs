import { HMSReactiveStore } from '@100mslive/hms-video-store'

const hms = new HMSReactiveStore()
hms.triggerOnSubscribe()

const hmsActions = hms.getActions()
const hmsStore = hms.getStore()
const hmsNotifications = hms.getNotifications()

export { hmsActions, hmsStore, hmsNotifications }
