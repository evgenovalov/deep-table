import type { IRawObj, IRow } from '@/types/table'

const hasSubrows = (rawData: IRawObj, subrowsKey: string) => {
    const subrows = rawData[subrowsKey] as IRawObj[]
    return subrowsKey in rawData && subrows.length > 0
}

export const buildRows = (rawData: IRawObj[], subrowsKey: string): IRow[] => {
    return rawData.map((obj) => {
        const row: IRow = {
            data: {},
            opened: false,
            subrows: hasSubrows(obj, subrowsKey) ? buildRows(obj[subrowsKey] as IRawObj[], subrowsKey) : []
        }
        for (const key in obj) {
            if (key !== subrowsKey) {
                row.data[key] = obj[key] as string | number
            }
        }
        return row
    })
}

export const average = (rows: IRow[], key: string): number => {
    let numerableValuesCount = 0
    let sum = 0

    function deepSum(subrows: IRow[]) {
        subrows.forEach((row) => {
            const value = Number.parseFloat(row.data[key] as string)
            if (!isNaN(value)) {
                numerableValuesCount++
                sum += value
            }

            if (row.subrows && row.subrows.length > 0) {
                deepSum(row.subrows)
            }
        })
    }

    deepSum(rows)
    const avg = sum / numerableValuesCount
    return Math.round(avg * 10) / 10
}
