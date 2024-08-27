import { type ActorDto } from '@/src/domain/Actor/dtos/Dtos';
import { Actor } from '@/src/domain/Actor/model/Actor';
export class ActorMapper {
    public model(dto: ActorDto): Actor {
        return new Actor(
            dto.name,
            dto.id,
            dto.character,
            `${process.env.EXPO_PUBLIC_API_IMAGE_BASE_URL}${dto.profile_path}`
        );
    }
}
