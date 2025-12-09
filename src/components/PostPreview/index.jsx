import PropTypes from 'prop-types';
import { Card } from 'antd';
import { FileTextOutlined, UserOutlined, CalendarOutlined, TagOutlined } from '@ant-design/icons';
import styled from 'styled-components';

const PreviewCard = styled(Card)`
  background: #ffffff;
  border: none;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08);
  border-radius: 12px;

  .ant-card-head {
    background: #ffffff;
    border-bottom: 1px solid #e5e5e5;
    color: #1a1a1a;
  }

  .ant-card-body {
    padding: 0;
    background: #ffffff;
  }
`;

const PreviewContent = styled.div`
  max-height: calc(100vh - 140px);
  overflow-y: auto;
  padding: 24px;
  background: #ffffff;
  color: #1a1a1a;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: #f5f5f5;
  }

  &::-webkit-scrollbar-thumb {
    background: #d1d5db;
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #7c3aed;
  }
`;

const PostPreview = ({
  data,
  categoryDatas,
  tagsDatas,
  statusPostDatas,
  admin,
  getCategoryName,
  getTagNames,
  getStatusText
}) => {
  return (
    <PreviewCard title={
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <FileTextOutlined style={{ color: '#7c3aed' }} />
        <span>Preview</span>
      </div>
    }>
      <PreviewContent>
        {!data.title && !data.content ? (
          <div style={{ textAlign: 'center', padding: '60px 0', color: '#9ca3af' }}>
            <FileTextOutlined style={{ fontSize: '3rem', marginBottom: 16, opacity: 0.3, color: '#d1d5db' }} />
            <div style={{ fontSize: '18px', marginBottom: 8 }}>Chưa có nội dung</div>
            <div style={{ fontSize: '14px' }}>Bắt đầu nhập tiêu đề và nội dung để xem preview</div>
          </div>
        ) : (
          <>
            {/* Title */}
            <h1 style={{ 
              fontSize: '2rem', 
              fontWeight: 'bold', 
              marginBottom: 24,
              color: '#1a1a1a',
              lineHeight: 1.2
            }}>
              {data.title || 'Tiêu đề bài viết'}
            </h1>

            {/* Meta info */}
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 16,
              marginBottom: 24,
              padding: 16,
              background: '#f9fafb',
              borderRadius: 8
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <UserOutlined style={{ color: '#7c3aed' }} />
                <span style={{ color: '#6b7280', fontSize: '14px' }}>
                  {admin?.data?.username || 'Tác giả'}
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <CalendarOutlined style={{ color: '#7c3aed' }} />
                <span style={{ color: '#6b7280', fontSize: '14px' }}>
                  {new Date().toLocaleDateString('vi-VN')}
                </span>
              </div>

              {data.category && (
                <span style={{
                  background: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)',
                  color: 'white',
                  padding: '4px 12px',
                  borderRadius: '20px',
                  fontSize: '12px',
                  fontWeight: 'bold'
                }}>
                  {getCategoryName(data.category)}
                </span>
              )}

              <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <div style={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  background: data.status === 1 ? '#10b981' : data.status === 2 ? '#7c3aed' : '#f59e0b'
                }} />
                <span style={{ color: '#6b7280', fontSize: '12px' }}>
                  {getStatusText(data.status)}
                </span>
              </div>
            </div>

            {/* Thumbnail */}
            {data.thumbnail && (
              <div style={{ marginBottom: 24, borderRadius: 12, overflow: 'hidden' }}>
                <img
                  src={data.thumbnail}
                  alt="Preview"
                  style={{ width: '100%', height: 200, objectFit: 'cover' }}
                />
              </div>
            )}

            {/* Content */}
            <div
              style={{
                color: '#374151',
                lineHeight: 1.6,
                fontSize: '16px'
              }}
              dangerouslySetInnerHTML={{
                __html: data.content || '<p style="color: #9ca3af; font-style: italic;">Nội dung bài viết sẽ hiển thị tại đây...</p>' 
              }}
            />

            {/* Tags */}
            {data.tags && data.tags.length > 0 && (
              <div style={{ marginTop: 24, paddingTop: 16, borderTop: '1px solid #e5e7eb' }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  marginBottom: 12
                }}>
                  <TagOutlined style={{ color: '#7c3aed' }} />
                  <span style={{ color: '#6b7280', fontSize: '14px' }}>Tags:</span>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {getTagNames(data.tags).map((tag, index) => (
                    <span key={index} style={{
                      background: 'rgba(124, 58, 237, 0.1)',
                      color: '#7c3aed',
                      padding: '4px 8px',
                      borderRadius: 16,
                      fontSize: '12px',
                      border: '1px solid rgba(124, 58, 237, 0.2)'
                    }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </PreviewContent>
    </PreviewCard>
  );
};

PostPreview.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string,
    content: PropTypes.string,
    category: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    tags: PropTypes.array,
    status: PropTypes.number,
    thumbnail: PropTypes.string
  }).isRequired,
  categoryDatas: PropTypes.array.isRequired,
  tagsDatas: PropTypes.array.isRequired,
  statusPostDatas: PropTypes.array.isRequired,
  admin: PropTypes.shape({
    data: PropTypes.shape({
      username: PropTypes.string
    })
  }).isRequired,
  getCategoryName: PropTypes.func.isRequired,
  getTagNames: PropTypes.func.isRequired,
  getStatusText: PropTypes.func.isRequired
};

export default PostPreview;
