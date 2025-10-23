import axiosInstance from "@/configs/axiosConfig";

/**
 * Service để lấy thống kê dashboard admin
 */
class DashboardServices {
  /**
   * Lấy tổng quan thống kê
   */
  static async getOverviewStats() {
    try {
      const response = await axiosInstance.get("/dashboard/overview");
      return response.data;
    } catch (error) {
      console.log("Dashboard overview error:", error);
    }
  }

  static generateDateRange(startDate, endDate) {
    const dates = [];
    const current = new Date(startDate);

    while (current <= endDate) {
      dates.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }

    return dates;
  }
  static formatDateLabel(date) {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    return `${day}-${month}`;
  }

  /**
   * Lấy thống kê bài viết theo thời gian
   */
  static async getPostsAnalytics(period = 7) {
    try {
      const response = await axiosInstance.get(`/dashboard/posts-analytics?period=${period}`);
      const data = response.data;
       const currentDate = new Date();
      const startDate = new Date();
      startDate.setDate(currentDate.getDate() - (parseInt(period) - 1));
      const dateRange = this.generateDateRange(startDate, currentDate);
      const labels = dateRange.map(date => this.formatDateLabel(date));
      const postsMap = {};
      if (data?.posts && Array.isArray(data.posts)) {
        data.posts.forEach(item => {
          // item = {19/10: 5}
          const dateKey = Object.keys(item)[0]; // "19/10"
          const value = item[dateKey]; // 5
          postsMap[dateKey] = value;
        });
      }
      
      const viewsMap = {};
      if (data?.views && Array.isArray(data.views)) {
        data.views.forEach(item => {
          const dateKey = Object.keys(item)[0];
          const value = item[dateKey];
          viewsMap[dateKey] = value;
        });
      }

      const postsData = labels.map(label => {
        return postsMap[label] || 0;
      });

      const viewsData = labels.map(label => {
        return viewsMap[label] || 0;
      });

      return {
        dateRange: dateRange.map(date => date.toISOString().split('T')[0]),
        labels: labels,
        datasets: [
          {
            label: 'Bài viết mới',
            data: postsData,
            borderColor: '#1890ff',
            backgroundColor: 'rgba(24, 144, 255, 0.1)',
            tension: 0.4,
          },
          {
            label: 'Lượt xem',
            data: viewsData,
            borderColor: '#52c41a',
            backgroundColor: 'rgba(82, 196, 26, 0.1)',
            tension: 0.4,
          }
        ]
      };
    } catch (error) {
      console.log("Posts analytics error:", error);
      // Mock data để test
      return {
        labels: ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'],
        datasets: [
          {
            label: 'Bài viết mới',
            data: [12, 8, 15, 10, 6, 9, 14],
            borderColor: '#1890ff',
            backgroundColor: 'rgba(24, 144, 255, 0.1)',
          },
          {
            label: 'Lượt xem',
            data: [850, 720, 950, 800, 600, 750, 890],
            borderColor: '#52c41a',
            backgroundColor: 'rgba(82, 196, 26, 0.1)',
          }
        ]
      };
    }
  }

  /**
   * Lấy danh sách bài viết gần đây
   */
  static async getRecentPosts(limit = 5) {
    try {
      const response = await axiosInstance.get(`/dashboard/recent-posts?limit=${limit}`);
      return response.data;
    } catch (error) {
      console.log("Recent posts error:", error);
      // Mock data để test
      return {
        data: [
          {
            id: 1,
            title: "Hướng dẫn sử dụng React Hooks hiệu quả",
            status: "published",
            views: 1250,
            author: "Nguyễn Văn A",
            created_at: "2025-10-20T10:30:00Z",
            category: "Lập trình"
          },
          {
            id: 2,
            title: "10 mẹo tối ưu hóa hiệu suất website",
            status: "draft",
            views: 0,
            author: "Trần Thị B",
            created_at: "2025-10-19T15:45:00Z",
            category: "Web Development"
          },
          {
            id: 3,
            title: "Xu hướng công nghệ 2025",
            status: "published",
            views: 890,
            author: "Lê Văn C",
            created_at: "2025-10-18T09:20:00Z",
            category: "Công nghệ"
          },
          {
            id: 4,
            title: "Machine Learning cơ bản cho người mới",
            status: "published",
            views: 2100,
            author: "Phạm Thị D",
            created_at: "2025-10-17T14:10:00Z",
            category: "AI/ML"
          },
          {
            id: 5,
            title: "Bảo mật website với HTTPS",
            status: "published", 
            views: 760,
            author: "Hoàng Văn E",
            created_at: "2025-10-16T11:25:00Z",
            category: "Bảo mật"
          }
        ]
      };
    }
  }

  /**
   * Lấy thống kê danh mục
   */
  static async getCategoriesStats() {
    try {
      const response = await axiosInstance.get("/dashboard/categories-stats");
      return response.data;
    } catch (error) {
      console.log("Categories stats error:", error);
    }
  }

  /**
   * Lấy thống kê tác giả
   */
  static async getAuthorsStats() {
    try {
      const response = await axiosInstance.get("/dashboard/authors-stats");
      return response.data;
    } catch (error) {
      console.log("Authors stats error:", error);
      // Mock data để test
      return [
        {
          id: 1,
          name: "Nguyễn Văn A",
          posts: 23,
          views: 15420,
          avatar: null,
          role: "Senior Author"
        },
        {
          id: 2,
          name: "Trần Thị B", 
          posts: 18,
          views: 12350,
          avatar: null,
          role: "Author"
        },
        {
          id: 3,
          name: "Lê Văn C",
          posts: 15,
          views: 9870,
          avatar: null,
          role: "Author"
        },
        {
          id: 4,
          name: "Phạm Thị D",
          posts: 12,
          views: 8920,
          avatar: null,
          role: "Junior Author"
        }
      ];
    }
  }
}

export default DashboardServices;