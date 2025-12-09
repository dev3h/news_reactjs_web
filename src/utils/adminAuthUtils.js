// Utility for creating loading skeleton
export const LoadingSkeleton = () => {
  return (
    <div className="animate-pulse">
      <div className="flex space-x-4">
        <div className="rounded-full bg-gray-300 h-10 w-10"></div>
        <div className="flex-1 space-y-2 py-1">
          <div className="h-4 bg-gray-300 rounded w-3/4"></div>
          <div className="h-4 bg-gray-300 rounded w-1/2"></div>
        </div>
      </div>
    </div>
  );
};

// Utility for enhanced form validation messages
export const getValidationMessage = (field, value) => {
  const messages = {
    username: {
      required: "🔒 Tên đăng nhập là bắt buộc",
      minLength: "📏 Tên đăng nhập phải có ít nhất 3 ký tự",
      maxLength: "📏 Tên đăng nhập không được quá 50 ký tự",
      pattern: "⚠️ Chỉ được sử dụng chữ cái và số"
    },
    password: {
      required: "🔐 Mật khẩu là bắt buộc",
      minLength: "📏 Mật khẩu phải có ít nhất 8 ký tự",
      maxLength: "📏 Mật khẩu không được quá 20 ký tự",
      pattern: "🔧 Mật khẩu cần có: chữ hoa, chữ thường, số và ký tự đặc biệt"
    }
  };

  return messages[field] || {};
};

// Enhanced success messages
export const getSuccessMessage = (type) => {
  const messages = {
    login: "🎉 Đăng nhập thành công! Chào mừng bạn trở lại.",
    logout: "👋 Đăng xuất thành công. Hẹn gặp lại!",
    update: "✅ Cập nhật thành công!",
    delete: "🗑️ Xóa thành công!",
    create: "🆕 Tạo mới thành công!"
  };

  return messages[type] || "✅ Thành công!";
};