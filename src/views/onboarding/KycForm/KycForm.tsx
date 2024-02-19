import { useEffect, useMemo, lazy, Suspense } from 'react'
import Container from '@/components/shared/Container'
import AdaptableCard from '@/components/shared/AdaptableCard'
import FormStep from './components/FormStep'
import reducer, {
    getForm,
    setStepStatus,
    setFormData,
    setCurrentStep,
    useAppDispatch,
    useAppSelector,
    MerchantInformation as MerchantInformationType,
    BusinessDetails as BusinessDetailsType,
    OperationsDetails as operationsDetailsType,
    BankDetails as BankDetailsType,
} from './store'
import { injectReducer } from '@/store'
import { Steps } from '@/components/ui'
import { apiGetAccountFormData } from '@/services/AccountServices'
import DocumentUpload from './components/DocumentUpload'

injectReducer('accountDetailForm', reducer)

const MerchantInformation = lazy(
    () => import('./components/MerchantInformation')
)
const BusinessDetail = lazy(() => import('./components/BusinessDetail'))
const OperationsDetails = lazy(() => import('./components/OperationsDetails'))
const BankDetails = lazy(() => import('./components/BankAccountDetails'))
const AccountReview = lazy(() => import('./components/AccountReview'))

const KycForm = () => {
    const dispatch = useAppDispatch()
    const stepStatus = useAppSelector(
        (state) => state.accountDetailForm.data.stepStatus
    )
    const currentStep = useAppSelector(
        (state) => state.accountDetailForm.data.currentStep
    )
    const formData = useAppSelector(
        (state) => state.accountDetailForm.data.formData
    )

    useEffect(() => {
        // dispatch(getForm())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    useEffect(() => {
        apiGetAccountFormData()
            .then((res: any) => {
                const completedStep = res.data?.completedSteps
                if (completedStep[0] == 1) {
                    dispatch(
                        setStepStatus({
                            [0]: { status: 'complete' },
                            [1]: { status: 'current' },
                        })
                    )
                }
                if (completedStep[1] == 2) {
                    dispatch(
                        setStepStatus({
                            [1]: { status: 'complete' },
                            [2]: { status: 'current' },
                        })
                    )
                }

                if (completedStep[2] == 3) {
                    dispatch(
                        setStepStatus({
                            [2]: { status: 'complete' },
                            [3]: { status: 'current' },
                        })
                    )
                }

                if (completedStep[3] == 4) {
                    dispatch(
                        setStepStatus({
                            [3]: { status: 'complete' },
                            [4]: { status: 'current' },
                        })
                    )
                }
                if (completedStep[4] == 5) {
                    dispatch(
                        setStepStatus({
                            [4]: { status: 'complete' },
                            [5]: { status: 'current' },
                        })
                    )
                }

                dispatch(setFormData({ bankDetails: res.data.bankDetails }))
                dispatch(
                    setFormData({ businessDetails: res.data.businessDetails })
                )
                dispatch(
                    setFormData({
                        merchantInformation: res.data.merchantInformation,
                    })
                )
                dispatch(
                    setFormData({
                        operationsDetails: res.data.operationsDetails,
                    })
                )
                dispatch(setFormData({ documentDetails: res.data.documentDetails }))
            })
            .catch((error) => {
                // console.log('-----ERROR------------')
                // console.log(error)
            })
    }, [])

    const handleNextChange = (
        values:
            | MerchantInformationType
            | BusinessDetailsType
            | operationsDetailsType
            | BankDetailsType,
        name: string
    ) => {
        const nextStep = currentStep + 1
        dispatch(setFormData({ [name]: values }))
        dispatch(
            setStepStatus({
                [currentStep]: { status: 'complete' },
                [nextStep]: { status: 'current' },
            })
        )
        dispatch(setCurrentStep(nextStep))
    }

    const handleBackChange = () => {
        const previousStep = currentStep - 1
        dispatch(setCurrentStep(previousStep))
    }

    const currentStepStatus = useMemo(
        () => stepStatus[currentStep].status,
        [stepStatus, currentStep]
    )

    const completedStep = () => {
        if (stepStatus[0].status == 'current') {
            return 1
        } else if (stepStatus[1].status == 'current') {
            return 2
        } else if (stepStatus[2].status == 'current') {
            return 3
        } else if (stepStatus[3].status == 'current') {
            return 4
        } else if (stepStatus[4].status == 'current') {
            return 5
        } else if (stepStatus[5].status == 'current') {
            return 6
        } else {
            return 1
        }
    }
    console.log(completedStep())
    return (
        <Container className="">
            {completedStep() !== 5 && (
                <div className="p-6">
                    <Steps current={completedStep()}>
                        <Steps.Item title="Registered" />
                        <Steps.Item title="Merchant Information" />
                        <Steps.Item title="Business Details" />
                        <Steps.Item title="Operations Details" />
                        <Steps.Item title="Bank Account" />
                        <Steps.Item title="Upload" />
                        <Steps.Item title="Submit" />
                    </Steps>
                </div>
            )}
            <AdaptableCard className="h-full" bodyClass="h-full">
                <div className="grid lg:grid-cols-5 xl:grid-cols-3 2xl:grid-cols-5 gap-4 h-full">
                    {currentStep !== 5 && (
                        <div className="2xl:col-span-1 xl:col-span-1 lg:col-span-2">
                            <FormStep
                                currentStep={currentStep}
                                currentStepStatus={currentStepStatus}
                                stepStatus={stepStatus}
                            />
                        </div>
                    )}
                    <div
                        className={
                            currentStep !== 5
                                ? '2xl:col-span-4 lg:col-span-3 xl:col-span-2'
                                : 'lg:col-span-5'
                        }
                    >
                        <Suspense fallback={<></>}>
                            {currentStep === 0 && (
                                <MerchantInformation
                                    data={formData.merchantInformation}
                                    currentStepStatus={currentStepStatus}
                                    onNextChange={handleNextChange}
                                />
                            )}
                            {currentStep === 1 && (
                                <BusinessDetail
                                    data={formData.businessDetails}
                                    currentStepStatus={currentStepStatus}
                                    onNextChange={handleNextChange}
                                    onBackChange={handleBackChange}
                                />
                            )}
                            {currentStep === 2 && (
                                <OperationsDetails
                                    data={formData.operationsDetails}
                                    currentStepStatus={currentStepStatus}
                                    onNextChange={handleNextChange}
                                    onBackChange={handleBackChange}
                                />
                            )}
                            {currentStep === 3 && (
                                <BankDetails
                                    data={formData.bankDetails}
                                    currentStepStatus={currentStepStatus}
                                    onNextChange={handleNextChange}
                                    onBackChange={handleBackChange}
                                />
                            )}
                            {currentStep === 4 && (
                                <DocumentUpload
                                    data={formData.bankDetails}
                                    currentStepStatus={currentStepStatus}
                                    onNextChange={handleNextChange}
                                    onBackChange={handleBackChange}
                                />
                            )}
                            {currentStep === 5 && <AccountReview />}
                        </Suspense>
                    </div>
                </div>
            </AdaptableCard>
        </Container>
    )
}

export default KycForm
