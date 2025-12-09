import { Card } from 'antd';
import PropTypes from 'prop-types';

/**
 * ChartCard - Card wrapper cho charts với styling đẹp
 */
const ChartCard = ({ 
  title, 
  children, 
  extra = null,
  height = 400,
  loading = false,
  className = ''
}) => {
  return (
    <Card 
      title={title}
      extra={extra}
      loading={loading}
      className={`shadow-sm hover:shadow-md transition-shadow duration-300 ${className}`}
      bodyStyle={{ 
        padding: '20px',
        height: height - 70, // Subtract header height
        overflow: 'hidden'
      }}
    >
      <div className="w-full h-full">
        {children}
      </div>
    </Card>
  );
};

ChartCard.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
  extra: PropTypes.node,
  height: PropTypes.number,
  loading: PropTypes.bool,
  className: PropTypes.string,
};

export default ChartCard;