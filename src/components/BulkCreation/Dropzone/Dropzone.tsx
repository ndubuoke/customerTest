import { bulkUpload, DeleteIcon, PlainFileIcon } from 'Assets/svgs'
import { useDropzone } from 'react-dropzone'
// import { useEffect } from 'react'

interface Props {
  accept: any,
  onDrop: (acceptedFiles: any[], fileRejections: any[]) => void,
  onDeleteUpload: (e: any) => void,
  error: boolean
  fileUploaded: boolean
  fileName: string
}

export const Dropzone = ({ accept, onDrop, error, fileName, fileUploaded, onDeleteUpload }: Props) => {

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept });

  return (
    <>
      {fileUploaded ?
        <div>
          <div
            className={`flex items-center rounded-[10px] border-[0.5px] h-[66px] min-w-[392px] max-w-[392px] gap-x-3 pr-0 ${error ? 'border-red-600' : 'border-[#2FB755]'}`}
          >
            <div className={`pl-[17px]`}>
              <PlainFileIcon />
            </div>
            <div className={`grow`}>
              <div title={fileName} className={`min-w-[250px] max-w-[250px] truncate`}>{fileName}</div>
            </div>
            <button className={`mb-2 mr-1 p-0 self-end justify-self-end`} onClick={onDeleteUpload}>
              <DeleteIcon />
            </button>
          </div>
          <p className={`text-[12px] ${error ? 'text-red-600' : 'text-[#2FB755]'}`}>{error ? 'File Format Not Supported!' : 'File Upload Successful'}</p>
        </div>
        :
        <div {...getRootProps({ className: `${isDragActive ? "test-center rounded border-2 border-dashed border-[#CF2A2A]" : ''}` })}>
          <img src={bulkUpload} alt={''} />
          <input type={`file`} hidden {...getInputProps()} />
        </div>
      }
    </>
  )
}
