const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()

const util = require('util');
const verifyToken = util.promisify(jwt.verify);


const generateAccessToken = async (payload) => {
    const accessToken = jwt.sign({
        ...payload
    }, process.env.ACCESS_TOKEN, { expiresIn: process.env.ACCESS_TOKEN_DURATION })
    return accessToken
}
const generateRefreshToken = async (payload) => {
    const accessToken = jwt.sign({
        ...payload
    }, process.env.REFRESH_TOKEN, { expiresIn: process.env.REFRESH_TOKEN_DURATION })
    return accessToken
}

const refreshTokenJwtService = async (token) => {  
    try {
        
        const user = await verifyToken(token, process.env.REFRESH_TOKEN);
 
        const accessToken = await generateAccessToken({
            id: user.id,
            isAdmin: user.isAdmin 
        });

        return {
            status: 'success',
            message: 'Successfully',
            accessToken: accessToken
        };

    } catch (error) {
        if (error.name === 'JsonWebTokenError') {
            return {
                status: 'error',
                message: 'The authentication token is invalid'
            };
        }
        return {
            status: 'error',
            message: error.message
        };
    }
};

module.exports = {
    generateAccessToken,
    generateRefreshToken,
    refreshTokenJwtService
}