const prod = {
    port: 5002
}

const staging = {
    port: 5001
}

const dev = {
    port: 5000
}

exports.config = () => {
    if(process.env.NODE_ENV === 'development') return dev
    else if (process.env.NODE_ENV === 'staging') return staging
    else if (process.env.NODE_ENV === 'production') return prod
    return null
}