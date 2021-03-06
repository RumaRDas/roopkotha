import React from "react";

import { Select } from "antd";
const { Option } = Select;

const ProductCreateForm = ({
  handleSubmit,
  handleChange,
  values,
  setValues,
  handleCategoryChange,
  subOptions,
  showSub,
  sizeOptions,
}) => {
  //Destructure useState values
  const {
    title,
    name,
    description,
    price,
    quantity,
    categories,
    category,
    subcates,
    preorder,
    images,
    colors,
    fabrics,
    sizes,
    color,
    fabric,
    size,
  } = values;
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title</label>
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
          <label>Name</label>
          <input
            type="text"
            name="name"
            className="form-control"
            value={name}
            onChange={handleChange}
          />
          <p className="text-danger">Name need More then 3 Character</p>
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea
            type="text"
            name="description"
            className="form-control"
            value={description}
            onChange={handleChange}
          />
          <div className="form-group">
            <label>Price</label>
            <input
              type="number"
              name="price"
              className="form-control"
              value={price}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Preorder Only</label>
            <select
              name="preorder"
              className="form-control"
              onChange={handleChange}
            >
              <option>Please select</option>
              <option value="No">No</option>
              <option value="Yes">Yes</option>
            </select>
          </div>
          <div className="form-group">
            <label>Quantity</label>
            <input
              type="number"
              name="quantity"
              className="form-control"
              value={quantity}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Color</label>
            <select
              name="color"
              className="form-control"
              onChange={handleChange}
            >
              <option>Plese Select</option>
              {colors.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Fabric</label>
            <select
              name="fabric"
              className="form-control"
              onChange={handleChange}
            >
              <option>Plese Select</option>
              {fabrics.map((f) => (
                <option key={f} value={f}>
                  {f}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label>Size</label>
            <Select
              mode="multiple"
              style={{ width: "100%" }}
              placeholder="Plese select"
              value={sizes}
              onChange={(value) => setValues({ ...values, sizes: value })}
            >
              {sizeOptions.length &&
                sizeOptions.map((s) => (
                  <Option value={s} key={s}>
                    {s}
                  </Option>
                ))}
            </Select>
          </div>
        </div>
        <div className="form-group">
          <label>Category</label>
          <select
            name="category"
            className="form-control"
            onChange={handleCategoryChange}
          >
            <option>Please Select</option>
            {categories.length > 0 &&
              categories.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.name}
                </option>
              ))}
          </select>
        </div>
        {/* Ant design select option */}
        {showSub && (
          <div>
            <label>Sub Categories</label>
            <Select
              mode="multiple"
              style={{ width: "100%" }}
              placeholder="Plese select"
              value={subcates}
              onChange={(value) => setValues({ ...values, subcates: value })}
            >
              {subOptions.length &&
                subOptions.map((s) => (
                  <Option value={s._id} key={s._id}>
                    {s.name}
                  </Option>
                ))}
            </Select>
          </div>
        )}
        {/* ____ */}
        <br />
        {/* {subOptions ? subOptions.length : "no subs yet"} */}
        <button className="btn btn-info btn-block">Save</button>
      </form>
    </div>
  );
};
export default ProductCreateForm;
