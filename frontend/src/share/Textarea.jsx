import { useEffect, useState } from "react";

function Textarea() {
    
    const [feedback, setFeedback] = useState('')
    useEffect(() => {
        console.log(feedback);
        
    })
    return ( 
        <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
            Nhận xét của kiểm duyệt viên
        </label>
        <textarea 
          onChange={(e) => setFeedback(e.target.value)}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
        />
    </div>
     );
}

export default Textarea;