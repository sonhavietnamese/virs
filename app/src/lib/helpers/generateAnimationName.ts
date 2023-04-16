import { random } from 'lodash-es'

export const generateAnimationName = (str: string, max: number) =>
	`${str}.${String(random(max)).padStart(3, '0')}`
