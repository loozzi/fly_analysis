import { Chart, ChartWrapperOptions } from 'react-google-charts'

interface PieChartProps {
  data: any[]
  options: ChartWrapperOptions['options']
}

export default function PieChart(props: PieChartProps) {
  const { data, options } = props
  return <Chart chartType='PieChart' data={data} options={options} width={'100%'} height={'400px'} />
}
