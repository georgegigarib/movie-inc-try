export class GuestSession {
    constructor(
      public readonly guestSessionId: string,
      public readonly expireDate: string,
    ) {
    }
  }
  