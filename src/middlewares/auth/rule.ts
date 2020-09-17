type OriginType = "HARD" | "QUERY" | "PARAMS" | "BODY"
type AlgoType = "EQ" | "NEQ"

export interface Origins {
    body: any
    params: any
    query: any
}

export class Rule {
    private readonly targetKey: string;
    private readonly origin: OriginType;
    private readonly originKey: string;
    private readonly algo: AlgoType;

    constructor(targetKey: string, originKey: string, options: { origin?: OriginType, algo?: AlgoType } = {}) {
        this.targetKey = targetKey;
        this.originKey = originKey;

        if (options.origin) {
            this.origin = options.origin;
        } else {
            this.origin = "HARD";
        }

        if (options.algo) {
            this.algo = options.algo;
        } else {
            this.algo = "EQ";
        }
        ;
    }

    check(target: any, origins: Origins): boolean {
        let tar = target[this.targetKey], org;
        switch (this.origin) {
            case "HARD":
                return this.solve(tar, this.originKey);
            case "BODY":
                org = origins.body[this.originKey];
                return this.solve(tar, org);
            case "PARAMS":
                org = origins.params[this.originKey];
                return this.solve(tar, org);
            case "QUERY":
                org = origins.query[this.originKey];
                return this.solve(tar, org);
        }
    }

    solve(t: string, o: string): boolean {
        switch (this.algo) {
            case "EQ":
                return t === o;
            case "NEQ":
                return t !== o;
        }
    }
}