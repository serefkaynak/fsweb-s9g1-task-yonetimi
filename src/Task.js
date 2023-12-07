import React from "react";


const Task = ({ taskObj, onComplete }) => {
  console.log(taskObj);
  console.log(onComplete);

  return (
    <div className="task">
      <h3>{taskObj.title}</h3>
      <p>{taskObj.description}</p>
      <div style={{display:"flex"}}>
          {taskObj.people.map((p) => (
            <div className="pill" key={p}>{p}</div>
          ))}
        {onComplete && <button 
          onClick={() => 
          onComplete(taskObj.id)}>Tamamla</button>}
      </div>
    </div>
  );
};

export default Task;