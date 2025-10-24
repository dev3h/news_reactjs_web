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
    }
  }
}

export default DashboardServices;