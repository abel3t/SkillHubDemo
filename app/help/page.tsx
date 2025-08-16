import React from 'react';

const HelpPage = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Trợ giúp & Hỗ trợ</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-2">Chào mừng bạn đến với trang Trợ giúp!</h2>
        <p className="text-gray-700 mb-4">
          Tại đây, bạn có thể tìm thấy các câu trả lời cho những câu hỏi thường gặp và hướng dẫn sử dụng ứng dụng.
        </p>
        <h3 className="text-lg font-semibold mb-2">Các chủ đề phổ biến:</h3>
        <ul className="list-disc list-inside text-gray-700 mb-4">
          <li>Cách tạo tài khoản và đăng nhập</li>
          <li>Tìm kiếm và kết nối với các chuyên gia</li>
          <li>Quản lý hồ sơ cá nhân</li>
          <li>Gửi và nhận tin nhắn</li>
          <li>Báo cáo sự cố hoặc lạm dụng</li>
        </ul>
        <p className="text-gray-700">
          Nếu bạn không tìm thấy câu trả lời mình cần, vui lòng liên hệ với chúng tôi qua email hoặc số điện thoại hỗ trợ.
        </p>
        <p className="text-gray-700 mt-2">
          Email: support@skillhub.com
        </p>
        <p className="text-gray-700">
          Điện thoại: 1900-1234
        </p>
      </div>
    </div>
  );
};

export default HelpPage;
