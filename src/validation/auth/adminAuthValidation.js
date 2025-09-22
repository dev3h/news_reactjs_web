export const ADMIN_VALIDATION_PATTERNS = {
  username: /^[a-zA-Z0-9]+$/,
  strongPassword: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).*$/,
};

export const ADMIN_AUTH_VALIDATION_RULES = {
  username: [
    {
      required: true,
      message: "Vui lòng nhập tên đăng nhập!",
    },
    {
      min: 3,
      message: "Tên đăng nhập phải có ít nhất 3 ký tự!",
    },
    {
      max: 50,
      message: "Tên đăng nhập không được quá 50 ký tự!",
    },
    {
      pattern: ADMIN_VALIDATION_PATTERNS.username,
      message: "Chỉ được sử dụng chữ cái và số, không có ký tự đặc biệt!",
    },
  ],

  password: [
    {
      required: true,
      message: "Vui lòng nhập mật khẩu!",
    },
    {
      min: 8,
      message: "Mật khẩu phải có ít nhất 8 ký tự!",
    },
    {
      max: 20,
      message: "Mật khẩu không được quá 20 ký tự!",
    },
    {
      pattern: ADMIN_VALIDATION_PATTERNS.strongPassword,
      message: "Mật khẩu cần có: chữ hoa, chữ thường, số và ký tự đặc biệt",
    },
  ],
};

export const ADMIN_FORM_FIELDS = {
  username: {
    rules: ADMIN_AUTH_VALIDATION_RULES.username,
  },

  password: {
    rules: ADMIN_AUTH_VALIDATION_RULES.password,
  },
};
