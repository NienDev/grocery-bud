import React from "react";

const List = ({ data, handleRemove, handleEdit }) => {
  return (
    <div className="max-w-xl mx-auto">
      {data.map((item, i) => (
        <div className="flex justify-between mb-2">
          <div>{item}</div>
          <div className="flex gap-4">
            <button onClick={() => handleEdit(i)}>
              <i class="fas fa-edit "></i>
            </button>
            <button onClick={() => handleRemove(i)}>
              <i class="fas fa-trash-alt"></i>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default List;
