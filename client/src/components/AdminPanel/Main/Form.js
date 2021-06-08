import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useMessage } from "../../../hooks/message.hook";
import { clearError, offLoader, setFormItem } from "../../../redux/action";
import { addItem } from "../../../redux/middleware";
// import { uploadImgToStorage, uploadUrl } from "./firebase";

const Form = () => {
  const dispatch = useDispatch();
  const errorMessage = useSelector((state) => state.errors);
  const form = useSelector((state) => state.formItem);
  const message = useMessage();

  const uploadFile = async (e) => {
    e.preventDefault();
    try {
      const fileImg = e.target.files[0];
      const formData = new FormData();
      formData.append("goods", fileImg);

      const options = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      const url = await axios.post("/upload/images", formData);

      // console.log(url.data.link.name);

      // await uploadImgToStorage("goods", fileImg);
      // const uri = await uploadUrl(url.data.link.name);
      // console.log(uri);
      dispatch(setFormItem({ ...form, img: url.data.link.link.mediaLink }));
    } catch (error) {
      console.log(error);
    }
  };

  const ucFirst = (str) => {
    if (!str) return str;

    return str[0].toUpperCase() + str.slice(1);
  };

  const changeHandler = (e) => {
    dispatch(
      setFormItem({ ...form, [e.target.name]: e.target.value.toLowerCase() })
    );
  };

  const submitGoods = async (e) => {
    e.preventDefault();
    const newGood = {
      ...form,
    };
    dispatch(addItem(newGood));
  };
  useEffect(() => {
    if (errorMessage) {
      message(errorMessage.message);
      dispatch(clearError);
      dispatch(offLoader);
    }
  }, [errorMessage]);

  return (
    <div>
      <form
        id="upload-container"
        method="POST"
        // action="/admin/img"
        encType="multipart/form-data"
      >
        <img id="upload-image" src={form.img} width="50px" alt={form.name} />
        <div>
          <input
            id="file-input"
            type="file"
            name="goods"
            accept="image/*"
            // multiple
            // onClick={uploadFile}
            onChange={uploadFile}
            required
          />
          {/* <label htmlFor="file-input">Виберіть файл</label> */}
          {/* <button type="submit" value="Загрузити" onClick={uploadFile}>
            Загрузити
          </button> */}
        </div>
      </form>
      <form method="POST" className="new-item">
        <div>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Назва товара"
            value={form.name}
            onChange={changeHandler}
            required
          />
          <input
            type="text"
            name="species"
            id="species"
            placeholder="Вид товару (футболка, рушник ...)"
            value={form.species}
            onChange={changeHandler}
            required
          />
          <input
            type="text"
            name="size"
            id="size"
            placeholder="Розміри,(Футболки - вказуємо через кому, Рушник - дожинаХ(на)ширину)"
            value={form.size}
            onChange={changeHandler}
            required
          />
          <input
            type="text"
            name="info"
            id="info"
            placeholder="Короткий опис товару"
            value={form.info}
            onChange={changeHandler}
            required
          />
          <input
            type="text"
            name="sizeImg"
            id="sizeImg"
            placeholder="Розмір малюнка вишивки"
            value={form.sizeImg}
            onChange={changeHandler}
            required
          />
          <input
            type="text"
            name="styleImg"
            id="styleImg"
            placeholder="Стиль вишивки"
            value={form.styleImg}
            onChange={changeHandler}
            required
          />
          <input
            type="text"
            name="price"
            id="price"
            placeholder="Ціна товару"
            value={form.price}
            onChange={changeHandler}
            required
          />
          <input
            type="text"
            name="category"
            id="category"
            placeholder="Катeгорія товару"
            value={form.category}
            onChange={changeHandler}
            required
          />
          <input
            type="text"
            name="MadeIn"
            id="MadeIn"
            placeholder="Виробник товару"
            value={form.MadeIn}
            onChange={changeHandler}
            required
          />
          <input
            type="text"
            name="article"
            id="article"
            placeholder="Артикул"
            value={form.article}
            onChange={changeHandler}
            required
          />
        </div>
        <button type="submit" className="button-to" onClick={submitGoods}>
          Записати товар
        </button>
      </form>
    </div>
  );
};

export default Form;
