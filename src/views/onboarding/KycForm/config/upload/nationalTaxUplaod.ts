
export const beforeUploadNationalTax = (files: FileList | null, fileList: File[]) => {
    let valid: string | boolean = true
    const maxUpload = 1;

    const allowedFileType = ['image/jpeg', 'image/png' ,'application/pdf']
    const maxFileSize = 5000000

    if (fileList.length >= maxUpload) {
        return `You can only upload ${maxUpload} file(s)`
    }

    if (files) {
        for (const f of files) {
            if (!allowedFileType.includes(f.type)) {
                valid = 'Please upload a .jpeg or .png or .pdf file!'
            }

            if (f.size >= maxFileSize) {
                valid = 'Upload image cannot more then 5MB!'
            }
        }
    }

    return valid
}