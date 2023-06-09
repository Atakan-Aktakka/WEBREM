import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategoriesAction } from "../../redux/slices/category/categorySlice";
import Select from "react-select";
import { useHistory } from "react-router-dom";

const SearchMemory = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(fetchCategoriesAction());
  }, [dispatch]);
  const memorialList = useSelector((state) => state?.category?.categoryList);

  if (memorialList?.length > 0) {
    var searchOptions = memorialList.map((list) => ({
      label: list.title,
      value: list.title,
    }));
  }

  const changeEvent = (event) => {
    const search = event.label?.includes(" ")
      ? event.label?.replace(" ", "-")
      : event.label;
    history.push("/posts", { params: search });
    history.replace("/posts", { params: search });
  };

  return (
    <div className="rounded-md shadow-sm -space-y-px">
      <div>
        <Select
          options={searchOptions}
          isSearchable={true}
          onChange={changeEvent}
        />
      </div>
    </div>
  );
};

export default SearchMemory;
