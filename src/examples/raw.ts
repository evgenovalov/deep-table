import type { IHeader, IRawObj, ITable } from '@/types/table'
import { average, buildRows } from '@/utils'
import cars from './cars.json'

const headers: IHeader[] = [
    {
        label: 'Vehicle',
        key: 'vehicleName'
    },
    {
        label: 'Power (hp)',
        key: 'power',
        aggregator: average
    },
    {
        label: 'Torque (N/m)',
        key: 'torque',
        aggregator: average
    }
]

const rawData: IRawObj[] = cars as unknown as IRawObj[]

export const table: ITable = {
    headers,
    rows: buildRows(rawData, 'subrows')
}
