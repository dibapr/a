import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getProduct,
  productSelector,
  updateProduct,
} from "../app/slice/product-slice";
import { useParams, useNavigate } from "react-router-dom";
// import { update } from "../app/slice/product-slice";

const EditProduct = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const product = useSelector((state) => productSelector.selectById(state, id));

  useEffect(() => {
    dispatch(getProduct());
  }, [dispatch]);

  useEffect(() => {
    if (product) {
      setTitle(product.title);
      setPrice(product.price);
    }
  }, [product]);

  //   const handleUpdateProduct = (e) => {
  //     e.preventDefault();
  //     dispatch(update({ title, price }));
  //   };

  const updateProductHandler = async (e) => {
    e.preventDefault();
    await dispatch(updateProduct({ id, title, price }));
    navigate("/");
  };

  return (
    <div>
      <form onSubmit={updateProductHandler} className="box mt-5">
        <div className="field">
          <label className="label">Title</label>
          <div className="control">
            <input
              type="text"
              className="input"
              placeholder="Title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Price</label>
          <div className="control">
            <input
              type="text"
              className="input"
              placeholder="Price..."
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
        </div>
        <div className="field">
          <button className="button is-success">Update</button>
        </div>
      </form>
    </div>
  );
};

export default EditProduct;
