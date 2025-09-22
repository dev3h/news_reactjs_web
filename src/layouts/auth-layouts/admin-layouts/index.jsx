import { Card, Typography } from "antd";
import { Outlet } from "react-router-dom";
import PropTypes from "prop-types";
import { SafetyCertificateFilled, ReadFilled } from "@ant-design/icons";
import "@/styles/admin-auth.css";
import { useState } from "react";

const { Title, Text } = Typography;

const AdminAuthLayout = ({ title = "Đăng Nhập Quản Trị" }) => {
  const [currentYear] = useState(new Date().getFullYear());
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 bg-decoration"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 bg-decoration"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 bg-decoration"></div>
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg width%3D%2260%22 height%3D%2260%22 viewBox%3D%220 0 60 60%22 xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg fill%3D%22none%22 fill-rule%3D%22evenodd%22%3E%3Cg fill%3D%22%23ffffff%22 fill-opacity%3D%220.05%22%3E%3Ccircle cx%3D%227%22 cy%3D%227%22 r%3D%221%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>

      <div className="relative z-10 px-5 lg:px-0 flex justify-center items-center min-h-screen max-w-[1200px] mx-auto">
        <div className="w-full max-w-md login-form-container">
          {/* Logo and header section */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-6 shadow-xl admin-logo">
              <div className="flex items-center space-x-1">
                <SafetyCertificateFilled style={{ fontSize: 32, color: "#fff" }} />
                <ReadFilled style={{ fontSize: 24, color: "#fff" }} />
              </div>
            </div>
            <Title level={2} className="text-white mb-2 font-bold">
              News Admin
            </Title>
            <Text className="text-blue-200 text-lg">
              Hệ thống quản trị tin tức
            </Text>
          </div>

          {/* Login card */}
          <Card
            className="w-full shadow-2xl border-0 glass-card rounded-xl overflow-hidden"
            bodyStyle={{
              padding: '32px',
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(10px)'
            }}
          >
            <div className="text-center mb-6">
              <Title level={3} className="text-gray-800 mb-2">
                {title}
              </Title>
              <Text className="text-gray-600">
                Vui lòng đăng nhập để tiếp tục
              </Text>
            </div>
            <Outlet />
          </Card>

          {/* Footer */}
          <div className="text-center mt-6">
            <Text className="text-blue-200 text-sm">
              © {currentYear} News Admin System. All rights reserved.
            </Text>
          </div>
        </div>
      </div>
    </div>
  );
};

AdminAuthLayout.propTypes = {
  title: PropTypes.string,
};

export default AdminAuthLayout;
