import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AppTable from '../AppTable.vue'
import { table, headers } from '../../examples/prepared'
import type { IRawObj, ITable } from '../../types/table'
import cars from '@/examples/cars.json'
import { buildRows } from '../../utils'
import { reactive } from 'vue'

describe('AppTable', () => {
    it('renders properly', () => {
        const wrapper = mount(AppTable, { props: { config: table } })
        expect(wrapper.text()).toContain('Cars (avg)')
    })

    it('renders only high-level rows', () => {
        const wrapper = mount(AppTable, { props: { config: table } })
        expect(wrapper.text().includes('Dodge Demon')).toBe(false)
    })

    it('renders with raw data', () => {
        const rawData = cars as unknown as IRawObj[]
        const config: ITable = {
            headers,
            rows: buildRows(rawData, 'subrows')
        }
        const wrapper = mount(AppTable, { props: { config } })
        expect(wrapper.text()).toContain('Honda Giorno')
    })

    it('renders nested row if opened', () => {
        const config: ITable = reactive(table)
        config.rows[0].opened = true
        const wrapper = mount(AppTable, { props: { config } })
        expect(wrapper.text()).toContain('Yamaha R1')
    })

    it('renders nested row if opened', () => {
        const config: ITable = reactive(table)
        config.rows[0].opened = true
        const wrapper = mount(AppTable, { props: { config } })
        expect(wrapper.text()).toContain('Yamaha R1')
    })

    it('checks outer row aggregation', () => {
        const config: ITable = reactive(table)
        config.rows[0].opened = true
        const wrapper = mount(AppTable, { props: { config } })
        expect(wrapper.findAll('tbody tr').at(0)?.findAll('td').at(2)?.text()).toContain('196.7')
    })

    it('checks nested row aggregation', () => {
        const config: ITable = reactive(table)
        config.rows[0].opened = true
        const wrapper = mount(AppTable, { props: { config } })
        expect(wrapper.findAll('tbody tr').at(1)?.findAll('td').at(2)?.text()).toContain('195.1')
    })
})
