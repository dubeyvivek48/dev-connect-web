import React, { useCallback, useState } from "react";
import useApiCall from "../hook/useApiCall";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useToast } from "../context/ToastContainer";
import { addFeed, removeFeed } from "../utils/feedSlice";
import UserCard from "./common/UserCard";
import Loader from "./common/Loader";
import useInfiniteScroll from "../hook/useInfiniteScroll";

const FeedPage = () => {
  const [loader, makeApiCall] = useApiCall();
  const feeds = useSelector((state) => state.feeds) || [];
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  const { showToast } = useToast();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const getUserDetails = useCallback(() => {
    let newpage = page + 1;
    makeApiCall({
      ApiKey: `user/feed?limit=5&page=${newpage}`,
      method: "GET",

      onSuccess: (msg) => {
        setPage(newpage);
        if (msg?.data?.users?.length === 0) {
          setHasMore(false);
        }
        dispatch(addFeed([...feeds, ...msg.data.users]));
        // showToast(msg?.data.message, "success");
      },
      onFailure: (msg) => {
        showToast(msg?.data.ERROR, "error");
      },
    });
  });
  const infiniteRef = useInfiniteScroll(loader, getUserDetails);

  const handleConnection = (status, _id) => {
    makeApiCall({
      ApiKey: `connection/send/${status}/${_id}`,
      method: "POST",

      onSuccess: (msg) => {
        // getUserDetails();
        dispatch(removeFeed(_id));
        showToast(msg?.data.message, "success");
      },
      onFailure: (msg) => {
        navigate("/login");
        showToast(msg?.data.ERROR, "error");
      },
    });
  };

  return (
    <div className="flex flex-col items-center">
      {feeds &&
        feeds.map((item) => (
          <UserCard
            key={item?._id}
            {...item}
            actionsButtons={[
              {
                label: "Intrested",
                className: "btn btn-primary w-1/2 rounded-lg font-medium",
                callBack: () => {
                  handleConnection("intrested", item?._id);
                },
              },
              {
                label: "Ignored",
                className:
                  "btn btn-outline btn-error w-1/2 rounded-lg font-medium",
                callBack: () => {
                  handleConnection("ignored", item?._id);
                },
              },
            ]}
          />
        ))}
      {hasMore && loader && <Loader />}
      {hasMore && !loader && <div ref={infiniteRef}></div>}
      {!hasMore && (
        <p className="text-center text-sm py-4 opacity-60">
          No more users to load.
        </p>
      )}
    </div>
  );
};

export default FeedPage;
