import { Actor } from "@/src/domain/Actor/model/Actor";

describe('Actor', () => {
  it('should create an instance of Actor with all properties', () => {
    const actor = new Actor(
      'Robert Downey Jr.',
      1,
      'Tony Stark',
      '/profile-path.jpg'
    );

    expect(actor).toBeInstanceOf(Actor);
    expect(actor.name).toBe('Robert Downey Jr.');
    expect(actor.id).toBe(1);
    expect(actor.character).toBe('Tony Stark');
    expect(actor.profilePath).toBe('/profile-path.jpg');
  });
});
