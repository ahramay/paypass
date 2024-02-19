import { useState } from 'react'
import Button from '@/components/ui/Button'
import Dialog from '@/components/ui/Dialog'
import type { MouseEvent } from 'react'
interface ConfirmToProceedProps {
    dialogIsOpen: boolean
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}
const ConfirmToProceed: React.FC<ConfirmToProceedProps> = ({
    dialogIsOpen,
    setIsOpen,
}) => {
    // const [dialogIsOpen, setIsOpen] = useState(false)

    const openDialog = () => {
        setIsOpen(true)
    }

    const onDialogClose = (e: MouseEvent) => {
        console.log('onDialogClose', e)
        setIsOpen(false)
    }

    const onDialogOk = (e: MouseEvent) => {
        console.log('onDialogOk', e)
        setIsOpen(false)
    }

    return (
        <Dialog
            isOpen={dialogIsOpen}
            style={{
                content: {
                    marginTop: 250,
                },
            }}
            contentClassName="pb-0 px-0"
            onClose={onDialogClose}
            onRequestClose={onDialogClose}
        >
            <div className="px-6 pb-6">
                <h5 className="mb-4">Confirm To Proceed</h5>
                <p>
                    Please confirm that the information provided is correct and
                    you want to proceed with the action.
                </p>
            </div>
            <div className="text-right px-6 py-3 bg-gray-100 dark:bg-gray-700 rounded-bl-lg rounded-br-lg">
                <Button className="ltr:mr-2 rtl:ml-2" onClick={onDialogClose}>
                    Cancel
                </Button>
                <Button variant="solid" onClick={onDialogOk}>
                    Okay
                </Button>
            </div>
        </Dialog>
    )
}

export default ConfirmToProceed
