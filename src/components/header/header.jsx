import axios from "axios";
import { useEffect, useState } from "react";
import { UseAuth } from "../../hook/UseAuth";
import "./header.css";

export const Header = () => {
  let [token] = UseAuth();
  let [data, setData] = useState();
  const getAllData = async () => {
    const data = await axios
      .get("https://todo.mquvonchbek.uz/user/get", {
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

  console.log(data);
  return (
    <>
      <div className="container">
        <div className=" header_box">
          {" "}
          {data?.length &&
            data?.map((e, item) => (
              <div key={item} className="itme_list ">
                <img
                  className="rounded-circle"
                  src="https://placehold.co/100x100"
                  alt=""
                />
                <p className="first_name">First name: {e.first_name}</p>
                <p className="last_name">Last name: {e.last_name}</p>
                <p className="email">Email: {e.email}</p>
                <p className="password">Password: {e.password}</p>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};
