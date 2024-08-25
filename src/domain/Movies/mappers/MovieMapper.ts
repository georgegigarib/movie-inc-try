import { type MovieDto } from '@/src/domain/Movies/client/Dtos';
import { Movie } from '@/src/domain/Movies/model/Movie';
import { ActorMapper } from '@/src/domain/Actor/mappers/ActorMapper';
import { formatDate } from '@/utils/formatDate';

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
            `https://image.tmdb.org/t/p/original${dto.poster_path}`,
            dto.overview,
            dto.genres,
            dto?.credits?.cast.map(actor => this.actorMapper.model(actor)),
            dto.rating
        );
        return movie
    }
}
