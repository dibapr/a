// useSelector buat manggil data dari redux
import { useDispatch, useSelector } from "react-redux";
// =========================================

import { useEffect } from "react";
import {
  getProduct,
  productSelector,
  deleteProduct,
} from "../app/slice/product-slice";
import { Link } from "react-router-dom";

const ShowProduct = () => {
  // cara manggil selector, product itu nama reducer yang dari store nya
  // const { title, price } = useSelector((state) => state.product);
  // =========================================

  const dispatch = useDispatch();

  // kalo pake extra reducer + entity adapter kek gini manggil selector nya
  const product = useSelector(productSelector.selectAll);
  // =========================================

  useEffect(() => {
    dispatch(getProduct());
  }, [dispatch]);

  return (
    <div className="box mt-5">
      <Link to="add" className="button is-success">
        + Add New Product
      </Link>
      <table className="table is-stripped is-fullwidth">
        <thead>
          <tr>
            <th>No.</th>
            <th>Title</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {product.map((item, index) => (
            <tr key={item.id}>
              <td>{index + 1}</td>
              <td>{item.title}</td>
              <td>{item.price}</td>
              <td>
                <Link
                  to={`edit/${item.id}`}
                  className="button is-info is-small">
                  Edit
                </Link>
                <button
                  onClick={() => dispatch(deleteProduct(item.id))}
                  className="button is-danger is-small">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ShowProduct;
