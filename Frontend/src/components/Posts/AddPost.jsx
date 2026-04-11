import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { fetchCategoriesAction } from "../../redux/slices/categories/categorySlice";
import { addPostAction } from "../../redux/slices/posts/postSlices";
import ErrorMsg from "../Alert/ErrorMsg";
import SuccessMsg from "../Alert/SuccessMsg";
import LoadingComponent from "../Alert/LoadingComponent";

const AddPost = () => {
  const dispatch = useDispatch();

  //error state
  const [errors, setErrors] = useState({});
  const { post, error, loading, success } = useSelector(
    (state) => state?.posts,
  );
  const { categories } = useSelector((state) => state?.categories);
  // console.log("categories", categories);
  const options = categories?.allCategories?.map((category) => {
    return { value: category?._id, label: category?.name };
  });
  useEffect(() => {
    dispatch(fetchCategoriesAction());
  }, [dispatch]);
  const [formData, setFormData] = useState({
    title: "",
    image: null,
    category: null,
    content: "",
  });
  const validateForm = (data) => {
    let errors = {};
    if (!data.title) {
      errors.title = "Title is required";
    }
    if (!data.image) {
      errors.image = "Image is required";
    }
    if (!data.content) {
      errors.content = "Content is required";
    }
    if (!data.category) {
      errors.category = "Category is required";
    }
    return errors;
  };
  //handle blur event
  const handleBlur = (e) => {
    const formErrors = validateForm(formData);
    const { name } = e.target;
    setErrors({ ...errors, [name]: formErrors[name] });
  };
  // //Dummy values
  // const options = [
  //   { value: "chocolate", label: "Chocolate" },
  //   { value: "starwberry", label: "Strawberry" },
  // ];
  const handleSelectChange = (selectedOption) => {
    setFormData({ ...formData, category: selectedOption.value });
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleFileChange = (e) => {
    console.log("file", e.target.files[0]);
    setFormData({ ...formData, image: e.target.files[0] });
  };
  const handleSubmit = (e) => {
    // console.log(formData);
    e.preventDefault();
    const formErrors = validateForm(formData);
    setErrors(formErrors);
    if (Object.keys(formErrors).length === 0) {
      dispatch(addPostAction(formData));

      setFormData({
        title: "",
        image: null,
        category: null,
        content: "",
      });
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit} className="w-full lg:w-1/2">
        <div className="flex flex-col items-center p-10 xl:px-24 xl:pb-10 shadow-2xl rounded-xl">
          <h2 className="mb-4 text-2xl md:text-3xl text-coolGray-900 font-medium">
            Add New Post
          </h2>
          {error && <ErrorMsg message={error?.message} />}
          {success && <SuccessMsg message="Post created successfully!" />}
          <h3 className="mb-7 text-base md:text-lg text-coolGray-500 font-medium">
            Share your thoughts and ideas with the community{" "}
          </h3>
          <label className="mb-4 flex flex-col w-full">
            <span className="mb-1 text-coolGray-800 font-medium">Title</span>
            <input
              className="py-3 px-3 leading-5 w-full text-coolGray-400 border rounded-xl"
              type="text"
              placeholder="Enter the post title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {/*error here */}
            {errors?.title && <p className="text-red-500">{errors?.title}</p>}
          </label>
          <label className="mb-4 flex flex-col w-full">
            <span className="mb-1 text-coolGray-800 font-medium">Image</span>
            <input
              className="py-3 px-3 leading-5 w-full text-coolGray-400 border rounded-xl "
              type="file"
              name="image"
              onChange={handleFileChange}
              onBlur={handleBlur}
            />
            {/*error here */}
            {errors?.image && <p className="text-red-500">{errors?.image}</p>}
          </label>
          {/*category here */}
          <label className="mb-4 flex flex-col w-full">
            <span className="mb-1 text-coolGray-800 font-medium">Category</span>
            <Select
              options={options}
              name="category"
              onChange={handleSelectChange}
              onBlur={handleBlur}
            />
            {/*error here */}
            {errors?.category && (
              <p className="text-red-500">{errors?.category}</p>
            )}
          </label>
          <label className="mb-4 flex flex-col w-full">
            <span className="mb-1 text-coolGray-800 font-medium">Content</span>
            <textarea
              className="py-3 px-3 leading-5 w-full text-coolGray-400 border rounded-xl"
              type="text"
              placeholder="Write your post content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors?.content && (
              <p className="text-red-500">{errors?.content}</p>
            )}
          </label>
          {/*button */}
          {loading ? (
            <LoadingComponent />
          ) : (
            <button
              className="mb-4 inline-block py-3 px-7 w-full leading-6 text-white bg-green-500 border rounded-xl"
              type="submit"
            >
              Post
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default AddPost;
