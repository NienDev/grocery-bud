import React, { useState, useEffect } from "react";
import List from "./List";
import Alert from "./Alert";

// fix
// when enter input when the time out is not finish, i will not wait till 3 seconds to remove the elements

function App() {
  const log = console.log;
  const [message, setMessage] = useState({
    msg: "",
    color: "",
  });
  const [data, setData] = useState([]);
  const [index, setIndex] = useState(0);
  const [value, setValue] = useState("");

  const notify = (msg) => {
    setMessage(msg);
  };

  useEffect(() => {
    setData(JSON.parse(localStorage.getItem("data")) || []);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (value != "") {
      if (index != 0) {
        setData((data) => data.map((item, i) => (i == index ? value : item)));
        notify({ msg: "List Edited", color: "green" });
        setIndex(0);
      } else {
        data.push(value);
        setData((data) => [...data]);
        notify({ msg: "Item added to the list", color: "green" });
      }
      setValue("");
    } else notify({ msg: "Please enter value", color: "red" });
  };

  const handleRemove = (index) => {
    log(index);
    setData((data) =>
      data.filter((item, i) => {
        return i != index;
      })
    );
    setMessage({
      msg: "Item Removed",
      color: "red",
    });
  };

  const handleEdit = (i) => {
    setIndex(i);
    setValue(data[i]);
  };

  const removeAlert = () => {
    setMessage({
      msg: "",
      color: "",
    });
  };

  const handleClear = () => {
    setData([]);
    notify({ msg: "Clear All Items", color: "green" });
  };

  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(data));
  }, [data]);

  return (
    <div className="max-w-2xl mx-auto text-center bg-white shadow-xl rounded-lg my-12 p-8 shadow-xl shadow-neutral-900/70">
      {message.color && (
        <Alert
          msg={message.msg}
          color={message.color}
          removeAlert={removeAlert}
          data={data}
        />
      )}
      <h3 className="font-bold mb-6">Grocery Bud</h3>
      <form onSubmit={handleSubmit} className="flex mb-8">
        <input
          type="text"
          className="input-bg w-full rounded-l-md px-6 py-2"
          placeholder="e.g. Egg"
          onChange={(e) => setValue(e.target.value)}
          value={value}
        />
        <button className="px-4 btn-bg rounded-r-md">
          {index != 0 ? "Edit" : "Submit"}
        </button>
      </form>

      <List data={data} handleRemove={handleRemove} handleEdit={handleEdit} />
      <button
        className="btn-prim text-xl font-semibold mt-4"
        onClick={handleClear}
      >
        Clear All
      </button>
    </div>
  );
}

export default App;
