import { useEffect, useMemo, useState } from "react";
import { ThumbUpIcon, ThumbDownIcon, EyeIcon } from "@heroicons/react/solid";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  fetchPostsAction,
  toggleAddLikesToPost,
  toggleAddDisLikesToPost,
  getPosts,
} from "../../redux/slices/posts/postSlices";
import DateFormatter from "../../utils/DateFormatter";
import { fetchCategoriesAction } from "../../redux/slices/category/categorySlice";
import LoadingComponent from "../../utils/LoadingComponent";
import { useLocation } from "react-router-dom";
import ReactPaginate from "react-paginate";
import "./posts.css";
import SearchMemory from "../Filters/SearchMemory";

export default function PostsList() {
  //select post from store
  const post = useSelector((state) => state?.post);
  const { postLists, loading, appErr, serverErr, likes, dislikes } = post;
  const [selectedCategory, setSelectedCategory] = useState("ALL");

  //pagination
  const [pageNumber, setPageNumber] = useState(0);

  const postPerPage = 5;
  const pagesVisited = pageNumber * postPerPage;
  console.log("postLists", postLists);
  const displayPosts = postLists
    ?.slice(pagesVisited, pagesVisited + postPerPage)
    .map((post) => {
      return (
        <div key={post.id} className="flex flex-wrap bg-gray-900  lg:mb-6">
          <div className="mb-10 max-w-xs w-[200px] ">
            <Link
              to={`/posts/${post?._id}`}
              className="text-indigo-500 hover:underline"
            >
              {/* Post image */}

              <img
                className="w-[200px] h-full object-cover rounded"
                src={post?.image}
                alt=""
              />
            </Link>
            {/* Likes, views dislikes */}
            <div className="flex flex-row bg-gray-300  justify-center w-full  items-center ">
              {/* Views */}
              <div className="flex flex-row justify-center items-center ml-4 mr-4 pb-2 pt-1">
                <div>
                  <EyeIcon className="h-7 w-7  text-gray-700" />
                </div>
                <div className="pl-2 text-gray-900">{post?.numViews}</div>
              </div>
            </div>
          </div>
          <div className="max-w-sm rounded overflow-hidden ml-4">
            <Link to={`/posts/${post?._id}`}>
              <h3 className="mb-1 text-2xl text-gray-300  font-bold font-heading">
                {post?.category}
              </h3>
              <h3 className=" mb-1 text-2xl text-gray-300 font-bold font-heading lg:text-3xl">
                {post?.title}
              </h3>
            </Link>
            <div className="flex flex-row justify-between mb-3 items-center">
              <p className="block text-ellipsis break-words overflow-hidden max-h-32 leading-8 text-gray-300">
                {post?.description}
              </p>
            </div>
            <Link
              to={`/posts/${post?._id}`}
              className="text-white bg-indigo-500 hover:bg-indigo-600 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-xs px-3 py-1.5  mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              Read More...
            </Link>

            <a
              class="text-white bg-indigo-500 hover:bg-indigo-600 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-xs px-3 py-1.5 ml-5 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800
                    "
              href="{post?.image}"
              download="image.jpg"
              target="_blank"
            >
              Download Image
            </a>
            <div className="mt-6 flex items-center flex-col lg:flex-row">
              <div className="flex-shrink-0">
                <Link>
                  <img
                    className="h-10 w-10 rounded-full"
                    src={post?.user?.profilePhoto}
                    alt=""
                  />
                </Link>
              </div>
              <div className="ml-0 mt-2 lg:ml-3 lg:mt-0">
                <p className="text-sm font-medium text-gray-900">
                  <Link
                    to={`/profile/${post?.user?._id}`}
                    className="text-gray-200 hover:underline "
                  >
                    {post?.user?.firstName} {post?.user?.lastName}
                  </Link>
                </p>
                <div className="flex space-x-1 text-sm text-indigo-300">
                  <time>
                    <DateFormatter date={post?.createdAt} />
                  </time>
                  <span aria-hidden="true">&middot;</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    });

  const pageCount = Math.ceil(postLists?.length / postPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  //select categories from store
  const category = useSelector((state) => state?.category);

  const location = useLocation();
  const {
    categoryList,
    loading: catLoading,
    appErr: catAppErr,
    serverErr: catServerErr,
  } = category;
  const categoryTittles = categoryList?.map((item) => {
    return {
      title: item.title,
    };
  });

  console.log("categoryTittles", categoryTittles);
  const sortedList = categoryTittles?.sort((a, b) =>
    a.title.localeCompare(b.title)
  );
  console.log("sortedList", sortedList);
  //dispatch
  const dispatch = useDispatch();
  //fetch post
  useEffect(() => {
    dispatch(fetchPostsAction("")).then(() => {
      // scroll To post div.
      if (location?.state?.params && categoryList?.length > 0) {
        setTimeout(() => {
          const scrollTo = document.getElementById(location.state.params);
          if (scrollTo) {
            scrollTo.click();
            scrollTo.focus();
          }
        }, 100);
      }
    });
  }, [dispatch, likes, dislikes, location]);
  //fetch categories
  useEffect(() => {
    dispatch(fetchCategoriesAction());
  }, [dispatch]);

  const handlChategory = (category) => {
    setSelectedCategory(category);
    dispatch(fetchPostsAction(category));
  };
  console.log("selectedCategory", selectedCategory);
  return (
    <>
      <section>
        <div className="py-20 bg-gray-900 min-h-screen radius-for-skewed">
          <div className="container mx-auto px-4">
            <div className="mb-16 flex flex-wrap items-center">
              {/* <div className="w-full lg:w-1/2">
                <span className="text-green-600 font-bold">
                  Latest memories from our awesome users
                </span>
                <h2 className="text-4xl text-gray-300 lg:text-5xl font-bold font-heading">
                  Latest Memories
                </h2>
              </div> */}
              <div className="flex  text-right w-2/2">
                {/* View All */}
                <button
                  onClick={() => {
                    dispatch(fetchPostsAction(""));
                    setSelectedCategory("ALL");
                  }}
                  className="inline-block py-2 px-6 rounded-l-xl rounded-t-xl bg-indigo-500 hover:bg-indigo-600 text-gray-50 font-bold leading-loose transition duration-200"
                >
                  View All Memories
                </button>
                <h2 className="text-white font-extrabold decoration-double text-4xl ml-52 text-center mb-4">
                  {selectedCategory.title ?? selectedCategory}
                </h2>
              </div>
            </div>
            <div className="mb-5">
              <SearchMemory />
            </div>
            <div className="flex flex-wrap -mx-3">
              <div className="mb-8 lg:mb-0 w-full lg:w-1/4 px-3">
                <div className=" overflow-auto  max-h-screen py-4 px-6 bg-gray-800 shadow rounded">
                  <h4 className="mb-4 text-gray-200 font-bold uppercase">
                    Memorial Pages
                  </h4>
                  <ul>
                    {catLoading ? (
                      <LoadingComponent />
                    ) : catAppErr || catServerErr ? (
                      <h1>
                        {catServerErr} {catAppErr}
                      </h1>
                    ) : sortedList?.length <= 0 ? (
                      <h1 className="text-yellow-400 text-lg text-center">
                        No Category Found
                      </h1>
                    ) : (
                      sortedList?.map((category) => (
                        <li>
                          <p
                            onClick={() => {
                              setSelectedCategory(category);
                              dispatch(fetchPostsAction(category.title));
                            }}
                            className="block cursor-pointer py-2 px-3 mb-4 rounded text-gray-900 font-bold bg-gray-300"
                          >
                            <div
                              className="overflow-auto max-h-24"
                              id={
                                category.title.includes(" ")
                                  ? category.title.replace(" ", "-")
                                  : category?.title
                              }
                            >
                              {category?.title}
                            </div>
                          </p>
                        </li>
                      ))
                    )}
                  </ul>
                </div>
              </div>
              <div class="w-full lg:w-3/4 ">
                {/* Post goes here */}

                {appErr || serverErr ? (
                  <h1 className="text-yellow-600 text-center text-lg ">
                    {serverErr} {appErr}
                  </h1>
                ) : postLists?.length <= 0 ? (
                  <h1 className="text-yellow-400 text-lg text-center">
                    No Post Found
                  </h1>
                ) : (
    
                  <div className="App">
                    {displayPosts}
                    <ReactPaginate
                      previouslabel={"Previous"}
                      nextLabel={"Next"}
                      pageCount={pageCount}
                      onPageChange={changePage}
                      containerClassName={"paginationBttns"}
                      previousLinkClassName={"previousBttn"}
                      nextLinkClassName={"nextBttn"}
                      disabledClassName={"paginationDisabled"}
                      activeClassName={"paginationActive"}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gray-900">
          <div class="skew bg-gray-200 skew-bottom mr-for-radius">
            <svg
              class="h-8 md:h-12 lg:h-10 w-full text-gray-900"
              viewBox="0 0 10 10"
              preserveAspectRatio="none"
            >
              <polygon fill="currentColor" points="0 0 10 0 0 10"></polygon>
            </svg>
          </div>
          <div class="skew bg-gray-500  skew-bottom ml-for-radius">
            <svg
              class="h-8 bg-indigo-400  md:h-12 lg:h-20 w-full text-gray-900"
              viewBox="0 0 10 10"
              preserveAspectRatio="none"
            >
              <polygon fill="currentColor" points="0 0 10 0 10 10"></polygon>
            </svg>
          </div>
        </div>
      </section>
    </>
  );
}
