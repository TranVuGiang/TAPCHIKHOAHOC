import { useState } from 'react';
import ReactQuill from 'react-quill';

function WordForm({ title, setEditorData }) {
    const [editorContents, setEditorContents] = useState({
        summary: '',
        summaryEn: '',
        keywords: '',
        keywordsEn: '',
        references: '',
    });

    const handleEditorChange = (content, editor, name) => {
        setEditorContents((prev) => {
            const newContent = { ...prev, [name]: content };
            setEditorData(newContent); // Cập nhật dữ liệu trong component cha
            return newContent;
        });
    };

    const modules = {
        toolbar: [
            [{ header: [1, 2, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ script: 'sub' }, { script: 'super' }],
            [{ color: [] }, { background: [] }],
            ['blockquote', 'code-block'],
            [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
            ['link', 'image'],
            [{ align: [] }],
            ['clean'],
        ],
    };

    return (
        <div className="mb-4">
            <label className="block mb-2 font-bold">{title}</label>
            <ReactQuill
                theme="snow"
                value={editorContents.summaryEn}
                onChange={(content) => handleEditorChange(content)}
                modules={modules}
            />
        </div>
    );
}

export default WordForm;
