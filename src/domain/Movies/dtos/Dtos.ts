import { ActorDto } from "@/src/domain/Actor/dtos/Dtos";

export type MovieDto = {
	id: number;
	title: string;
	original_title: string;
	poster_path: string;
	adult: boolean;
	overview: string;
	release_date: string;
	genre_ids: number[];
	genres?: {id: number, name: string}[],
	original_language: string;
	backdrop_path: string;
	popularity: number;
	vote_count: number;
	video: boolean;
	vote_average: number;
	credits?: {cast: ActorDto[]}
	rating?: number
}