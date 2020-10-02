export interface ModelError extends String {}

export const ModelErrorSet = {
    NO_ERRORS: "",
    UNKNOWN: "Unknown error",
    ESSENTIALS_ARE_NULL: "Essential database fields are not provided",
    CONNECTION_FAILED: "Cannot connect with database",
    WRONG_ARGUMENTS: "Incorrect arguments",
    NO_ENTRY_FOUND: "No entry found",
    DUPLICATE: "Duplicate entry",
    HAS_RELATIONSHIP: "Entry have relationships with some others"
}

