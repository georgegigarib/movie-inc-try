import { ActorDto } from "../dtos/Dtos";

export class Actor {
	constructor(
		public readonly name: string,
		public readonly id: number,
		public readonly character: string,
		public readonly profilePath: string
	) {
	}

	static fromDto(dto: ActorDto): Actor {
        return new Actor(
            dto.name,
            dto.id,
            dto.character,
            `${process.env.EXPO_PUBLIC_API_IMAGE_BASE_URL}${dto.profile_path}`
        );
    }
}
