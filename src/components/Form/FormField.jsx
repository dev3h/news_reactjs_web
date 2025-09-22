import React from 'react';
import { Form, Input } from 'antd';
import PropTypes from 'prop-types';
import { FORM_FIELD_CONFIGS } from '@/utils/formValidation';

const FormField = ({
  name,
  label,
  placeholder,
  rules,
  prefix,
  type = 'text',
  className = 'login-form-field',
  showLabel = true,
  autoComplete,
  maxLength,
  ...props
}) => {
  const InputComponent = type === 'password' ? Input.Password : Input;

  return (
    <Form.Item
      label={showLabel && (
        <span className={FORM_FIELD_CONFIGS.common.labelClass}>
          {label}
        </span>
      )}
      name={name}
      hasFeedback
      className={className}
      rules={rules}
    >
      <InputComponent
        prefix={prefix}
        placeholder={placeholder}
        size={FORM_FIELD_CONFIGS.common.size}
        className={FORM_FIELD_CONFIGS.common.inputClass}
        autoComplete={autoComplete}
        maxLength={maxLength}
        allowClear={type !== 'password'}
        {...props}
      />
    </Form.Item>
  );
};

FormField.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  rules: PropTypes.array,
  prefix: PropTypes.node,
  type: PropTypes.oneOf(['text', 'password', 'email']),
  className: PropTypes.string,
  showLabel: PropTypes.bool,
  autoComplete: PropTypes.string,
  maxLength: PropTypes.number,
};

export default FormField;