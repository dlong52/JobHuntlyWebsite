const helpers = {
    validate: (email, password, confirmPassword) => {
        const errors = [];
        // Check email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email))
            errors.push('Định dạng email không hợp lệ.');
        // Check password length
        if (password.length < 8)
            errors.push('Mật khẩu phải dài ít nhất 8 ký tự.');
        // Check password complexity
        // const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        // if (!passwordRegex.test(password))
        //     errors.push('Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.');
        // Check if password and confirmPassword match
        if (password !== confirmPassword)
            errors.push('Mật khẩu và mật khẩu xác nhận không khớp.');
        return {
            isValid: errors.length === 0,  
            errors  
        };
    }
}

module.exports = helpers;
