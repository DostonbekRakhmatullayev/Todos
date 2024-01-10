import axios from "axios";
import { useEffect, useState } from "react";
import { UseAuth } from "../../hook/UseAuth";
import "./todo.css";
const Todos = () => {
  let [token] = UseAuth();
  let [data, setData] = useState();

  function EditTodo(evt) {
    let id = evt.target.dataset.id;
    let newText = prompt("Text kiriting");
    axios
      .put(
        `https://todo.mquvonchbek.uz/todo/update/${id}`,
        {
          text: newText,
        },
        {
          headers: {
            token,
          },
        }
      )
      .then((res) => {
        getAllData();
      })
      .catch((error) => console.log(error));
  }
  function DeleteTodo(evt) {
    let id = evt.target.dataset.id;

    if (!id) {
      return alert("Productni Id si topilmadi!");
    }
    if (id) {
      axios
        .delete(`https://todo.mquvonchbek.uz/todo/delete/${id}`, {
          headers: {
            token,
          },
        })
        .then((res) => {
          if (res.data.message == "Successful") {
            getAllData();
          }
        })
        .catch((error) => console.log(error));
    }
  }

  let a = [1, 2, 3, 4];

  const getAllData = async () => {
    const data = await axios
      .get("https://todo.mquvonchbek.uz/todo/all", {
        headers: {
          token,
        },
      })
      .then((res) => setData(res.data.data))
      .catch((error) => console.log(error));

    return data;
  };

  useEffect(() => {
    getAllData();
  }, []);

  function FetchCreate(evt) {
    evt.preventDefault();
    let { text } = evt.target.elements;

    axios
      .post(
        "https://todo.mquvonchbek.uz/todo/create",
        {
          text: text.value,
        },
        {
          headers: {
            token,
          },
        }
      )
      .then((res) => {
        getAllData();
      })
      .catch((error) => console.log(error));
    text.value = "";
  }
  data = data?.reverse();
  return (
    <>
      <div className="container">
        <form className="d-flex js-form" onSubmit={FetchCreate}>
          <input name="text" type="text" />

          <button className="btn btn-primary" type="submit">
            Send
          </button>
        </form>

        <ul className="list">
          {" "}
          {data?.length &&
            data?.map((e, item) => (
              <li key={item} className="list_item gap-2 d-flex">
                <small>{item + 1}</small>
                <p className="p-0 m-0 list_text">{e?.text}</p>
                <mark>
                  <i className="m-0 m-0">Sana:{e?.updated_at?.split("T")[0]}</i>
                </mark>
                <mark>
                  <i className="m-0 m-0">
                    Vaqti:{e.updated_at.split("T")[1].split(".")[0]}
                  </i>
                </mark>
                <button
                  className="btn btn-primary"
                  onClick={EditTodo}
                  data-id={e.id}
                >
                  EDIT
                </button>
                <button
                  className="btn btn-primary"
                  onClick={DeleteTodo}
                  data-id={e.id}
                >
                  DELETE
                </button>
              </li>
            ))}
        </ul>
      </div>
    </>
  );
};

export default Todos;
