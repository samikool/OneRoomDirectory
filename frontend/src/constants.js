const prod = {
    url: {
        API_URL: 'https://dev.oneroomgaming.com/api'
    }
}

const staging = {
    url: {
        API_URL: 'https://staging.dev.oneroomgaming.com/api'
    }
}

const dev = {
    url: {
        API_URL: 'https://localhost:5000'
    }
}

exports.config = () => {
    console.log(process.env.REACT_APP_ENV)
    if(process.env.REACT_APP_ENV === 'development') return dev
    else if (process.env.REACT_APP_ENV === 'staging') return staging
    else if (process.env.REACT_APP_ENV === 'production') return prod
    return null
}