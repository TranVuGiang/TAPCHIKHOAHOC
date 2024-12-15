function InputPost({ title, placeholerTitle }) {
    return (
        <div className="mb-4">
            <label className="block mb-2 font-bold">{title}</label>
            <input type="text" className="w-full p-2 border rounded" placeholder={placeholerTitle} />
        </div>
    );
}

export default InputPost;
