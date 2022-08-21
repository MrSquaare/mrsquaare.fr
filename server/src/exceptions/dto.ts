export class DTOException extends Error {}

export class DTONotFoundException extends DTOException {
  constructor() {
    super();
  }
}

export class DTOAlreadyExistsException extends DTOException {
  constructor() {
    super();
  }
}
