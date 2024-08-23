import { Actor } from "@/domain/Actor/model/Actor";

export class Movie {
	public readonly id: number;
	public readonly title: string;
	public readonly releaseDate: string;
	public readonly voteAverage: number;
	public readonly posterPath: string;
	public readonly overview?: string;
	public readonly genres?: { id: number, name: string }[];
	public readonly actors?: Actor[];
	public readonly rating?: Number;

	constructor(
		id: number,
		title: string,
		releaseDate: string,
		voteAverage: number,
		posterPath: string,
		overview?: string,
		genres?: { id: number, name: string }[],
		actors?: Actor[],
		rating?: number
	) {
		this.id = id;
		this.title = title;
		this.releaseDate = releaseDate;
		this.voteAverage = voteAverage;
		this.posterPath = posterPath;
		this.overview = overview;
		this.genres = genres;
		this.actors = actors;
		this.rating = rating;
	}
}
