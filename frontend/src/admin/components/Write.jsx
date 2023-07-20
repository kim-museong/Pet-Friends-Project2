import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useState } from 'react';
import {useTheme} from '@mui/material';
import { tokens } from "../theme";

const Editor = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const theme = useTheme();
    const { palette } = theme;
    const { primary, common } = palette;
    const colors = tokens(theme.palette.mode);

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };

    const  handleContentChange = (value) => {
        setContent(value);
    };

    const handleSave = () => {
        console.log('Title:', title);
        console.log('Content:', content);

        if (window.confirm('공지사항을 등록하시겠습니까?')) {
            // 데이터 저장 요청을 백엔드 서버로 보냄
            fetch('/api/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title: title,
                    content: content,
                    boardId: 1,
                    UserId:3
                }),
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log('Post saved successfully!', data);
                    alert('공지사항이 등록되었습니다.');
                    // 등록 후 제목과 내용 초기화
                    setTitle('');
                    setContent('');
                })
                .catch((error) => {
                    console.error('Error saving post:', error);
                    alert('공지사항 등록에 실패했습니다.');
                });
        }
    };

    return (
        <div>
            <input
                type="text"
                placeholder="제목을 입력하세요"
                value={title}
                onChange={handleTitleChange}
                style={{
                    marginBottom: '1rem',
                    padding: '0.5rem',
                    fontSize: '1rem',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                }}
            />

            <ReactQuill value={content} onChange={handleContentChange} />

            <button
                onClick={handleSave}
                style={{
                    marginLeft: '8px',
                    padding: '6px 12px',
                    background: primary.main,
                    color: common.white,
                    borderRadius: '4px',
                    border: 'none',
                    cursor: 'pointer',
                }}
            >
                작성 완료
            </button>
        </div>
    );
};

export default Editor;
