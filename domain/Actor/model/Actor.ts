export class Actor {
	constructor(
		public readonly name: string,
		public readonly id: number,
		public readonly character: string,
		public readonly profilePath: string
	) {
		this.name = name,
		this.id = id,
		this.character = character,
		this.profilePath = profilePath
	}
}
