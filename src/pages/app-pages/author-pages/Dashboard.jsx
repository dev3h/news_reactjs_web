import { useEffect, useState } from 'react';
import { 
  Row, 
  Col, 
  Card, 
  Statistic, 
  Table, 
  Tag, 
  Button,
  Space,
  Tooltip,
  Spin,
  Progress
} from 'antd';
import {
  FileTextOutlined,
  EyeOutlined,
  CalendarOutlined,
  RiseOutlined,
  EditOutlined,
  EllipsisOutlined,
  PlusOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined
} from '@ant-design/icons';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip as ChartTooltip,
  Legend,
} from 'chart.js';

import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  ChartTooltip,
  Legend
);

const AuthorDashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [authorStats, setAuthorStats] = useState({});
  const [recentPosts, setRecentPosts] = useState([]);
  const [performanceData, setPerformanceData] = useState({});

  useEffect(() => {
    fetchAuthorData();
  }, []);

  const fetchAuthorData = async () => {
    setLoading(true);
    try {
      // Mock data cho author dashboard
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      
      setAuthorStats({
        totalPosts: 23,
        publishedPosts: 18,
        draftPosts: 5,
        totalViews: 15420,
        todayViews: 85,
        avgViews: Math.round(15420 / 18),
        engagement: 78
      });

      setRecentPosts([
        {
          id: 1,
          title: "Hướng dẫn sử dụng React Hooks hiệu quả",
          status: "published",
          views: 1250,
          created_at: "2025-10-20T10:30:00Z",
          category: "Lập trình"
        },
        {
          id: 2,
          title: "10 mẹo tối ưu hóa hiệu suất website",
          status: "draft", 
          views: 0,
          created_at: "2025-10-19T15:45:00Z",
          category: "Web Development"
        },
        {
          id: 3,
          title: "Xu hướng công nghệ 2025",
          status: "published",
          views: 890,
          created_at: "2025-10-18T09:20:00Z",
          category: "Công nghệ"
        },
        {
          id: 4,
          title: "Machine Learning cơ bản cho người mới",
          status: "published",
          views: 2100,
          created_at: "2025-10-17T14:10:00Z",
          category: "AI/ML"
        }
      ]);

      setPerformanceData({
        labels: ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'],
        datasets: [
          {
            label: 'Lượt xem',
            data: [120, 150, 180, 220, 190, 250, 300],
            borderColor: '#1890ff',
            backgroundColor: 'rgba(24, 144, 255, 0.1)',
            tension: 0.4,
          }
        ]
      });
      
    } catch (error) {
      console.error('Error fetching author data:', error);
    } finally {
      setLoading(false);
    }
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Lượt xem trong 7 ngày gần đây',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  // Recent posts table columns
  const recentPostsColumns = [
    {
      title: 'Tiêu đề',
      dataIndex: 'title',
      key: 'title',
      render: (text, record) => (
        <div>
          <div className="font-medium text-gray-900 mb-1">{text}</div>
          <div className="text-xs text-gray-500">
            <Tag color={record.status === 'published' ? 'green' : 'orange'}>
              {record.status === 'published' ? 'Đã xuất bản' : 'Nháp'}
            </Tag>
            <span className="ml-2">{record.category}</span>
          </div>
        </div>
      ),
    },
    {
      title: 'Lượt xem',
      dataIndex: 'views',
      key: 'views',
      width: 100,
      render: (views) => (
        <Space>
          <EyeOutlined />
          {views.toLocaleString()}
        </Space>
      ),
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'created_at',
      key: 'created_at',
      width: 120,
      render: (date) => dayjs(date).format('DD/MM/YYYY'),
    },
    {
      title: 'Thao tác',
      key: 'action',
      width: 100,
      render: (_, record) => (
        <Space>
          <Tooltip title="Chỉnh sửa">
            <Button 
              type="text" 
              icon={<EditOutlined />} 
              onClick={() => navigate(`/author/post/${record.id}/edit`)}
            />
          </Tooltip>
          <Tooltip title="Xem chi tiết">
            <Button 
              type="text" 
              icon={<EllipsisOutlined />}
              onClick={() => navigate(`/author/post/${record.id}/show`)}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Dashboard Tác giả</h1>
        <p className="text-gray-600">Quản lý bài viết và theo dõi hiệu suất của bạn</p>
      </div>

      {/* Quick Actions */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <Row gutter={[16, 16]} align="middle">
          <Col flex={1}>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Bắt đầu viết bài mới
              </h3>
              <p className="text-gray-600 mb-4">
                Chia sẻ kiến thức và kinh nghiệm của bạn với cộng đồng
              </p>
            </div>
          </Col>
          <Col>
            <Button 
              type="primary" 
              size="large"
              icon={<PlusOutlined />}
              onClick={() => navigate('/author/post/create')}
            >
              Tạo bài viết mới
            </Button>
          </Col>
        </Row>
      </Card>

      {/* Statistics Cards */}
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Tổng bài viết"
              value={authorStats.totalPosts}
              prefix={<FileTextOutlined style={{ color: '#1890ff' }} />}
              valueStyle={{ color: '#1890ff' }}
            />
            <div className="mt-2 text-xs text-gray-500">
              <CheckCircleOutlined className="text-green-500" /> {authorStats.publishedPosts} đã xuất bản
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Bài nháp"
              value={authorStats.draftPosts}
              prefix={<ClockCircleOutlined style={{ color: '#faad14' }} />}
              valueStyle={{ color: '#faad14' }}
            />
            <div className="mt-2 text-xs text-gray-500">
              Chưa xuất bản
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Tổng lượt xem"
              value={authorStats.totalViews}
              prefix={<EyeOutlined style={{ color: '#52c41a' }} />}
              valueStyle={{ color: '#52c41a' }}
            />
            <div className="mt-2 text-xs text-gray-500">
              <CalendarOutlined /> Hôm nay: {authorStats.todayViews} lượt
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="TB lượt xem"
              value={authorStats.avgViews}
              prefix={<RiseOutlined style={{ color: '#722ed1' }} />}
              valueStyle={{ color: '#722ed1' }}
            />
            <div className="mt-2">
              <Progress 
                percent={authorStats.engagement} 
                size="small" 
                status="active"
                format={() => `${authorStats.engagement}% tương tác`}
              />
            </div>
          </Card>
        </Col>
      </Row>

      {/* Performance Chart */}
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={14}>
          <Card title="Hiệu suất bài viết" className="h-96">
            <div className="h-64">
              <Line data={performanceData} options={chartOptions} />
            </div>
          </Card>
        </Col>
        <Col xs={24} lg={10}>
          <Card title="Thống kê nhanh">
            <div className="space-y-6">
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">
                  {authorStats.totalPosts ? Math.round((authorStats.publishedPosts / authorStats.totalPosts) * 100) : 0}%
                </div>
                <div className="text-sm text-gray-600">Tỷ lệ xuất bản</div>
              </div>
              
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">
                  {authorStats.avgViews}
                </div>
                <div className="text-sm text-gray-600">Trung bình lượt xem/bài</div>
              </div>

              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">
                  {authorStats.engagement}%
                </div>
                <div className="text-sm text-gray-600">Mức độ tương tác</div>
              </div>
            </div>
          </Card>
        </Col>
      </Row>

      {/* Recent Posts */}
      <Card 
        title="Bài viết gần đây" 
        extra={
          <Button type="link" onClick={() => navigate('/author/post')}>
            Xem tất cả bài viết
          </Button>
        }
      >
        <Table
          columns={recentPostsColumns}
          dataSource={recentPosts}
          pagination={false}
          size="small"
          rowKey="id"
        />
      </Card>

      {/* Tips and Guidelines */}
      <Row gutter={[16, 16]}>
        <Col xs={24} md={12}>
          <Card title="💡 Mẹo viết bài hiệu quả" className="h-full">
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <div>
                  <div className="font-medium">Tiêu đề hấp dẫn</div>
                  <div className="text-sm text-gray-600">Sử dụng từ khóa phù hợp và gây tò mò</div>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                <div>
                  <div className="font-medium">Nội dung chất lượng</div>
                  <div className="text-sm text-gray-600">Cung cấp thông tin hữu ích và đáng tin cậy</div>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                <div>
                  <div className="font-medium">Hình ảnh minh họa</div>
                  <div className="text-sm text-gray-600">Thêm hình ảnh để bài viết sinh động hơn</div>
                </div>
              </div>
            </div>
          </Card>
        </Col>
        <Col xs={24} md={12}>
          <Card title="📊 Mục tiêu tháng này" className="h-full">
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span>Bài viết mới</span>
                  <span className="text-sm text-gray-500">3/5</span>
                </div>
                <Progress percent={60} size="small" />
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span>Lượt xem</span>
                  <span className="text-sm text-gray-500">15.4K/20K</span>
                </div>
                <Progress percent={77} size="small" status="active" />
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span>Tương tác</span>
                  <span className="text-sm text-gray-500">78/80%</span>
                </div>
                <Progress percent={98} size="small" />
              </div>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default AuthorDashboard;