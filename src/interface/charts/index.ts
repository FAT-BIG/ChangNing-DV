export interface ChartOption {
    color: string
    tooltip: object
    xAxis: object
    yAxis: object,
    series?: object[]
}

export interface BarItem {
    name: string
    type: 'bar'
    barGap: number
    barMaxWidth: number,
    data: number[]
}
