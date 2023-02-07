export type UploadFile = {
  file: File
  key?: string
  signedUrl?: string
  verificationData?: {
    docType: string
    extractedData: string[]
  }
}
