import { useEffect, useMemo, useState, useCallback, useRef } from "react";
import { BlockNoteView } from "@blocknote/mantine";
import { useCreateBlockNote } from "@blocknote/react";
import "@blocknote/core/fonts/inter.css";
import "@blocknote/mantine/style.css";
import { Button } from "antd";
import { FullscreenOutlined, FullscreenExitOutlined } from "@ant-design/icons";
import styled from "styled-components";
import PropTypes from "prop-types";

const BlockNoteEditor = ({ initialContent, onChange, placeholder = "Nhập nội dung bài viết..." }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const onChangeRef = useRef(onChange);

  // Update ref when onChange changes
  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  // Parse initial content
  const parsedInitialContent = useMemo(() => {
    if (!initialContent) return undefined;

    try {
      if (typeof initialContent === 'string' && initialContent.trim().startsWith('<')) {
        return undefined; // BlockNote will use default blocks
      }

      if (Array.isArray(initialContent)) {
        return initialContent;
      }

      return undefined;
    } catch (error) {
      console.error('Error parsing initial content:', error);
      return undefined;
    }
  }, [initialContent]);

  // Create editor instance
  const editor = useCreateBlockNote({
    initialContent: parsedInitialContent,
    onChange: () => {
      handleEditorChange();
    },
  });

  // Load HTML content separately
  useEffect(() => {
    if (!editor || !initialContent) return;

    if (typeof initialContent === 'string' && initialContent.trim().startsWith('<')) {
      const loadContent = async () => {
        try {
          const blocks = editor.tryParseHTMLToBlocks(initialContent);
          editor.replaceBlocks(editor.document, blocks);
        } catch (error) {
          console.error('Error loading HTML content:', error);
        }
      };
      loadContent();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editor]); // Only run once when editor is ready

  // Handle content changes
  const handleEditorChange = useCallback(async () => {
    if (!editor) return;

    try {
      const blocks = editor.document;
      const html = editor.blocksToHTMLLossy(blocks);

      // Use setTimeout to defer the state update and avoid blocking UI
      setTimeout(() => {
        if (onChangeRef.current) {
          onChangeRef.current(html, blocks);
        }
      }, 0);
    } catch (error) {
      console.error('Error handling editor change:', error);
    }
  }, [editor]);

  useEffect(() => {
    if (!editor) return;

    let timeoutId = null;

    // Debounce the change handler to avoid rapid successive calls
    const debouncedHandler = () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      timeoutId = setTimeout(() => {
        handleEditorChange();
      }, 100);
    };

    // Subscribe to editor changes
    const unsubscribe = editor.onChange(debouncedHandler);

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      if (typeof unsubscribe === 'function') {
        unsubscribe();
      }
    };
  }, [editor, handleEditorChange]);

  // Handle fullscreen
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isFullscreen) {
        setIsFullscreen(false);
      }
    };

    if (isFullscreen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isFullscreen]);

  if (!editor) {
    return <div>Loading editor...</div>;
  }

  return (
    <EditorWrapper className={isFullscreen ? 'fullscreen' : ''}>
      <EditorHeader>
        <h4>{isFullscreen ? 'Chế độ toàn màn hình - Nhấn ESC để thoát' : 'Nội dung bài viết'}</h4>
        <Button
          type="text"
          icon={isFullscreen ? <FullscreenExitOutlined /> : <FullscreenOutlined />}
          onClick={() => setIsFullscreen(!isFullscreen)}
        >
          {isFullscreen ? 'Thu nhỏ' : 'Toàn màn hình'}
        </Button>
      </EditorHeader>
      <BlockNoteView
        editor={editor}
        theme="light"
        data-theming-css-variables-demo
        placeholder={placeholder}
      />
    </EditorWrapper>
  );
};

BlockNoteEditor.propTypes = {
  initialContent: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array
  ]),
  onChange: PropTypes.func,
  placeholder: PropTypes.string
};

const EditorWrapper = styled.div`
  position: relative;
  border: 1px solid #d9d9d9;
  border-radius: 8px;
  min-height: 400px;

  &.fullscreen {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 9999;
    background: white;
    border-radius: 0;

    .bn-container {
      height: calc(100vh - 60px);
    }
  }

  .bn-container {
    padding: 16px;

    .bn-editor {
      min-height: 300px;
    }
  }
`;

const EditorHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  border-bottom: 1px solid #d9d9d9;
  background: #fafafa;
  border-radius: 8px 8px 0 0;

  .fullscreen & {
    border-radius: 0;
  }

  h4 {
    margin: 0;
    font-size: 14px;
    color: #595959;
  }
`;

export default BlockNoteEditor;
