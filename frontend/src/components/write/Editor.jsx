import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from 'ckeditor5-custom-build/build/ckeditor';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';
import { useSelector } from 'react-redux';

const CKEditorBlock = styled.div`
  margin-top: 7rem;

  input {
    width: 100%;
    border-radius: 10px;
    height: 5rem;
    font-size: 2rem;
    outline: none;
    padding: 1rem;
    border: ${({ theme }) => (theme === 'true' ? 'none' : `1px solid ${palette.gray[4]}`)};
    background: ${({ theme }) => (theme === 'true' ? 'rgb(60, 60, 60)' : '')};
    color: ${({ theme }) => (theme === 'true' ? 'white' : 'black')};
  }

  .ck {
    border-radius: 10px !important;

    div {
      margin-top: 10px;
    }
  }

  .ck-sticky-panel {
    border: none !important;
  }

  .ck-toolbar {
    padding: 0 20px 10px;
    background: ${({ theme }) => (theme === 'true' ? 'rgb(60, 60, 60)' : '')};
    border: ${({ theme }) => (theme === 'true' ? 'none' : `1px solid ${palette.gray[4]}`)};
  }

  .ck-toolbar__items {
    div {
      margin: 0;
    }

    svg {
      color: ${({ theme }) => (theme === 'true' ? 'white' : 'black')} !important;
    }
  }

  .ck-button:not(.ck-disabled):hover,
  .ck-button:not(.ck-disabled):active,
  .ck-on {
    background: ${({ theme }) => (theme === 'true' ? 'rgb(90, 90, 90)' : `${palette.gray[3]}`)} !important;
  }

  .ck-sticky-panel__content {
    border-bottom: ${({ theme }) => (theme === 'true' ? 'none' : `1px solid ${palette.gray[4]}`)};
  }

  .ck-content {
    padding: 10px 20px;
    border: ${({ theme }) => (theme === 'true' ? 'none' : `1px solid ${palette.gray[4]}`)};
    background: ${({ theme }) => (theme === 'true' ? 'rgb(60, 60, 60)' : '')} !important;
  }
`;

const Editor = ({ onChangeField, title, content, postId }) => {
  const theme = useSelector((state) => state.theme.theme);

  const onChange = (event) => {
    onChangeField(event.target.className, event.target.value);
  };

  return (
    <CKEditorBlock theme={String(theme)}>
      <input type="text" placeholder="제목을 입력해주세요" className="title" onChange={onChange} value={title} />
      <CKEditor
        editor={ClassicEditor}
        config={{
          placeholder: '내용을 입력해주세요',
          simpleUpload: {
            uploadUrl: `/posts/img`,
          },
        }}
        onReady={(editor) => {
          // You can store the "editor" and use when it is needed.
          console.log('Editor is ready to use!', editor);
          if (postId) {
            editor.setData(content);
          }
          editor.editing.view.change((writer) => {
            writer.setStyle('height', '350px', editor.editing.view.document.getRoot());
            // writer.setStyle('width', '350px', editor.editing.view.document.getRoot());
            // writer.setStyle('border-radius', '1000px', editor.editing.view.document.getRoot());
          });
        }}
        onChange={(event, editor) => {
          // const data = editor.getData();
          // console.log({ event, editor, data });
          onChangeField('content', editor.getData());
        }}
        onBlur={(event, editor) => {
          console.log('Blur.', editor);
        }}
        onFocus={(event, editor) => {
          console.log('Focus.', editor);
        }}
      />
    </CKEditorBlock>
  );
};

export default Editor;
