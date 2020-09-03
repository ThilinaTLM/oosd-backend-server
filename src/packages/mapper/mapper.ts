/**
 * Configuration Type for Mapper
 */
type MapperConfigEntry = { from: string, to: string };
export type MapperConfig = MapperConfigEntry[];

/**
 * Change an object key strings according to configuration
 * @param data : input object
 * @param conf : configuration for mapper
 * @param backward : if true mapping is done backward
 */
function map(data: any, conf: MapperConfig, backward = false) {
    let from: "from" | "to" = "from";
    let to: "from" | "to" = "to";
    if (backward) [from, to] = [to, from];

    for (let i = 0; i < conf.length; i++) {
        let entry = conf[i];
        if (data[entry[from]] && !data[entry[to]]) {
            data[entry[to]] = data[entry[from]];
            delete data[entry[from]];
        }
    }
    return data;
}

/**
 * Mapper Object which use solid configuration
 */
class Mapper<T> {
    private readonly conf: MapperConfig;

    constructor(conf: MapperConfig) {
        this.conf = conf;
    }

    forward(data: any): T {
        return map(data, this.conf, false);
    }

    backward(data: any): T {
        return map(data, this.conf, true);
    }
}

/**
 * Return a Mapper object with a solid configuration
 * @param conf : configuration for mapper
 */
export const BuildMapper = <T = any>(conf: MapperConfig) => {
    return new Mapper<T>(conf);
};

/**
 * An Entry for Mapper Config
 * @param from : key of before
 * @param to : key of after
 */
export const mp = (from: string, to: string): MapperConfigEntry => {
    return {from, to}
}