// Example Register Controller Fix
export const register = async (req, res, next) => {
  try {
    const { name, email, mobile, password } = req.body;

    // 1. Check if user exists
    // ... your registration logic here ...

    return res.status(201).json({
      success: true,
      message: 'User registered successfully!',
      // token, user data, etc.
    });
  } catch (error) {
    console.error('Registration Error:', error);
    // If using global error handler, ensure 'next' exists before calling it:
    if (typeof next === 'function') {
      return next(error);
    }
    return res.status(500).json({
      success: false,
      message: error.message || 'Internal Server Error',
    });
  }
};