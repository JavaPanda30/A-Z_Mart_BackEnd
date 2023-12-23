// Create and add token in cookie
const sendToken = (user, statusCode, res) => {
    const token = user.getJWTToken();
    // Options for Cookie
    const options = {
        expires: new Date(
            Date.now() + process.env.COOKIE_EXPIRY * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
    };
    res.cookie("token", token, options);
    res.status(statusCode).json({
        success: true,
        token,
        user,
    });
};

module.exports = sendToken;
