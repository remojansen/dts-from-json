const ERRORS = {
    INVALID_JSON_FILE_EXTENSION: "INVALID_JSON_FILE_EXTENSION",
    CANNOT_READ_FILE: "CANNOT_READ_FILE",
    CANNOT_WRITE_FILE: "CANNOT_WRITE_FILE",
    CANNOT_GENERATE_DTS: "CANNOT_GENERATE_DTS",
    INVALID_JSON: "INVALID_JSON",
    UNEXPECTED_ERROR: "UNEXPECTED_ERROR",
}

export class CustomError extends Error {
    constructor(
        public name: string,
        public message: string,
        public cause: Error
    ) {
        super();
        this.name = name;
        this.message = message;
        this.cause = cause;
    }
}

export class CustomErrorFactory {
    constructor(
        public name: string
    ) {}
    throw(message: string, cause: Error) {
        throw new CustomError(this.name, message, cause);
    }
}

export const invalidJsonExtension = new CustomErrorFactory(ERRORS.INVALID_JSON_FILE_EXTENSION);
export const unexpectedError = new CustomErrorFactory(ERRORS.UNEXPECTED_ERROR);
export const invalidJson = new CustomErrorFactory(ERRORS.INVALID_JSON);
export const cannotReadFile = new CustomErrorFactory(ERRORS.CANNOT_READ_FILE);
export const cannotWriteFile = new CustomErrorFactory(ERRORS.CANNOT_WRITE_FILE);
export const cannotGenerateDts = new CustomErrorFactory(ERRORS.CANNOT_GENERATE_DTS);
