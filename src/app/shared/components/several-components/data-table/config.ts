interface Options {
    selectionButtons?: {
        icon: any,
        title: string,
        // tslint:disable-next-line: ban-types
        function: (data: []) => void
    }[];
}
export class Config {
    private _options: Options;
    private _total: number;

    constructor(options: Options, total: number){
        this._options = options;
        this._total = total;
    }

    get options(): Options {
        return this._options;
    }

    set options(value: Options) {
        this._options = value;
    }

    get total(): number {
        return this._total;
    }

    set total(value: number) {
        this._total = value;
    }
}
