import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from 'ckeditor5-custom-build/build/ckeditor';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';

const CKEditorBlock = styled.div`
  margin-top: 5rem;
  /* border: 1px solid red; */
  input {
    width: 100%;
    border-radius: 0;
    height: 5rem;
    font-size: 2rem;
    border: 1px solid ${palette.gray[4]};
    margin-bottom: 0.25rem;
    outline: none;
    padding: 1rem;
  }
`;

const Editor = ({ onChangeField }) => {
  const onChange = (event) => {
    console.log(event.target.className);
    console.log(event.target.value);
    onChangeField(event.target.className, event.target.value);
  };

  return (
    <CKEditorBlock>
      <input type="text" placeholder="제목을 입력해주세요" className="title" onChange={onChange} />
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
