export interface IRow {
    data: {
        [key: string]: string | number
    }
    opened?: boolean
    subrows?: IRow[]
}

export interface IHeader {
    label: string
    key: string
    aggregator?: (rows: IRow[], key: string) => number
}

export interface ITable {
    headers: IHeader[]
    rows: IRow[]
}

export type IRawObj = { [key: string]: string | number | IRawObj[] }
