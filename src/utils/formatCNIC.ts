const formatCNIC = (input: string): string => {
    // Implement your CNIC formatting logic here
    // Assuming XXXXX-XXXXXXX-X format
    const formattedInput = input.replace(/[^0-9]/g, '').substring(0, 13)
    const parts = [
        formattedInput.substring(0, 5),
        formattedInput.substring(5, 12),
        formattedInput.substring(12),
    ]

    return parts.filter(Boolean).join('-')
}


export default formatCNIC