import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchPrivatePostAction } from "../../redux/slices/posts/postSlices";
import LoadingComponent from "../Alert/LoadingComponent";

const PostList = () => {
  //redux store communication
  const dispatch = useDispatch();
  const { posts, error, success, loading } = useSelector(
    (state) => state?.posts,
  );
  useEffect(() => {
    dispatch(fetchPrivatePostAction());
    console.log("private post", posts);
  }, [dispatch]);

  return (
    <>
      <div>
        <section className="relative py-10 bg-white">
          <div
            className="absolute top-0 left-0 w-full h-full"
            style={{
              backgroundImage:
                'url("flex-ui-assets/elements/pattern-white.svg")',
              backgroundRepeat: "no-repeat",
              backgroundPosition: "left top",
            }}
          />
          <div className="container relative z-10 px-4 mx-auto">
            <div className="md:max-w-5xl mx-auto mb-8 md:mb-16 text-center">
              <span className="inline-block py-px px-3 mb-4 text-xs leading-tight font-semibold text-green-600 bg-green-100 rounded-full">
                Blog
              </span>
              <h3 className="mb-4 text-3xl md:text-5xl leading-tight text-shadow-lg">
                Read our Trending Articles
              </h3>
            </div>
            <div className="flex flex-wrap -mx-4 mb-12 md:mb-20">
              {/*loop*/}
              {loading ? (
                <LoadingComponent />
              ) : error ? (
                <h3 className="text-red-500 text-center ">{error?.message}</h3>
              ) : posts?.allPosts?.length <= 0 ? (
                <h3>No post Found</h3>
              ) : (
                posts?.allPosts?.map((post) => {
                  return (
                    <div key={post?._id} className="w-full md:w-1/2 px-4 mb-8">
                      <a
                        className="block mb-6 overflow-hidden rounded-md"
                        href="#"
                      >
                        <img className="w-full" src={post?.image} />
                      </a>
                      <div className="mb-4">
                        <a
                          className="inline-block py-1 px-3 text-xs leading-5 text-green-500 hover:text-green-600 font-medium uppercase bg-green-100"
                          href="#"
                        >
                          {post?.category?.name}
                        </a>
                      </div>
                      <p className="mb-2 text-coolGray-500 font-medium">
                        {new Date(post?.createdAt).toDateString()}
                      </p>
                      <a
                        className="inline-block mb-4 text-2xl md:text-3xl leading-tight font-semibold"
                        href="#"
                      >
                        {post?.title}
                      </a>
                      <p className="mb-4 text-coolGray-500">{post?.content}</p>
                      <Link
                        className="inline-flex items-center text-base md:text-lg text-green-500"
                        to={`/posts/${post?._id}`}
                      >
                        <span className="mr-3">Read Post</span>
                        <svg
                          width={8}
                          height={10}
                          viewBox="0 0 8 10"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M7.94667 4.74665C7.91494 4.66481 7.86736 4.59005 7.80436 4.52305L1.31436 0.178052C1.14636 0.0650524 0.916361 0.106052 0.799361 0.270052L0.183361 1.13405C0.0663608 1.29805 0.101361 1.52405 0.262361 1.63905L5.43336 5.31805L0.262361 8.99705C0.101361 9.11205 0.0663608 9.33805 0.183361 9.50205L0.799361 10.3661C0.916361 10.5301 1.14636 10.5711 1.31436 10.4581L7.80436 6.11305C7.86736 6.04605 7.91494 5.97129 7.94667 5.88945C7.9784 5.80761 7.99427 5.72031 7.99427 5.63225C7.99427 5.54419 7.9784 5.45689 7.94667 5.37505L7.94667 4.74665Z"
                            fill="currentColor"
                          />
                        </svg>
                      </Link>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default PostList;
