import { type MovieDto } from '@/src/domain/Movies/dtos/Dtos';
import { Movie } from '@/src/domain/Movies/model/Movie';
import { ActorMapper } from '@/src/domain/Actor/mappers/ActorMapper';
import { formatDate } from '@/src/infrastructure/utils/formatDate';

export class MovieMapper {
    private actorMapper: ActorMapper;

    constructor() {
        this.actorMapper = new ActorMapper();
    }

    public model(dto: MovieDto): Movie {
        const movie =  new Movie(
            dto.id,
            dto.title,
            formatDate(dto.release_date),
            dto.vote_average,
            `${process.env.EXPO_PUBLIC_API_IMAGE_BASE_URL}${dto.poster_path}`,
            dto.overview,
            dto.genres,
            dto?.credits?.cast.map(actor => this.actorMapper.model(actor)),
            dto.rating
        );
        return movie
    }
}
