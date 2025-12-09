import { useEffect, useState } from 'react';
import { 
  Row, 
  Col, 
  Card,
  Table, 
  Tag, 
  Avatar, 
  List,
  Button,
  Space,
  Tooltip,
  Spin
} from 'antd';
import {
  FileTextOutlined,
  FolderOutlined,
  TagOutlined,
  UserOutlined,
  EyeOutlined,
  TrophyOutlined,
  EditOutlined,
  EllipsisOutlined
} from '@ant-design/icons';
import { Line, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip as ChartTooltip,
  Legend,
} from 'chart.js';

import DashboardServices from '@/services/adminServices/dashboardServices';
import customRenderAvatar from '@/utils/customRenderAvatar';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import StatCard from '@/components/Dashboard/StatCard';
import ChartCard from '@/components/Dashboard/ChartCard';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  ChartTooltip,
  Legend
);

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [overviewStats, setOverviewStats] = useState({});
  const [postsAnalytics, setPostsAnalytics] = useState({});
  const [recentPosts, setRecentPosts] = useState([]);
  const [categoriesStats, setCategoriesStats] = useState([]);
  const [authorsStats, setAuthorsStats] = useState([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const [overview, analytics, recent, categories, authors] = await Promise.all([
        DashboardServices.getOverviewStats(),
        DashboardServices.getPostsAnalytics(),
        DashboardServices.getRecentPosts(),
        DashboardServices.getCategoriesStats(),
        DashboardServices.getAuthorsStats()
      ]);

      setOverviewStats(overview);
      setPostsAnalytics(analytics);
      setRecentPosts(recent.data);
      setCategoriesStats(categories);
      setAuthorsStats(authors);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Prepare chart options
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Thống kê 7 ngày gần đây',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const doughnutData = {
    labels: categoriesStats.map(cat => cat.name),
    datasets: [
      {
        data: categoriesStats.map(cat => cat.posts),
        backgroundColor: categoriesStats.map(cat => cat.color),
        borderWidth: 2,
      },
    ],
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
      },
      title: {
        display: true,
        text: 'Phân bố bài viết theo danh mục',
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
            <Tag color={record?.published_at ? 'green' : 'orange'}>
              {record?.published_at ? 'Đã xuất bản' : 'Nháp'}
            </Tag>
            <span className="ml-2">{record.category?.name || '---'}</span>
          </div>
        </div>
      ),
    },
    {
      title: 'Tác giả',
      dataIndex: 'created_by_admin',
      key: 'created_by_admin',
      width: 120,
      render: (_, record) => {
        return record?.created_by_admin?.display_name || '---';
      }
    },
    {
      title: 'Lượt xem',
      dataIndex: 'view',
      key: 'view',
      width: 80,
      render: (view) => (
        <Space>
            <EyeOutlined />
            {view ? view.toLocaleString() : 0}
        </Space>
      ),
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'created_at',
      key: 'created_at',
      width: 100,
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
              onClick={() => navigate(`/admin/post/${record.id}/edit`)}
            />
          </Tooltip>
          <Tooltip title="Xem chi tiết">
            <Button 
              type="text" 
              icon={<EllipsisOutlined />}
              onClick={() => navigate(`/admin/post/${record.id}/show`)}
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
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Dashboard Quản trị</h1>
        <p className="text-gray-600">Tổng quan về hệ thống quản lý tin tức</p>
      </div>

      {/* Overview Statistics */}
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={6}>
          <StatCard
            title="Tổng bài viết"
            value={overviewStats?.totalPosts}
            icon={<FileTextOutlined />}
            color="#1890ff"
            description={`${overviewStats?.publishedPosts} đã xuất bản`}
            gradient
          />
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <StatCard
            title="Danh mục"
            value={overviewStats?.totalCategories}
            icon={<FolderOutlined />}
            color="#52c41a"
            gradient
          />
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <StatCard
            title="Thẻ"
            value={overviewStats?.totalTags}
            icon={<TagOutlined />}
            color="#faad14"
            gradient
          />
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <StatCard
            title="Tác giả"
            value={overviewStats?.totalAuthors}
            icon={<UserOutlined />}
            color="#722ed1"
            gradient
          />
        </Col>
      </Row>

      {/* Views Statistics */}
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12}>
          <StatCard
            title="Tổng lượt xem"
            value={overviewStats?.totalViews?.toLocaleString()}
            icon={<EyeOutlined />}
            color="#eb2f96"
            description={`Hôm nay: ${overviewStats?.todayViews?.toLocaleString()} lượt`}
          />
        </Col>
        <Col xs={24} sm={12}>
          <StatCard
            title="Hiệu suất xuất bản"
            value={overviewStats?.totalPosts ? Math.round((overviewStats?.publishedPosts / overviewStats?.totalPosts) * 100) : 0}
            suffix="%"
            icon={<TrophyOutlined />}
            color="#fa541c"
            description={`${overviewStats?.publishedPosts}/${overviewStats?.totalPosts} bài viết`}
          />
        </Col>
      </Row>

      {/* Charts */}
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={14}>
          <ChartCard title="Thống kê hoạt động" height={400}>
            <Line data={postsAnalytics} options={chartOptions} />
          </ChartCard>
        </Col>
        <Col xs={24} lg={10}>
          <ChartCard title="Phân bố danh mục" height={400}>
            <Doughnut data={doughnutData} options={doughnutOptions} />
          </ChartCard>
        </Col>
      </Row>

      {/* Recent Posts and Top Authors */}
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={16}>
          <Card 
            title="Bài viết gần đây" 
            extra={
              <Button type="link" onClick={() => navigate('/admin/post')}>
                Xem tất cả
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
        </Col>
        <Col xs={24} lg={8}>
          <Card 
            title="Top tác giả"
            extra={
              <Button type="link" onClick={() => navigate('/admin/manager-author')}>
                Xem tất cả
              </Button>
            }
          >
            <List
              dataSource={authorsStats}
              renderItem={(author, index) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={
                      <Avatar className="bg-blue-500">
                        {customRenderAvatar(author.name)}
                      </Avatar>
                    }
                    title={
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{author.name}</span>
                        <Tag color={index === 0 ? 'gold' : index === 1 ? 'silver' : 'default'}>
                          #{index + 1}
                        </Tag>
                      </div>
                    }
                    description={
                      <div className="space-y-1">
                        <div className="text-xs text-gray-500">{author.role}</div>
                        <div className="flex justify-between text-xs">
                          <span>{author.posts} bài viết</span>
                          <span>{author.views.toLocaleString()} lượt xem</span>
                        </div>
                      </div>
                    }
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default AdminDashboard;