import { useState } from 'react';

const FormGame = ({ quizData, setQuizData, status }) => {
  const handleInputChange = (index, field, value) => {
    const updatedQuizData = [...quizData];
    if(updatedQuizData[index] != null){
      updatedQuizData[index][field] = value;
      setQuizData(updatedQuizData);
    }
  };

  const handleCorrectAnswerChange = (index, value) => {
    const updatedQuizData = [...quizData];
    if(updatedQuizData[index] != null){
      updatedQuizData[index].correctAnswerIndex = parseInt(value, 10);
      setQuizData(updatedQuizData);
    }
  };

  return (
    <div>
      {Array.from({ length: quizData.length }).map((_, i) => (
        <div className="flex flex-col px-2 py-2 mb-2" key={i}>
          <h5 className="text-base font-semibold ">Câu hỏi {i + 1}</h5>
          <input
            type="text"
            disabled={status === 'done'}
            className={`${status === 'done' ? "input_text_disabled" : "input_text"}`}
            placeholder="Tên"
            value={quizData[i]?.question || ""}
            onChange={(e) => handleInputChange(i, 'question', e.target.value)}
            required
          />

          <div className="flex gap-4">
            <div className="flex flex-col px-2 py-2 grow">
              <h5 className="text-base font-medium">Đáp án 1</h5>
              <input
                type="text"
                disabled={status === 'done'}
                className={`${status === 'done' ? "input_text_disabled" : "input_text"}`}
                placeholder="Câu trả lời"
                value={quizData[i]?.ans1 || ""}
                onChange={(e) => handleInputChange(i, 'ans1', e.target.value)}
                required
              />
            </div>

            <div className="flex flex-col px-2 py-2 grow">
              <h5 className="text-base font-medium">Đáp án 2</h5>
              <input
                type="text"
                disabled={status === 'done'}
                className={`${status === 'done' ? "input_text_disabled" : "input_text"}`}
                placeholder="Câu trả lời"
                value={quizData[i]?.ans2 || ""}
                onChange={(e) => handleInputChange(i, 'ans2', e.target.value)}
                required
              />
            </div>

            <div className="flex flex-col px-2 py-2 grow">
              <h5 className="text-base font-medium">Đáp án 3</h5>
              <input
                type="text"
                disabled={status === 'done'}
                className={`${status === 'done' ? "input_text_disabled" : "input_text"}`}
                placeholder="Câu trả lời"
                value={quizData[i]?.ans3 || ""}
                onChange={(e) => handleInputChange(i, 'ans3', e.target.value)}
                required
              />
            </div>
          </div>

          <div className="flex gap-4">
            <label className="font-medium">Chọn đáp án đúng:</label>
            <select
              value={quizData[i]?.correctAnswerIndex || 0}
              disabled={status === 'done'}
              onChange={(e) => handleCorrectAnswerChange(i, e.target.value)}
              required
            >
              <option value="" disabled>Chọn đáp án</option>
              <option value={0}>Đáp án 1</option>
              <option value={1}>Đáp án 2</option>
              <option value={2}>Đáp án 3</option>
            </select>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FormGame;
