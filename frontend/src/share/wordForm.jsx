import { useState } from 'react';
import ReactQuill from 'react-quill';

function WordForm({title}) {
    const [editorContents, setEditorContents] = useState({
        summary: '',
        summaryEn: '',
        keywords: '',
        keywordsEn: '',
        references: '',
    });

    const handleEditorChange = (content, editor, name) => {
        setEditorContents((prev) => ({ ...prev, [name]: content }));
    };

    const modules = {
        toolbar: [
            // Header options
            [{ header: [1, 2, false] }], // Cho phép chọn Header 1, Header 2 và không có header
    
            // Text formatting options
            ['bold', 'italic', 'underline', 'strike'], // Định dạng chữ đậm, nghiêng, gạch chân, gạch ngang
            [{ script: 'sub' }, { script: 'super' }], // Subscript và Superscript
            [{ color: [] }, { background: [] }], // Màu chữ và màu nền
            ['blockquote', 'code-block'], // Trích dẫn và khối mã
    
            // List options
            [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }], // Danh sách có thứ tự, không thứ tự và điều chỉnh lề
    
            // Link and Image options
            ['link', 'image'], // Chèn liên kết và hình ảnh
            [{ align: [] }], // Căn chỉnh (trái, giữa, phải)
    
            // Clean option
            ['clean'], // Xóa định dạng
        ],
    };
    
    return (
        <div className="mb-4">
            <label className="block mb-2 font-bold">{title}</label>
            <ReactQuill
                theme="snow"
                value={editorContents.summaryEn}
                onChange={(content, delta, source, editor) => handleEditorChange(content, editor, 'summaryEn')}
                modules={modules}
              
            />
        </div>
    );
}

export default WordForm;
