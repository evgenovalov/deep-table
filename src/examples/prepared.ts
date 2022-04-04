import type { IHeader, IRow, ITable } from '@/types/table'
import { average } from '@/utils'

export const headers: IHeader[] = [
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

export const rows: IRow[] = [
    {
        data: {
            vehicleName: 'Motorcycles (avg)'
        },
        opened: false,
        subrows: [
            {
                data: {
                    vehicleName: 'Yamaha R1'
                },
                opened: false,
                subrows: [
                    {
                        data: {
                            vehicleName: 'R1-2018',
                            power: 186.4,
                            torque: 200
                        }
                    },
                    {
                        data: {
                            vehicleName: 'R1-2020',
                            power: 193.1,
                            torque: 220
                        }
                    },
                    {
                        data: {
                            vehicleName: 'R1-2022',
                            power: 205.8,
                            torque: 224
                        }
                    }
                ]
            },
            {
                data: {
                    vehicleName: 'BMW S1000RR',
                    power: 190.4,
                    torque: 214
                }
            },
            {
                data: {
                    vehicleName: 'Kawasaki ZX-14R',
                    power: 207.9,
                    torque: 243
                }
            }
        ]
    },
    {
        data: {
            vehicleName: 'Cars (avg)'
        },
        opened: false,
        subrows: [
            {
                data: {
                    vehicleName: 'Dodge Demon',
                    power: 840,
                    torque: 402
                }
            },
            {
                data: {
                    vehicleName: 'Rimac Concept S',
                    power: 1384,
                    torque: 561
                }
            },
            {
                data: {
                    vehicleName: 'Bugatti Chiron',
                    power: 1479,
                    torque: 642
                }
            }
        ]
    },
    {
        data: {
            vehicleName: 'Pickups (avg)'
        },
        opened: false,
        subrows: [
            {
               data: {
                   vehicleName: 'Chevrolet Silverado',
                   power: 800,
                   torque: 482
               }
            },
            {
                data: {
                    vehicleName: 'Shelby Ford F-150 Super Snake',
                    power: 720,
                    torque: 509
                }
            },
            {
               data: {
                   vehicleName: 'Hennessey Ram 1500 TRX Mammoth',
                   power: 207.9,
                   torque: 240
               }
            }
        ]
    },
    {
        data: {
            vehicleName: 'Honda Giorno',
            power: 5.6,
            torque: 10
        }
    }
]

export const table: ITable = { headers, rows }
