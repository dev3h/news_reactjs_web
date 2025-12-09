import styled from 'styled-components';

export const PreviewSection = styled.div`
  flex: ${props => props.$visible ? '0 0 48%' : '0'};
  max-width: ${props => props.$visible ? '48%' : '0'};
  opacity: ${props => props.$visible ? '1' : '0'};
  overflow: hidden;
  position: sticky;
  top: 20px;
  height: fit-content;
  max-height: calc(100vh - 40px);
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    flex: ${props => props.$visible ? '1' : '0'};
    max-width: 100%;
    position: relative;
    top: 0;
    max-height: none;
    margin-top: ${props => props.$visible ? '16px' : '0'};
  }
`;

export const FormSection = styled.div`
  flex: ${props => props.$previewVisible ? '0 0 50%' : '1'};
  max-width: ${props => props.$previewVisible ? '50%' : '100%'};
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    flex: none;
    max-width: 100%;
  }
`;

export const PreviewToggle = styled.button`
  margin-bottom: 16px;
  border-radius: 8px;
  width: auto;
  height: 40px;
  padding: 0 16px;
  box-shadow: 0 2px 8px rgba(124, 58, 237, 0.3);
  display: flex;
  align-items: center;
  gap: 8px;
  background: #7c3aed;
  color: white;
  border: none;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s;
  
  &:hover {
    background: #6d28d9;
    box-shadow: 0 4px 12px rgba(124, 58, 237, 0.4);
  }
  
  @media (max-width: 768px) {
    width: 100%;
    justify-content: center;
  }
`;

export const FormContainer = styled.div`
  display: flex;
  gap: 24px;
  min-height: 100vh;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 16px;
  }
`;
