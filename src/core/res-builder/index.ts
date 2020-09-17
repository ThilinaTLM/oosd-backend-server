interface ResData {
    data?: any,
    token?: string,
    message: string
}

interface IResponse {
    status(code: number): IResponse

    json(obj: any): IResponse
}

class StatusCode {
    private readonly parent: ResponseBuilder;

    constructor(p: ResponseBuilder, code: number) {
        this.parent = p;
        this._code = code;
    }

    private _code: number;

    get code() {
        return this._code;
    }

    OK(): ResponseBuilder {
        return this.setCode(200);
    }

    CREATED(): ResponseBuilder {
        return this.setCode(201);
    }

    NO_CONTENT(): ResponseBuilder {
        return this.setCode(204);
    }

    MV_PERM(): ResponseBuilder {
        return this.setCode(301);
    }

    NOT_MOD(): ResponseBuilder {
        return this.setCode(304);
    }

    BAD_REQ(): ResponseBuilder {
        return this.setCode(400);
    }

    UN_AUTH(): ResponseBuilder {
        return this.setCode(401);
    }

    FORBIDDEN(): ResponseBuilder {
        return this.setCode(403);
    }

    NOT_FOUND(): ResponseBuilder {
        return this.setCode(404);
    }

    ERROR(): ResponseBuilder {
        return this.setCode(500);
    }

    private setCode(code: number): ResponseBuilder {
        this._code = code;
        return this.parent;
    }
}

export class ResponseBuilder {
    readonly status: StatusCode;
    private _res: IResponse;
    private readonly _data: ResData;

    constructor(res: IResponse) {
        this.status = new StatusCode(this, 500);
        this._data = { message: "Internal Server Error" };
        this._res = res;
    }

    send(): void {
        this._res.status(this.status.code);
        this._res.json(this._data);
    };

    send_ISE(): void {
        this.status.ERROR()
        this.message('Internal Server Error');
        this.send()
    }

    token(token: string): ResponseBuilder {
        this._data.token = token;
        return this;
    }

    message(msg: string): ResponseBuilder {
        this._data.message = msg;
        return this;
    }

    data(data: any): ResponseBuilder {
        this._data.data = data;
        return this;
    }
}