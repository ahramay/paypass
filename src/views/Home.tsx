import { Button } from '@/components/ui'
import ShowToast from '@/components/ui/Notification/ShowToast'
import { useEffect } from 'react'
const Home = () => {
    useEffect(() => {
        ShowToast('danger', 'Complete Your Profile')
    }, [])

    return (
        <div>
            <Button
                variant="twoTone"
                className="text-red-500 border-2 border-red-500 bg-transparent  hover:bg-transparent active:bg-transparent"
            >
                Complete Onboarding Forces
            </Button>
        </div>
    )
}

export default Home
