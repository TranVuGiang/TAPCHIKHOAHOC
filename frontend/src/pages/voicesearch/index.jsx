import { useState } from 'react';

export const VoiceSearch = () => {
  const [query, setQuery] = useState('');
  const [isListening, setIsListening] = useState(false);
  
  const handleVoiceSearch = () => {
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
      recognition.lang = 'vi-VN';
      recognition.continuous = false;  
      recognition.interimResults = false;  

      recognition.start();
      setIsListening(true);

      recognition.onresult = (event) => {
        const result = event.results[0][0].transcript; 
        setQuery(result);
        setIsListening(false);
      };

      recognition.onerror = (error) => {
        console.error('Speech recognition error:', error);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };
    } else {
      alert('Trình duyệt của bạn không hỗ trợ nhận diện giọng nói!');
    }
  };

  return (
    <div>
      <div className="flex items-center space-x-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="p-2 border rounded"
          placeholder="Tìm kiếm..."
        />
        <button
          onClick={handleVoiceSearch}
          className="p-2 bg-blue-500 text-white rounded"
          disabled={isListening}
        >
          {isListening ? 'Đang nghe...' : 'Tìm kiếm bằng giọng nói'}
        </button>
      </div>
      {query && <p className="mt-2">Kết quả tìm kiếm: {query}</p>}
    </div>
  );
};
