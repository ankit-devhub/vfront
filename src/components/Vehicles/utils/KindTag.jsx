const KindTag = ({ kind }) => {
    switch (kind) { // Reefer, Heavy, Flatbed, Dry Van
        case 'Reefer':
            return (
                <div className='rounded-md bg-orange-300 p-1 px-2 text-xs'>
                    {kind}
                </div>
            )
        case 'Heavy':
            return (
                <div className='rounded-md bg-red-300 p-1 px-2 text-xs'>
                    {kind}
                </div>
            )
        case 'Light':
            return (
                <div className='rounded-md bg-green-300 p-1 px-2 text-xs'>
                    {kind}
                </div>
            )
    }
}

export default KindTag