import React, { useEffect, useMemo } from 'react'
import { useAppSelector } from './onboarding/KycForm/store'
import { Steps } from '@/components/ui'

type FormStepProps = {}

const Home = () => {
    // Move the useAppSelector call inside the component's body
    // const stepStatus = useAppSelector(
    //     (state) => state.accountDetailForm.data.stepStatus
    // )
    // const currentStep = useAppSelector(
    //     (state) => state.accountDetailForm.data.currentStep
    // )
    // const formData = useAppSelector(
    //     (state) => state.accountDetailForm.data.formData
    // )
    // const currentStepStatus = useMemo(
    //     () => stepStatus[currentStep].status,
    //     [stepStatus, currentStep]
    // )

    // const completedStep = () => {
    //     if (stepStatus[0].status == 'current') {
    //         return 1
    //     } else if (stepStatus[1].status == 'current') {
    //         return 2
    //     } else if (stepStatus[2].status == 'current') {
    //         return 3
    //     } else if (stepStatus[3].status == 'current') {
    //         return 4
    //     } else if (stepStatus[4].status == 'current') {
    //         return 5
    //     } else if (stepStatus[5].status == 'current') {
    //         return 6
    //     } else {
    //         return 1
    //     }
    // }

    // console.log(completedStep())

    return (
        <div>Home</div>
        // <div>
        //     {completedStep() !== 5 && (
        //         <div className="p-6">
        //             <Steps current={completedStep()}>
        //                 <Steps.Item title="Registered" />
        //                 <Steps.Item title="Merchant Information" />
        //                 <Steps.Item title="Business Details" />
        //                 <Steps.Item title="Operations Details" />
        //                 <Steps.Item title="Bank Account" />
        //                 <Steps.Item title="Upload" />
        //                 <Steps.Item title="Submit" />
        //             </Steps>
        //         </div>
        //     )}
        // </div>
    )
}

export default Home
