import {
  Button,
  Pagination,
  Select,
  SelectItem,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow
} from '@nextui-org/react'
import { ChangeEvent, useEffect, useState } from 'react'
import { FaCloudUploadAlt, FaFileDownload, FaFileImport } from 'react-icons/fa'
import * as XLSX from 'xlsx'
import '~/App.css'
import client from '~/services/axios.service'
import PieChart from './components/pie-chart'

interface PredictResponse {
  result: string
  predict: string[]
}

function App() {
  const [file, setFile] = useState<File | null>(null)

  const [tableData, setTableData] = useState<any[]>([])
  const [filteredData, setFilteredData] = useState<any[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [predict, setPredict] = useState<string[]>([])
  const [predictResult, setPredictResult] = useState<any[]>(['Satisfaction', 'Count'])

  const handleUploadFile = (even: ChangeEvent<HTMLInputElement>) => {
    const file = even.target.files?.[0]!
    setFile(file)
  }

  const handlePredict = () => {
    setPredict([])
    const formData = new FormData()
    formData.append('file', file!)
    client
      .post('ml/predict', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then((res) => {
        const data = res.data as PredictResponse
        if (data === null) return alert('Không thể dự đoán')

        const _predict = data?.predict

        if (!_predict) {
          console.log(data)
          return alert('Không thể dự đoán')
        } else {
          setPredict(_predict)
          setTableData((prev) => {
            return prev.map((item, index) => {
              return {
                ...item,
                Satisfaction: _predict[index]
              }
            })
          })
        }
      })
  }

  const handleDownloadPredict = () => {
    client.get('ml/download').then((res) => {
      const data = res as any
      const downloadLink = document.createElement('a')
      downloadLink.href = URL.createObjectURL(new Blob([data], { type: 'application/octet-stream' }))
      downloadLink.setAttribute('download', 'predict_result.csv')
      downloadLink.click()
    })
  }

  const columns = [
    { name: 'Satisfaction', uid: 'Satisfaction' },
    { name: 'Age', uid: 'Age' },
    { name: 'Arrival Delay in Minutes', uid: 'Arrival Delay in Minutes' },
    { name: 'Baggage handling', uid: 'Baggage handling' },
    { name: 'Checkin service', uid: 'Checkin service' },
    { name: 'Class', uid: 'Class' },
    { name: 'Cleanliness', uid: 'Cleanliness' },
    { name: 'Customer Type', uid: 'Customer Type' },
    { name: 'Departure Delay in Minutes', uid: 'Departure Delay in Minutes' },
    { name: 'Departure/Arrival time convenient', uid: 'Departure/Arrival time convenient' },
    { name: 'Ease of Online booking', uid: 'Ease of Online booking' },
    { name: 'Flight Distance', uid: 'Flight Distance' },
    { name: 'Food and drink', uid: 'Food and drink' },
    { name: 'Gate location', uid: 'Gate location' },
    { name: 'Gender', uid: 'Gender' },
    { name: 'Inflight entertainment', uid: 'Inflight entertainment' },
    { name: 'Inflight service', uid: 'Inflight service' },
    { name: 'Inflight wifi service', uid: 'Inflight wifi service' },
    { name: 'Leg room service', uid: 'Leg room service' },
    { name: 'On-board service', uid: 'On-board service' },
    { name: 'Online boarding', uid: 'Online boarding' },
    { name: 'Seat comfort', uid: 'Seat comfort' },
    { name: 'Type of Travel', uid: 'Type of Travel' }
  ]

  useEffect(() => {
    const _temp = [['Satisfaction', 'Count']]
    const result = predict.reduce((acc, val) => {
      const existingEntry = acc.find((entry) => entry[0] === val)
      if (existingEntry) {
        existingEntry[1]++
      } else {
        acc.push([val, 1] as never)
      }
      return acc
    }, [])
    _temp.push(...result)
    setPredictResult(_temp)
  }, [predict])

  useEffect(() => {
    if (file) {
      const reader = new FileReader()

      reader.onload = (e) => {
        const data = new Uint8Array(e.target!.result as ArrayBuffer)
        const workbook = XLSX.read(data, { type: 'array' })

        // Lấy tên sheet đầu tiên
        const sheetName = workbook.SheetNames[0]
        const sheet = workbook.Sheets[sheetName]

        // Chuyển đổi sheet sang JSON
        const jsonData = XLSX.utils.sheet_to_json(sheet)
        setTableData(jsonData)
      }

      reader.readAsArrayBuffer(file)
    }
  }, [file])

  useEffect(() => {
    const startIndex = (currentPage - 1) * rowsPerPage
    const endIndex = startIndex + rowsPerPage
    setFilteredData(tableData.slice(startIndex, endIndex))
  }, [tableData, currentPage, rowsPerPage])

  return (
    <div>
      <h1 className='text-3xl font-semibold text-center mb-4'>
        {file ? 'Satisfaction Prediction' : 'Upload file to predict'}
      </h1>
      {filteredData.length && (
        <div className='mb-4'>
          <Table
            isStriped
            topContent={
              <div className='flex justify-center items-center gap-2'>
                <Pagination
                  total={Math.ceil(tableData.length / rowsPerPage)}
                  page={currentPage}
                  onChange={(page) => setCurrentPage(page)}
                />

                <Select
                  className='w-24'
                  selectedKeys={[rowsPerPage.toString()]}
                  onChange={(e) => {
                    setRowsPerPage(parseInt(e.target.value))
                  }}
                >
                  <SelectItem key={10} value={10}>
                    10
                  </SelectItem>
                  <SelectItem key={20} value={20}>
                    20
                  </SelectItem>
                  <SelectItem key={50} value={50}>
                    50
                  </SelectItem>
                  <SelectItem key={100} value={100}>
                    100
                  </SelectItem>
                  <SelectItem key={200} value={200}>
                    200
                  </SelectItem>
                </Select>
              </div>
            }
            bottomContent={
              <div className='flex justify-center'>
                <Button className='mt-4' color='primary' startContent={<FaFileImport />} onClick={handlePredict}>
                  Predict
                </Button>
              </div>
            }
          >
            <TableHeader columns={columns}>
              {(column) => (
                <TableColumn key={column.uid}>
                  <span className='flex justify-center'>{column.name}</span>
                </TableColumn>
              )}
            </TableHeader>
            <TableBody>
              {filteredData.map((row, index) => (
                <TableRow key={index}>
                  {columns.map((column) => (
                    <TableCell key={column.uid}>
                      <span>{row[column.uid]}</span>
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
      {predict.length > 1 && (
        <div className='mb-4'>
          <h2 className='text-2xl font-semibold text-center mb-4'>Predict result</h2>
          <PieChart
            data={predictResult}
            options={{
              title: 'Predict satisfaction'
            }}
          />
          <Button color='primary' variant='ghost' startContent={<FaFileDownload />} onClick={handleDownloadPredict}>
            Download predict result
          </Button>
        </div>
      )}

      <div className='border-1 border-gray-200 rounded-lg'>
        <div className='p-4'>
          <div className='flex items-center justify-center w-full'>
            <label
              htmlFor='dropzone-file'
              className='flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600'
            >
              <div className='flex flex-col items-center justify-center pt-5 pb-6'>
                <FaCloudUploadAlt color='#ccc' size={56} />
                <p className='mb-2 text-sm text-gray-500 dark:text-gray-400'>
                  <span className='font-semibold'>Upload file</span> or drag and drop
                </p>
                <p className='text-xs text-gray-500 dark:text-gray-400'>xlsx, xls, csv...</p>
              </div>
              <input id='dropzone-file' type='file' className='hidden' onChange={handleUploadFile} />
            </label>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
