import { Card, Statistic } from 'antd';
import PropTypes from 'prop-types';

/**
 * StatCard - Card thống kê đẹp với gradient và animation
 */
const StatCard = ({ 
  title, 
  value, 
  icon, 
  color = '#1890ff', 
  suffix = '', 
  prefix = '',
  description = '',
  trend = null,
  gradient = false,
  className = ''
}) => {
  const gradientColors = {
    blue: 'from-blue-400 to-blue-600',
    green: 'from-green-400 to-green-600', 
    yellow: 'from-yellow-400 to-yellow-600',
    purple: 'from-purple-400 to-purple-600',
    pink: 'from-pink-400 to-pink-600',
    red: 'from-red-400 to-red-600',
  };

  const getGradientClass = (color) => {
    const colorMap = {
      '#1890ff': 'blue',
      '#52c41a': 'green',
      '#faad14': 'yellow', 
      '#722ed1': 'purple',
      '#eb2f96': 'pink',
      '#f5222d': 'red',
    };
    return gradientColors[colorMap[color]] || gradientColors.blue;
  };

  return (
    <Card 
      className={`
        ${gradient ? `bg-gradient-to-br ${getGradientClass(color)} text-white border-0 shadow-lg` : 'hover:shadow-md'}
        transition-all duration-300 hover:scale-105 
        ${className}
      `}
      bodyStyle={{ padding: '20px' }}
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <Statistic
            title={
              <span className={gradient ? 'text-white text-opacity-90' : 'text-gray-600'}>
                {title}
              </span>
            }
            value={value}
            suffix={suffix}
            prefix={prefix}
            valueStyle={{ 
              color: gradient ? 'white' : color,
              fontSize: '24px',
              fontWeight: 'bold'
            }}
          />
          {description && (
            <div className={`text-sm mt-1 ${gradient ? 'text-white text-opacity-75' : 'text-gray-500'}`}>
              {description}
            </div>
          )}
          {trend && (
            <div className={`text-xs mt-2 ${gradient ? 'text-white text-opacity-80' : 'text-gray-400'}`}>
              {trend}
            </div>
          )}
        </div>
        {icon && (
          <div className={`text-3xl ${gradient ? 'text-white text-opacity-80' : ''}`} style={{ color: gradient ? 'inherit' : color }}>
            {icon}
          </div>
        )}
      </div>
    </Card>
  );
};

StatCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  icon: PropTypes.node,
  color: PropTypes.string,
  suffix: PropTypes.string,
  prefix: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  description: PropTypes.string,
  trend: PropTypes.string,
  gradient: PropTypes.bool,
  className: PropTypes.string,
};

export default StatCard;