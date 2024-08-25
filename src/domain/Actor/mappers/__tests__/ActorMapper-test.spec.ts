import { ActorMapper } from '@/src/domain/Actor/mappers/ActorMapper';
import { ActorDto } from '@/src/domain/Actor/client/Dtos';
import { Actor } from '@/src/domain/Actor/model/Actor';

describe('ActorMapper', () => {
  let actorMapper: ActorMapper;
  let actor: Actor
  let dto: ActorDto = {
    name: 'Robert Downey Jr.',
    id: 1,
    character: 'Tony Stark',
    profile_path: '/profile-path.jpg',
  };

  beforeEach(() => {
    actorMapper = new ActorMapper();
    
    actor = actorMapper.model(dto);
  });

  it('should map an ActorDto to an Actor model', () => {
    expect(actor.name).toBe(dto.name);
    expect(actor.id).toBe(dto.id);
    expect(actor.character).toBe(dto.character);
    expect(actor.profilePath).toBe(`https://image.tmdb.org/t/p/original${dto.profile_path}`);
  });

  it('should be instance of Actor', () => {
      actor = actorMapper.model(dto);

      expect(actor).toBeInstanceOf(Actor)
  })
});
