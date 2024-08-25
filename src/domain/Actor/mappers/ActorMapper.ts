import { type ActorDto } from '@/src/domain/Actor/client/Dtos';
import { Actor } from '@/src/domain/Actor/model/Actor';

export class ActorMapper {
    public model(dto: ActorDto): Actor {
        return new Actor(
            dto.name,
            dto.id,
            dto.character,
            `https://image.tmdb.org/t/p/original${dto.profile_path}`
        );
    }
}
