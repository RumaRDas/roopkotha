import React from "react";
import { Select } from "antd";
const { Option } = Select;

const ProductUpdateForm = ({
  handleSubmit,
  handleChange,
  values,
  setValues,
  handleCategoryChange,
  categories,
  subOptions,
  showSub,
  arrayOfSubIds,
  setArrayOfSubIds,
  selectedCatogory,
}) => {
  //Destructure useState values
  const {
    title,
    description,
    price,
    quantity,
    category,
    subcates,
    shipping,
    images,
    colors,
    types,
    color,
    type,
  } = values;
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <lable>Title</lable>
          <input
            type="text"
            name="title"
            className="form-control"
            value={title}
            onChange={handleChange}
          />
          <p className="text-danger">Title need More then 3 Character</p>
        </div>
        <div className="form-group">
          <lable>Description</lable>
          <textarea
            type="text"
            name="description"
            className="form-control"
            value={description}
            onChange={handleChange}
          />
          <div className="form-group">
            <lable>Price</lable>
            <input
              type="number"
              name="price"
              className="form-control"
              value={price}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <lable>Shipping</lable>
            <select
              value={shipping === "Yes" ? "Yes" : "No"}
              name="shipping"
              className="form-control"
              onChange={handleChange}
            >
              <option>Plese Select</option>
              <option value="No">No</option>
              <option value="Yes">Yes</option>
            </select>
          </div>
          <div className="form-group">
            <lable>Quantity</lable>
            <input
              type="number"
              name="quantity"
              className="form-control"
              value={quantity}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <lable>Color</lable>
            <select
              value={color}
              name="color"
              className="form-control"
              onChange={handleChange}
            >
              {colors.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <lable>Type</lable>
            <select
              value={type}
              name="type"
              className="form-control"
              onChange={handleChange}
            >
              {types.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="form-group">
          <label>Category</label>
          <select
            name="category"
            className="form-control"
            onChange={handleCategoryChange}
            value={selectedCatogory ? selectedCatogory : category._id}
          >
            {categories.length > 0 &&
              categories.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.name}
                </option>
              ))}
          </select>
        </div>

        {/* Ant design select option */}

        <div>
          <label>Sub Categories</label>
          <Select
            mode="multiple"
            style={{ width: "100%" }}
            placeholder="Plese select"
            value={arrayOfSubIds}
            onChange={(value) => setArrayOfSubIds(value)}
          >
            {subOptions.length &&
              subOptions.map((s) => (
                <Option value={s._id} key={s._id}>
                  {s.name}
                </Option>
              ))}
          </Select>
        </div>

        {/* ____ */}
        {/* {subOptions ? subOptions.length : "no subs yet"} */}
        <br />
        <button className="btn btn-info btn-block">Save</button>
      </form>
    </div>
  );
};
export default ProductUpdateForm;
