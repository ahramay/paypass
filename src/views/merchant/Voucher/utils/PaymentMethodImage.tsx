export const PaymentMethodImage = ({
    paymentMethod,
    className,
}: {
    paymentMethod: string
    className: string
}) => {
    switch (paymentMethod) {
        case 'bank':
            return (
                <>
                    <img
                        className={className}
                        src="/img/others/img-8.png"
                        alt={paymentMethod}
                    />
                    <p>{" "} Bank</p>
                </>
            )
        case 'jazzcash':
            return (
                <>
                    <img
                        className={className}
                        src="/img/others/img-9.png"
                        alt={paymentMethod}
                    />
                    <p>{" "}JazzCash</p>
                </>
            )
        case 'OTC':
            return (
                <>
                    <img
                        className={className}
                        src="/img/others/img-10.png"
                        alt={paymentMethod}
                    />
                    <p>{" "}OTC</p>
                </>
            )
        default:
            return <></>
    }
}
